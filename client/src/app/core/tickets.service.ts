import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { TicketsModel } from '../models/tickets/ticketsModel';
import { HttpOptions } from '../models/core/http-options';
import { Ticket } from '../models/tickets/ticket';
import { UsersInATeam } from '../models/users/usersInATeam';

@Injectable()
export class TicketsService {

  tickets: TicketsModel[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<TicketsModel[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets`).map(x => <TicketsModel[]>(x));
  }

  getById(id: number): Observable<TicketsModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets/${id}`).map(x => <TicketsModel>x);
  }

  updateInfo(ticket: Ticket, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/${ticket.id}`, ticket, options);
  }

  createInfo(ticket: Ticket, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/create`, ticket, options);
  }
  createComment(ticket: Ticket, commentary: any, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/commentaries/ticket/${ticket.id}`, commentary, options);
  }

  getComments(ticketId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/commentaries/ticket/${ticketId}`, options);
  }

  getAllTicketUsers(id: number): Observable<UsersInATeam> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets/users/${id}`).map(x => <UsersInATeam>(x));
  }

  subscribeForTicket(ticketuser: any, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/participate`, ticketuser, options);
  }

  desubscribeForTicket(ticketuser: any, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/departicipate`, ticketuser, options);
  }

}
