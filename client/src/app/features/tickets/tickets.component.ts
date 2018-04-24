import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../models/tickets/ticket';
import { TicketsService } from '../../core/tickets.service';
import { AuthService } from '../../core/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @Input()
  tickets: Ticket[];
  constructor(private ticketsService: TicketsService, private auth: AuthService, private jwtService: JwtHelperService) { }

  ngOnInit() {
    this.ticketsService.getAll().subscribe(data => {
      const values = Object.keys(data).map((iterator) => data[iterator])[0];
      this.tickets = values;
      console.log(this.jwtService.decodeToken(localStorage.getItem('access_token')));
    });
  }

}
