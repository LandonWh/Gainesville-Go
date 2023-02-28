import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewEncapsulation} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChip } from '@angular/material/chips';

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
  message: string = '';

  ngOnit() {
    
  }

  hide: boolean = false;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
  eventForm: FormGroup = this.formBuilder.group({
      eventName: this.message,
      boys: false,
      girls: false,
      21: false, 
      numPeople: ['', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$"),]],
      activity:  ['', [Validators.required],],
      date: ['', [Validators.required],],
      description: ['', [Validators.required, Validators.maxLength(100)],],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      activityLevelV: ['', [Validators.required]],
      
  })  

  onTimeInputFocus(event: FocusEvent): void {
    if (event?.target) {
      const keyboardEvent = new KeyboardEvent('keypress', { key: ' ' });
      event.target.dispatchEvent(keyboardEvent);
    }
  }

  onSubmit(): void {
    if (!this.eventForm.valid) {
      return;
    }
    console.log(this.eventForm);
  }

  activityLevels: activityLevel[] = [
    {value: '1', viewValue: 'Very inactive'},
    {value: '2', viewValue: 'Inactive'},
    {value: '3', viewValue: 'Moderately Active'},
    {value: '4', viewValue: 'Active'},
    {value: '5', viewValue: 'Very Active'}

  ]

  
  

}

