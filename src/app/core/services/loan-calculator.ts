import { Injectable } from '@angular/core';
import { LoanResult, AmortizationRow } from '../../models/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculator {
  calculate(
    carPrice: number,
    downPayment: number,
    tradeIn: number,
    term: number,
    apr: number,
  ): LoanResult {
    const loanAmount = carPrice - downPayment - tradeIn;
    const monthlyRate = apr / 100 / 12;
    const numberOfPayments = term;

    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
    };
  }

  generateAmortizationTable(
    loanAmount: number,
    monthlyRate: number,
    term: number,
  ): AmortizationRow[] {
    const table: AmortizationRow[] = [];
    let balance = loanAmount;

    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term))) /
      (Math.pow(1 + monthlyRate, term) - 1);

    for (let month = 1; month <= term; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;

      table.push({
        month,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(Math.max(0, balance) * 100) / 100,
      });
    }

    return table;
  }
}
