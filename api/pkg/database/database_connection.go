package database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Config required to make a database connection
type Config struct {
	URI      string
	Database string
}

var conf *Config
var database *mongo.Database

// Init opens the database connection.
// If an error occurs, the error is logged and the program exits.
func Init(conf Config) {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(conf.URI))
	if err != nil {
		log.Fatalf("Unable to initialise database client: %s", err)
	}

	// Test connection has established
	ctx, _ = context.WithTimeout(context.Background(), 2*time.Second)
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatalf("Unable to establish database connection: %s", err)
	}

	database = client.Database(conf.Database)
}

// Insert inserts a document into the given collection
//  - Collection is the database collection to insert into
//  - Document is a bson object to insert
func Insert(collection string, document interface{}) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := database.Collection(collection).InsertOne(ctx, &document)

	return err
}

// Update updates a document that matches the given identifier in the given collection
// If no document matches then a new one will be created
// - Collection is the database collection to update
// - IdentifierField is the name of the field used to identify the document to update
// - IdentifierValue is the value of the field used to identify the document to update
// - Document is a bson object that will replace the current document
func Update(collection string, identifierField string, identifierValue string, document interface{}) error {
	// Setting this option creates a new document if none are found
	opts := options.Replace().SetUpsert(true)
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := database.Collection(collection).ReplaceOne(ctx, bson.M{identifierField: identifierValue}, document, opts)

	return err
}

// Find finds a document containing the given identifier from the given collection
// - Collection is the database collection to search
// - IdentifierField is the name of the field searched against
// - IdentifierValue is the value of the field to search for
// - Document is a bson object to decode the result into
// E.g. err := database.Find("users", "email", "thomas@gmail.com", user)
func FindOne(collection string, identifierField string, identifierValue string, document interface{}) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var result bson.M
	err := database.Collection(collection).FindOne(ctx, bson.M{identifierField: identifierValue}).Decode(&result)
	log.Panicln(result)
	return err
}

// // FindAll finds all documents containing the given identifier from the given collection
// // - Collection is the database collection to search
// // - IdentifierField is the name of the field searched against
// // - IdentifierValue is the value of the field to search for
// // - Document is a bson object to decode the result into
// // E.g. err := database.FindAll("users", "email", "thomas@gmail.com", user)
// func FindAll(collection string, identifierField string, identifierValue string, document interface{}) error {
// 	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
// 	cursor, err := database.Collection(collection).Find(ctx, bson.M{identifierField: identifierValue})

// }

// DeleteOne finds a document containing the given identifier from the given colleciton and deletes it
// - Collection is the database collection to delete from
// - IdentifierField is the name of the field searched against
// - IdentifierValue is the value of the field to search for
// E.g. err := database.DeleteOne("users", "email", "thomas@gmail.com")
func DeleteOne(collection string, identifierField string, identifierValue string) error {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, err := database.Collection(collection).DeleteOne(ctx, bson.M{identifierField: identifierValue})

	return err
}

// // DeleteAll finds all documents containing the given identifier from the given colleciton and deletes them
// // - Collection is the database collection to delete from
// // - IdentifierField is the name of the field searched against
// // - IdentifierValue is the value of the field to search for
// // E.g. err := database.DeleteAll("users", "email", "thomas@gmail.com")
// func DeleteAll(collection string, identifierField string, identifierValue string) error {
// 	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
// 	_, err := database.Collection(collection).Delete(ctx, bson.M{identifierField: identifierValue})
//
// 	return err
// }
