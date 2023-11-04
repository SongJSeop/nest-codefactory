import { Injectable, NotFoundException } from '@nestjs/common';
import { PostModel } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postsRepository: Repository<PostModel>,
  ) {}

  getAllPosts(): Promise<PostModel[]> {
    return this.postsRepository.find();
  }

  async getPostById(id: number): Promise<PostModel> {
    const foundPost: PostModel = await this.postsRepository.findOne({
      where: { id },
    });

    if (!foundPost) {
      throw new NotFoundException('Post not found!');
    }

    return foundPost;
  }

  async createPost(author: string, title: string, content: string): Promise<PostModel> {
    const post: PostModel = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost: PostModel = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    id: number,
    author?: string,
    title?: string,
    content?: string,
  ): Promise<PostModel> {
    const foundPost: PostModel = await this.postsRepository.findOne({ where: { id } });

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

    const updatedPost: PostModel = await this.postsRepository.save(foundPost);

    return updatedPost;
  }

  async deletePostById(id: number): Promise<number> {
    const foundPost: PostModel = await this.postsRepository.findOne({ where: { id: id } });

    if (!foundPost) {
      throw new NotFoundException('Post not found!');
    }

    await this.postsRepository.delete(id);

    return id;
  }
}
