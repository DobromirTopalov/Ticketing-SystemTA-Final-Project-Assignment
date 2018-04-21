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
      this.tickets = [{name: 'gosho'},{name: 'gosho2'},{name: 'gosho3'}];
      const values = Object.keys(data).map(it => data[it])[0];
      this.tickets = values;
    });
  }

}
