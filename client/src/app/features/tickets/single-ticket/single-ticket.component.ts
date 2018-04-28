import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Ticket } from '../../../models/tickets/ticket';

import { TicketsService } from '../../../core/tickets.service';
import { AuthService } from '../../../core/auth.service';
import { ParamsService } from '../../../core/params.service';
import { Label } from '../../../models/tickets/label';
import { Status } from '../../../models/tickets/status';
import { User } from '../../../models/users/user';
import { UsersService } from '../../../core/users.service';
import { TeamsService } from '../../../core/teams.service';
import { FormBuilder } from '@angular/forms';
import { Team } from '../../../models/teams/teams';

@Component({
  selector: 'app-single-ticket',
  templateUrl: './single-ticket.component.html',
  styleUrls: ['./single-ticket.component.css']
})
export class SingleTicketComponent implements OnInit {

  // @Output()
  // childEvent = new EventEmitter<any>();

  // onChildEvent() {
  //   console.log('Peder');
  //   this.childEvent.emit(this.comments);
  // }

  comments: any;

  ticketId: number;
  ticket: Ticket;
  labels: Label[];
  statuses: Status[];
  members: User[];

  commentary: Object;

  pokemonControl = new FormControl();

  Description: FormGroup;
  Members: FormGroup;
  Stickers: FormGroup;
  Comment: FormGroup;

  userId: number;
  requesterId: number;
  assigneeId: number;
  teamLeaderId: Team;
  constructor(private ticketsService: TicketsService,
    private activatedRoute: ActivatedRoute,
    private jwtService: JwtHelperService,
    private router: Router,
    private paramService: ParamsService,

    private userService: UsersService,
    private teamService: TeamsService,
    private formBuilder: FormBuilder,
  ) {
  }


  ngOnInit() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.userId = decodedToken.id;

    this.activatedRoute.params.subscribe(data => {
      this.ticketId = data['id'];
    });

    this.ticketsService.getById(this.ticketId).subscribe((data) => {
      this.ticket = data.info;

      this.teamService.getAllUsers(this.ticket.TeamId).subscribe((data) => {
        this.members = data.info.Users;
      });

      this.teamService.getById(this.ticket.TeamId).subscribe((data) => {
        this.teamLeaderId = data;
      });
    });


    this.ticketsService.getComments(this.ticketId).subscribe((data) => {
      this.comments = data;
    });

    this.paramService.getAllLabels().subscribe((data) => {
      this.labels = data.result;
    });

    this.paramService.getAllStatuses().subscribe((data) => {
      this.statuses = data.result;
    });

    // this.userService.getAllForTickets().subscribe((data) => {
      //   this.members = data.info;
      // });

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

  log() {
    // console.log(this.ticket);
    // console.log(this.labels);
    // console.log(this.statuses);
    // console.log(this.members);
    console.log(this.comments);
  }

  updateTicket() {
    const ticketObject = {
      id: this.ticketId,
      description: this.Description.value.description,
      AssigneeId: this.Members.value.AssigneeId,
      RequesterId: this.Members.value.RequesterId,
      LabelId: this.Stickers.value.LabelId,
      StatusId: this.Stickers.value.StatusId,
      deadline: this.Stickers.value.deadline,
      TeamId: this.ticket.TeamId,
      EscalationContactId: this.ticket.EscalationContactId,
    };

    console.log(ticketObject);

    this.ticketsService.updateInfo(ticketObject);
  }

  commentTicket() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const date = (new Date()+'').split(' ');
    const formatDate = date[1] + ' ' + date[2] + '.' + date[3] + ' ' + date[4];

    const commentObj = {
      content: this.commentary,
      date: formatDate,
      UserId: decodedToken.id,
      TicketId: this.ticketId,
    }

    this.ticketsService.createComment(this.ticket, commentObj).subscribe(
      data=> {
        this.ticketsService.getComments(this.ticketId).subscribe((data) => {
          this.comments = data;
        })
      },
      error => console.log(error)
    );

  }

  accessRights() {
    // return (this.userId === this.ticket.RequesterId || this.userId === this.teamLeaderId.info.TeamLeaderId) ? false : true;
    return false;
  }
}
