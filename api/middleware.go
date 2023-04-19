package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		fmt.Println(c)
		err := TokenValid(c)
		if err != nil {
			fmt.Println(err)
			c.String(http.StatusUnauthorized, "Unauthorized")
			c.Abort()
			return
		}
		c.Next()
	}
}
