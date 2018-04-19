import { AuthService } from './auth.service';
import { PhonesService } from './phones.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  providers: [
    // Shorthand
    // PhonesService
    { provide: PhonesService, useClass: PhonesService },
    { provide: AuthService, useClass: AuthService },
  ]
})
export class CoreModule { }
