import { RegisterComponent } from './auth/register.component';
import { PhoneDetailsComponent } from './phones/details/phone-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhoneListComponent } from './phones/phone-list.component';
import { LoginComponent } from './auth/login.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'phones', children: [
      { path: '', component: PhoneListComponent, pathMatch: 'full' },
      { path: ':id', component: PhoneDetailsComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];
