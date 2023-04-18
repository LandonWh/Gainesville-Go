import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { NumberValueAccessor } from '@angular/forms';


export interface Event {
  ID: number;     
	Title: string;    
	Description: string; 
	Capacity: number;       
	Activity: number;      
	StartTime: Date;
	EndTime: Date;
	Address: string   
	BoysOnly: boolean;   
	GirlsOnly: boolean;   
	TwentyOne: boolean;    
	Lat: number;   
	Lon: number;
	Users?: any[];    
}


@Injectable({
  providedIn: 'root'
})


export class EventService {
  private apiURL =  "http://localhost:8080/api/events";

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiURL);
  }
}
