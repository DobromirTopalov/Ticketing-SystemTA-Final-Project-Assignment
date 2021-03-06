import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { Status } from '../../../models/tickets/status';
import { StatusType } from '../../../models/tickets/statuses.enum';
import { Label } from '../../../models/tickets/label';
import { LabelType } from '../../../models/tickets/labels.enum';
import { User } from '../../../models/users/user';
import { UsersService } from '../../../core/users.service';
import { TeamsService } from '../../../core/teams.service';
import { Ticket } from '../../../models/tickets/ticket';
import { TicketsService } from '../../../core/tickets.service';
import { ParamsService } from '../../../core/params.service';
import { UsersDBModel } from '../../../models/users/usersDBModel';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  createTicketForm: FormGroup;

  userId: number;
  requesterId: number;
  assigneeId: number;
  teamLeader: User;
  teamId: number;
  labels: Label[];

  setLabel: LabelType = 1;
  statuses: Status[];
  setStatus: StatusType = 3;

  members: User[] = [];

  rowHeight = '100px';
  cols = 10;
  tiles = [];
  style: string;


  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketsService: TicketsService,
    private paramService: ParamsService,
    private teamService: TeamsService,
    private userService: UsersService,
    media: ObservableMedia
  ) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        if (change.mqAlias == 'xs') {
          this.style = 'width: 100%';
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
          this.style = 'width: 100%';
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
          this.style = 'width: 60%';
          this.rowHeight = '150px';
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
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.teamId = +params["teamId"];
    });

    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.userId = +decodedToken.id;
    this.requesterId = this.userId;
    this.assigneeId = this.userId;

    const userList = this.teamService.getUserFromTeam(this.userId).subscribe((data) => {
      const teamInfo = this.teamService.getById(this.teamId).subscribe((data) => {
        this.teamLeader = data.info.teamLeaderId;
      });

      this.teamService.getAllUsersFromTeam(this.teamId).subscribe((data) => {
        const users = data.info;

        users.forEach((user) => {
          this.userService.getById(+user.UserId).subscribe((data) => {
            this.members.push(data);
          });
        });
      });
    }, error => { });


    this.paramService.getAllLabels().subscribe((data) => {
      this.labels = data.result;
    });

    this.paramService.getAllStatuses().subscribe((data) => {
      this.statuses = data.result;
    });

    const pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);
    this.createTicketForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required, Validators.maxLength(13000)]),
      LabelId: new FormControl('', [Validators.required]),
      StatusId: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      AssigneeId: new FormControl('', [Validators.required]),
      RequesterId: new FormControl('', [Validators.required]),
    });
  }

  getGenericErrorMessage(param) {
    return this.createTicketForm.get(param).hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageDescription() {
    return this.createTicketForm.get('description').hasError('required') ? 'You must enter a value' :
      this.createTicketForm.get('description').hasError('maxLength') ? 'Max 13000 symbols allowed' : '';
  }

  createTicket(): void {
    const ticketObject = {
      description: this.createTicketForm.value.description,
      AssigneeId: this.createTicketForm.value.AssigneeId,
      RequesterId: this.createTicketForm.value.RequesterId,
      LabelId: this.createTicketForm.value.LabelId,
      StatusId: this.createTicketForm.value.StatusId,
      deadline: this.createTicketForm.value.deadline,
      TeamId: this.teamId,
      EscalationContactId: this.teamLeader.id,
    };

    this.ticketsService.createInfo(<Ticket>ticketObject).subscribe((data: Object) => { });
    this.router.navigate(['/teams', this.teamId]);
  }

}
