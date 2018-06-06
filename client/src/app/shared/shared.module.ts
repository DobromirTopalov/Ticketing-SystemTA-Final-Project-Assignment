import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatGridListModule, MatDividerModule, MatListModule, MatRadioModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatExpansionModule, MatTabsModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MyNgIfDirective } from './my-ng-if.directive';
import { StatusColorDirective } from './status-color.directive';
import { UsersTickets } from './team-ticket-user.directive';
import { DatePipe } from './date.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
  ],
  declarations: [
    MyNgIfDirective,
    EllipsisPipe,
    DatePipe,
    StatusColorDirective,
    UsersTickets,
  ],
  exports: [
    EllipsisPipe,
    DatePipe,
    UsersTickets,
    MyNgIfDirective,
    StatusColorDirective,
    FormsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { }
