import { IPost } from "./IPost";

export interface IUser {
  id: number;
  username: string;
  email: string;
  posts: IPost[];
}
