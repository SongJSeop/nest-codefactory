import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'John',
    title: 'My First Post',
    content: 'Hello World!',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 2,
    author: 'John',
    title: 'My Second Post',
    content: 'Hello World!',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 3,
    author: 'John',
    title: 'My Third Post',
    content: 'Hello World!',
    likeCount: 0,
    commentCount: 0,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number): PostModel {
    const foundPost: PostModel = posts.find((post) => post.id === id);

    if (!foundPost) {
      throw new NotFoundException('Post not found!');
    }

    return foundPost;
  }

  @Post()
  createPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts.push(post);
    return post;
  }
}
