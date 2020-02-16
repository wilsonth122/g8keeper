package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/urfave/negroni"

	"github.com/wilsonth122/g8keeper/pkg/config"
	"github.com/wilsonth122/g8keeper/pkg/controller"
	"github.com/wilsonth122/g8keeper/pkg/database"
	"github.com/wilsonth122/g8keeper/pkg/middleware"
)

// Setup should be called by the init() function upon service start up.
// Moved logic here to support multiple environments which may need custom code in the init() function to work.
func Setup() {
	// Load config
	e := godotenv.Load()
	if e != nil {
		log.Fatal(e)
	}

	conf := config.NewDatabaseConfig()
	database.Init(database.Config{
		conf.URI,
		conf.AppDatabase,
	})
}

// Start should be called by the main() function upon service start up.
// Moved logic here to support multiple environments which may need custom code in the main() function to work.
func Start() {
	conf := config.New()

	// Middleware
	cors := cors.New(cors.Options{
		AllowedOrigins: conf.API.AllowedOrigins,
		AllowedMethods: conf.API.AllowedMethods,
		AllowedHeaders: conf.API.AllowedHeaders,
	})
	auth := negroni.HandlerFunc(middleware.JwtAuthentication().HandlerWithNext)
	user := negroni.HandlerFunc(middleware.UserMiddleware)

	negroni := negroni.New(cors, auth, user)

	mux := mux.NewRouter()

	mux.HandleFunc("/api/user/login", controller.LoginUser).Methods("GET")
	mux.HandleFunc("/api/user/update", controller.UpdateUser).Methods("POST")
	mux.HandleFunc("/api/user/delete", controller.DeleteUser).Methods("DELETE")

	mux.HandleFunc("/api/rfc", controller.AllRFCs).Methods("GET")
	mux.HandleFunc("/api/rfc/{id}", controller.GetRFC).Methods("GET")
	mux.HandleFunc("/api/rfc", controller.CreateRFC).Methods("POST")
	mux.HandleFunc("/api/rfc", controller.UpdateRFC).Methods("PUT")

	negroni.UseHandler(mux)

	port := conf.API.Port
	log.Printf("Origins: %s", conf.API.AllowedOrigins)
	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), negroni))
}
