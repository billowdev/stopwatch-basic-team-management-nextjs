import httpClient from "@/utils/httpClient.util";
import { SignUp, SignIn, GetSession } from "@/models/auth.model";
type signProps = {
	username: string;
	password: string;
  };

  export const signIn = async (user: any): Promise<SignIn> => {
	const { data: response } = await httpClient.post<SignIn>(
	  `/user/auth/signin`,
	  user,
	  {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	  }
	);
	return response;
  };
  
  export async function signOut() {
	const response = await httpClient.get(`/user/auth/signout`, {
	  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.data;
  }
  
  export const getSession = async (): Promise<GetSession> => {
	const response = await httpClient.get(`/user/auth/session`, {
	  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
  
	return response.data;
  };