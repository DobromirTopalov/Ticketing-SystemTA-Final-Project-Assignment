import 'rxjs/add/operator/switchMap';
import { PhonesService } from './../../core/phones.service';
import { Component, OnInit, Input, HostListener, HostBinding, Output, EventEmitter, ElementRef } from '@angular/core';
import { Phone } from '../../models/phone';
import { DisplayType } from '../../models/display-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {

  constructor(private elRef: ElementRef,
    private phonesService: PhonesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  DisplayType = DisplayType;
  @Input()
  phone: Phone;
  phones: Phone[];

  brand: string;

  @Output()
  hidePhone = new EventEmitter();

  onHidePhone(): void {
    this.hidePhone.emit(this);
  }

  ngOnInit(): void {
    this.phonesService.getAll().subscribe(data => this.phones = data);

    this.activatedRoute.params
      .subscribe(x => {
        this.brand = x['brand'];
        this.phonesService
          .getByBrand(this.brand)
          .subscribe(data => this.phone = data);
      });



  }

  nav() {
    this.router.navigate(['phones']);
  }
}
