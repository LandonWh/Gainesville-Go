import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


interface activityLevel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-custom-event-form',
  templateUrl: './custom-event-form.component.html',
  styleUrls: ['./custom-event-form.component.css']
})

export class CustomEventFormComponent {

  ngOnit() {
    
  }

  hide: boolean = false;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  eventForm: FormGroup = this.formBuilder.group({
      event: ['', [Validators.required]],
      boys: false,
      girls: false,
      twentyOne: false, 
      numPeople: ['', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$"),]],
      date: ['', [Validators.required],],
      description: ['', [Validators.required, Validators.maxLength(100)],],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      activityLevelV: ['', [Validators.required]],
  })  

  

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
