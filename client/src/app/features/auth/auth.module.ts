import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SnackBarModule } from '../snackbar/snackbar.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    SharedModule,
    CommonModule,
    SnackBarModule,
  ],
})
export class AuthModule { }
