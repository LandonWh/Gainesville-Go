import { Component, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventService, Event } from '../services/event.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EventInformationComponent } from '../event-information/event-information.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})
export class EventMapComponent implements OnInit {
  events: Event[] = [];

  private map: L.Map | null = null;

  constructor(private eventService: EventService, private dialog: MatDialog) {}

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
    this.events.forEach((event: Event) => {
      if (event.lat != null && event.long != null) {
        const marker = L.marker([event.lat, event.long]).addTo(map);
        marker.on('click', () => {
          this.openEventInformationDialog(event);
        });
      } else {
        console.error('Invalid LatLng object:', event);
      }
    });
  }

  openEventInformationDialog(event: Event): void {
    const dialogRef = this.dialog.open(EventInformationComponent, {
      width: '700px',
      height: '800px',
    });
    dialogRef.componentInstance.event = event;
  }


}
