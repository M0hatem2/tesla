import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-4">Car Maintenance Guide</h1>
        <p class="text-center text-gray-600 mb-12">Keep your car in top condition</p>

        <!-- Calculator -->
        <div class="card max-w-2xl mx-auto mb-12">
          <h2 class="text-2xl font-bold mb-6">Maintenance Schedule Calculator</h2>

          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-semibold mb-2">Current Mileage (km)</label>
              <input
                type="number"
                [(ngModel)]="currentMileage"
                class="input-field"
                placeholder="Enter current mileage"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2">Car Make</label>
              <select [(ngModel)]="selectedMake" class="input-field">
                <option value="">Select Make</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Honda">Honda</option>
              </select>
            </div>

            <button (click)="generateSchedule()" class="btn-primary w-full">
              Generate Schedule
            </button>
          </div>

          @if (showSchedule) {
            <div class="border-t pt-6">
              <h3 class="font-bold mb-4">Your Maintenance Schedule</h3>
              <div class="space-y-3">
                @for (item of maintenanceItems; track item.service) {
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div class="font-semibold">{{ item.service }}</div>
                      <div class="text-sm text-gray-600">Next due: {{ item.nextDue }} km</div>
                    </div>
                    <span
                      [class]="
                        item.status === 'ok'
                          ? 'badge-success'
                          : item.status === 'due-soon'
                            ? 'badge-warning'
                            : 'badge-danger'
                      "
                    >
                      {{ item.status }}
                    </span>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Maintenance Tips -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (tip of maintenanceTips; track tip.title) {
            <div class="card">
              <div class="text-4xl mb-3">{{ tip.icon }}</div>
              <h3 class="text-xl font-bold mb-2">{{ tip.title }}</h3>
              <p class="text-gray-700">{{ tip.description }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class MaintenanceComponent {
  currentMileage = 0;
  selectedMake = '';
  showSchedule = false;

  maintenanceItems = [
    { service: 'Oil Change', nextDue: 5000, status: 'ok' },
    { service: 'Tire Rotation', nextDue: 10000, status: 'due-soon' },
    { service: 'Brake Inspection', nextDue: 15000, status: 'ok' },
    { service: 'Air Filter', nextDue: 20000, status: 'ok' },
  ];

  maintenanceTips = [
    {
      icon: '🛢️',
      title: 'Regular Oil Changes',
      description: 'Change your oil every 5,000-7,500 km to keep your engine running smoothly',
    },
    {
      icon: '🔧',
      title: 'Check Tire Pressure',
      description: 'Maintain proper tire pressure for better fuel economy and safety',
    },
    {
      icon: '🔋',
      title: 'Battery Maintenance',
      description: 'Check battery terminals and charge regularly to avoid breakdowns',
    },
    {
      icon: '💨',
      title: 'Air Filter Replacement',
      description: 'Replace air filters every 15,000-30,000 km for optimal performance',
    },
    {
      icon: '🚿',
      title: 'Regular Washing',
      description: 'Wash your car regularly to protect the paint and prevent rust',
    },
    {
      icon: '🔍',
      title: 'Fluid Levels',
      description: 'Check coolant, brake fluid, and transmission fluid regularly',
    },
  ];

  generateSchedule(): void {
    if (this.currentMileage && this.selectedMake) {
      this.showSchedule = true;

      this.maintenanceItems = this.maintenanceItems.map((item) => {
        const nextDue = Math.ceil(this.currentMileage / 5000) * 5000 + item.nextDue;
        const diff = nextDue - this.currentMileage;

        return {
          ...item,
          nextDue,
          status: diff < 1000 ? 'overdue' : diff < 2000 ? 'due-soon' : 'ok',
        };
      });
    }
  }
}
