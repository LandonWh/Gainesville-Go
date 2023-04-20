package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

// RespondWithError is called on an error to return info regarding error
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

// Called for responses to encode and send json data
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	//encode payload to json
	response, _ := json.Marshal(payload)

	// set headers and write response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var u User
	err := decoder.Decode(&u)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Some problem occurred.")
		return
	}

	_, err = u.SaveUser(false)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, err)
		return
	}

	respondWithJSON(w, http.StatusOK, u)
}

func TestCreateUser(t *testing.T) {
	ConnectDatabase("user_testing.db") //Do this before first test

	var jsonStr = []byte(`{"firstname":"Aidan","lastname":"Winney","dateofbirth":"02072003","email":"email@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/register", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CreateUser)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"ID":1,"firstname":"Aidan","lastname":"Winney","dateofbirth":"02072003","email":"email@gmail.com","password":"password","Events":null}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestCreateDuplicateUser(t *testing.T) { //SHOULD NOT CREATE NEW USER
	var jsonStr = []byte(`{"firstname":"Aidan","lastname":"Winney","dateofbirth":"02072003","email":"email@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/register", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CreateUser)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"Code":19,"ExtendedCode":2067,"SystemErrno":0}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func UserLogin(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var u LoginInput
	err := decoder.Decode(&u)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Some problem occurred.")
		return
	}

	_, err = LoginCheck(u.Email, u.Password, false)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, err)
		return
	}

	respondWithJSON(w, http.StatusOK, u)
}

func TestUserLogin(t *testing.T) {
	var jsonStr = []byte(`{"email":"email@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UserLogin)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"email":"email@gmail.com","password":"password"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestUpperCaseEmailUserLogin(t *testing.T) {
	var jsonStr = []byte(`{"email":"EMAIL@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UserLogin)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"email":"EMAIL@gmail.com","password":"password"}` //NOTE: This test gives back the input rather than the DB contents
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestIncorrectUserLogin(t *testing.T) {
	var jsonStr = []byte(`{"email":"email@gmail.com","password":"incorrectpassword"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UserLogin)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User
	DB.Find(&users)
	respondWithJSON(w, http.StatusOK, users)
}

func TestGetUsers(t *testing.T) {
	req, err := http.NewRequest("GET", "api/admin/user", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetUsers)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `[{"ID":1,"firstname":"Aidan","lastname":"Winney","dateofbirth":"02072003","email":"email@gmail.com","password":"password","Events":null}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func DeleteOneUser(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var u LoginInput
	err := decoder.Decode(&u)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Some problem occurred.")
		return
	}
	
	_, err = DeleteUser(u.Email)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, err)
		return
	}
	respondWithJSON(w, http.StatusOK, u)
}

func TestDeleteOneUser(t *testing.T) {
	var jsonStr = []byte(`{"email":"email@gmail.com"}`)

	req, err := http.NewRequest("POST", "/api/delete", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(DeleteOneUser)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"email":"email@gmail.com","password":""}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestUserLoginAfterDelete(t *testing.T) {
	var jsonStr = []byte(`{"email":"email@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UserLogin)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestCreateUserAgainUpperCaseEmail(t *testing.T) {
	ConnectDatabase("user_testing.db") //Do this before first test

	var jsonStr = []byte(`{"firstname":"Aidan","lastname":"Winney","dateofbirth":"02072003","email":"EMAIL@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/register", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CreateUser)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"ID":1,"firstname":"Aidan","lastname":"Winney","dateofbirth":"02072003","email":"email@gmail.com","password":"password","Events":null}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestLowerCaseEmailUserLoginAfterUpperCase(t *testing.T) {
	var jsonStr = []byte(`{"email":"email@gmail.com","password":"password"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UserLogin)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"email":"email@gmail.com","password":"password"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func WipeUsers(w http.ResponseWriter, r *http.Request) {
	DB.Unscoped().Where("ID BETWEEN ? AND ?", 1, 1000).Delete(&User{})

	var users []User
	DB.Find(&users) //This is only for returning the array, nothing else
	respondWithJSON(w, http.StatusOK, users)
}

func TestWipeUsers(t *testing.T) {
	req, err := http.NewRequest("GET", "/admin/user", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(WipeUsers)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `[]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
