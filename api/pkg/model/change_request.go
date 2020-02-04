package model

import (
	"gopkg.in/mgo.v2/bson"
)

// ChangeRequest struct
type ChangeRequest struct {
	ID               bson.ObjectId `bson:"_id" json:"id"`
	Status           Status        `bson:"status" json:"status"`
	Title            string        `bson:"title" json:"title"`
	Description      string        `bson:"description" json:"description"`
	ReleaseDate      float32       `bson:"releaseDate" json:"releaseDate"`
	ReleaseTime      string        `bson:"releaseTime" json:"releaseTime"`
	PullRequestLinks bool          `bson:"pullRequestLinks" json:"pullRequestLinks"`
	UserStoryLinks   string        `bson:"userStoryLinks" json:"userStoryLinks"`
	OutageRequired   bool          `bson:"outageRequired" json:"outageRequired"`
}
