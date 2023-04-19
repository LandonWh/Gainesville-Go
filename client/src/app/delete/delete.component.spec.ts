import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { DeleteComponent } from './delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../services/auth.service';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  function updateForm( email: string, password: string) {
    component.deleteForm.controls['email'].setValue(email);
    component.deleteForm.controls['password'].setValue(password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteComponent ],
      imports: [ReactiveFormsModule, AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: {}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check form state of the login form (not submitted)
  it('component initial state', () => {
    expect(component.deleted).toBeFalsy();
    expect(component.deleteForm).toBeDefined();
    expect(component.deleteForm.invalid).toBeTruthy();
    expect(component.authError).toBeFalsy();
  });
});
