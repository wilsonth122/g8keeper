package model

import "encoding/json"

// Status Enum
type Status int

const (
	QAApproval Status = iota
	SREApproval
	Approved
	Rejected
	Deployed
)

func (status Status) String() string {
	names := [...]string{
		"QAApproval",
		"SREApproval",
		"Approved",
		"Rejected",
		"Deployed",
	}

	if status < QAApproval || status > Deployed {
		return "Unknown"
	}

	return names[status]
}

// MarshalJSON is called when transforming this enum into JSON format.
// This is required to return a string representation of the enum rather than an int.
func (status Status) MarshalJSON() ([]byte, error) {
	return json.Marshal(status.String())
}
