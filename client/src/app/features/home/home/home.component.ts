import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
    private router: Router,
    private usersService: UsersService,
    private ticketsService: TicketsService,
    private paramService: ParamsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'companies',
        sanitizer.bypassSecurityTrustResourceUrl('../../../assets/man-with-company.svg'));

      iconRegistry.addSvgIcon(
        'users',
        sanitizer.bypassSecurityTrustResourceUrl('../../../assets/users-group.svg'));

      iconRegistry.addSvgIcon(
        'tickets',
        sanitizer.bypassSecurityTrustResourceUrl('../../../assets/tickets.svg'));
    }

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

  nav(): void {
    this.router.navigate(['/register'])
  }
}
