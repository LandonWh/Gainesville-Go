import { Component, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventService, Event } from '../event.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})
export class EventMapComponent implements OnInit{
  events: Event[] = [];
  
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 13,
    center: L.latLng(29.64444, -82.355414),
  };

  onMapReady(map: L.Map) {
    this.addMarkersToMap(map);
    const testMarker = L.marker([29.64444, -82.355414]).addTo(map);
  }

  addMarkersToMap(map: L.Map): void {
    console.log('Adding markers:', this.events);
    this.events.forEach((event: Event) => {
      if (event.Lat && event.Lon) {
        const marker = L.marker([event.Lat, event.Lon]).addTo(map);
        marker.bindPopup(`<h3>${event.Title}</h3><p>${event.Description}</p>`);
      } else {
        console.error('Invalid LatLng object:', event);
      }
    });
  }

} 




