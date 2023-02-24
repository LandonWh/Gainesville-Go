import { Component, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { EventFormComponent } from '../event-form/event-form.component';
import { ElementRef } from '@angular/core';


@Component({
selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})


export class MapComponent  {

  constructor(public dialog: MatDialog, private elementRef: ElementRef) {}

  openDialog(message: string ) {
    const dialogRef = this.dialog.open(EventFormComponent,{
      width: '1000px', 
      height: '500px',
      data: {message: message}
    });

    dialogRef.afterOpened().subscribe(() => {
      const inputElement = document.getElementById('inputField');
      if (inputElement) {
        inputElement.focus();
      }
    });
  }

  options={ 
  layers:[L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
  opacity: 0.7,
  maxZoom: 19,
  detectRetina: true,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})],
  zoom:13,
  center:L.latLng(29.644440,-82.355414)

};


onMapReady(map: L.Map) {
  
  
  const socialContent = `
  <h3 class="header">The Social at Midtown</h3>
  Click Marker to Create an Event Here!
  `
  const _this = this;
  
  var TheSocial = L.marker([29.652630, -82.345551]).addTo(map)
  .bindPopup(socialContent).on("mouseover", () => {
    TheSocial.openPopup();
  }).addEventListener("click", e => {
    this.openDialog("The Social");
  })
  .on("mouseout", () => {
    TheSocial.closePopup();
  })
  }
}



