import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { TicketsService } from './tickets.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';

@NgModule({
  providers: [
    // Shorthand
    // PhonesService
    { provide: AuthService, useClass: AuthService },
    { provide: MessageService, useClass: MessageService },
    { provide: TicketsService, useClass: TicketsService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
