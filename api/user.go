package main

import (
	"html"
	"strings"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	//gorm.Model
	//Username string `gorm:"type:varchar;size:60;not null;unique" json:"username"`
	ID uint `gorm:"primarykey"`
	FirstName string `gorm:"type:varchar;size:60;not null;" json:"firstname"`
	LastName string `gorm:"type:varchar;size:60;not null;" json:"lastname"`
	DateOfBirth string `gorm:"type:varchar;size:60;not null;" json:"dateofbirth"`
	Email string `gorm:"type:varchar;size:60;not null;unique" json:"email"`
	Password string `gorm:"type:varchar;size:60;not null;" json:"password"`
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

func LoginCheck(email string, password string, isHashed bool) (string,error) {
	
	var err error

	u := User{}

	err = DB.Model(User{}).Where("email = ?", email).Take(&u).Error
	if err != nil {
		return "",err
	}
	
	if(isHashed) {
		err = VerifyPassword(password, u.Password)
		if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
			return "", err
		}
	} else {
		if u.Password != password {
			return "", errors.New("Incorrect password (unhashed)")
		}
	}

	token,err := GenerateToken(u.ID)

	if err != nil {
		return "",err
	}

	return token,nil
	
}

func (u *User) SaveUser(doHash bool) (*User, error) {
	
	var err error

	//turn password into hash
	if(doHash) {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password),bcrypt.DefaultCost)
		if err != nil {
			return &User{}, err
		}
		u.Password = string(hashedPassword)
	}

	//remove spaces in email 
	u.Email = html.EscapeString(strings.TrimSpace(u.Email)) //Probably useless now, keep just in case for now

	if err != nil {
		return &User{}, err
	}

	err = DB.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func DeleteUser(email string) (*User, error) {

	var err error
	
	err = DB.Unscoped().Where("email = ?", email).Delete(&User{}).Error

	if err != nil {
		return nil,err
	}

	return nil, nil
}