import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface activityLevel {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  isEventCreated: boolean = false;
  

  ngOnit() {
    
  }

  hide: boolean = false;
  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string,
      latitude: string,
      longitude: string,
      address: string,
    }) {}
  eventForm: FormGroup = this.formBuilder.group({
      eventName: this.data.message,
      boys: false,
      girls: false,
      twentyOne: false, 
      numPeople: ['', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$"),]],
      date: ['', [Validators.required],],
      description: ['', [Validators.required, Validators.maxLength(100)],],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      activityLevelV: ['', [Validators.required]],
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      address: this.data.address,
  })  

  

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.missingField();
      return
    }
      //Equivalent for event?
      //this.tokenStorage.saveUser(User);
      this.authService
      .createEvent(
        this.eventForm.get('eventName')?.value, 
        this.eventForm.get('boys')?.value,
        this.eventForm.get('girls')?.value,
        this.eventForm.get('twentyOne')?.value,
        this.eventForm.get('numPeople')?.value,
        //this.eventForm.get('date')?.value,
        this.eventForm.get('description')?.value,
        //this.eventForm.get('startTime')?.value,
        //this.eventForm.get('endTime')?.value,
        this.eventForm.get('activityLevel')?.value,
        //this.eventForm.get('latitude')?.value,
        //this.eventForm.get('longitude')?.value,
        this.eventForm.get('address')?.value,
        )
      .subscribe(
        response => { console.log(response), this.isEventCreated = true;},
        err => {
          
          this.createEventFailed()
        },
      );
  }

  activityLevels: activityLevel[] = [
    {value: '1', viewValue: 'Very inactive'},
    {value: '2', viewValue: 'Inactive'},
    {value: '3', viewValue: 'Moderately Active'},
    {value: '4', viewValue: 'Active'},
    {value: '5', viewValue: 'Very Active'}

  ]

  missingField() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Missing 1 or more required field(s), or event creation failed!',
    });
    
  }

  createEventFailed() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Event creation failed, please try again.',
    });
    
  }

  
  

}

