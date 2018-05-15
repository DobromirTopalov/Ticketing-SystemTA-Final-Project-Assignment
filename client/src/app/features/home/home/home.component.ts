import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../../../core/users.service';
import { TicketsService } from '../../../core/tickets.service';
import { ParamsService } from '../../../core/params.service';
import { User } from '../../../models/users/user';
import { Ticket } from '../../../models/tickets/ticket';
import { Company } from '../../../models/company/company';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private users: User[];
  private tickets: Ticket[];
  private companies: Company[];

  constructor(
    private usersService: UsersService,
    private ticketsService: TicketsService,
    private paramService: ParamsService) { }

  ngOnInit() {
    this.ticketsService.getAll().subscribe(
      data => {
        this.tickets = data.info;
      });

    this.paramService.getAllCompanies().subscribe(
      data => {
        this.companies = data.info;
      });

    this.usersService.getAll().subscribe(
      data => {
        this.users = data.info;
      });
  }
}
