import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/createPost.dto';
import { UsersService } from '../users/users.service';
import { CommentsService } from '../comments/comments.service';
import { prisma } from '../../prisma/client';
import { EDbErrors } from '../constants/EDbErrors';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsSerivce: CommentsService,
  ) {}

  async create(createPost: CreatePostDto) {
    try {
      await prisma.post.create({
        data: createPost,
      });
    } catch (err) {
      throw err;
    }
  }

  async getAll({
    search,
    skip,
    take,
  }: {
    search?: string;
    skip: number;
    take: number;
  }) {
    try {
      const posts = await prisma.post.findMany({
        where: search
          ? {
              title: {
                contains: search,
              },
            }
          : undefined,
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return posts.map(({ user, ...post }) => ({
        ...post,
        author: user,
      }));
    } catch (err) {
      throw err;
    }
  }

  async getById(id: string) {
    try {
      const post = await prisma.post.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const [author, comments] = await Promise.all([
        this.usersService.getById(post.userId),
        this.commentsSerivce.getByPostId(id),
      ]);

      const userIds = [...new Set(comments.map((c) => c.userId))];
      const users = await this.usersService.getManyByIds(userIds);

      const userMap = new Map(users.map((u) => [u.id, u]));

      const commentsWithAuthors = comments.map((comment) => ({
        ...comment,
        author: userMap.get(comment.userId),
      }));

      return {
        ...post,
        author,
        comments: commentsWithAuthors,
      };
    } catch (err) {
      if (err.code === EDbErrors.NOT_FOUND) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  async put(id: string, createPostDto: CreatePostDto) {
    try {
      await prisma.post.update({
        where: { id },
        data: createPostDto,
      });
    } catch (err) {
      throw err;
    }
  }
}
