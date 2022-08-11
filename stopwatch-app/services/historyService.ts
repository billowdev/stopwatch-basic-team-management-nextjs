import { HistoryData } from "@/models/history.model";
import httpClient from "@/utils/httpClient";

export const getHistories = async (keyword?: string): Promise<HistoryData[]> => {
	if (keyword) {
		return (await httpClient.get(`/history/keyword/${keyword}`)).data;
	} else {
		return (await httpClient.get(`/history`)).data;
	}
};

export const getHistory = async (id: string) => {
	const response = await httpClient.get(`/history/${id}`);
	return response.data;
};

export const createHistory = async (data: FormData): Promise<void> => {
	await httpClient.post(`/history`, data);
};


export const deleteHistory = async (id?: string): Promise<void> => {
	await httpClient.delete(`/history/${id}`);
};
