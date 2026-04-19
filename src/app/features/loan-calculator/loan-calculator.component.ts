import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanCalculator } from '../../core/services/loan-calculator';
import { LoanResult } from '../../models/loan.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyFormatPipe],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-center mb-4">Car Loan Calculator</h1>
          <p class="text-center text-gray-600 mb-8">Calculate your monthly car loan payments</p>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Calculator Form -->
            <div class="card">
              <h3 class="text-xl font-bold mb-6">Loan Details</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold mb-2">Car Price ($)</label>
                  <input
                    type="number"
                    [(ngModel)]="carPrice"
                    (input)="calculate()"
                    class="input-field"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold mb-2">Down Payment ($)</label>
                  <input
                    type="number"
                    [(ngModel)]="downPayment"
                    (input)="calculate()"
                    class="input-field"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold mb-2">Trade-In Value ($)</label>
                  <input
                    type="number"
                    [(ngModel)]="tradeIn"
                    (input)="calculate()"
                    class="input-field"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold mb-2">Loan Term (months)</label>
                  <select [(ngModel)]="term" (change)="calculate()" class="input-field">
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                    <option value="72">72 months</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-semibold mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    [(ngModel)]="apr"
                    (input)="calculate()"
                    step="0.1"
                    class="input-field"
                  />
                </div>
              </div>
            </div>

            <!-- Results -->
            <div class="card">
              <h3 class="text-xl font-bold mb-6">Loan Summary</h3>

              @if (result) {
                <div class="space-y-4">
                  <div class="p-6 bg-primary text-white rounded-lg text-center">
                    <div class="text-sm mb-2">Monthly Payment</div>
                    <div class="text-4xl font-bold">
                      {{ result.monthlyPayment | currencyFormat }}
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                      <div class="text-sm text-gray-600 mb-1">Loan Amount</div>
                      <div class="text-xl font-bold">{{ result.loanAmount | currencyFormat }}</div>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg">
                      <div class="text-sm text-gray-600 mb-1">Total Payment</div>
                      <div class="text-xl font-bold">
                        {{ result.totalPayment | currencyFormat }}
                      </div>
                    </div>

                    <div class="p-4 bg-gray-50 rounded-lg col-span-2">
                      <div class="text-sm text-gray-600 mb-1">Total Interest</div>
                      <div class="text-xl font-bold text-accent">
                        {{ result.totalInterest | currencyFormat }}
                      </div>
                    </div>
                  </div>

                  <div class="border-t pt-4">
                    <h4 class="font-semibold mb-2">Breakdown</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span>Car Price:</span>
                        <span class="font-semibold">{{ carPrice | currencyFormat }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Down Payment:</span>
                        <span class="font-semibold">-{{ downPayment | currencyFormat }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Trade-In:</span>
                        <span class="font-semibold">-{{ tradeIn | currencyFormat }}</span>
                      </div>
                      <div class="flex justify-between border-t pt-2">
                        <span class="font-bold">Loan Amount:</span>
                        <span class="font-bold">{{ result.loanAmount | currencyFormat }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Tips -->
          <div class="card mt-6">
            <h3 class="text-xl font-bold mb-4">💡 Loan Tips</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• A larger down payment reduces your monthly payments and total interest</li>
              <li>• Shorter loan terms mean higher monthly payments but less interest overall</li>
              <li>• Shop around for the best interest rates from different lenders</li>
              <li>• Consider your trade-in value to reduce the loan amount</li>
              <li>• Factor in insurance, maintenance, and fuel costs in your budget</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoanCalculatorComponent {
  carPrice = 30000;
  downPayment = 5000;
  tradeIn = 0;
  term = 60;
  apr = 5.5;
  result: LoanResult | null = null;

  constructor(private loanCalculator: LoanCalculator) {
    this.calculate();
  }

  calculate(): void {
    this.result = this.loanCalculator.calculate(
      this.carPrice,
      this.downPayment,
      this.tradeIn,
      this.term,
      this.apr,
    );
  }
}
