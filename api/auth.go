package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type CurrUserInput struct {
	Token string `json:"token" binding:"required"`
}

func CurrentUser(c *gin.Context) {
	user_id, err := ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := GetUserByID(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "data": u})
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {

	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := User{}

	u.Email = input.Email
	u.Password = input.Password

	token, err := LoginCheck(u.Email, u.Password, true)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect."})
		return
	}

	var user User
	DB.Model(User{}).Where("email = ?", u.Email).Take(&user)
	user.Password = "[HIDDEN]"
	c.JSON(http.StatusOK, gin.H{"token": token, "user": user})

}

func Delete(c *gin.Context) {

	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := User{}

	u.Email = input.Email
	u.Password = input.Password

	_, err := LoginCheck(u.Email, u.Password, true)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect; can't delete."})
		return
	}

	_, err = DeleteUser(u.Email)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not delete user."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully deleted user with the email: " + u.Email})
}

type RegisterInput struct {
	FirstName   string `json:"firstname" binding:"required"`
	LastName    string `json:"lastname" binding:"required"`
	DateOfBirth string `json:"dateofbirth" binding:"required"`
	Email       string `json:"email" binding:"required"`
	Password    string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {

	var input RegisterInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := User{}

	u.FirstName = input.FirstName
	u.LastName = input.LastName
	u.DateOfBirth = input.DateOfBirth
	u.Email = input.Email
	u.Password = input.Password

	_, err := u.SaveUser(true)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "registration success"})

}
