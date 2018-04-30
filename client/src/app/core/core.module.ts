import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { TicketsService } from './tickets.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from '../auth/token.interceptor';
import { AuthGuard } from './auth-guard';
import { TeamsService } from './teams.service';
import { UsersService } from './users.service';
import { ParamsService } from './params.service';
// import { TeamGuard } from './team-guard';

@NgModule({
  providers: [
    // Shorthand
    // PhonesService
    { provide: AuthService, useClass: AuthService },
    { provide: MessageService, useClass: MessageService },
    { provide: TicketsService, useClass: TicketsService },
    { provide: AuthGuard, useClass: AuthGuard },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // },
    { provide: TeamsService, useClass:TeamsService },
    UsersService,
    ParamsService,
    // TeamGuard,
  ]
})
export class CoreModule { }
