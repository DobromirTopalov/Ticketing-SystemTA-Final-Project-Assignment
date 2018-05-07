import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

import { LabelsModel } from '../models/tickets/labelsModel';
import { StatusModel } from '../models/tickets/statusModel';
import { Company } from '../models/company/company';


@Injectable()
export class ParamsService {

  labels: LabelsModel[];
  statuses: StatusModel[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAllLabels(): Observable<LabelsModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/labels`).map(x => <LabelsModel>(x));
  }

  getAllStatuses(): Observable<StatusModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/statuses`).map(x => <StatusModel>(x));
  }

  getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/companies`).map(x => <Company[]>(x));
  }

  getAllRoles(): Observable<StatusModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/roles`).map(x => <StatusModel>(x));
  }
}
