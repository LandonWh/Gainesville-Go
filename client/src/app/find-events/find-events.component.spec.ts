import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { FindEventsComponent } from './find-events.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../services/auth.service';

describe('FindEventsComponent', () => {
  let component: FindEventsComponent;
  let fixture: ComponentFixture<FindEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindEventsComponent, ],
      imports: [ReactiveFormsModule, AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: {}},
      ]
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
