package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func ConnectDatabase(databaseName string) {

	database, err := gorm.Open(sqlite.Open(databaseName), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	} else {
		fmt.Println("We are connected to the sqlitedatabase")
	}

	err = database.AutoMigrate(&Event{})
	if err != nil {
		return
	}

	DB = database
	DB.AutoMigrate(&User{}) //Create database of users
}

func PingGet(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]string{
		"hello": "Found me",
	})
}
