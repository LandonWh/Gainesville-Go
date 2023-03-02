"npm run start" in the client folder starts the client on localhost:8080/

"go run ." in the api folder starts the api on localhost 8080.
If you don't have go configured, you can use the executable here instead: https://drive.google.com/file/d/1jr8vKzrJmk-uRhi0DbdDfydL3NM0YGEb/view?usp=share_link

Going to http://localhost:8080/api/ping should return a "Found me" message once both the back and front ends are running.



Installs in client folder:
- ng add @angular/material
- npm install leaflet
- npm install @types/leaflet
- npm install @asymmetrik/ngx-leaflet
- npm install @angular/flex-layout
- npm install ngx-material-timepicker


Creating an event: 
POST to http://localhost:8080/api/event  
{  
    "title":"str",  
    "description":"str",  
    "capacity":int,  
    "duration":int  
}  
Returns the entire event

Viewing all events:
GET from http://localhost:8080/api/events
Returns a list of all events

Deleting an event:
DELETE from http://localhost:8080/api/event  
{  
    "ID":uint  
}  
Returns the number of events deleted. Should be 0 if no matches were found or 1 if it was successfully deleted.

Getting an event:
GET from http://localhost:8080/api/event  
{  
    "ID":uint  
}  
Returns the event

Register an account to database:
POST from http://localhost:8080/api/register and go to Body and insert:  
{  
    "firstname":"str"  
    "lastname":"str"  
    "email":"str"  
    "password":"str"  
}  
Returns the user unless the email field is not unique, it will fail if that's the case

Login and generate a token:
POST from http://localhost:8080/api/login and go to Body and insert:  
{  
    "email":"str"  
    "password":"str"  
}  
Returns the jwt token for the user unless the username/password is incorrect, it will fail if that's the case

Fetch a user based on token:
GET from http://localhost:8080/api/admin/user and select Authorization -> Bearer Token -> insert token (no quotes)

