import { Directive, Input, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TicketsService } from '../core/tickets.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[usersTickets]'
})

export class UsersTickets implements OnInit {
  userId: number;

  constructor(
    private elref: ElementRef,
    private renderer: Renderer2,
    private ticketsService: TicketsService,
    private activatedRoute: ActivatedRoute,
    private jwtService: JwtHelperService,
    private router: Router) {
  }

  ngOnInit(): void {
    const el = this.elref.nativeElement;
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.userId = decodedToken.id;

    this.activatedRoute.params
      .subscribe(x => {
        const teamId = +x['id'];

        this.ticketsService.getAll().subscribe(data => {
          const tickets = data['info'];
          const teamTickets = tickets.filter((ticket) =>
            ((ticket.TeamId === teamId) &&
              (ticket.StatusId !== 1))
          );

          teamTickets.forEach((ticket) => {
            ticket['Users'].forEach((ele, index) => {
              if (+ele.id !== +this.userId) {
                this.renderer.setStyle(el, 'color', '#c9c05d');
              }
            });
          });
        });
      });
  }
}
