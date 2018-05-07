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
import { TicketsModule } from './features/tickets/ticket.module';
import { SharedModule } from './shared/index';
import { UsersModule } from './features/users/users.module';
import { HomeModule } from './features/home/home.module';
import { NavFieldModule } from './features/nav-field/nav-field.module';
import { TeamsModule } from './features/teams/teams.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    // TeamsModule,
    NavFieldModule,
    HomeModule,
    // UsersModule,
    // SharedModule,
    ToastrModule.forRoot(),
    AuthModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    // TicketsModule,
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
