import { UserData } from "./user.model";

export interface SignIn {
  token: string;
  user: UserData;
}

export interface SignUp {
  token: string;
  user: UserData;
}

export interface GetSession {
  id: string;
  username: string;
  token: string;
  iat?: number;
  exp?: number;
}
