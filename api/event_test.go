package main

import (
	"testing"
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
func TestRetrieveEvent(t *testing.T) {
	ConnectDatabase("test.db")
	_, ID := AddEvent(CreateRandEvent("TestAddRetrieveEvent"))

	var event Event
	DB.First(&event, ID)

	if ID != event.ID || event.Title != "TestAddRetrieveEvent" {
		t.Errorf("error finding added event")
	}

	if DeleteEvent(ID) != 1 {
		t.Errorf("error removing event")
	}
}

func TestAddMultipleEvents(t *testing.T) {
	ConnectDatabase("test.db")

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
