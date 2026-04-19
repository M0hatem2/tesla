import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FAQ_DATA } from '../../data/faq.data';
import { FAQ } from '../../models/faq.model';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p class="text-center text-gray-600 mb-8">Find answers to common questions</p>

          <!-- Search -->
          <div class="card mb-8">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="filterFAQs()"
              class="input-field"
              placeholder="Search questions..."
            />
          </div>

          <!-- Categories -->
          <div class="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              (click)="filterByCategory('All')"
              [class.btn-primary]="selectedCategory === 'All'"
              [class.btn-secondary]="selectedCategory !== 'All'"
            >
              All
            </button>
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

          <!-- FAQ List -->
          <div class="space-y-4">
            @for (faq of filteredFAQs; track faq.id) {
              <div class="card">
                <button
                  (click)="toggleFAQ(faq.id)"
                  class="w-full flex justify-between items-center text-left"
                >
                  <span class="font-semibold text-lg">{{ faq.question }}</span>
                  <svg
                    class="w-6 h-6 transition-transform"
                    [class.rotate-180]="openFAQs.includes(faq.id)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                @if (openFAQs.includes(faq.id)) {
                  <div class="mt-4 text-gray-700 border-t pt-4">
                    {{ faq.answer }}
                  </div>
                }
              </div>
            }
          </div>

          @if (filteredFAQs.length === 0) {
            <div class="card text-center py-12">
              <p class="text-gray-600">No questions found</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class FaqComponent implements OnInit {
  allFAQs: FAQ[] = [];
  filteredFAQs: FAQ[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  searchQuery = '';
  openFAQs: string[] = [];

  ngOnInit(): void {
    this.allFAQs = FAQ_DATA;
    this.filteredFAQs = this.allFAQs;
    this.categories = [...new Set(this.allFAQs.map((f) => f.category))];
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFAQs();
  }

  filterFAQs(): void {
    let faqs = this.allFAQs;

    if (this.selectedCategory !== 'All') {
      faqs = faqs.filter((f) => f.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      faqs = faqs.filter(
        (f) => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query),
      );
    }

    this.filteredFAQs = faqs;
  }

  toggleFAQ(id: string): void {
    const index = this.openFAQs.indexOf(id);
    if (index > -1) {
      this.openFAQs.splice(index, 1);
    } else {
      this.openFAQs.push(id);
    }
  }
}
