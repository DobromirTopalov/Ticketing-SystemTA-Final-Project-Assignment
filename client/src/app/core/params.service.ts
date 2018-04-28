import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

import { LabelsModel } from '../models/tickets/labelsModel';
import { StatusModel } from '../models/tickets/statusModel';


@Injectable()
export class ParamsService {

  labels: LabelsModel[];
  statuses: StatusModel[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAllLabels(): Observable<LabelsModel> {
    this.httpClient.get(`${this.appConfig.apiUrl}/labels`)
    .subscribe(
      data => console.log(data, 'Labels subscribe for Interceptor'),
      err => console.log(err)
    );
    return this.httpClient.get(`${this.appConfig.apiUrl}/labels`).map(x => <LabelsModel>(x));
  }

  getAllStatuses(): Observable<StatusModel> {
    this.httpClient.get(`${this.appConfig.apiUrl}/statuses`)
    .subscribe(
      data => console.log(data, 'Statuses subscribe for Interceptor'),
      err => console.log(err)
    );
    return this.httpClient.get(`${this.appConfig.apiUrl}/statuses`).map(x => <StatusModel>(x));
  }


}
