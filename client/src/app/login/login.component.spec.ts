import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { blankLogin, validLogin } from 'src/mocks';
import { AppModule } from '../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm( email: string, password: string) {
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: {}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   // check form state of the login form (not submitted)
  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.authError).toBeFalsy();
    expect(component.authErrorMsg).toBeUndefined();
  });

  // check for submission attempt
  it('submitted should be true when addAccount()', () => {
    component.onSubmit(blankLogin);
    expect(component.submitted).toBeTruthy();
    expect(component.authError).toBeFalsy();
    expect(component.isLoggedIn).toBeFalsy();
  });

  // check to make sure the inputs match when submitting
  it('form value should update from when u change the input', (() => {
    updateForm(validLogin.email, validLogin.password);
    expect(component.loginForm.value).toEqual(validLogin);
  }));


});
