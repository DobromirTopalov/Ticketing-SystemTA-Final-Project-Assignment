import { AuthService } from './core/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Phone } from './models/phone';
import { DisplayType } from './models/display-type.enum';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private http: HttpClient, private authService: AuthService) { }


  testAuth(): void {
    this.http.get<any>('http://localhost:3200/test').subscribe(x => {
      console.log('insideAuthAngular');
      console.log(x);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    return this.authService.logout();
  }
}
