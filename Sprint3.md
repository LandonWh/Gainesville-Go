Sprint3.md 

Video Link - TBD


## New this sprint

* Added the ability to delete users from the database
* Added more unit tests for the backend for both users and events
* Updated the schema of users to contain a date of birth and a list of events they're participating in
* Added alerts using SweetAlert2 for registration (invalid fields, pre-existing email address).
* Added alerts using SweetAlert2 for login (invalid fields, incorrect login information) 
* Login page is now fully integrated with the backend, allowing users to sign in with credentials located in the database, checking that both email and password match stored information.
* Changed Navbar to reactive navbar based on window size (hamburger dropdown sidenav when the window is small, and buttons across the top when the window is large)
* Added My Account Page skeleton 
   * Future plans include displaying user information and making the logout button functional
* Added Functionality to custom event form
* Implemented Date of Birth functionality on registration page
* Started implementing function to remove accounts from the database







## Unit Tests

#### Simple Cypress Test 
* Test to ensure account creation button on login page routes to the registration page.

#### New Cypress Tests:
* Users should be redirected to the login page following a successful registration.
* Registrations with an already existing email address should fail.
* Successful logins should route to the home page.
* A login should fail if the email does not exist in the database.
* A login should fail if the password does not match an existing email. 
Frontend Login Page Unit Tests

#### Frontend Login Page Unit Tests
* Check login form for initial state (not submitted) 
    * Should show that the form is not submitted and the form is currently invalid
* Check submission of login form
    * When the submit button is pressed, submitted is true and errors are false
* Check inputs get through to the login form
    * Pass inputs of a complete login form, make sure those inputs match what is put through

#### Frontend Registration Page Unit Tests
* Check registration form for initial state (not submitted) 
    * Should show that the form is not submitted and the form is currently invalid
* Check submission of registration form
    * When the submit button is pressed, submitted is true and errors are false
* Check inputs get through to the registration form
    * Pass inputs of a complete registration form, make sure those inputs match what is put through

#### Frontend Event Unit Tests
* Check inputs get through to the event form
* Pass inputs of a complete event form, make sure those inputs match what is put through

#### New Frontend Unit Tests
* Check inputsget through to the custom event form
   * Pass inputs of a complete custom event form, make sure those inputs match what is put through
* Updated old registration unit test with date of birth input
   * Pass inputs of a complete registration form, make sure those inputs match what is put through
* All other old unit tests are still there (updated to fit new features)


#### Backend User Unit Tests
* TestCreateUser
    * Adds a User entry to the database. Returns the User added with a http.StatusOK (200) code.
* TestCreateDuplicateUser
    * Adds a User entry with an already-present user to the database. Returns an empty User with a http.StatusBadRequest (400) code.
* TestUserLogin
    * Logs in a User with a valid email and password. Returns the valid login with a http.StatusOK (200) code.
* TestIncorrectUserLogin
    * Logs in a User with an invalid email and password. Returns an empty login with a http.BadRequest (400) code.
* TestGetUsers
    * Retrieves all of the Users in the database. Returns an array of all of the Users in the database with a http.StatusOK (200) code.
* TestDeleteOneUser
    * Deletes the user with the specified email and password. Returns the valid deletion User schema with a http.StatusOK (200) code.
* TestUserLoginAfterDelete
    * Logs in a User with an email and password that was just deleted. Returns an empty login with a http.BadRequest (400) code.
* TestCreateUserAgain
    * Adds the User entry that was just deleted back to the database. Returns the User added with a http.StatusOK (200) code.
* TestWipeUsers
    * Removes all of the Users in the database to reset the file. Returns an empty array of Users with a http.StatusOK (200) code.

#### Backend Event Unit Tests
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
"dateofbirth":"str"
"email":"str"  
"password":"str"  
}  
Returns the user unless the email field is not unique, it will fail if that's the case

Delete an account to database: POST from http://localhost:8080/api/deleteuser and go to Body and insert:  
{  
"email":"str"  
"password":"str"  
}  
Returns the deleted user with no password unless the user does not exist or if the password is incorrect, it will fail if that's the case

Login and generate a token: POST from http://localhost:8080/api/login and go to Body and insert:  
{  
"email":"str"  
"password":"str"  
}  
Returns the jwt token for the user unless the username/password is incorrect, it will fail if that's the case

Fetch a user based on token: GET from http://localhost:8080/api/admin/user and select Authorization -> Bearer Token -> insert token (no quotes)
If token is valid, it will return the user connected to that token. If the token is invalid, it will throw a 401 code (unauthorized access)
