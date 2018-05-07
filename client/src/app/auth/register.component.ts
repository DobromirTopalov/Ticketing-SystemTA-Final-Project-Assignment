import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/users/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { AuthService } from '../core/auth.service';
import { matchOtherValidator } from '../shared/match-other-validator';
import { Router } from '@angular/router';
import { ParamsService } from '../core/params.service';
import { Label } from '../models/tickets/label';
import { Status } from '../models/tickets/status';
import { Company } from '../models/company/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  error: string;
  regForm: FormGroup;

  roles: Label[];
  companies: Company[];
  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private paramService: ParamsService) { }

  ngOnInit() {
    this.paramService.getAllRoles().subscribe((data) => {
      this.roles = data.result;
      // console.log(this.roles);
    });

    this.paramService.getAllCompanies().subscribe((data) => {
      this.companies = data['info'];
      // console.log(this.companies);
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
  // email = new FormControl('', [Validators.required, Validators.email]);
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
      this.regForm.get('password').hasError('pattern') ? 'Password must have at least 6 characters and (1-9, a-z, A-Z)' : '';
  }

  getErrorMessagePass2() {
    return this.regForm.get('confirmPassword').hasError('required') ? 'You must enter a value' :
      this.regForm.get('confirmPassword').get('matchOtherValidator') ? '' : 'Passwords must match';
  }

  getErrorMessageCompany() {
    return this.regForm.get('company').hasError('required') ? 'o' : '';
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
    this.auth.register(this.regForm.value, { observe: 'response', responseType: 'json' })
      .subscribe((x: HttpResponse<string>) => {
        this.error = 'Registered successfully!';
        this.toastr.success(`${this.regForm.get('email').value} registered!`);
        this.login(obj);

      },
        (err: HttpErrorResponse) => {
          this.error = err.error.err;
          if (err.status === 302) {
            this.toastr.error(err.error.err);
          }
        });
  }

  login(obj): void {
    console.log('In login');
    this.auth.login(obj, { observe: 'response', responseType: 'json' })
      .subscribe((x: HttpResponse<{ token: string }>) => {
        localStorage.setItem('access_token', x.body.token);
        this.toastr.success(`${obj.email} registered!`);
        this.auth.getUser();
        this.auth.isAuthenticated();

        this.auth.loginEventFunction(true);
        this.auth.userLoggedEventFunction(obj);

        this.router.navigate(['/tickets']);
      },
        (err: HttpErrorResponse) => {
          if (err.status === 302) {
            this.toastr.error(err.error.err);
          }
        });
  }


}
