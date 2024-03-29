Sprint4.md

Video - https://drive.google.com/file/d/15c1RKHWQKCL7-KQhi70zqw5a5x1hfAXN/view?usp=sharing

# New frontend features and functionalities:
- Home Page
	- New header animation
 - Contact Us Page
    - Displays temporary contact information for us.
    - When we work on this later, we can put actual contact info here
    
- Delete Account
    - Users can now delete their account from the database.
    - Button is on the account page.

-   Account Page
    - Displays the first name, last name, and email of a currently logged in user.
    - Functional delete account button added.
    - Nonfunctional logout button added.
    

-   Finding events
    - Finding events is completely new this sprint.
	- When a user creates an event, the event gets placed on a different leaflet 	   map in the same location.
    - This event can be clicked on and reveals the event details.
    

-   Creating Events
    - Creating events now requires the user to pick a premade marker already on the map or click anywhere else on the screen to create an event.
    - The event forms are now merged into a single event form where the user is always allowed to edit the title, (premade events have placeholder titles to show the user what the event is).
    

  Frontend documentation readme is a separate file in the GitHub Repository

  

# New Frontend Tests

-   Cypress
    -  Test to make sure account page routing works
    -   Test to make sure account deletion works
    
-   Unit Tests
    -   Tests to ensure new components added this sprint are created, and can be used without issues.
    -   Tests to make sure event information is kept correctly
    

# Installs in client folder:

Use `npm install`, if this does not work, you can install all dependencies individually, which are listed below

`ng add @angular/material` - `npm install leaflet` - `npm install @types/leaflet` - `npm install @asymmetrik/ngx-leaflet` - `npm install @angular/flex-layout` - `npm install ngx-material-timepicker` - `npm install jwt-decode` - `npm install sweetalert2`

# New Backend Features and Functionalities:

-   Users API:
    -   Added a User schema return in api/login for frontend
    -   Emails are no longer case sensitive; makes logging in more intuitive
    
-   Added function for getting non-expired events
    -   For use in the frontend to get events that haven’t ended to display
    
-   Changed frontend lat and lon to a useable format, allowing the backend to remove the hardcoded values of lat and lon and store the actual values
    
-   Changed frontend date storage to allow the backend to store the actual values and removed the hard coded dates

# Backend User Unit Tests

-   TestCreateUser
    -   Adds a User entry to the database. Returns the User added with a http.StatusOK (200) code.
    
-   TestCreateDuplicateUser
    -   Adds a User entry with an already-present user to the database. Returns an empty User with a http.StatusBadRequest (400) code.
    
-   TestUserLogin
    -   Logs in a User with a valid email and password. Returns the valid login with a http.StatusOK (200) code.
    
-   TestUpperCaseEmailUserLogin
    -   Logs in a User with a valid email and password, with the email being uppercase. The backend ignores the capitalization of the letters and returns the valid login with a http.StatusOK (200) code.
    
-   TestIncorrectUserLogin
    -   Logs in a User with an invalid email and password. Returns an empty login with a http.BadRequest (400) code.
    
-   TestGetUsers
    -   Retrieves all of the Users in the database. Returns an array of all of the Users in the database with a http.StatusOK (200) code.
    
-   TestDeleteOneUser
    -   Deletes the user with the specified email and password. Returns the valid deletion User schema with a http.StatusOK (200) code.
    
-   TestUserLoginAfterDelete
    -   Logs in a User with an email and password that was just deleted. Returns an empty login with a http.BadRequest (400) code.
    
-   TestCreateUserAgainUpperCaseEmail
    -   Adds the User entry that was just deleted back to the database, but with an uppercase email. Returns the User added with a http.StatusOK (200) code.
    
-   TestLowerCaseEmailUserLoginAfterUpperCase
    -   Logs in a User with a valid email and password from the previous account creation with a lowercase email. The backend ignores all of the capitalization and returns the valid login with a http.StatusOK (200) code.
    
-   TestWipeUsers
    -   Removes all of the Users in the database to reset the file. Returns an empty array of Users with a http.StatusOK (200) code.
    

  

# Backend Event Unit Tests

-   Check creation and deletion of events
    -   Makes sure the event gets successfully created and deleted
    
-   Check searching for a specific event and retrieving data
    -   Creates an event, makes sure searching for the event key returns the event, checks the event data
    
-   Check creating multiple events
    -   Creates multiple events, querying all events returns the number of events created, makes sure that each event is listed in the query, and deletes all retrieved events
    
-   Create user event relationship
    -   Creates a user and event, sets the user to be attending that event, and makes sure that that info can be retrieved from the database
    
-   Test user event relationship api
    -   Tests creating users and events through the api and makes sure errors are thrown when creating duplicate relationships and assigning users to nonexistent events and vice versa
    
-   Get Active Events
    -   Creates an event that has ended and one that has not in the database, calls the retrieveActiveEvents function, and makes sure that only the event that hasn’t expired was retrieved.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NDkzNzQyOTJdfQ==
-->
