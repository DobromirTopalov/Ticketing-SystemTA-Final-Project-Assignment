import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { PhoneListComponent } from './phones/phone-list.component';
import { PhoneViewComponent } from './phones/phone-view.component';
import { PhoneDetailsComponent } from './phones/details/phone-details.component';
import { BoldDirective } from './shared/bold.directive';
import { EllipsisPipe } from './shared/ellipsis.pipe';
import { MyNgIfDirective } from './shared/my-ng-if.directive';
import { SharedModule } from './shared';
import { PhonesModule } from './phones/phone.module';
import { HomeComponent } from './home/home.component';
import { AppConfig } from './config/app.config';

import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    PhonesModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: []
      }
    })],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
