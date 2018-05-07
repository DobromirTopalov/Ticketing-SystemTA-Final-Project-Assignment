import { NgModule } from '@angular/core';
import { BoldDirective } from './bold.directive';
import { EllipsisPipe } from './ellipsis.pipe';
import { MyNgIfDirective } from './my-ng-if.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatGridListModule, MatDividerModule, MatListModule, MatRadioModule, MatTableModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DatepickerModule } from 'angular2-material-datepicker';

// TODO check this out later
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color.directive';
import { UsersTickets } from './team-ticket-user.directive';
import { DatePipe } from './date.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    BoldDirective,
    EllipsisPipe,
    MyNgIfDirective,
    DatePipe,
    StatusColorDirective,
    UsersTickets,
  ],
  exports: [
    BoldDirective,
    EllipsisPipe,
    DatePipe,
    UsersTickets,
    MyNgIfDirective,
    StatusColorDirective,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    BrowserAnimationsModule,
  ]
})
export class SharedModule { }
