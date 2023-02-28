package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DB *gorm.DB

type Event struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Capacity    int    `json:"capacity"`
	Duration    int    `json:"duration"`
}

type CreateEventInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Capacity    int    `json:"capacity" binding:"required"`
	Duration    int    `json:"duration" binding:"required"`
}

func GetEvents(c *gin.Context) {
	var events []Event
	DB.Find(&events)

	c.JSON(http.StatusOK, gin.H{"data": events})
}

func CreateEvent(c *gin.Context) {
	// Validate input
	var input CreateEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Add event to databse
	event := AddEvent(input.Title, input.Description, input.Capacity, input.Duration)

	c.JSON(http.StatusOK, gin.H{"data": event})
}

func AddEvent(title string, description string, capacity int, duration int) Event {
	event := Event{Title: title, Description: description, Capacity: capacity, Duration: duration}
	DB.Create(&event)
	return event
}

func PingGet(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]string{
		"hello": "Found me",
	})
}
