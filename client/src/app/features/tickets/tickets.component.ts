import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../models/tickets/ticket';
import { TicketsService } from '../../core/tickets.service';
import { AuthService } from '../../core/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

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
  criteria: string = 'assigneeId';
  sortOrder: string = 'asc';
  switchTicketView: boolean;

  displayedColumns = ['description', 'requester', 'assignee', 'status', 'label', 'deadline'];
  ELEMENT_DATA: Element[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private ticketsService: TicketsService, private auth: AuthService, private jwtService: JwtHelperService, media: ObservableMedia, private router: Router) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        this.columnNum = 1;
        this.rowHeightRatio = '20:1';
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
      this.tickets = assignedTickets;

      this.tickets.forEach((ticket) => {
        const tableContent = { description: ticket.description, requester: ticket['requesterId'].email, assignee: ticket['assigneeId'].email, status: ticket['Status'].name, label: ticket['Label'].name, deadline: ticket.deadline, id: ticket.id };
        this.ELEMENT_DATA.push(tableContent);
      });
      this.dataSource.data = this.ELEMENT_DATA;

      const requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);
      this.requestedTickets = requestedTickets;
    });
  }

  nav(id: number): void {
    this.router.navigate(['/tickets', id]);
  }

  onChange(collection): void {
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

    this.ELEMENT_DATA = [];
    collection.forEach((ticket) => {
      const tableContent = { description: ticket.description, requester: ticket['requesterId'].email, assignee: ticket['assigneeId'].email, status: ticket['Status'].name, label: ticket['Label'].name, deadline: ticket.deadline, id: ticket.id };
      this.ELEMENT_DATA.push(tableContent);
    });
    this.dataSource.data = this.ELEMENT_DATA;
    this.tickets = collection;
  }

  chooseAssTickets() {
    this.switchTicketView = true;
    this.tickets = this.copyTickets;

    this.ELEMENT_DATA = [];
    const assignedTickets = this.tickets.filter((ticket) => ticket.AssigneeId === this.userId);
    this.assignedTickets = assignedTickets;
    this.assignedTickets.forEach((ticket) => {
      const tableContent = { description: ticket.description, requester: ticket['requesterId'].email, assignee: ticket['assigneeId'].email, status: ticket['Status'].name, label: ticket['Label'].name, deadline: ticket.deadline, id: ticket.id };
      this.ELEMENT_DATA.push(tableContent);
    });
    this.dataSource.data = this.ELEMENT_DATA;

    this.tickets = assignedTickets;
  }

  chooseMyTickets() {
    this.switchTicketView = false;
    this.tickets = this.copyTickets;

    this.ELEMENT_DATA = [];
    const requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);
    this.requestedTickets = requestedTickets;
    this.requestedTickets.forEach((ticket) => {
      const tableContent = { description: ticket.description, requester: ticket['requesterId'].email, assignee: ticket['assigneeId'].email, status: ticket['Status'].name, label: ticket['Label'].name, deadline: ticket.deadline, id: ticket.id };
      this.ELEMENT_DATA.push(tableContent);
    });
    this.dataSource.data = this.ELEMENT_DATA;

    this.tickets = requestedTickets;

  }
}

export interface Element {
  requester: string;
  assignee: string;
  description: string;
  status: string;
  label: string;
  deadline: string;
}
