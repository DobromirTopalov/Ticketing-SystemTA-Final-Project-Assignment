import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../models/tickets/ticket';
import { TicketsService } from '../../core/tickets.service';
import { AuthService } from '../../core/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @Input()
  tickets: Ticket[];
  copyTickets: Ticket[];
  assignedTickets: Ticket[];
  requestedTickets: Ticket[];
  userId: number;
  columnNum: number;
  rowHeightRatio: string;
  criteria; string = 'assigneeId';
  sortOrder: string = 'asc';
  switchTicketView: boolean;
  constructor(private ticketsService: TicketsService, private auth: AuthService, private jwtService: JwtHelperService, media: ObservableMedia, private router: Router) {
    media.asObservable()
    .subscribe((change: MediaChange) => {
      // alert(change.mqAlias);
      // console.log(change.mqAlias);
      if (change.mqAlias == 'xs') {
        this.columnNum = 1;
        this.rowHeightRatio = '2:1'
      }
      else if (change.mqAlias == 'sm') {
        this.columnNum = 2;
        this.rowHeightRatio = '1.5:1'
      }
      else {
        this.columnNum = 2;
        this.rowHeightRatio = '2:1'
      }
    });
  }



  ngOnInit() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.userId = +decodedToken.id;

    this.ticketsService.getAll().subscribe(data => {
      const tickets = Object.keys(data).map((iterator) => data[iterator])[0];
      this.tickets = tickets;
      this.copyTickets = tickets;

      const assignedTickets = this.tickets.filter((ticket) => ticket.AssigneeId === this.userId);
      this.assignedTickets = assignedTickets;
      console.log(assignedTickets,'asdasd');

      const requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);
      this.requestedTickets = requestedTickets;
    });
  }

  nav(id: number): void{
    this.router.navigate(['/tickets', id])
  }

  onChange(collection): void {
    console.log('inside sort');
    collection = collection.sort((x, y) => {
      const orderType = this.sortOrder === 'asc' ? 1 : -1;
      let otherCriteria;
      if (this.criteria === 'Label' || this.criteria === 'Status' || this.criteria === 'Team') {
        otherCriteria = 'name';
      } else {
        otherCriteria = 'email';

      }
      let a = x[this.criteria][otherCriteria];
      let b = y[this.criteria][otherCriteria];

      console.log(this.criteria);
      if (typeof x[this.criteria][otherCriteria] === 'string') {
        a = x[this.criteria][otherCriteria].toLocaleLowerCase();
        b = y[this.criteria][otherCriteria].toLocaleLowerCase();
      }

      if (a > b) {
        return 1 * orderType;
      } else if (a < b) {
        return -1 * orderType;
      } else {
        return 0;
      }
    });

    this.tickets = collection;
  }

  chooseAssTickets() {
    this.switchTicketView = true;
    this.tickets = this.copyTickets;

    const assignedTickets = this.tickets.filter((ticket) => ticket.AssigneeId === this.userId);
    this.assignedTickets = assignedTickets;
    this.tickets = assignedTickets;
    console.log(this.assignedTickets);
  }

  chooseMyTickets() {
    this.switchTicketView = false;
    this.tickets = this.copyTickets;

    const requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);
    this.requestedTickets = requestedTickets;
    this.tickets = requestedTickets;

    console.log(this.requestedTickets);
  }
}
