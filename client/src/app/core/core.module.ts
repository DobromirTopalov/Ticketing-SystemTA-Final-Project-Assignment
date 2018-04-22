import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { TicketsService } from './tickets.service';

@NgModule({
  providers: [
    // Shorthand
    // PhonesService
    { provide: AuthService, useClass: AuthService },
    { provide: MessageService, useClass: MessageService },
    { provide: TicketsService, useClass: TicketsService },
  ]
})
export class CoreModule { }
