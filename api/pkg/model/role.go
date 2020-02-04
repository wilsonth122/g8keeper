package model

import "encoding/json"

// Role Enum
type Role int

const (
	Viewer Role = iota
	Member
	QA
	SRE
	Admin
)

func (role Role) String() string {
	names := [...]string{
		"viewer",
		"member",
		"qa",
		"sre",
		"admin",
	}

	if role < Viewer || role > Admin {
		return "Unknown"
	}

	return names[role]
}

// MarshalJSON is called when transforming this enum into JSON format.
// This is required to return a string representation of the enum rather than an int.
func (role Role) MarshalJSON() ([]byte, error) {
	return json.Marshal(role.String())
}
