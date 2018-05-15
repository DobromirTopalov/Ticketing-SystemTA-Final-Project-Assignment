import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    const pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
    });
  }

  getErrorMessageEmail() {
    return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
      this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePass() {
    return this.loginForm.get('password').hasError('required') ? 'You must enter a value' :
      this.loginForm.get('password').hasError('pattern') ? `Password must have at least 6 characters
                                                            and contain at least one of each (1-9, a-z, A-Z)` : '';
  }

  login(): void {
    this.authService.login(this.loginForm.value, { observe: 'response', responseType: 'json' })
      .subscribe((response: HttpResponse<{ token: string }>) => {
        localStorage.setItem('access_token', response.body.token);

        this.authService.getUser();
        this.authService.isAuthenticated();

        // this.authService.loginEventFunction(true);
        // this.authService.userLoggedEventFunction(this.loginForm.value);

        this.router.navigate(['/tickets']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 302) {
          console.log(error);
        }
      });
  }
}
