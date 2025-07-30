import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface IPost {
  id: string;
  title: string;
  description: string;
  author: IUser;
  updatedAt: string;
  createdAt: string;
  comments?: IComment[];
}
