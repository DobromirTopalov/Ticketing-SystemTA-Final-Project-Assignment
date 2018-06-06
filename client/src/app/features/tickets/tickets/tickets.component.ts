import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { TicketsService } from '../../../core/tickets.service';
import { Ticket } from '../../../models/tickets/ticket';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { TicketsDBModel } from '../../../models/tickets/ticketsDBModel';
import { SnackBarComponentExample } from '../../snackbar/snackbar/snack-bar-component-example';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  userId: number;
  tickets: Ticket[];
  copyTickets: Ticket[];
  assignedTickets: Ticket[];
  requestedTickets: Ticket[];

  columnNum: number;
  rowHeightRatio: string;

  criteria: string = 'Status';
  sortOrder: string = 'desc';

  switchTicketView: boolean;

  displayedColumns = ['description', 'requester', 'assignee', 'status', 'label', 'deadline'];


  invalidMessage: string;
  @ViewChild(SnackBarComponentExample) child: SnackBarComponentExample;


  @Input()
  outerTickets: Ticket[] & string;
  ELEMENT_DATA: Element[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private ticketsService: TicketsService,
    private jwtService: JwtHelperService,
    private router: Router,
    media: ObservableMedia) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        this.columnNum = 1;
        this.rowHeightRatio = '20:1';
      });
  }

  ngOnInit() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.userId = +decodedToken.id;

    this.ticketsService.getAll().subscribe((data) => {
      this.tickets = (typeof this.outerTickets !== 'undefined') && (this.outerTickets.length > 0) ? this.outerTickets : data.info;
      this.copyTickets = this.tickets;

      if (this.outerTickets === 'no') {
        this.tickets = [];
        this.copyTickets = this.tickets;

        this.invalidMessage = 'No tickets found!';
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();
      }

      if ((typeof this.outerTickets === 'undefined') || (this.outerTickets.length <= 0)) {
        this.assignedTickets = this.tickets.filter((ticket) => ticket.AssigneeId === this.userId);
        this.tickets = this.assignedTickets;    // show assigned by default
        this.requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);

        if (!this.tickets.length) {
          this.invalidMessage = 'No tickets found!';
          this.child.message = this.invalidMessage;
          this.child.openSnackBar();
        }
      }

      this.tickets.forEach((ticket) => {
        const tableContent = {
          description: ticket.description,
          requester: ticket.requesterId.email,
          assignee: ticket.assigneeId.email,
          status: ticket.Status.name,
          label: ticket.Label.name,
          deadline: ticket.deadline,
          id: ticket.id
        };

        this.ELEMENT_DATA.push(tableContent);
      });

      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  onChange(collection): void {
    collection = collection.sort((x, y) => {
      const orderType = this.sortOrder === 'asc' ? 1 : -1;
      let otherCriteria;
      if (this.criteria === 'Label' || this.criteria === 'Status' || this.criteria === 'Requester') {
        otherCriteria = 'name';
      } else if (this.criteria === 'deadline') {
        otherCriteria = '';
      } else {
        otherCriteria = 'email';
      }

      let a = x[this.criteria][otherCriteria] || x[this.criteria];
      let b = y[this.criteria][otherCriteria] || y[this.criteria];

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
      const tableContent = {
        description: ticket.description,
        requester: ticket.requesterId.email,
        assignee: ticket.assigneeId.email,
        status: ticket.Status.name,
        label: ticket.Label.name,
        deadline: ticket.deadline,
        id: ticket.id
      };

      this.ELEMENT_DATA.push(tableContent);
    });

    this.dataSource.data = this.ELEMENT_DATA;
    this.tickets = collection;
  }

  chooseAssTickets() {
    this.switchTicketView = true;
    this.tickets = this.copyTickets;

    this.ELEMENT_DATA = [];
    this.assignedTickets = this.tickets.filter((ticket) => ticket.AssigneeId === this.userId);

    this.assignedTickets.forEach((ticket) => {
      const tableContent = {
        description: ticket.description,
        requester: ticket.requesterId.email,
        assignee: ticket.assigneeId.email,
        status: ticket.Status.name,
        label: ticket.Label.name,
        deadline: ticket.deadline,
        id: ticket.id
      };
      this.ELEMENT_DATA.push(tableContent);
    });

    this.dataSource.data = this.ELEMENT_DATA;

    this.tickets = this.assignedTickets;
  }

  chooseMyTickets() {
    this.switchTicketView = false;
    this.tickets = this.copyTickets;

    this.ELEMENT_DATA = [];
    this.requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);

    this.requestedTickets.forEach((ticket) => {
      const tableContent = {
        description: ticket.description,
        requester: ticket.requesterId.email,
        assignee: ticket.assigneeId.email,
        status: ticket.Status.name,
        label: ticket.Label.name,
        deadline: ticket.deadline,
        id: ticket.id
      };

      this.ELEMENT_DATA.push(tableContent);
    });

    this.dataSource.data = this.ELEMENT_DATA;

    this.tickets = this.requestedTickets;
  }

  nav(id: number): void {
    this.router.navigate(['/tickets', id]);
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
