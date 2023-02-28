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
	ConnectDatabase()
	var events []Event
	DB.Find(&events)
	print(len(events))
}
