package main

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var DB *gorm.DB

type Event struct {
	ID          uint   `gorm:"primarykey"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Capacity    int    `json:"capacity"`
	Duration    int    `json:"duration"`
}

// Adds an event with the given values to the database
func AddEvent(event Event) (Event, uint) {
	DB.Create(&event)
	return event, event.ID
}

func ToEvent(title string, description string, capacity int, duration int) Event {
	return Event{Title: title, Description: description, Capacity: capacity, Duration: duration}
}

// creates a random event used for testing purposes
func CreateRandEvent(title string) Event {
	return Event{Title: title, Description: "event for testing"}
}

// deletes entries with the specified ID. Returns the num of entries deleted (should be 0 or 1)
func DeleteEvent(ID uint) int {
	var events []Event
	DB.Clauses(clause.Returning{}).Where("ID = ?", ID).Delete(&events)
	return len(events)
}
