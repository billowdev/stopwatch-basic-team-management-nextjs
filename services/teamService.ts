import { TeamData } from "@/models/team.model";
import httpClient from "@/utils/httpClient";

export const getTeams = async (): Promise<TeamData[]> => {
	const response = await httpClient.get(`/team`)
	return response.data;
};

export const getTeam = async (id: string) => {
	const response = await httpClient.get(`/team/${id}`);
	return response.data;
};

export const createTeam = async (data: FormData): Promise<void> => {
	await httpClient.post(`/team`, data);
};

export const updateTeam = async (data: any): Promise<void> => {
	await httpClient.patch(`/team`, data);
};


export const deleteTeam = async (id?: string): Promise<void> => {
	await httpClient.delete(`/team/${id}`);
};
