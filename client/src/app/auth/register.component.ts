import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/users/user';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      email: '',
      password: ''
    });
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
