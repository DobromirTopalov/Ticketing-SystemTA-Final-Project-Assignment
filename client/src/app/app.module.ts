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
import { SharedModule } from './shared/index';
import { HomeModule } from './features/home/home.module';
import { NavFieldModule } from './features/nav-field/nav-field.module';
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
    NavFieldModule,
    HomeModule,
    ToastrModule.forRoot(),
    AuthModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
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
