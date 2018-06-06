import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { Ticket } from '../../../models/tickets/ticket';
import { Label } from '../../../models/tickets/label';
import { Status } from '../../../models/tickets/status';
import { User } from '../../../models/users/user';
import { Team } from '../../../models/teams/team';
import { CommentariesDBModel } from '../../../models/tickets/commentariesDBModel';
import { UsersService } from '../../../core/users.service';
import { TicketsService } from '../../../core/tickets.service';
import { TeamsService } from '../../../core/teams.service';
import { ParamsService } from '../../../core/params.service';
import { Commentary } from '../../../models/tickets/commentary';
import { SnackBarComponentExample } from '../../snackbar/snackbar/snack-bar-component-example';

@Component({
  selector: 'app-single-ticket',
  templateUrl: './single-ticket.component.html',
  styleUrls: ['./single-ticket.component.css']
})
export class SingleTicketComponent implements OnInit {
  comments: CommentariesDBModel;
  commentary: Commentary;
  invalidMessage: string;
  @ViewChild(SnackBarComponentExample) child: SnackBarComponentExample;
  private disabled = false;

  ticket: Ticket;
  ticketId: number;

  labels: Label[];

  statuses: Status[];
  filteredStatuses: Status[];
  defaultStatus: string;
  currentStatus: number;

  members: User[];


  userId: number;
  requesterId: number;
  assigneeId: number;
  escalationContactId: number;

  teamLeaderId: number;
  userInTheTeam: boolean;

  Description: FormGroup;
  Members: FormGroup;
  Stickers: FormGroup;
  Comment: FormGroup;

  rowHeight = '100px';
  cols = 10;
  tiles = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private jwtService: JwtHelperService,
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private teamService: TeamsService,
    private userService: UsersService,
    private paramService: ParamsService,
    media: ObservableMedia
  ) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        if (change.mqAlias == 'xs') {
          this.rowHeight = '80px';
          this.cols = 10;
          this.tiles = [
            { text: 'Description', cols: 10, rows: 2, color: '' },
            { text: 'Status', cols: 10, rows: 1, color: '' },
            { text: 'Label', cols: 10, rows: 1, color: '' },
            { text: 'Requester', cols: 10, rows: 1, color: '' },
            { text: 'Assignee', cols: 10, rows: 1, color: '' },
            { text: 'Members', cols: 10, rows: 1, color: '' },
            { text: 'Participate', cols: 10, rows: 1, color: '' },
            { text: 'Comments', cols: 10, rows: 1, color: '' },
          ];
        }
        else if (change.mqAlias == 'sm') {
          this.rowHeight = '100px';
          this.cols = 10;
          this.tiles = [
            { text: 'Description', cols: 10, rows: 2, color: '' },
            { text: 'Status', cols: 5, rows: 1, color: '' },
            { text: 'Label', cols: 5, rows: 1, color: '' },
            { text: 'Requester', cols: 5, rows: 1, color: '' },
            { text: 'Assignee', cols: 5, rows: 1, color: '' },
            { text: 'Members', cols: 5, rows: 1, color: '' },
            { text: 'Participate', cols: 5, rows: 1, color: '' },
            { text: 'Comments', cols: 10, rows: 1, color: '' },
          ];
        }
        else {
          this.rowHeight = '100px';
          this.cols = 10;
          this.tiles = [
            { text: 'Description', cols: 6, rows: 2, color: '' },
            { text: 'Status', cols: 4, rows: 1, color: '' },
            { text: 'Label', cols: 4, rows: 1, color: '' },
            { text: 'Requester', cols: 5, rows: 1, color: '' },
            { text: 'Assignee', cols: 5, rows: 1, color: '' },
            { text: 'Members', cols: 5, rows: 1, color: '' },
            { text: 'Participate', cols: 5, rows: 1, color: '' },
            { text: 'Comments', cols: 10, rows: 1, color: '' },
          ];
        }
      });


      this.Description = this.formBuilder.group({
        description: '',
      });

      this.Members = this.formBuilder.group({
        AssigneeId: '',
        RequesterId: '',
      });

      this.Stickers = this.formBuilder.group({
        LabelId: '',
        StatusId: '',
        deadline: '',
      });

      this.Comment = this.formBuilder.group({
        content: '',
      });

  }

  ngOnInit() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.userId = +decodedToken.id;

    this.activatedRoute.params.subscribe(data => {
      this.ticketId = +data.id;
    });

    this.ticketsService.getById(this.ticketId).subscribe((data) => {
      this.ticket = data.info;
      this.currentStatus = +this.ticket.StatusId;
      this.defaultStatus = this.currentStatus === 1 ? 'COMPLETED' : 'Status';
      this.requesterId = this.ticket.RequesterId;
      this.assigneeId = this.ticket.AssigneeId;
      this.escalationContactId = this.ticket.EscalationContactId;

      this.Members.get('AssigneeId').setValue(this.ticket.AssigneeId);
      this.Members.get('RequesterId').setValue(this.ticket.RequesterId);

      this.teamService.getAllUsersFromTeam(this.ticket.TeamId).subscribe((data) => {
        this.members = [];
        data.info.map((user) => {
          this.userService.getById(user.UserId).subscribe(res => {
            this.members.push(<User>res.info);
          });
        });
      });

      this.teamService.getById(this.ticket.TeamId).subscribe((data) => {
        this.teamLeaderId = data.info.teamLeaderId.id;


        this.paramService.getAllStatuses().subscribe((data) => {
          if (!(this.userId === this.escalationContactId || this.userId === this.requesterId || this.userId === this.teamLeaderId || this.userId === this.assigneeId)) {
            this.filteredStatuses = data.result.filter((status) => status.name !== 'COMPLETED');
          }
          this.statuses = this.filteredStatuses ? this.filteredStatuses : data.result;
        });
      });
    });

    this.ticketsService.getComments(this.ticketId).subscribe((data) => {
      data.info.reverse();
      this.comments = data;
    });

    this.paramService.getAllLabels().subscribe((data) => {
      this.labels = data.result;
    });

    this.ticketsService.getById(this.ticketId).subscribe((data) => {
      const fromUsers = data.info.Users.find((user) => user.id === this.userId);
      this.userInTheTeam = fromUsers ? true : false;
    });


  }

  participate() {
    const obj = {
      TicketId: +this.ticketId,
      UserId: +this.userId,
    }

    this.ticketsService.subscribeForTicket(obj)
      .subscribe(
      data => {
        this.invalidMessage = 'You are now taking part in this task! Additional access granted!';
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();

        this.ticketsService.getById(this.ticketId).subscribe((data) => {
          const fromUsers = data.info.Users.find((user) => user.id === this.userId);
          this.userInTheTeam = fromUsers ? true : false;
        });
      },
      error => console.log(error)
      );
  }

  departicipate() {
    const obj = {
      TicketId: +this.ticketId,
      UserId: +this.userId,
    }

    this.ticketsService.desubscribeForTicket(obj)
      .subscribe(
      data => {
        this.invalidMessage = 'You are no longer taking part in this particular task! Feel free to join again whenever you like!';
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();

        this.ticketsService.getById(this.ticketId).subscribe((data) => {
          const fromUsers = data.info.Users.find((user) => user.id === this.userId);
          this.userInTheTeam = fromUsers ? true : false;
        });
      },
      error => console.log(error)
      );
  }

  updateTicket() {
    let ticketObject = <Ticket>{};
    if (this.isClosed()) {
      console.log('No access');
      return;
    }

    if (this.accessRights()) {
      ticketObject = {
        id: this.ticketId,
        description: this.Description.value.description,
        AssigneeId: this.Members.value.AssigneeId,
        RequesterId: this.Members.value.RequesterId,
        LabelId: this.Stickers.value.LabelId,
        StatusId: this.Stickers.value.StatusId,
        deadline: this.Stickers.value.deadline,
        TeamId: this.ticket.TeamId,
        EscalationContactId: this.escalationContactId,
      };
    } else {
      ticketObject = {
        id: this.ticketId,
        description: this.Description.value.description,
        LabelId: this.Stickers.value.LabelId,
        StatusId: this.Stickers.value.StatusId,
        deadline: this.ticket.deadline,
        RequesterId: this.ticket.RequesterId,
        AssigneeId: this.ticket.AssigneeId,
        TeamId: this.ticket.TeamId,
        EscalationContactId: this.escalationContactId,
      };
    }

    this.ticketsService.updateInfo(ticketObject).subscribe((data: Object) => {
      this.invalidMessage = 'Changes successfully made!';
      this.child.message = this.invalidMessage;
      this.child.openSnackBar();

      this.ticketsService.getById(this.ticketId).subscribe((data) => {
        this.ticket = data.info;
        this.currentStatus = +data.info.StatusId;
        this.defaultStatus = this.currentStatus === 1 ? 'COMPLETED' : 'Status';
        this.requesterId = this.ticket.RequesterId;
        this.assigneeId = this.ticket.AssigneeId;

        this.teamService.getAllUsersFromTeam(this.ticket.TeamId).subscribe((data) => {
          this.members = [];
          data.info.map((user) => {
            this.userService.getById(user.UserId).subscribe(res => {
              this.members.push(<User>res.info);
            });
          });
        });

        this.teamService.getById(this.ticket.TeamId).subscribe((data) => {
          this.teamLeaderId = data.info.teamLeaderId.id;

          this.paramService.getAllStatuses().subscribe((data) => {
            if (!(this.userId === this.escalationContactId || this.userId === this.requesterId || this.userId === this.teamLeaderId || this.userId === this.assigneeId)) {
              this.filteredStatuses = data.result.filter((status) => status.name !== 'COMPLETED');
            }
            this.statuses = this.filteredStatuses ? this.filteredStatuses : data.result;
          });
        });
      });


      this.ticketsService.getComments(this.ticketId).subscribe((data) => {
        data.info.reverse();
        this.comments = data;
      });

      this.paramService.getAllLabels().subscribe((data) => {
        this.labels = data.result;
      });
    }),
      error => console.log(error);
  }

  commentTicket() {

    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const date = (new Date() + '').split(' ');
    const formatDate = date[1] + ' ' + date[2] + '.' + date[3] + ' ' + date[4];

    const commentObj = {
      content: this.commentary,
      date: formatDate,
      UserId: +decodedToken.id,
      TicketId: +this.ticketId,
    }

    this.ticketsService.createComment(this.ticket, commentObj).subscribe(
      data => {
        this.ticketsService.getComments(+this.ticketId).subscribe((data) => {
          data.info.reverse();
          this.comments = data;
        })
      },
      error => console.log(error)
    );

    if (commentObj.content) {
      this.invalidMessage = 'You\'ve just commented on this task!';
      this.child.message = this.invalidMessage;
      this.child.openSnackBar();
    }
  }

  isClosed() {
    if (this.currentStatus === 1) {
      this.disabled = true;
    }
    return this.currentStatus === 1;
  }

  isInTicket() {
    if (this.userInTheTeam) {
      this.disabled = true;
    }
    return this.userInTheTeam;
  }

  accessRights() {
    return (this.userId === this.escalationContactId || this.userId === this.requesterId || this.userId === this.teamLeaderId || this.userId === this.assigneeId);
  }

  haveAccess() {
    return this.isClosed() || this.isInTicket();
  }
}
