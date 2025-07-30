import { Injectable } from '@nestjs/common';
import { prisma } from '../../prisma/client';

@Injectable()
export class UsersService {
  async getById(id: number) {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getMe(id: number) {
    try {
      const user = await this.getById(id);
      const userPosts = await prisma.post.findMany({
        where: {
          userId: user.id,
        },
      });

      return {
        ...user,
        posts: userPosts,
      };
    } catch (err) {
      throw err;
    }
  }

  async getManyByIds(usersIds: number[]) {
    try {
      return await prisma.user.findMany({
        where: {
          id: {
            in: usersIds,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
