import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';


@Component({
selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})


export class MapComponent  {


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
  var TheSocial = L.marker([29.652630, -82.345551]).addTo(map);
  if (TheSocial.bindPopup("The Social At Midtown").openPopup()) {
    
  }
  

}


}





