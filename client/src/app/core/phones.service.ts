// TODO changes

import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { Phone } from '../models/phone';
import { DisplayType } from '../models/display-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class PhonesService {

  phones: Phone[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<Phone[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams`).map(x => <Phone[]>(x));
  }

  getByBrand(brand: string): Observable<Phone> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/phones/${brand}`).map(x => <Phone>x);
  }
}
