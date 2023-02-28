package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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

func GetUsers(w http.ResponseWriter, r *http.Request) {
	DB, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Could not connect to the database")
		return
	}
	var users []User
	DB.Find(&users) //This is only for returning the array, nothing else
	rows, err := DB.Table("users").Rows()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Something went wrong.")
		return
	}
	defer rows.Close()
	
	respondWithJSON(w, http.StatusOK, users)
}

func TestGetUsers(t *testing.T) {
	req, err := http.NewRequest("GET", "/entries", nil)
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
	expected := `[]` //Insert DB here
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}