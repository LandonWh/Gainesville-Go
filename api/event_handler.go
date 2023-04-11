package main

import (
	"fmt"
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
	Title       string `json:"title"`
	Description string `json:"description"`
	Capacity    string `json:"capacity"`
	Activity    int8   `json:"activity"`
	//StartTime   time.Time `json:"starttime"`
	//EndTime     time.Time `json:"endtime"`
	Address   string  `json:"address"`
	BoysOnly  bool    `json:"boysonly"`
	GirlsOnly bool    `json:"girlsonly"`
	TwentyOne bool    `json:"twentyone"`
	Lat       float32 `json:"lat"`
	Lon       float32 `json:"lng"`
}

func CreateEventHandler(c *gin.Context) {
	fmt.Println("CreateEventHandler called")
	// Validate input
	var input createEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		fmt.Printf("Error binding JSON: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error creating event": err.Error()})
		return
	}

	// Hardcoded values for StartTime, EndTime, Lat, and Lon
	hardcodedStartTime := time.Now()
	hardcodedEndTime := time.Now().Add(2 * time.Hour)
	fmt.Printf("Received input: %+v\n", input)

	var capacity int
	fmt.Sscanf(input.Capacity, "%d")

	// Add event to database
	event, _ := AddEvent(ToEvent(input.Title, input.Description, capacity, input.Activity, hardcodedStartTime, hardcodedEndTime,
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
