import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEventsComponent } from './find-events.component';

describe('FindEventsComponent', () => {
  let component: FindEventsComponent;
  let fixture: ComponentFixture<FindEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
