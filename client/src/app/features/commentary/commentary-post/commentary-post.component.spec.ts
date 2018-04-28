import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryPostComponent } from './commentary-post.component';

describe('CommentaryPostComponent', () => {
  let component: CommentaryPostComponent;
  let fixture: ComponentFixture<CommentaryPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaryPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
