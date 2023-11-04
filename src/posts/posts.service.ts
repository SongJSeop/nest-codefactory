import { Injectable, NotFoundException } from '@nestjs/common';
import { PostModel } from './entities/posts.entity';

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

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const foundPost: PostModel = posts.find((post) => post.id === id);

    if (!foundPost) {
      throw new NotFoundException('Post not found!');
    }

    return foundPost;
  }

  createPost(author: string, title: string, content: string): PostModel {
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

  putPost(
    id: number,
    author?: string,
    title?: string,
    content?: string,
  ): PostModel {
    const foundPost: PostModel = posts.find((post) => post.id === id);

    if (!foundPost) {
      throw new NotFoundException('Post not found!');
    }

    foundPost.author = author;
    foundPost.title = title;
    foundPost.content = content;

    return foundPost;
  }

  patchPost(
    id: number,
    author?: string,
    title?: string,
    content?: string,
  ): PostModel {
    const foundPost: PostModel = posts.find((post) => post.id === id);

    if (!foundPost) {
      throw new NotFoundException('Post not found!');
    }

    if (author) {
      foundPost.author = author;
    }

    if (title) {
      foundPost.title = title;
    }

    if (content) {
      foundPost.content = content;
    }

    return foundPost;
  }

  deletePostById(postId: number): PostModel {
    const foundPostIndex: number = posts.findIndex(
      (post) => post.id === postId,
    );

    if (foundPostIndex === -1) {
      throw new NotFoundException('Post not found!');
    }

    const foundPost: PostModel = posts[foundPostIndex];
    posts = posts.filter((post) => post.id !== postId);

    return foundPost;
  }
}
