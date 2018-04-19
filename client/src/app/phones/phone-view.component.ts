import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-phone-view',
  templateUrl: './phone-view.component.html',
  styleUrls: ['./phone-view.component.css']
})
export class PhoneViewComponent {

  @Input()
  phone: Phone;

  @Output()
  showPhone = new EventEmitter();


  onShowPhone(): void {
    this.showPhone.emit(this.phone);
  }
}
