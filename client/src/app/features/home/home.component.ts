import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { TicketsService } from '../../core/tickets.service';
import { ParamsService } from '../../core/params.service';
import { Company } from '../../models/company/company';
import { Ticket } from '../../models/tickets/ticket';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private companies: Company[];
  private users: User[];
  private tickets: Ticket[];

  constructor(
    private paramService: ParamsService,
    private ticketsService: TicketsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService) { }

  ngOnInit() {
    this.ticketsService.getAll().subscribe(
      data => {
        this.tickets = data['info'];
        // console.log(this.tickets);
      });

    this.paramService.getAllCompanies().subscribe(
      data => {
        this.companies = data['info'];
        // console.log(this.companies);
      });

    this.usersService.getAll().subscribe(
      data => {
      this.users = data['info'];
        // console.log(this.users);
      });
  }

}
