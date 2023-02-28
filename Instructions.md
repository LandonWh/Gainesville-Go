"npm run start" in the client folder starts the client on localhost:8080/

"go run ." in the api folder starts the api on localhost 8080.
If you don't have go configured, you can use the executable here instead: https://drive.google.com/file/d/1jr8vKzrJmk-uRhi0DbdDfydL3NM0YGEb/view?usp=share_link

Going to http://localhost:8080/api/ping should return a "Found me" message once both the back and front ends are running.



Installs:
- ng add @angular/material
- npm install leaflet
- npm install @types/leaflet
- npm install @asymmetrik/ngx-leaflet
- npm install @angular/flex-layout


Creating an event: 
POST to http://localhost:8080/api/events
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
DELETE from http://localhost:8080/api/events
{
    "ID":uint
}
Returns the number of events deleted. Should be 0 if no matches were found or 1 if it was successfully deleted.

Register an account to database:
POST from http://localhost:8080/api/register and go to Body and insert:
{
    Username: "your username here"
    Password: "your password here"
}

Login and generate a token:
POST from http://localhost:8080/api/login and go to Body and insert:
{
    Username: "your username here"
    Password: "your password here"
}

Fetch a user based on token:
GET from http://localhost:8080/api/admin/user and select Authorization -> Bearer Token -> insert token (no quotes)

