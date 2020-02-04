package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/urfave/negroni"

	"github.com/wilsonth122/g8keeper/pkg/api"
	"github.com/wilsonth122/g8keeper/pkg/auth"
	"github.com/wilsonth122/g8keeper/pkg/config"
	"github.com/wilsonth122/g8keeper/pkg/dao"
)

// Setup - Should be called by the init() function upon service start up.
// Moved logic here to support multiple environments which may need custom code in the init() function to work.
func Setup() {
	// Load config
	e := godotenv.Load()
	if e != nil {
		log.Fatal(e)
	}

	conf := config.New()

	// Connect to server
	dao.DBConn.Addresses = conf.Database.Addresses
	dao.DBConn.Username = conf.Database.Username
	dao.DBConn.Password = conf.Database.Password
	dao.DBConn.AdminDatabase = conf.Database.AdminDatabase
	dao.DBConn.AppDatabase = conf.Database.AppDatabase
	dao.DBConn.UserCollection = conf.Database.UserCollection
	dao.DBConn.ExpenseCollection = conf.Database.ExpenseCollection
	dao.DBConn.Connect()
}

// Start - Should be called by the main() function upon service start up.
// Moved logic here to support multiple environments which may need custom code in the main() function to work.
func Start() {
	conf := config.New()

	// Start the websocket used for streaming expenses
	// stream.Init()

	mux := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins: conf.API.AllowedOrigins,
		AllowedMethods: conf.API.AllowedMethods,
		AllowedHeaders: conf.API.AllowedHeaders,
	})

	a := auth.JwtAuthentication()

	mux.HandleFunc("/api/user/login", api.LoginUser).Methods("GET")
	mux.HandleFunc("/api/user/delete", api.DeleteUser).Methods("DELETE")

	// mux.HandleFunc("/api/stream/rfc", api.StreamAllRFC).Methods("GET")
	// mux.HandleFunc("/api/rfc", api.AllRFC).Methods("GET")
	// mux.HandleFunc("/api/rfc/{id}", api.GetRFC).Methods("GET")
	// mux.HandleFunc("/api/rfc", api.CreateRFC).Methods("POST")
	// mux.HandleFunc("/api/rfc", api.UpdateRFC).Methods("PUT")
	// mux.HandleFunc("/api/rfc/{id}", api.DeleteRFC).Methods("DELETE")

	n := negroni.New(negroni.HandlerFunc(a.HandlerWithNext), c)
	n.UseHandler(mux)

	port := conf.API.Port
	log.Printf("Origins: %s", conf.API.AllowedOrigins)
	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), n))
}
