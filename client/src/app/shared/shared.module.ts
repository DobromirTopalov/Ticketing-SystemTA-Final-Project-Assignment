import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoldDirective } from './bold.directive';
import { EllipsisPipe } from './ellipsis.pipe';
import { MyNgIfDirective } from './my-ng-if.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BoldDirective,
    EllipsisPipe,
    MyNgIfDirective,
  ],
  exports: [
    BoldDirective,
    EllipsisPipe,
    MyNgIfDirective,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
