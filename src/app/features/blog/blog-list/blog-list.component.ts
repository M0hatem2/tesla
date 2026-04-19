import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../../core/services/blog';
import { BlogPost } from '../../../models/blog.model';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeAgoPipe],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-4">Blog & Articles</h1>
        <p class="text-center text-gray-600 mb-8">Latest news and guides about cars</p>

        <!-- Categories -->
        <div class="flex flex-wrap gap-2 mb-8 justify-center">
          @for (category of categories; track category) {
            <button
              (click)="filterByCategory(category)"
              [class.btn-primary]="selectedCategory === category"
              [class.btn-secondary]="selectedCategory !== category"
            >
              {{ category }}
            </button>
          }
        </div>

        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (post of filteredPosts; track post.id) {
            <div class="card hover:shadow-xl transition-all">
              <img
                [src]="post.thumbnail"
                [alt]="post.title"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />

              <span class="badge-primary mb-3">{{ post.category }}</span>

              <h3 class="text-xl font-bold mb-2 hover:text-primary">
                <a [routerLink]="['/blog', post.id]">{{ post.title }}</a>
              </h3>

              <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span>👤 {{ post.author }}</span>
                <span>📅 {{ post.createdAt | timeAgo }}</span>
                <span>⏱️ {{ post.readTime }} min read</span>
              </div>

              <p class="text-gray-700 mb-4 line-clamp-3">{{ post.content }}</p>

              <a [routerLink]="['/blog', post.id]" class="btn-primary text-sm"> Read More → </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class BlogListComponent implements OnInit {
  allPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  categories: string[] = ['All'];
  selectedCategory = 'All';

  constructor(private blogService: Blog) {}

  ngOnInit(): void {
    this.allPosts = this.blogService.getAllPosts();
    this.filteredPosts = this.allPosts;

    const uniqueCategories = [...new Set(this.allPosts.map((p) => p.category))];
    this.categories = ['All', ...uniqueCategories];
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredPosts = this.allPosts;
    } else {
      this.filteredPosts = this.blogService.getPostsByCategory(category);
    }
  }
}
