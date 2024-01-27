import { Post, User } from "@prisma/client";

export interface IPost extends Post {
  user: User;
}
