package controller

import (
	"net/http"

	u "github.com/wilsonth122/g8keeper/pkg/utils"
)

// AllRFCs returns all change requests
func AllRFCs(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	// user := r.Context().Value("user").(model.User)
	// conf := config.NewDatabaseConfig()

	u.RespondWithJSON(w, http.StatusOK, "")
}

// GetRFC returns a specific RFC
func GetRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	
	// user := r.Context().Value("user").(model.User)
	// conf := config.NewDatabaseConfig()

	u.RespondWithJSON(w, http.StatusOK, "")
}

// CreateRFC creates an RFC
func CreateRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	
	// user := r.Context().Value("user").(model.User)
	// conf := config.NewDatabaseConfig()

	u.RespondWithJSON(w, http.StatusOK, "")
}

// UpdateRFC updates an RFC
func UpdateRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	
	// user := r.Context().Value("user").(model.User)
	// conf := config.NewDatabaseConfig()

	u.RespondWithJSON(w, http.StatusOK, "")
}

// DeleteRFC deletes an RFC
func DeleteRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	
	// user := r.Context().Value("user").(model.User)
	// conf := config.NewDatabaseConfig()

	u.RespondWithJSON(w, http.StatusOK, "")
}
