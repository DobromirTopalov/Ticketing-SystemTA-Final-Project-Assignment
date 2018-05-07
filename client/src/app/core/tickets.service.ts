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
    // this.httpClient.get(`${this.appConfig.apiUrl}/tickets`)
    // .subscribe(
    //   data => console.log(data, 'Tickets subscribe for Interceptor'),
    //   err => console.log(err)
    // );
                    // Marto helped
                    // console.log('inside getallticks');
                    // console.log(`${this.appConfig.apiUrl}/tickets`);
                    // this.httpClient.get(`${this.appConfig.apiUrl}/tickets`)
                    // .subscribe(
                    //   data => console.log(data, 'Tickets subscribe for Interceptor'),
                    //   err => console.log(err)
                    // );
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets`).map(x => <TicketsModel[]>(x));
  }

  getById(id: number): Observable<TicketsModel> {

    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets/${id}`).map(x => <TicketsModel>x);
  }
  updateInfo(ticket: Ticket, options?: HttpOptions): Observable<Object> {
    // this.httpClient.post(`${this.appConfig.apiUrl}/tickets/${ticket.id}`, ticket, options).subscribe(
    //   data => console.log(data, 'Ticket updated successfully'),
    //   error => console.log(error),
    // ); undochange slater
    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/${ticket.id}`, ticket, options);
  }

  createInfo(ticket: Ticket, options?: HttpOptions): Observable<Object> {
    // this.httpClient.post(`${this.appConfig.apiUrl}/tickets/create`, ticket, options).subscribe(
    //   data => console.log(data, 'Ticket created successfully'),
    //   error => console.log(error),
    // );

    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/create`, ticket, options);
  }
  createComment(ticket: Ticket, commentary: any, options?: HttpOptions): Observable<Object> {
    // this.httpClient.post(`${this.appConfig.apiUrl}/commentaries/ticket/${ticket.id}`, commentary, options).subscribe(
    //   data => console.log(data, 'Ticket new comments added successfully'),
    //   error => console.log(error),
    // );
    return this.httpClient.post(`${this.appConfig.apiUrl}/commentaries/ticket/${ticket.id}`, commentary, options);
  }

  getComments(ticketId: number, options?: HttpOptions): Observable<Object> {
    // this.httpClient.get(`${this.appConfig.apiUrl}/commentaries/ticket/${ticketId}`, options).subscribe(
    //   data => console.log(data, 'Comments found successfully'),
    //   error => console.log(error),
    // );
    // console.log('inside:', ticketId);
    return this.httpClient.get(`${this.appConfig.apiUrl}/commentaries/ticket/${ticketId}`, options);
  }

  getAllTicketUsers(id: number): Observable<UsersInATeam> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/tickets/users/${id}`).map(x => <UsersInATeam>(x));
  }

  subscribeForTicket(ticketuser: any, options?: HttpOptions): Observable<Object> {
    // this.httpClient.post(`${this.appConfig.apiUrl}/tickets/participate`, ticketuser, options).subscribe(
    //   data => console.log(data, 'TicketUser created successfully'),
    //   error => console.log(error),
    // );

    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/participate`, ticketuser, options);
  }

  desubscribeForTicket(ticketuser: any, options?: HttpOptions): Observable<Object> {
    // this.httpClient.post(`${this.appConfig.apiUrl}/tickets/departicipate`, ticketuser, options).subscribe(
    //   data => console.log(data, 'TicketUser deleted successfully'),
    //   error => console.log(error),
    // );

    return this.httpClient.post(`${this.appConfig.apiUrl}/tickets/departicipate`, ticketuser, options);
  }

}
