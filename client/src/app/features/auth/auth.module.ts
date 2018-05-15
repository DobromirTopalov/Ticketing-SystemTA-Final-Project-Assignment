import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    SharedModule,
    CommonModule,
  ],
})
export class AuthModule { }
