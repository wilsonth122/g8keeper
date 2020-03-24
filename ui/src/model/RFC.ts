
export interface RFC {
    id: string,
	ownerID: string,
	status: StatusEnum,
	title: string,
	description: string,
	releaseDate: string,
	releaseTime: string,
	pullRequestLinks: boolean,
	userStoryLinks: string,
	outageRequired: boolean
}

export interface Status {
	id: number,
	label: string,
	color: string,
	active: boolean
}

enum StatusEnum {
	QAApproval = 0,
	SREApproval,
	Approved,
	Rejected,
	Deployed
}

export const StatusText: Array<string> = ["Waiting QA Approval", "Waiting SRE Approval", "Approved", "Rejected", "Deployed"]

export const Statuses: Array<Status> = [
	{
		id: 0,
		label: "Waiting QA Approval",
		color: "warning",
		active: true
	},
	{
		id: 1,
		label: "Waiting SRE Approval",
		color: "secondary",
		active: false
	},
	{
		id: 2,
		label: "Approved",
		color: "success",
		active: false
	},
	{
		id: 3,
		label: "Rejected",
		color: "danger",
		active: true
	},
	{
		id: 4,
		label: "Deployed",
		color: "dark",
		active: false
	}
]