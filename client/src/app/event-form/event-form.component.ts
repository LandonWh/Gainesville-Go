import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewEncapsulation} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Event {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventFormComponent {
  message: string = '';
  
  ngOnit() {
    console.log(this.data.message); // Check that the message parameter is correctly received
  }

  events : Event[] = [
    {value: '_TheSocial', viewValue: 'The Social'},
    {value: '_PaynesPrairie', viewValue: "Payne's Prairie"}
  ]

  hide: boolean = false;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
  eventForm: FormGroup = this.formBuilder.group({
      event: ['', [Validators.required,]],
      numPeople: ['', [Validators.required]]
  })



  onSubmit(): void {
    if (!this.eventForm.valid) {
      return;
    }
    console.log(this.eventForm);
  }


}
