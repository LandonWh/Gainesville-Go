package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEvents(c *gin.Context) {
	var events []Event
	DB.Find(&events)

	c.JSON(http.StatusOK, gin.H{"data": events})
}

type createEventInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Capacity    int    `json:"capacity" binding:"required"`
	Duration    int    `json:"duration" binding:"required"`
}

func CreateEventHandler(c *gin.Context) {
	// Validate input
	var input createEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Add event to databse
	event, _ := AddEvent(ToEvent(input.Title, input.Description, input.Capacity, input.Duration))

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
