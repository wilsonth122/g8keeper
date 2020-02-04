package model

// User struct
type User struct {
	Email string `bson:"email" json:"email"`
	Role  Role   `bson:"role" json:"role"`
}
