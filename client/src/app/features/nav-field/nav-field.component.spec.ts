import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFieldComponent } from './nav-field.component';

describe('NavFieldComponent', () => {
  let component: NavFieldComponent;
  let fixture: ComponentFixture<NavFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
