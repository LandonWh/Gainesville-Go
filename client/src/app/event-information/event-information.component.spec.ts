import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventInformationComponent } from './event-information.component';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Event } from '../services/event.service'; 


describe('EventInformationComponent', () => {
  let component: EventInformationComponent;
  let fixture: ComponentFixture<EventInformationComponent>;
  let mockDialogRef: MatDialogRef<EventInformationComponent>;
  let mockChangeDetectorRef: ChangeDetectorRef;
  let datePipe: DatePipe;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    datePipe = new DatePipe('en-US');

    await TestBed.configureTestingModule({
      declarations: [EventInformationComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
        { provide: DatePipe, useValue: datePipe },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventInformationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set event property', () => {
    const testEvent: Event = {
      ID: 1,
      title: 'Test Event',
      description: 'This is a test event',
      starttime: "2021-05-05T00:00:00.000Z",
      endtime: "2021-05-05T00:00:00.000Z",
      activity: 1,
      address: '123 Test St',
      capacity: 10,
      Users: [],
      boysonly: false,
      girlsonly: false,
      twentyone: false,
      lat: 0,
      long: 0,
      date: "2021-05-05T00:00:00.000Z",

    };

    component.event = testEvent;

    expect(component.event).toEqual(testEvent);
  });
});