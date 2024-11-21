import { IUser } from "../apps/ecommerce";

export type IAuthState = {
  user?: IUser;
  token?: string;
};
