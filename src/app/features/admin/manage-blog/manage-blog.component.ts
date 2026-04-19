import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Blog } from '../../../core/services/blog';
import { BlogPost } from '../../../models/blog.model';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-manage-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">📝 Manage Blog</h1>
          <p class="text-gray-600 mt-2">Create and manage blog posts</p>
        </div>
        <button class="btn-primary" (click)="showAddModal = true">+ New Blog Post</button>
      </div>

      <!-- Filters -->
      <div class="card mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterPosts()"
            placeholder="Search posts..."
            class="input-field"
          />
          <select [(ngModel)]="filterStatus" (ngModelChange)="filterPosts()" class="input-field">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select [(ngModel)]="filterCategory" (ngModelChange)="filterPosts()" class="input-field">
            <option value="">All Categories</option>
            <option value="News">News</option>
            <option value="Tips">Tips</option>
            <option value="Reviews">Reviews</option>
            <option value="Guides">Guides</option>
          </select>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="text-gray-600 text-sm">Total Posts</div>
          <div class="text-3xl font-bold text-gray-800 mt-2">{{ allPosts.length }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Published</div>
          <div class="text-3xl font-bold text-green-600 mt-2">
            {{ allPosts.filter((p) => p.status === 'published').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Drafts</div>
          <div class="text-3xl font-bold text-yellow-600 mt-2">
            {{ allPosts.filter((p) => p.status === 'draft').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Total Views</div>
          <div class="text-3xl font-bold text-blue-600 mt-2">{{ getTotalViews() }}</div>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (post of filteredPosts; track post.id) {
          <div class="card">
            <!-- Post Image -->
            <img
              [src]="post.thumbnail"
              [alt]="post.title"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />

            <!-- Post Header -->
            <div class="flex items-center justify-between mb-3">
              <span class="badge-primary">{{ post.category }}</span>
              <span
                class="px-2 py-1 rounded-full text-xs font-semibold"
                [ngClass]="{
                  'bg-green-100 text-green-700': post.status === 'published',
                  'bg-yellow-100 text-yellow-700': post.status === 'draft',
                }"
              >
                {{ post.status }}
              </span>
            </div>

            <!-- Post Title & Excerpt -->
            <h3 class="font-bold text-gray-800 mb-2 line-clamp-2">{{ post.title }}</h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3">
              {{ post.content.substring(0, 150) }}...
            </p>

            <!-- Post Meta -->
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div class="flex items-center gap-1">
                <span>👤</span>
                <span>{{ post.author }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span>👁️</span>
                <span>{{ post.views }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span>💬</span>
                <span>{{ post.comments.length }}</span>
              </div>
            </div>

            <!-- Post Date -->
            <div class="text-sm text-gray-500 mb-4">Published {{ post.createdAt | timeAgo }}</div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              @for (tag of post.tags.slice(0, 3); track tag) {
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{{ tag }}</span>
              }
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-4 border-t border-gray-200">
              <button
                (click)="editPost(post)"
                class="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-semibold"
              >
                Edit
              </button>
              @if (post.status === 'draft') {
                <button
                  (click)="publishPost(post.id)"
                  class="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-semibold"
                >
                  Publish
                </button>
              } @else {
                <button
                  (click)="unpublishPost(post.id)"
                  class="flex-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm font-semibold"
                >
                  Unpublish
                </button>
              }
              <button
                (click)="deletePost(post.id)"
                class="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-semibold"
              >
                🗑️
              </button>
            </div>
          </div>
        } @empty {
          <div class="col-span-full text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">📝</div>
            <p>No blog posts found</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class ManageBlogComponent implements OnInit {
  allPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];

  searchQuery = '';
  filterStatus = '';
  filterCategory = '';
  showAddModal = false;

  constructor(private blogService: Blog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allPosts = this.blogService.getAllPosts();
    this.filterPosts();
  }

  filterPosts(): void {
    this.filteredPosts = this.allPosts.filter((post) => {
      const matchesSearch =
        !this.searchQuery ||
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.filterStatus || post.status === this.filterStatus;
      const matchesCategory = !this.filterCategory || post.category === this.filterCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }

  getTotalViews(): number {
    return this.allPosts.reduce((sum, post) => sum + post.views, 0);
  }

  editPost(post: BlogPost): void {
    console.log('Edit post:', post);
  }

  publishPost(postId: string): void {
    this.blogService.updatePostStatus(postId, 'published');
    this.loadData();
  }

  unpublishPost(postId: string): void {
    this.blogService.updatePostStatus(postId, 'draft');
    this.loadData();
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deletePost(postId);
      this.loadData();
    }
  }
}
