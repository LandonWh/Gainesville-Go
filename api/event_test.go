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

func TestAddDeleteEvent(t *testing.T) {
	//get current num of events
	ConnectDatabase()
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
