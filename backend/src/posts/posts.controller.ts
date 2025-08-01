import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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

  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    return await this.postsService.getAll({ search, skip, take });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.postsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async put(
    @Req() req,
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    createPostDto.userId = req.user.id;

    await this.postsService.put(id, createPostDto);
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
