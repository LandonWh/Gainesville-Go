package main

import "github.com/gin-gonic/gin"

func main() {
	ConnectDatabase()
	r := gin.Default()
	public := r.Group("/api")
	public.POST("/register", Register)
	public.POST("/login", Login)
	protected := r.Group("/api/admin")
	protected.Use(JwtAuthMiddleware())
	protected.GET("/user", CurrentUser)
	err := r.Run(":8080")
	if err != nil {
		return
	}
}