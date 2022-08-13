import { TeamData } from "./team.model";

export interface HistoryData {
	id?: string;
	timestamp?: string;
	createdAt?: Date;
	updatedAt?: Date;
	TeamId?: string;
	team?: TeamData;
}