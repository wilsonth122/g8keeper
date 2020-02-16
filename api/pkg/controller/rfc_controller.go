package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/wilsonth122/g8keeper/pkg/config"
	"github.com/wilsonth122/g8keeper/pkg/database"
	"github.com/wilsonth122/g8keeper/pkg/model"
	u "github.com/wilsonth122/g8keeper/pkg/utils"
)

// AllRFCs returns all change requests
func AllRFCs(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	//user := r.Context().Value("user").(model.User)
	//conf := config.NewDatabaseConfig()

	// Get all RFC's from the DB
	dbRFC := model.RFC{}
	// TODO: pagination from a Mongo DB
	// rfcs, err := database.FindAll(conf.RFCCollection, &dbRFC)
	// if err != nil {
	// 	log.Println(err)
	// 	u.RespondWithError(w, http.StatusBadRequest, "Unable to create RFC")
	// 	return
	// }

	u.RespondWithJSON(w, http.StatusOK, dbRFC)
}

// GetRFC returns a specific RFC
func GetRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	//user := r.Context().Value("user").(model.User)
	conf := config.NewDatabaseConfig()

	// Parse body to get RFC ID
	var rfc model.RFC
	if err := json.NewDecoder(r.Body).Decode(&rfc); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Get RFC
	dbRFC := model.RFC{}
	if err := database.Find(conf.RFCCollection, "_id", rfc.ID.String(), &dbRFC); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Unable to create RFC")
		return
	}

	u.RespondWithJSON(w, http.StatusOK, dbRFC)
}

// CreateRFC creates an RFC
func CreateRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	user := r.Context().Value("user").(model.User)
	conf := config.NewDatabaseConfig()

	// Parse body to get RFC
	var rfc model.RFC
	if err := json.NewDecoder(r.Body).Decode(&rfc); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Make sure requetsing user is authorised to create the RFC
	if user.Role == model.Viewer {
		log.Println("User doesn't have permission to update an RFC")
		u.RespondWithError(w, http.StatusUnauthorized, "You don't have permission to perform this action")
		return
	}

	// Create RFC
	id, err := database.Insert(conf.RFCCollection, rfc)
	if err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Unable to create RFC")
		return
	}

	u.RespondWithJSON(w, http.StatusOK, id)
}

// UpdateRFC updates an RFC
func UpdateRFC(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	user := r.Context().Value("user").(model.User)
	conf := config.NewDatabaseConfig()

	// Parse body to get RFC to update
	var rfc model.RFC
	if err := json.NewDecoder(r.Body).Decode(&rfc); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Make sure requetsing user is authorised to update the RFC
	if user.Role == model.Viewer {
		log.Println("User doesn't have permission to update an RFC")
		u.RespondWithError(w, http.StatusUnauthorized, "You don't have permission to perform this action")
		return
	}

	// Update RFC
	if err := database.Update(conf.RFCCollection, "_id", rfc.ID.String(), rfc); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Unable to update RFC")
		return
	}

	u.RespondWithJSON(w, http.StatusOK, "RFC updated")
}
