import { Component, OnInit, Input } from '@angular/core';
import { TicketsService } from '../../../core/tickets.service';
import { AuthService } from '../../../core/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../../../models/tickets/ticket';
import { UsersService } from '../../../core/users.service';
import { User } from '../../../models/users/user';
import { tick } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-team-tickets',
  templateUrl: './team-tickets.component.html',
  styleUrls: ['./team-tickets.component.css']
})
export class TeamTicketsComponent implements OnInit {
  @Input()
  tickets: Ticket[];
  teamTickets: Ticket[];
  loggedUser: User[];
  loggedUserTeamId: number;
  userId: number;
  teamId: number;
  columnNum: number;
  rowHeightRatio: string;
  criteria: string = 'assigneeId';
  sortOrder: string = 'asc';

  displayedColumns = ['description', 'requester', 'assignee', 'status', 'label', 'deadline'];
  ELEMENT_DATA: Element[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private ticketsService: TicketsService,
    private usersService: UsersService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private jwtService: JwtHelperService,
    media: ObservableMedia,
    private router: Router) {
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
    this.userId = decodedToken.id;
    this.activatedRoute.params
      .subscribe(x => {
        this.teamId = +x['id'];
        console.log(this.teamId);
        this.ticketsService.getAll().subscribe(data => {
          const tickets = Object.keys(data).map((iterator) => data[iterator])[0];
          tickets.forEach((ticket) => console.log(ticket.TeamId, ticket.StatusId));
          this.tickets = tickets;
          this.teamTickets = this.tickets.filter((ticket) =>
            ((ticket.TeamId === this.teamId) &&
            (ticket.StatusId !== 1))
          );
          console.log(this.tickets);
          console.log(this.teamTickets);

          this.teamTickets.forEach((ticket) => {
            const tableContent = {description: ticket.description, requester: ticket['requesterId'].email, assignee: ticket['assigneeId'].email, status: ticket['Status'].name, label: ticket['Label'].name, deadline: ticket.deadline, id: ticket.id};
            this.ELEMENT_DATA.push(tableContent);
          });
          this.dataSource.data = this.ELEMENT_DATA;
        });

        // this.usersService.getById(this.userId).subscribe(data => {
        //   const user = data.info;
        //   console.log(user);
        //   this.loggedUserTeamId = user['TeamId'];
        //   console.log(this.loggedUserTeamId);
        // })

        // this.ticketsService.getAll().subscribe(data => {
        //   const tickets = Object.keys(data).map((iterator) => data[iterator])[0];
        //   this.tickets = tickets;
        //   console.log(this.tickets);

        // const assignedTickets = this.tickets.filter((ticket) => ticket.AssigneeId === this.userId);
        // this.assignedTickets = assignedTickets;
        // console.log(assignedTickets,'asdasd');

        // const requestedTickets = this.tickets.filter((ticket) => ticket.RequesterId === this.userId);
        // this.requestedTickets = requestedTickets;
      });
  }

  nav(id: number): void {
    this.router.navigate(['/tickets', id])
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
      const tableContent = {description: ticket.description, requester: ticket['requesterId'].email, assignee: ticket['assigneeId'].email, status: ticket['Status'].name, label: ticket['Label'].name, deadline: ticket.deadline, id: ticket.id};
      this.ELEMENT_DATA.push(tableContent);
    });
    this.dataSource.data = this.ELEMENT_DATA;
    this.teamTickets = collection;
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
