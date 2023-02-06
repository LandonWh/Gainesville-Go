package main

import (
	"github.com/gin-gonic/gin"
	"Gainesville-Go/api/controllers"
)

func initalizeRouter() {
	r := gin.Default()
	
	public := r.Group("/api")

	public.POST("/register", controllers.Register)

	err := r.Run(":8080")
	if err != nil {
		return
	}
}

func main() {
	ConnectDatabase()
	initalizeRouter()
}
