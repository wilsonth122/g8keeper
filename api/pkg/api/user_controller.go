package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/wilsonth122/g8keeper/pkg/config"
	"github.com/wilsonth122/g8keeper/pkg/dao"
	"github.com/wilsonth122/g8keeper/pkg/model"
	u "github.com/wilsonth122/g8keeper/pkg/utils"
	"gopkg.in/mgo.v2"
)

// LoginUser returns a users details
func LoginUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	// Get user details from token
	reqUser, err := requestUsersDetails(r)
	if err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusInternalServerError, "Error logging in, please try again")
		return
	}

	// Find user in database
	user, err := dao.DBConn.FindUserByEmail(reqUser.Email)
	if err == mgo.ErrNotFound {
		// If they don't exist, add them with default role
		if err = dao.DBConn.InsertUser(reqUser); err != nil {
			log.Println(err)
			u.RespondWithError(w, http.StatusInternalServerError, "Error logging in, please try again")
			return
		}

		user = reqUser
		log.Println("New user created: " + user.Email)
	} else if err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusInternalServerError, "Error logging in, please try again")
		return
	}

	// Respond with users details
	u.RespondWithJSON(w, http.StatusOK, user)
}

// DeleteUser - Endpoint for deleting a user based on auth token
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	// Get requesting users details from token
	reqUser, err := requestUsersDetails(r)
	if err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusInternalServerError, "Error logging in, please try again")
		return
	}

	// Parse body to get user to delete
	var deleteUser model.User
	if err := json.NewDecoder(r.Body).Decode(&deleteUser); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Make sure requetsing user is authorised to delete users or request user is deleting themselves
	if reqUser.Role != model.Admin && reqUser.Email != deleteUser.Email {
		log.Println(err)
		u.RespondWithError(w, http.StatusUnauthorized, "You don't have permission to perform this action")
		return
	}

	// Delete user
	if err := dao.DBConn.RemoveUserByEmail(deleteUser.Email); err != nil {
		log.Println(err)
		u.RespondWithError(w, http.StatusBadRequest, "User doesn't exist or has already been deleted")
		return
	}

	u.RespondWithJSON(w, http.StatusOK, "User deleted")
}

// Get's the requesting users details
func requestUsersDetails(r *http.Request) (model.User, error) {
	var reqUser model.User
	userToken := r.Context().Value("user")
	// Print out all token details for debugging
	// fmt.Fprintf(w, "This is an authenticated request")
	// fmt.Fprintf(w, "Claim content:")
	// for k, v := range userToken.(*jwt.Token).Claims.(jwt.MapClaims) {
	// 	fmt.Fprintf(w, "%s :\t%#v\n", k, v)
	// }

	url := config.NewAuthConfig().UserInfoURL
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("authorization", fmt.Sprintf("Bearer %s", userToken.(*jwt.Token).Raw))

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return reqUser, err
	}

	defer res.Body.Close()
	// Print out user info for debugging
	// body, _ := ioutil.ReadAll(res.Body)
	// fmt.Println(res)
	// fmt.Println(string(body))

	if err := json.NewDecoder(res.Body).Decode(&reqUser); err != nil {
		return reqUser, err
	}

	// Grab requesting users role from database
	// Don't overwrite reqUser var as email gets overwritten even on error
	user, err := dao.DBConn.FindUserByEmail(reqUser.Email)

	// User not existing isn't an error at this point
	if err == mgo.ErrNotFound {
		return reqUser, nil
	} else if err != nil {
		return reqUser, err
	}

	return user, nil
}
