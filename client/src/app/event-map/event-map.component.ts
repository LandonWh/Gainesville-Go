import { Component, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventService, Event } from '../services/event.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})
export class EventMapComponent implements OnInit {
  events: Event[] = [];

  private map: L.Map | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      if (this.map) {
        this.addMarkersToMap(this.map);
      }
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
    this.map = map;
    this.addMarkersToMap(map);
    const testMarker = L.marker([29.64444, -82.355414]).addTo(map);
  }

  addMarkersToMap(map: L.Map): void {
    console.log('Adding markers:', this.events);
    this.events.forEach((event: Event) => {
      if (event.lat != null && event.long != null) {
        const marker = L.marker([event.lat, event.long]).addTo(map);
        marker.bindPopup(`<h3>${event.title}</h3><p>${event.description}</p>`);
      } else {
        console.error('Invalid LatLng object:', event);
      }
    });
  }

} 




