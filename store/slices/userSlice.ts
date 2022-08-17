import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@/models/user.model";
import { RootState } from "@/store/store";
import * as authService from "@/services/authService";
import httpClient from "@/utils/httpClient.util";
import { AxiosRequestConfig } from "axios";
import Router from "next/router";

interface UserState {
	token: string;
	error?: string;
	username?: string;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	user?: UserData;
}

interface SingleProp {
	data: string;
}

const initialState: UserState = {
	token: "",
	username: "",
	isAuthenticated: false,
	isAuthenticating: true,
	user: undefined,
};

interface SignAction {
	username: string;
	password: string;
}


export const signIn = createAsyncThunk(
	"user/signin",
	async (credential: SignAction) => {
		const response = await authService.signIn(credential);
		if (response.user == null) {
			throw new Error("login failed");
		}

		httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
			if (config && config.headers) {
				config.headers["Authorization"] = `Bearer ${response.token}`;
			}

			return config;
		});
		return response;
	}
);

export const signOut = createAsyncThunk("user/signout", async () => {
	await authService.signOut();
	Router.push("/auth/signin");
});

export const getSession = createAsyncThunk("user/fetchSession", async () => {
	const response = await authService.getSession();
	// set access token
	if (response) {
		httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
			if (config && config.headers && response.id) {
				config.headers["Authorization"] = `Bearer ${response.token}`;
			}
			return config;
		});
	}
	return response;
});

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.isAuthenticating = false;
			state.user = action.payload.user;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.token = "";
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.user = undefined;
		});
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.token = "";
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.user = undefined;
		});
		builder.addCase(getSession.fulfilled, (state, action) => {
			state.isAuthenticating = false;
			if (action.payload.id && action.payload.username) {
				state.token = action.payload.token
				state.username = action.payload.username
				state.isAuthenticated = true;
			}
		});
		builder.addCase(getSession.rejected, (state, action) => {
			state.isAuthenticating = true;
			state.isAuthenticated = false;
		});
	},
});

export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean =>
	store.user.isAuthenticated;
export const isAuthenticatingSelector = (store: RootState): boolean =>
	store.user.isAuthenticating;


// // export reducer
export default userSlice.reducer;
