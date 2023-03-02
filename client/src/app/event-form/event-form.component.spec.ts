import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { EventFormComponent } from './event-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppModule } from '../app.module';
import { validForm } from 'src/mocks';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  function updateForm( eventName: string, 
    boys: boolean, girls: boolean, twentyOne: boolean,
    numPeople: number,
    date: string,
    description: string,
    startTime: string,
    endTime: string,
    activityLevelV: string ) {

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

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFormComponent ],
      imports: [MatFormFieldModule, AppModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
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

  it('Should update the event form to inputs', () => {
    updateForm(validForm.eventName, validForm.boys, validForm.girls, validForm.twentyOne,
      validForm.numPeople, validForm.date, validForm.description, validForm.startTime, validForm.endTime,
      validForm.activityLevelV);
    expect(component.eventForm.value).toEqual(validForm);
  })
});
