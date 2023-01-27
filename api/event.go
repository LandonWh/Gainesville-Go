package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
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

func ConnectDatabase() {

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.AutoMigrate(&Event{})
	if err != nil {
		return
	}

	DB = database
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

	// Create event
	event := Event{Title: input.Title, Description: input.Description, Capacity: input.Capacity, Duration: input.Duration}
	DB.Create(&event)

	c.JSON(http.StatusOK, gin.H{"data": event})
}

func PingGet(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]string{
		"hello": "Found me",
	})
}
