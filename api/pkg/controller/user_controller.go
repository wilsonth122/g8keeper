package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/wilsonth122/g8keeper/pkg/config"
	"github.com/wilsonth122/g8keeper/pkg/database"
	"github.com/wilsonth122/g8keeper/pkg/model"
	u "github.com/wilsonth122/g8keeper/pkg/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

// LoginUser returns a users details
func LoginUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	user := r.Context().Value("user").(model.User)
	log.Println(user)
	conf := config.NewDatabaseConfig()

	var dbUser model.User
	if err := database.FindOne(conf.UserCollection, "email", user.Email, dbUser); err == nil {
		// Update user to match database
		user = dbUser
	} else if err == mongo.ErrNoDocuments {
		// If they don't exist then add them
		if err = database.Insert(conf.UserCollection, user); err != nil {
			log.Println(err)
			u.RespondWithError(w, http.StatusInternalServerError, "Error creating user")
			return
		}
	} else {
		log.Println(err)
		u.RespondWithError(w, http.StatusInternalServerError, "Error logging in")
		return
	}

	// Respond with users details
	u.RespondWithJSON(w, http.StatusOK, user)
}

// DeleteUser deletes a user from the database
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	user := r.Context().Value("user").(model.User)
	conf := config.NewDatabaseConfig()

	// Parse body to get user to delete
	var deleteUser model.User
	if err := json.NewDecoder(r.Body).Decode(&deleteUser); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Make sure requetsing user is authorised to delete users or request user is deleting themselves
	if user.Role != model.Admin && user.Email != deleteUser.Email {
		log.Println("User doesn't have permission to delete")
		u.RespondWithError(w, http.StatusUnauthorized, "You don't have permission to perform this action")
		return
	}

	// Delete user
	if err := database.DeleteOne(conf.UserCollection, "email", deleteUser.Email); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "User doesn't exist or has already been deleted")
		return
	}

	u.RespondWithJSON(w, http.StatusOK, "User deleted")
}
