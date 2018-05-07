import { Component, OnInit } from '@angular/core';
import { User } from '../models/users/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
    });
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessageEmail() {
    return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
      this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePass() {
    return this.loginForm.get('password').hasError('required') ? 'You must enter a value' :
      this.loginForm.get('password').hasError('pattern') ? 'Password must have at least 6 characters and (1-9, a-z, A-Z)' : '';
  }

  login(): void {
    this.auth.login(this.loginForm.value, { observe: 'response', responseType: 'json' })
      .subscribe((x: HttpResponse<{ token: string }>) => {
        localStorage.setItem('access_token', x.body.token);
        this.toastr.success(`${this.loginForm.get('email').value} registered!`);
        this.auth.getUser();
        this.auth.isAuthenticated();

        this.auth.loginEventFunction(true);
        this.auth.userLoggedEventFunction(this.loginForm.value);

        this.router.navigate(['/tickets']);
      },
        (err: HttpErrorResponse) => {
          if (err.status === 302) {
            this.toastr.error(err.error.err);
          }
        });
  }

}
