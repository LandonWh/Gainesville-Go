import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { EventFormComponent } from './event-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { validForm } from 'src/mocks';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  function updateForm( 
    eventName: string, 
    boys: boolean, 
    girls: boolean, 
    twentyOne: boolean,
    numPeople: number,
    date: string,
    description: string,
    startTime: string,
    endTime: string,
    activityLevelV: string,
    lat: number,
    lng: number,
    address: string ) {

    component.eventForm.controls['eventName'].setValue(eventName);
    component.eventForm.controls['boys'].setValue(boys);
    component.eventForm.controls['girls'].setValue(girls);
    component.eventForm.controls['twentyOne'].setValue(twentyOne);
    component.eventForm.controls['numPeople'].setValue(numPeople);
    component.eventForm.controls['date'].setValue(date);
    component.eventForm.controls['description'].setValue(description);
    component.eventForm.controls['startTime'].setValue(startTime);
    component.eventForm.controls['endTime'].setValue(endTime);
    component.eventForm.controls['activityLevelV'].setValue(activityLevelV);
    component.eventForm.controls['lat'].setValue(lat);
    component.eventForm.controls['lng'].setValue(lng);
    component.eventForm.controls['address'].setValue(address);
  }

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  
  const mockDialogData = {
    message: "Test",
    latitude: 0,
    longitude: 0,
    address: "123 Main St",
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFormComponent ],
      imports: [MatFormFieldModule, AppModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // check to make sure the inputs match when submitting
  it('should initialize the form', () => {
    expect(component.eventForm).toBeDefined();
  });

  it('should be invalid when a required field is missing', () => {
    component.eventForm.patchValue({
      eventName: '',
      capacity: '',
      date: '',
      description: '',
      startTime: '',
      endTime: '',
      activityLevelV: '',
    });
    expect(component.eventForm.invalid).toBeTruthy();
  });

});
