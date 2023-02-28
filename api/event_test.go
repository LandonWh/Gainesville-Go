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

func TestAddEvent(t *testing.T) {
	//get current num of events
	ConnectDatabase()
	var events []Event
	DB.Find(&events)
	l1 := len(events)

	//add event and get new num of events
	AddEvent("utest", "utest", 5, 5)
	DB.Find(&events)

	//assert there is one more event than before
	if l1 != len(events)-1 {
		t.Errorf("error adding event")
	}
}
