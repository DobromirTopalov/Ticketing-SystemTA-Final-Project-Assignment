import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTicketsComponent } from './team-tickets.component';

describe('TeamTicketsComponent', () => {
  let component: TeamTicketsComponent;
  let fixture: ComponentFixture<TeamTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
