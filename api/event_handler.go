package main

import (
	"net/http"

	"time"

	"github.com/gin-gonic/gin"
)

func GetEvents(c *gin.Context) {
	var events []Event
	DB.Find(&events)

	c.JSON(http.StatusOK, gin.H{"data": events})
}

type createEventInput struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Capacity    int       `json:"capacity"`
	Activity    int8      `json:"activity"`
	StartTime   time.Time `json:"start"`
	EndTime     time.Time `json:"endtime"`
	Address     string    `json:"address"`
	BoysOnly    bool      `json:"boysonly"`
	GirlsOnly   bool      `json:"girlsonly"`
	TwentyOne   bool      `json:"twentyone"`
	Lat         float32   `json:"lat"`
	Lon         float32   `json:"long"`
}

func CreateEventHandler(c *gin.Context) {
	// Validate input
	var input createEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Add event to database
	event, _ := AddEvent(ToEvent(input.Title, input.Description, input.Capacity, input.Activity, input.StartTime, input.EndTime,
		input.Address, input.BoysOnly, input.GirlsOnly, input.TwentyOne, input.Lat, input.Lon))

	c.JSON(http.StatusOK, gin.H{"data": event})
}

type deleteEventHandlerInput struct {
	ID uint `json:"ID" binding:"required"`
}

func DeleteEventHandler(c *gin.Context) {
	// Validate input
	var input deleteEventHandlerInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//delete from database
	numDeleted := DeleteEvent(input.ID)

	c.JSON(http.StatusOK, gin.H{"numDeleted": numDeleted})
}

func GetEventHandler(c *gin.Context) {
	// Validate input
	var input deleteEventHandlerInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//get from database
	var event Event
	DB.First(&event, input.ID)

	c.JSON(http.StatusOK, gin.H{"event": event})
}
