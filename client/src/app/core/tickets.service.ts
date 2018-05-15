import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from '../models/core/http-options';
import { Observable } from 'rxjs/Observable';
import { TicketsDBModel } from '../models/tickets/ticketsDBModel';
import { Ticket } from '../models/tickets/ticket';
import { TicketDBModel } from '../models/tickets/ticketDBModel';
import { CommentariesDBModel } from '../models/tickets/commentariesDBModel';

@Injectable()
export class TicketsService {

  tickets: TicketsDBModel[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<TicketsDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets`).map(x => <TicketsDBModel>(x));
  }

  getById(id: number): Observable<TicketDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets/${id}`).map(x => <TicketDBModel>(x));
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

  getComments(ticketId: number, options?: HttpOptions): Observable<CommentariesDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/commentaries/ticket/${ticketId}`, options).map(x=><CommentariesDBModel>(x));
  }

  subscribeForTicket(ticketuser: any, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/participate`, ticketuser, options);
  }

  desubscribeForTicket(ticketuser: any, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/departicipate`, ticketuser, options);
  }

}
