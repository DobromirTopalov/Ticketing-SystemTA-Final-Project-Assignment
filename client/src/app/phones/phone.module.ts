import { RouterModule } from '@angular/router';
import { PhoneListComponent } from './phone-list.component';
import { NgModule } from '@angular/core';
import { PhoneViewComponent } from './phone-view.component';
import { PhoneDetailsComponent } from './details/phone-details.component';

import { SharedModule } from '../shared';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        PhoneListComponent,
        PhoneViewComponent,
        PhoneDetailsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        PhoneListComponent,
        PhoneViewComponent,
        PhoneDetailsComponent
    ]

})
export class PhonesModule { }
