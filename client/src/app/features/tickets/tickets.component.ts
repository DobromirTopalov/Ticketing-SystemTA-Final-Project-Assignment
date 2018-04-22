import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../models/tickets/ticket';
import { TicketsService } from '../../core/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @Input()
  tickets: any;
  constructor(private ticketsService: TicketsService) { }

  ngOnInit() {
    this.ticketsService.getAll().subscribe(data => {
      const values = Object.keys(data).map((iterator) => data[iterator])[0];
      this.tickets = values;
    });
  }

}
