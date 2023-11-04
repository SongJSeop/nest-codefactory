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
  getPosts(): Promise<PostModel[]> {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<PostModel> {
    return this.postsService.createPost(author, title, content);
  }

  @Patch('/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): Promise<PostModel> {
    return this.postsService.updatePost(id, author, title, content);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.postsService.deletePostById(id);
  }
}
