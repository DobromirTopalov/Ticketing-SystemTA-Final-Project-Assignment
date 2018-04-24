import { Component, OnInit } from '@angular/core';
import { User } from '../models/users/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  login(): void {
    this.auth.login(this.loginForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: HttpResponse<{token: string}>) => {
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
