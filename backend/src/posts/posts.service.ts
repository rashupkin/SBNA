import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/createPost.dto';
import { UsersService } from '../users/users.service';
import { CommentsService } from '../comments/comments.service';
import { prisma } from '../../prisma/client';

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

  async getAll() {
    try {
      const posts = await prisma.post.findMany({});

      const authors = await Promise.all(
        posts.map((post) => this.usersService.getById(post.userId)),
      );

      return posts.map((post, idx) => ({
        ...post,
        author: authors[idx],
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
      throw err;
    }
  }

  async search(req: string) {
    try {
      return await prisma.post.findMany({
        where: {
          title: {
            contains: req,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
