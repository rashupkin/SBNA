import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dtos/createComment.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    createPostDto.userId = req.user.id;

    await this.postsService.create(createPostDto);
  }

  @Get('search')
  async search(@Query('req') req: string) {
    return this.postsService.search(req);
  }

  @Get()
  async getAll() {
    return await this.postsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.postsService.getById(id);
  }

  // comments
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createComment(
    @Req() req,
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.userId = req.user.id;
    createCommentDto.postId = id;

    return this.commentsService.create(createCommentDto);
  }
}
