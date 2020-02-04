package model

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
