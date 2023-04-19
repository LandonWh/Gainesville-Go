import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Time } from '@angular/common';
import { NumberValueAccessor } from '@angular/forms';


export interface Event {
	ID: number;
	title: string;
	description: string;
	capacity: number;
	activity: number;
	address: string;
	boysonly: boolean;
	girlsonly: boolean;
	twentyone: boolean;
	starttime: Date;
	endtime: Date;
	date: string;
	lat: number;
	long: number; 
	Users: any; 
  }
  

@Injectable({
  providedIn: 'root'
})


export class EventService {
  private apiURL =  "http://localhost:8080/api/events";

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
	return this.http.get<{ data: Event[] }>(this.apiURL).pipe(
	  map((response) => response.data)
	);
  }
  
}
