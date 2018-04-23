import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { TicketsService } from './tickets.service';
import { TeamsService } from './teams.service';
import { UsersService } from './users.service';

@NgModule({
  providers: [
    // Shorthand
    // PhonesService
    { provide: AuthService, useClass: AuthService },
    { provide: MessageService, useClass: MessageService },
    { provide: TicketsService, useClass: TicketsService },
    { provide: TeamsService, useClass:TeamsService },
    UsersService,
  ]
})
export class CoreModule { }
