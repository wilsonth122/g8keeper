package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/wilsonth122/g8keeper/pkg/config"
	"github.com/wilsonth122/g8keeper/pkg/database"
	"github.com/wilsonth122/g8keeper/pkg/model"
	u "github.com/wilsonth122/g8keeper/pkg/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

// UserMiddleware transforms the user token from the request
// into a user object containing information about the user
func UserMiddleware(rw http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	userToken := r.Context().Value("user")

	// No token then carry on the chain
	if userToken == nil {
		log.Println("User Token is missing from request")
		u.RespondWithError(rw, http.StatusUnauthorized, "Missing token")
		return
	}

	// Get the users info from Auth0
	user, err := getUserInfo(userToken)
	if err != nil {
		log.Printf("Unable to get user details from Auth0: %s", err)
		u.RespondWithError(rw, http.StatusInternalServerError, "Please try again")
		return
	}

	// Get the users current role from the database if they exist
	conf := config.NewDatabaseConfig()
	dbUser := model.User{}
	if err = database.Find(conf.UserCollection, "email", user.Email, &dbUser); err == nil {
		// Update user to match database
		user = dbUser
	} else if err != nil && err != mongo.ErrNoDocuments {
		log.Printf("Unable to get user details from database: %s", err)
		u.RespondWithError(rw, http.StatusInternalServerError, "Please try again")
		return
	}

	// Add user info to calling chain
	ctx := context.WithValue(r.Context(), "user", user)
	r = r.WithContext(ctx)

	next(rw, r)
}

// Makes a request to the Auth0 UserInfo endpoint and returns the given users details
func getUserInfo(userToken interface{}) (model.User, error) {
	var user model.User

	url := config.NewAuthConfig().UserInfoURL
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("authorization", fmt.Sprintf("Bearer %s", userToken.(*jwt.Token).Raw))

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return user, err
	}

	defer res.Body.Close()

	if err = json.NewDecoder(res.Body).Decode(&user); err != nil {
		return user, err
	}

	return user, nil
}
