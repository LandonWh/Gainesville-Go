package main

import "github.com/gin-gonic/gin"

func initalizeRouter() {
	r := gin.Default()

	r.GET("/events", GetEvents)
	r.POST("/events", CreateEvent)

	err := r.Run()
	if err != nil {
		return
	}
}

func main() {
	ConnectDatabase()
	initalizeRouter()
}
