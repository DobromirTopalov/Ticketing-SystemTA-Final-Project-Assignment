import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LabelsDBModel } from '../models/tickets/labelsDBModel';
import { StatusesDBModel } from '../models/tickets/statusesDBModel';
import { RolesDBModel } from '../models/tickets/rolesDBModel';
import { Company } from '../models/company/company';
import { CompaniesDBModel } from '../models/company/companiesDBModel';


@Injectable()
export class ParamsService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }
  getAllLabels(): Observable<LabelsDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/labels`).map(response => <LabelsDBModel>(response));
  }

  getAllStatuses(): Observable<StatusesDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/statuses`).map(response => <StatusesDBModel>(response));
  }

  getAllRoles(): Observable<RolesDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/roles`).map(response => <RolesDBModel>(response));
  }

  getAllCompanies(): Observable<CompaniesDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/companies`).map(response => <CompaniesDBModel>(response));
  }

}
