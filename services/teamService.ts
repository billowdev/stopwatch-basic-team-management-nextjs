import { TeamData } from "@/models/team.model";
import httpClient from "@/utils/httpClient.util";
import { ForkedTask } from "@reduxjs/toolkit";

export const getTeams = async (): Promise<TeamData[]> => {
	const response = await httpClient.get(`/team`)
	return response.data;
};

export const getTeam = async (id: string) => {
	const response = await httpClient.get(`/team/${id}`);
	return response.data;
};

export const createTeam = async (data: TeamData): Promise<any> => {
	await httpClient.post(`/team`, data);
};

export const updateTeam = async (data: any): Promise<void> => {
	await httpClient.put(`/team/${data.id}`, data);
};


export const deleteTeam = async (id?: string): Promise<void> => {
	await httpClient.delete(`/team/${id}`);
};
