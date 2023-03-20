import { Component,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomEventFormComponent } from '../custom-event-form/custom-event-form.component';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  
  
 
  
  
})


export class CreateEventComponent {
  
  constructor(private dialogRef : MatDialog){}
  
  openDialog(){
    this.dialogRef.open(CustomEventFormComponent,{
      data : {
        name : 'Samuel'
      }
    });
  }
}
