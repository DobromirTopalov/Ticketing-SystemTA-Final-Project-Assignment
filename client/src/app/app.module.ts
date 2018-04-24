import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppConfig } from './config/app.config';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { TicketsModule } from './features/tickets/ticket.module';
import { NavFieldComponent } from './features/nav-field/nav-field.component';
import { MessagesComponent } from './features/messages/messages.component';
import { SharedModule } from './shared/index';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavFieldComponent,
    MessagesComponent
  ],
  imports: [
    SharedModule,
    ToastrModule.forRoot(),
    AuthModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    TicketsModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3200'],
        blacklistedRoutes: []
      }
    })],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
