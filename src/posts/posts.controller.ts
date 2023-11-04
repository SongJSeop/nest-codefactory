import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostModel } from './entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    return this.postsService.createPost(author, title, content);
  }

  @Put('/:id')
  putPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): PostModel {
    return this.postsService.putPost(id, author, title, content);
  }

  @Patch('/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): PostModel {
    return this.postsService.patchPost(id, author, title, content);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsService.deletePostById(id);
  }
}
