package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	ConnectDatabase("main.db")
	SetupRouter()
}

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Add CORS middleware
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

	r.Use(cors.New(corsConfig))

	//API routes
	public := r.Group("/api")
	public.POST("/register", Register)
	public.POST("/login", Login)
	public.POST("/deleteuser", Delete)
	public.GET("/ping", PingGet)
	public.GET("/events", GetEvents)
	public.POST("/event", CreateEventHandler)
	public.DELETE("/event", DeleteEventHandler)
	public.GET("/event", GetEventHandler)
	public.POST("/attend", AttendEvent)
	protected := r.Group("/api/admin")
	protected.Use(JwtAuthMiddleware())
	protected.GET("/user", CurrentUser)
	protected.GET("/active-events", GetActiveEvents)

	//start the server
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		return nil
	}

	return r
}
