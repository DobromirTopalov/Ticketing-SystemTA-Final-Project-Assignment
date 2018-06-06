import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../core/tickets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../../../models/tickets/ticket';

@Component({
  selector: 'app-team-tickets',
  templateUrl: './team-tickets.component.html',
  styleUrls: ['./team-tickets.component.css']
})
export class TeamTicketsComponent implements OnInit {
  teamTickets: Ticket[] | string;

  constructor(
    private ticketsService: TicketsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      const teamId = +urlParams.id;

      this.ticketsService.getAll().subscribe(data => {
        this.teamTickets = data.info.filter((ticket) =>
        ((ticket.TeamId === teamId) && (ticket.StatusId !== 1))
      );

      if(!this.teamTickets.length) {
        this.teamTickets = 'no';
      }

    });
    });
  }

  nav(id: number): void {
    this.router.navigate(['/tickets', id])
  }
}
