import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BlogPost, CommentData } from '../../models/blog.model';
import { BLOG_DATA } from '../../data/blog.data';

@Injectable({
  providedIn: 'root',
})
export class Blog {
  private readonly STORAGE_KEY = 'carhub_blog';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeBlog();
  }

  private initializeBlog(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(BLOG_DATA));
    }
  }

  private getPosts(): BlogPost[] {
    if (!this.isBrowser) return BLOG_DATA;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private savePosts(posts: BlogPost[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
  }

  getAllPosts(): BlogPost[] {
    return this.getPosts().filter((p) => p.status === 'published');
  }

  getPostById(id: string): BlogPost | undefined {
    const post = this.getPosts().find((p) => p.id === id);
    if (post) {
      post.views++;
      this.updatePost(id, { views: post.views });
    }
    return post;
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.getAllPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  searchPosts(query: string): BlogPost[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllPosts().filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.content.toLowerCase().includes(lowerQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(lowerQuery)),
    );
  }

  addComment(postId: string, comment: CommentData): void {
    const posts = this.getPosts();
    const index = posts.findIndex((p) => p.id === postId);

    if (index !== -1) {
      const newComment = {
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      posts[index].comments.push(newComment);
      this.savePosts(posts);
    }
  }

  likePost(postId: string): void {
    const posts = this.getPosts();
    const index = posts.findIndex((p) => p.id === postId);

    if (index !== -1) {
      posts[index].likes++;
      this.savePosts(posts);
    }
  }

  updatePost(id: string, data: Partial<BlogPost>): void {
    const posts = this.getPosts();
    const index = posts.findIndex((p) => p.id === id);

    if (index !== -1) {
      posts[index] = { ...posts[index], ...data };
      this.savePosts(posts);
    }
  }

  deletePost(id: string): void {
    const posts = this.getPosts();
    const filtered = posts.filter((p) => p.id !== id);
    this.savePosts(filtered);
  }

  updatePostStatus(postId: string, status: 'published' | 'draft'): void {
    const posts = this.getPosts();
    const index = posts.findIndex((p) => p.id === postId);

    if (index !== -1) {
      posts[index].status = status;
      this.savePosts(posts);
    }
  }
}
