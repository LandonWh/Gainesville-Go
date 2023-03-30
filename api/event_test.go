package main

import (
	"testing"
	"time"
)

func TestSanity(t *testing.T) {
	one := 1
	if one != 1 {
		t.Errorf("something is horribly wrong")
	}
}

// Adds an event to the database and deletes it
func TestAddDeleteEvent(t *testing.T) {
	//get current num of events
	ConnectDatabase("test.db")
	var events []Event
	DB.Find(&events)
	l1 := len(events)

	//add event and get new num of events
	_, ID := AddEvent(CreateRandEvent("TestAddDeleteEvent"))
	DB.Find(&events)

	//assert there is one more event than before
	if l1 != len(events)-1 {
		t.Errorf("error adding event")
	}

	//delete user and recalculate
	deleted := DeleteEvent(ID)
	DB.Find(&events)

	//assert event got deleted
	if l1 != len(events) || deleted != 1 {
		t.Errorf("error deleting event")
	}
}

// Adds an event to the database and retrieves its information
// Adds an event to the database and retrieves its information
func TestRetrieveEvent(t *testing.T) {
	// Add event to database
	event, ID := AddEvent(CreateRandEvent("TestAddRetrieveEvent"))

	// Retrieve event from database
	var retrievedEvent Event
	DB.First(&retrievedEvent, ID)

	// Check if retrieved event matches added event
	if event.ID != retrievedEvent.ID ||
		event.Title != retrievedEvent.Title ||
		event.Description != retrievedEvent.Description ||
		event.Capacity != retrievedEvent.Capacity ||
		event.Activity != retrievedEvent.Activity ||
		event.StartTime.Format(time.RFC3339) != retrievedEvent.StartTime.Format(time.RFC3339) ||
		event.EndTime.Format(time.RFC3339) != retrievedEvent.EndTime.Format(time.RFC3339) ||
		event.Address != retrievedEvent.Address ||
		event.BoysOnly != retrievedEvent.BoysOnly ||
		event.GirlsOnly != retrievedEvent.GirlsOnly ||
		event.TwentyOne != retrievedEvent.TwentyOne ||
		event.Lat != retrievedEvent.Lat ||
		event.Lon != retrievedEvent.Lon {
		t.Errorf("error finding added event")
	}

	// Delete event from database
	if DeleteEvent(ID) != 1 {
		t.Errorf("error removing event")
	}
}

func TestAddMultipleEvents(t *testing.T) {
	event1 := CreateRandEvent("First Event")
	event2 := CreateRandEvent("Second Event")
	event3 := CreateRandEvent("Third Event")

	_, ID1 := AddEvent(event1)
	_, ID2 := AddEvent(event2)
	_, ID3 := AddEvent(event3)

	var events []Event
	DB.Find(&events)

	if len(events) != 3 {
		t.Errorf("not all events found")
	}

	titles := make(map[string]bool)
	titles[events[0].Title] = true
	titles[events[1].Title] = true
	titles[events[2].Title] = true

	if !(titles["First Event"] == true && titles["Second Event"] == true && titles["Third Event"] == true && titles["Fourth Event"] != true) {
		t.Errorf("error retrieving data")
	}

	if DeleteEvent(ID1) != 1 || DeleteEvent(ID2) != 1 || DeleteEvent(ID3) != 1 {
		t.Errorf("error deleting data")
	}
}

func TestAddDeleteEventWithNewFields(t *testing.T) {
	var events []Event
	DB.Find(&events)
	l1 := len(events)

	event := CreateRandEvent("TestAddDeleteEventWithNewFields")

	// add event and get new num of events
	_, ID := AddEvent(event)
	DB.Find(&events)

	// assert there is one more event than before
	if l1 != len(events)-1 {
		t.Errorf("error adding event")
	}

	// delete event and recalculate
	deleted := DeleteEvent(ID)
	DB.Find(&events)

	// assert event got deleted
	if l1 != len(events) || deleted != 1 {
		t.Errorf("error deleting event")
	}
}

func TestCreateUserEventRelationship(t *testing.T) {
	// Create a user and add to the database
	user := User{
		FirstName:   "John",
		LastName:    "Doe",
		DateOfBirth: "1990-01-01",
		Email:       "johndoe@example.com",
		Password:    "password123",
	}
	DB.Create(&user)

	// Create an event and add to the database
	event := CreateRandEvent("TestCreateUserEventRelationship")
	_, eventID := AddEvent(event)

	// Create a relationship between the user and the event
	DB.Model(&user).Association("Events").Append(&event)

	// Check if the relationship exists
	var relatedEvents []Event
	DB.Model(&user).Association("Events").Find(&relatedEvents)

	if len(relatedEvents) == 0 {
		t.Errorf("error creating user-event relationship")
	}

	// Clean up: delete the user, event, and relationship
	DB.Model(&user).Association("Events").Delete(&event)
	DeleteEvent(eventID)
	DB.Delete(&user)
}

/*
func TestUserEventRelationshipAPI(t *testing.T) {
	// Initialize test server and client
	ConnectDatabase("test.db")
	gin.SetMode(gin.TestMode)
	r := SetupRouter()
	ts := httptest.NewServer(r)
	defer ts.Close()
	client := ts.Client()

	// Create test user and event
	user := User{
		FirstName:   "Test",
		LastName:    "User",
		DateOfBirth: "2000-01-01",
		Email:       "test@example.com",
		Password:    "password",
	}
	user, err := user.SaveUser(true)
	if err != nil {
		t.Fatalf("Failed to create user: %v", err)
	}
	event := CreateRandEvent("TestUserEventRelationshipAPI")
	_, eventID := AddEvent(event)

	// Make an HTTP request to create a relationship
	data := map[string]uint{"user_id": user.ID, "event_id": eventID}
	jsonData, _ := json.Marshal(data)
	resp, err := client.Post(ts.URL+"/api/attend", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatalf("Failed to create user-event relationship: %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}

	// Make another HTTP request to create the same relationship (expect an error)
	resp, err = client.Post(ts.URL+"/api/attend", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatalf("Failed to create user-event relationship: %v", err)
	}
	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("Expected status 400, got %d", resp.StatusCode)
	}

	// Clean up
	DeleteUser(user.Email)
	DeleteEvent(eventID)
}
*/
