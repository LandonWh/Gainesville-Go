//Unit Tests from https://tekloon.medium.com/angular-unit-testing-login-c39da80ae696

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register.component'
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { blankUser, validUser } from 'src/mocks';

const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  function updateForm(firstName: string, lastName: string, email: string, password: string) {
    component.registerForm.controls['firstName'].setValue(firstName);
    component.registerForm.controls['lastName'].setValue(lastName);
    component.registerForm.controls['email'].setValue(email);
    component.registerForm.controls['password'].setValue(password);
  }

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        RegisterComponent
      ],
      providers: [
        {provide: AuthService, userValue: {}},
        
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check form state of the registration form (not submitted)
  it('component initial state', () => {
    expect(component.added).toBeFalsy();
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.invalid).toBeTruthy();
    expect(component.authError).toBeFalsy();
    expect(component.authErrorMsg).toBeUndefined();
  });

  // check for submission attempt
  it('submitted should be true when addAccount()', () => {
    component.onSubmit(blankUser);
    expect(component.added).toBeTruthy();
    expect(component.authError).toBeFalsy();
  });

  // check to make sure the inputs match when submitting
  it('form value should update from when u change the input', (() => {
    updateForm(validUser.firstName, validUser.lastName, validUser.email, validUser.password);
    expect(component.registerForm.value).toEqual(validUser);
  }));
});
