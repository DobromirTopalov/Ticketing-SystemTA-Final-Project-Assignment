import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../../models/tickets/ticket';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input()
  ticket: Ticket;
  constructor() { }

  ngOnInit() {
  }

}
