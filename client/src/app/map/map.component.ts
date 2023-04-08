import { Component, ChangeDetectorRef, NgZone} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { EventFormComponent } from '../event-form/event-form.component';
import { icon, Marker } from 'leaflet';


@Component({
selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})


export class MapComponent  {



  constructor(public dialog: MatDialog, private ngZone: NgZone) {}

  openDialog(message: string, latitude: string, longitude: string, address: string, ) {
    const dialogRef = this.dialog.open(EventFormComponent,{
      width: '600px', 
      height: '600px',
      data: {
        message: message,
        latitude: latitude,
        longitude: longitude,
        address: address,
        }

    });

    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        const inputElement = document.getElementById('inputField');
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
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
  `

  const DepotParkContent = `
  <h3 class="header">Depot Park</h3>
  `

  const _this = this;
  
  var TheSocial = L.marker([29.652630, -82.345551]).addTo(map)
  .bindPopup(socialContent).on("mouseover", () => {
    TheSocial.openPopup();
  }).on("click", () => 
    {
      this.ngZone.run(() => {
        this.openDialog("The Social", "29.652630", "-82.345551", "1728 W University Ave, Gainesville, FL 32603");
      });
  })
  .on("mouseout", () => {
    TheSocial.closePopup();
  })

  
  var DepotPark = L.marker([29.6437363, -82.321861]).addTo(map)
  .bindPopup(DepotParkContent).addEventListener("mouseover", () => {
    DepotPark.openPopup();
  },{passive: true}).addEventListener("click", () => 
    {
      this.ngZone.run(() => {
        this.openDialog("Depot Park", "29.6437363", "-82.321861", "874 SE 4th St, Gainesville, FL 32601" );
      });
  }, {passive: true})
  .addEventListener("mouseout", () => {
    DepotPark.closePopup();
  }, {passive: true});

  
  }

}

const iconRetinaUrl = 'assets/marker-icon-2x.png';
  const iconUrl = 'assets/marker-icon.png';
  const shadowUrl = 'assets/marker-shadow.png';
  const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;



