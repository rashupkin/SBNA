import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dtos/createComment.dto';
import { UsersService } from '../users/users.service';
import { prisma } from '../../prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly usersService: UsersService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = await prisma.comment.create({
        data: createCommentDto,
      });

      const author = await this.usersService.getById(comment.userId);

      return {
        ...comment,
        author,
      };
    } catch (err) {
      throw err;
    }
  }

  async getByPostId(id: string) {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: id,
        },
      });

      return comments;
    } catch (err) {
      throw err;
    }
  }
}
