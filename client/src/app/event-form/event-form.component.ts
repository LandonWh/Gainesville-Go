import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialogRef here
import Swal from 'sweetalert2';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface activityLevel {
  value: number;
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
  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router, private authService: AuthService, public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string,
      latitude: number,
      longitude: number,
      address: string,
    }) {}
  eventForm: FormGroup = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.maxLength(51)]],
      boys: false,
      girls: false,
      twentyOne: false, 
      capacity: ['', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$"),]],
      date: ['', [Validators.required],],
      description: ['', [Validators.required, Validators.maxLength(151)],],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      activityLevelV: ['', [Validators.required]],
      lat: this.data.latitude,
      lng: this.data.longitude,
      address: this.data.address,
  })  

  

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.missingField();
      return;
    }
  
    // Get the date object
    const eventDate = new Date(this.eventForm.get('date')?.value);
  
    // Convert startTime and endTime to Date objects and combine with the event date
    const startTimeInput = this.eventForm.get('startTime')?.value;
    const startTime = new Date(eventDate);
    const [startHours, startMinutes] = startTimeInput.split(/[:\s]/).map(Number);
    startTime.setHours(startHours, startMinutes);

    const endTimeInput = this.eventForm.get('endTime')?.value;
    const endTime = new Date(eventDate);
    const [endHours, endMinutes] = endTimeInput.split(/[:\s]/).map(Number);
    endTime.setHours(endHours, endMinutes);
  
    this.authService
      .createEvent(
        this.eventForm.get('eventName')?.value,
        this.eventForm.get('boys')?.value,
        this.eventForm.get('girls')?.value,
        this.eventForm.get('twentyOne')?.value,
        this.eventForm.get('capacity')?.value,
        this.eventForm.get('description')?.value,
        startTime,
        endTime,
        this.eventForm.get('activityLevelV')?.value,
        this.eventForm.get('lat')?.value,
        this.eventForm.get('lng')?.value,
        this.eventForm.get('address')?.value,
        this.eventForm.get('date')?.value,
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.isEventCreated = true;
          this.dialogRef.close({ eventCreated: true });
        },
        (err) => {
          this.createEventFailed();
        },
      );
  }
  

  activityLevels: activityLevel[] = [
    {value: 1, viewValue: 'Very inactive'},
    {value: 2, viewValue: 'Inactive'},
    {value: 3, viewValue: 'Moderately Active'},
    {value: 4, viewValue: 'Active'},
    {value: 5, viewValue: 'Very Active'}

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

