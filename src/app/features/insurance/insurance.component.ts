import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INSURANCE_DATA } from '../../data/insurance.data';
import { Insurance } from '../../models/insurance.model';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-4">Car Insurance Information</h1>
        <p class="text-center text-gray-600 mb-12">Choose the right insurance for your car</p>

        <!-- Insurance Types -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          @for (insurance of insuranceTypes; track insurance.id) {
            <div class="card hover:shadow-xl transition-all">
              <div class="text-5xl mb-4 text-center">🛡️</div>
              <h3 class="text-2xl font-bold text-center mb-3">{{ insurance.name }}</h3>
              <p class="text-gray-600 text-center mb-4">{{ insurance.description }}</p>

              <div class="bg-primary text-white text-center py-3 rounded-lg mb-4">
                <div class="text-2xl font-bold">{{ insurance.priceRange }}</div>
              </div>

              <h4 class="font-semibold mb-2">Coverage Includes:</h4>
              <ul class="space-y-2 mb-6">
                @for (item of insurance.coverage; track item) {
                  <li class="flex items-start gap-2">
                    <span class="text-green-500">✓</span>
                    <span class="text-sm">{{ item }}</span>
                  </li>
                }
              </ul>

              <button class="btn-primary w-full">Get Quote</button>
            </div>
          }
        </div>

        <!-- FAQ -->
        <div class="card max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold mb-6">Insurance FAQ</h2>
          <div class="space-y-4">
            <div class="border-b pb-4">
              <h3 class="font-semibold mb-2">What type of insurance do I need?</h3>
              <p class="text-gray-700">
                At minimum, you need third-party insurance which is required by law. However,
                comprehensive insurance offers better protection.
              </p>
            </div>
            <div class="border-b pb-4">
              <h3 class="font-semibold mb-2">How is insurance premium calculated?</h3>
              <p class="text-gray-700">
                Premiums are based on factors like car value, age, driver history, location, and
                coverage type.
              </p>
            </div>
            <div class="border-b pb-4">
              <h3 class="font-semibold mb-2">Can I switch insurance providers?</h3>
              <p class="text-gray-700">
                Yes, you can switch providers at any time, but check for any cancellation fees in
                your current policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InsuranceComponent implements OnInit {
  insuranceTypes: Insurance[] = [];

  ngOnInit(): void {
    this.insuranceTypes = INSURANCE_DATA;
  }
}
