import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

import { CustomEventFormComponent } from './custom-event-form.component';

describe('CustomEventFormComponent', () => {
  let component: CustomEventFormComponent;
  let fixture: ComponentFixture<CustomEventFormComponent>;

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
});
