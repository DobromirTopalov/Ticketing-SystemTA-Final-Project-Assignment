import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchOtherValidator } from '../../../shared/match-other-validator';
import { AuthService } from '../../../core/auth.service';
import { ParamsService } from '../../../core/params.service';
import { Label } from '../../../models/tickets/label';
import { Status } from '../../../models/tickets/status';
import { Company } from '../../../models/company/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;
  regForm: FormGroup;
  roles: Label[];
  companies: Company[];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private paramService: ParamsService) { }

  ngOnInit() {
    this.paramService.getAllRoles().subscribe((data) => {
      this.roles = data.result;
    });

    this.paramService.getAllCompanies().subscribe((data) => {
      this.companies = data.info;
    });

    const pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);
    this.regForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      company: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchOtherValidator('password')
      ]),
      terms: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessageEmail() {
    return this.regForm.get('email').hasError('required') ? 'You must enter a value' :
      this.regForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageNames() {
    return this.regForm.get('firstName').hasError('required') ? 'You must enter a value' :
      this.regForm.get('firstName').hasError('minLength') ? '' :
        this.regForm.get('firstName').hasError('maxLength') ? 'Max 20 symbols allowed' : 'Min 3 symbols required';
  }

  getErrorMessageNames2() {
    return this.regForm.get('lastName').hasError('required') ? 'You must enter a value' :
      this.regForm.get('lastName').hasError('minLength') ? '' :
        this.regForm.get('lastName').hasError('maxLength') ? 'Max 20 symbols allowed' : 'Min 3 symbols required';
  }

  getErrorMessagePass() {
    return this.regForm.get('password').hasError('required') ? 'You must enter a value' :
      this.regForm.get('password').hasError('pattern') ? `Password must have at least 6 characters
                                                          and contain at least one of each (1-9, a-z, A-Z)` : '';
  }

  getErrorMessagePass2() {
    return this.regForm.get('confirmPassword').hasError('required') ? 'You must enter a value' :
      this.regForm.get('confirmPassword').get('matchOtherValidator') ? '' : 'Passwords must match';
  }

  getErrorMessageCompany() {
    return this.regForm.get('company').hasError('required') ? '' : '';
  }

  getErrorMessageTerms() {
    return this.regForm.get('terms').hasError('required') ? 'You must accept terms' : '';
  }

  register(): void {
    const email = this.regForm.get('email').value;
    const password = this.regForm.get('password').value;

    const obj = {
      email,
      password,
    };

    this.authService.register(this.regForm.value, { observe: 'response', responseType: 'json' })
      .subscribe((response: HttpResponse<string>) => {
        this.error = `${email} registered successfully!`;
        this.login(obj);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error;
        if (error.status === 302) {
          console.log(error);
        }
      });
  }

  login(obj): void {
    this.authService.login(obj, { observe: 'response', responseType: 'json' })
      .subscribe((response: HttpResponse<{ token: string }>) => {
        localStorage.setItem('access_token', response.body.token);

        this.authService.getUser();
        this.authService.isAuthenticated();

        // this.authService.loginEventFunction(true);
        // this.authService.userLoggedEventFunction(obj);

        this.router.navigate(['/tickets']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 302) {
          console.log(error);
        }
      });
  }
}
