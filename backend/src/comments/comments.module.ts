import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, UsersService],
  exports: [CommentsService],
})
export class CommentsModule {}
