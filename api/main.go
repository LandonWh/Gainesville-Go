package main

import "github.com/gin-gonic/gin"

func initalizeRouter() {
	r := gin.Default()

	api := r.Group("/api")

	{
		api.GET("/ping", PingGet)
		api.GET("/events", GetEvents)
		api.POST("/events", CreateEvent)
	}

	err := r.Run()
	if err != nil {
		return
	}
}

func main() {
	ConnectDatabase()
	initalizeRouter()
}
