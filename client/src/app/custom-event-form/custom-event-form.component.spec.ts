import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { validForm, validFormCustom } from 'src/mocks';
import { CustomEventFormComponent } from './custom-event-form.component';

describe('CustomEventFormComponent', () => {
  let component: CustomEventFormComponent;
  let fixture: ComponentFixture<CustomEventFormComponent>;


  function updateForm( event: string, 
    boys: boolean, girls: boolean, twentyOne: boolean,
    numPeople: number,
    date: string,
    description: string,
    startTime: string,
    endTime: string,
    activityLevelV: string ) {

    component.eventForm.controls['event'].setValue(event);
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
      declarations: [ CustomEventFormComponent ],
      imports: [AppModule, MatDialogModule],
      providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update the event form to inputs', () => {
    updateForm(validFormCustom.event, validFormCustom.boys, validFormCustom.girls, validFormCustom.twentyOne,
      validFormCustom.numPeople, validFormCustom.date, validFormCustom.description, validFormCustom.startTime, validFormCustom.endTime,
      validFormCustom.activityLevelV);
    expect(component.eventForm.value).toEqual(validFormCustom);
  })

});
