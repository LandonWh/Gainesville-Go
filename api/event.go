package main

import (
	"fmt"
	"math/rand"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var DB *gorm.DB

type Event struct {
	ID          uint      `gorm:"primarykey"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Capacity    int       `json:"capacity"`
	Activity    int8      `json:"activity"`
	StartTime   time.Time `json:"starttime"`
	EndTime     time.Time `json:"endtime"`
	Birthdate   time.Time `json:"birthdate"`
	Address     string    `json:"address"`
	BoysOnly    bool      `json:"boysonly"`
	GirlsOnly   bool      `json:"girlsonly"`
	TwentyOne   bool      `json:"twentyone"`
	Lat         float32   `json:"lat"`
	Lon         float32   `json:"long"`
}

// Adds an event with the given values to the database
func AddEvent(event Event) (Event, uint) {
	DB.Create(&event)
	return event, event.ID
}

// casts event parameters to an event object
func ToEvent(title string, description string, capacity int, activity int8, startTime time.Time, endTime time.Time, birthdate time.Time, address string, boysOnly bool, girlsOnly bool, twentyOne bool, lat float32, lon float32) Event {
	return Event{
		Title:       title,
		Description: description,
		Capacity:    capacity,
		Activity:    activity,
		StartTime:   startTime,
		EndTime:     endTime,
		Birthdate:   birthdate,
		Address:     address,
		BoysOnly:    boysOnly,
		GirlsOnly:   girlsOnly,
		TwentyOne:   twentyOne,
		Lat:         lat,
		Lon:         lon,
	}
}

// creates a random event used for testing purposes
func CreateRandEvent(title string) Event {
	return Event{
		Title:       title,
		Description: "event for testing",
		Capacity:    rand.Intn(100) + 1,
		Activity:    int8(rand.Intn(3) + 1),
		StartTime:   time.Now().Add(time.Hour * time.Duration(rand.Intn(24*7))),
		EndTime:     time.Now().Add(time.Hour * time.Duration(rand.Intn(24*7))),
		Birthdate:   time.Date(1990, time.January, 1, 0, 0, 0, 0, time.UTC),
		Address:     fmt.Sprintf("%d Main St.", rand.Intn(1000)+1),
		BoysOnly:    rand.Intn(2) == 0,
		GirlsOnly:   rand.Intn(2) == 0,
		TwentyOne:   rand.Intn(2) == 0,
		Lat:         rand.Float32() * 180.0,
		Lon:         rand.Float32() * 360.0,
	}
}

// deletes entries with the specified ID. Returns the num of entries deleted (should be 0 or 1)
func DeleteEvent(ID uint) int {
	var events []Event
	DB.Clauses(clause.Returning{}).Where("ID = ?", ID).Delete(&events)
	return len(events)
}
