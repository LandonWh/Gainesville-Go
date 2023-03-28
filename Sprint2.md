Sprint2.md 

Video Link - https://drive.google.com/file/d/1pS7bjky6etw5em1d4lS41pW31JE2HbrO/view?usp=sharing


## New this sprint

* Added event form integrated with leaflet map to create events from premade markers
* Updated the schema of users to include more information
* Connected the front and back end, allowing accounts to be created through the client
* Added unit tests for events and users databases
* Cleaned up code and separated functionality
* Added ability to delete events and retrieve a specific event
* Added helper functions for unit tests such as creating an event with random features

## Unit Tests

Simple Cypress Test 
* Test to ensure account creation button on login page routes to the registration page.

Frontend Login Page Unit Tests
* Check login form for initial state (not submitted) 
    * Should show that the form is not submitted and the form is currently invalid
* Check submission of login form
    * When the submit button is pressed, submitted is true and errors are false
* Check inputs get through to the login form
    * Pass inputs of a complete login form, make sure those inputs match what is put through

Frontend Registration Page Unit Tests
* Check registration form for initial state (not submitted) 
    * Should show that the form is not submitted and the form is currently invalid
* Check submission of registration form
    * When the submit button is pressed, submitted is true and errors are false
* Check inputs get through to the registration form
    * Pass inputs of a complete registration form, make sure those inputs match what is put through

Frontend Event Unit Tests
* Check inputs get through to the event form
* Pass inputs of a complete event form, make sure those inputs match what is put through

Backend User Unit Tests
* TestCreateUser
    * Adds a User entry to the database. Returns the User added with a http.StatusOK (200) code.
* TestCreateDuplicateUser
    * Adds a User entry with an already-present user to the database. Returns an empty with a http.StatusBadRequest (400) code.
* TestUserLogin
    * Logs in a User with a valid email and password. Returns the valid login with a http.StatusOK (200) code.
* TestIncorrectUserLogin
    * Logs in a User with an invalid email and password. Returns an empty login with a http.BadRequest (400) code.
* TestGetUsers
    * Retrieves all of the Users in the database. Returns an array of all of the Users in the database with a http.StatusOK (200) code.
* TestWipeUsers
    * Removes all of the Users in the database to reset the file. Returns an empty array of Users with a http.StatusOK (200) code.

Backend Event Unit Tests
* Check creation and deletion of events
    * Makes sure the event gets successfully created and deleted
* Check searching for a specific event and retrieving data
    * Creates an event, makes sure searching for the event key returns the event, checks the event data
* Check creating multiple events
    * Creates multiple events, querying all events returns the number of events created, makes sure that each event is listed in the query, and deletes all retrieved events

## Setup

"npm run start" in the client folder starts the client on localhost:8080/

"go run ." in the api folder starts the api on localhost 8080. If you don't have go configured, you can use the executable here instead: https://drive.google.com/file/d/1jr8vKzrJmk-uRhi0DbdDfydL3NM0YGEb/view?usp=share_link

Going to http://localhost:8080/api/ping should return a "Found me" message once both the back and front ends are running.

Installs in client folder:

ng add @angular/material
npm install leaflet
npm install @types/leaflet
npm install @asymmetrik/ngx-leaflet
npm install @angular/flex-layout
npm install ngx-material-timepicker

## API

Creating an event: POST to http://localhost:8080/api/event  
{
"title": "string",
"description": "string",
"capacity": integer,
"activity": integer,
"start_time": "string (RFC3339)",
"end_time": "string (RFC3339)",
"birthdate": "string (RFC3339)",
"address": "string",
"boysOnly": boolean,
"girlsOnly": boolean,
"twentyOne": boolean,
"lat": float,
"lon": float
}
Returns the entire event

Viewing all events: GET from http://localhost:8080/api/events Returns a list of all events

Deleting an event: DELETE from http://localhost:8080/api/event  
{  
"ID":uint  
}  
Returns the number of events deleted. Should be 0 if no matches were found or 1 if it was successfully deleted.

Getting an event: GET from http://localhost:8080/api/event  
{  
"ID":uint  
}  
Returns the event

Register an account to database: POST from http://localhost:8080/api/register and go to Body and insert:  
{  
"firstname":"str"  
"lastname":"str"  
"email":"str"  
"password":"str"  
}  
Returns the user unless the email field is not unique, it will fail if that's the case

Login and generate a token: POST from http://localhost:8080/api/login and go to Body and insert:  
{  
"email":"str"  
"password":"str"  
}  
Returns the jwt token for the user unless the username/password is incorrect, it will fail if that's the case

Fetch a user based on token: GET from http://localhost:8080/api/admin/user and select Authorization -> Bearer Token -> insert token (no quotes)
