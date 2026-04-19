import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Blog } from '../../../core/services/blog';
import { BlogPost } from '../../../models/blog.model';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeAgoPipe],
  template: `
    @if (post) {
      <div class="min-h-screen bg-gray-50 py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <div class="card">
              <img
                [src]="post.thumbnail"
                [alt]="post.title"
                class="w-full h-96 object-cover rounded-lg mb-6"
              />

              <span class="badge-primary mb-4">{{ post.category }}</span>

              <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>

              <div class="flex items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
                <div class="flex items-center gap-2">
                  <img [src]="post.authorAvatar" class="w-10 h-10 rounded-full" />
                  <span>{{ post.author }}</span>
                </div>
                <span>📅 {{ post.createdAt | timeAgo }}</span>
                <span>⏱️ {{ post.readTime }} min read</span>
                <span>👁️ {{ post.views }} views</span>
              </div>

              <div class="prose max-w-none mb-8">
                <p class="text-lg text-gray-700 leading-relaxed">{{ post.content }}</p>
              </div>

              <div class="flex gap-2 mb-6">
                @for (tag of post.tags; track tag) {
                  <span class="badge-secondary">{{ tag }}</span>
                }
              </div>

              <div class="border-t pt-6">
                <button (click)="likePost()" class="btn-primary">👍 Like ({{ post.likes }})</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class BlogDetailsComponent implements OnInit {
  post: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: Blog,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.post = this.blogService.getPostById(postId);
  }

  likePost(): void {
    if (this.post) {
      this.blogService.likePost(this.post.id);
      this.post.likes++;
    }
  }
}
