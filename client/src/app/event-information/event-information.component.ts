import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Event } from '../services/event.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-event-information',
  templateUrl: './event-information.component.html',
  styleUrls: ['./event-information.component.css']
})

export class EventInformationComponent {
 
  private _event: Event | null = null;

  @Input()
  set event(value: Event | null) {
    this._event = value;
    this.changeDetectorRef.detectChanges();
  }

  get event(): Event | null {
    return this._event;
  }

  constructor(
    public dialogRef: MatDialogRef<EventInformationComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {}

}