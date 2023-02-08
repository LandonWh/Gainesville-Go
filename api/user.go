package main

import (
	"html"
	"strings"
	"fmt"
	"errors"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	Username string `gorm:"size:255;not null;unique" json:"username"`
	Password string `gorm:"size:255;not null;" json:"password"`
}

func GetUserByID(uid uint) (User,error) {

	var u User

	if err := DB.First(&u,uid).Error; err != nil {
		return u,errors.New("User not found!")
	}

	u.PrepareGive()
	
	return u,nil

}

func (u *User) PrepareGive(){
	u.Password = ""
}

func VerifyPassword(password,hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(username string, password string) (string,error) {
	
	var err error

	u := User{}

	err = DB.Model(User{}).Where("username = ?", username).Take(&u).Error
	fmt.Println("checking db for user")
	if err != nil {
		fmt.Println("user not present")
		return "", err
	}

	err = VerifyPassword(password, u.Password)
	fmt.Println(password, u.Password)
	fmt.Println("verifying pass")
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		fmt.Println("pass failed")
		return "", err
	}

	token,err := GenerateToken(u.ID)
	fmt.Println("generating token")
	if err != nil {
		fmt.Println("token failed")
		return "",err
	}
	fmt.Println("login success")
	return token,nil
	
}

func (u *User) SaveUser() (*User, error) {

	var err error
	err = DB.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) BeforeSave() error {

	//turn password into hash
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password),bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)

	//remove spaces in username 
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))

	return nil

}