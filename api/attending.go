package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type AttendInput struct {
	UserID  uint `json:"user_id" binding:"required"`
	EventID uint `json:"event_id" binding:"required"`
}

func AttendEvent(c *gin.Context) {
	var input AttendInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Fetch the user and event from the database
	var user User
	var event Event
	if err := DB.First(&user, input.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := DB.First(&event, input.EventID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		return
	}

	//make sure it doesnt already  exist
	var existingEvents []Event
	DB.Model(&user).Where("id = ?", event.ID).Association("Events").Find(&existingEvents)
	if len(existingEvents) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Relationship already exists"})
		return
	}

	// Update the relationship
	DB.Model(&user).Association("Events").Append(&event)

	c.JSON(http.StatusOK, gin.H{"message": "Attending relationship created"})
}
