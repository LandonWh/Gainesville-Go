
**Hello!**
Welcome to Gainesville Go!
In this file, we will explain how to get started with and start using the Gainesville Go Web App.

To get started, make sure you are looking at the Gainesville Go GitHub page at https://github.com/LandonWh/Gainesville-Go, granted, if you are reading this, you are probably already there.


# Setting up for development
1) Set up Angular and Go
		a) In order to run and develop Gainesville Go, you must set up the framework for the frontend, as well as the backend API. The frontend framework we used is Angular, and instructions for which can be referenced here: https://angular.io/guide/setup-local.
		To set up the backend API, please reference the backend documentation. 
2) Clone the repository
		a) Once angular and Go are ready, clone the repository to your local device so you can begin development. We recommend using the GitHub desktop app for the smoothest pushing and pulling experience.
3) Install Dependencies
		a) Open the Sprint4.md file, which is located in the above GitHub repository. In there you will find a list of dependencies you will need to install. Simply install all of those in the client folder and you will be good to go!
4) Launching the program.
		a) To start the frontend, navigate to the client directory in the command prompt/terminal you are using. Then enter `npm run start`. Give it a little bit and the frontend will be up and running. 
		b) To have full functionality,  you will also need to run the backend. To do this navigate to the api directory in the command prompt/terminal you are using. Then enter `go run .`.
5) Once this is done, in the browser of your choice, navigate to http://localhost:4200/login. 

Now you are ready to develop and update Gainesville Go! We look forward to seeing what you can do!

# Setting up as a user

To use Gainesville Go, you will need to follow the previous steps, as we are not hosting this on an actual server, but once you have it set up, or if its ported to a server in the future, you can follow this guide to learn about the features offered in Gainesville Go. 

1) Gainesville Go requires that you make an account to access events, so you will need one to proceed. 
		a) Assuming you don't have an account in the database (if you do, you can skip this step), press the create account button on the login screen. 
		b) Enter the information prompted in the fields, and press create account. Please note that you must use a unique account (ie one that is not already in the database).
		c) Upon a successful account creation you will be returned to the login screen to sign in with the account you made. 
2) Login with the email and password associated with the account you made. 
		a) Following a successful login, you will be routed to the home page.
3) Creating Events 
a) To create an event, the user would navigate to the create events page and either click a 		premade marker already on the map, or click anywhere on the map. The user will then fill out all of the fields and click submit.
4) Finding Events
		a) To find events, click on the find an event tab in the navbar. The find events page will display all of the events sent to the database. You can click any of the markers to see the event information submitted on the create event page.
5) Account Page
		a) By pressing on the Account Page option in the task bar, you will be navigated to the account page, where here, you will find the first name, last name, and email associated with your account. The current main functionality of this page is to display the info, as well as provide the user the option to delete their account from the database.
6) Delete Account
		a) On the account page, you will see a button that allows you to delete your account. Pressing it will navigate you to the delete page. You will be prompted to enter the email and password associated with your account, similar to login. Once that is entered, pressing Delete Account will attempt to remove it from the database.
		b) If the information you entered matches an account in the database it will be removed and you will be routed to the login page. 

And that's all for now, but we aren't done working yet! We look forward to bringing more functionality to Gainesville Go, and working to make this a proper app!



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU0NDg0NjA4MywtNTczMDc3MTM0LDE2MT
I4NjIxNjddfQ==
-->
