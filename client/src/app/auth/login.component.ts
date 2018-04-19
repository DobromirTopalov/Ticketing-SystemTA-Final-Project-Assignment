import { Component, OnInit } from '@angular/core';
import { User } from '../models/users/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  login(): void {
    this.auth.login(this.loginForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: HttpResponse<{token: string}>) => {
      console.log(x.body);
      localStorage.setItem('access_token', x.body.token);
      this.toastr.success(`${this.loginForm.get('email').value} registered!`);
    },
      (err: HttpErrorResponse) => {
        if (err.status === 302) {
          this.toastr.error(err.error.err);
        }
      });
  }

}
