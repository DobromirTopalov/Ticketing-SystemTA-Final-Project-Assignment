import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { Ticket } from '../models/tickets/ticket';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class TicketsService {

  tickets: Ticket[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<Ticket[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets`).map(x => <Ticket[]>(x));
  }

  getById(id: number): Observable<Ticket> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets/${id}`).map(x => <Ticket>x);
  }
}
