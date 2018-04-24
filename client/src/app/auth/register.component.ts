import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/users/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  regForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    });
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  register(): void {
    this.auth.register(this.regForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: HttpResponse<string>) => {
      console.log(x);
      this.toastr.success(`${this.regForm.get('email').value} registered!`);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 302) {
          this.toastr.error(err.error.err);
        }
      });
  }
}
