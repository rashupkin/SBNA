import { IUser } from "./IUser";

export interface IComment {
  id: string;
  text: string;
  author: IUser;
  createdAt: string;
}
