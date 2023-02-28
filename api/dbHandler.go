package main

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func ConnectDatabase() {

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

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
