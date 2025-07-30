import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [UsersModule],
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}
