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
func TestAddRetrieveEvent(t *testing.T) {
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
