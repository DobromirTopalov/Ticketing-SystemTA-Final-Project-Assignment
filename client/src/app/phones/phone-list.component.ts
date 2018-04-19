import { PhonesService } from './../core/phones.service';
import { Component, OnInit, Input, HostListener, Renderer2 } from '@angular/core';
import { Phone } from '../models/phone';
import { ISubscription } from 'rxjs/Subscription';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css'],
})
export class PhoneListComponent implements OnInit {

  @Input()
  phones: Phone[];
  filteredPhones: Phone[];
  search = '';
  order = '';
  byType = 'brand';

  constructor(private renderer: Renderer2, private phonesService: PhonesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.phonesService.getAll().subscribe(data => {
      this.phones = data;
      this.filteredPhones = this.phones.sort((x, y) => x.brand.localeCompare(y.brand));
    });
  }

  onChange(): void {
    this.filterBySearch();

    this.filteredPhones = this.filteredPhones.sort((x, y) => {
      const orderNumber = this.order === 'asc' ? 1 : -1;
      let a = x[this.byType];
      let b = y[this.byType];

      if (typeof x[this.byType] === 'string') {
        a = x[this.byType].toLocaleLowerCase();
        b = y[this.byType].toLocaleLowerCase();
      }

      if (a > b) {
        return 1 * orderNumber;
      } else if (a < b) {
        return -1 * orderNumber;
      } else {
        return 0;
      }
    });
  }

  onSearch(): void {
    this.filterBySearch();
  }

  clearFilter(): void {
    this.filteredPhones = this.phones.slice();
    this.byType = 'brand';
    this.order = '';
    this.search = '';
  }

  private filterBySearch(): void {
    this.search = this.search.toLowerCase().trim();

    this.filteredPhones = this.phones.filter(x =>
      x.brand.toLowerCase().indexOf(this.search) >= 0 ||
      x.description.toLowerCase().indexOf(this.search) >= 0 ||
      x.model.toLowerCase().indexOf(this.search) >= 0);
  }
}
