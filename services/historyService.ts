import { HistoryData } from "@/models/history.model";
import httpClient from "@/utils/httpClient.util";

export const getHistories = async (): Promise<HistoryData[]> => {
	const response = await httpClient.get(`/history`)
	return response.data;
};

export const getHistory = async (id: string) => {
	const response = await httpClient.get(`/history/${id}`);
	return response.data;
};

export const getHistoryByTeamId = async (id: string) => {
	const response = await httpClient.get(`/history/team/${id}`);
	return response.data;
};


export const createHistory = async (data: HistoryData): Promise<any> => {
	await httpClient.post(`/history`, data);
};


export const deleteHistory = async (id?: string): Promise<void> => {
	await httpClient.delete(`/history/${id}`);
};
