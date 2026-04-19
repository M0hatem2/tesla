import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Toast } from '../../../core/services/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private toastService: Toast,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: ['buyer', [Validators.required]],
      dealershipName: [''],
      dealershipAddress: [''],
      city: [''],
      terms: [false, [Validators.requiredTrue]],
    });

    this.registerForm.get('role')?.valueChanges.subscribe((role) => {
      if (role === 'dealer') {
        this.registerForm.get('dealershipName')?.setValidators([Validators.required]);
        this.registerForm.get('dealershipAddress')?.setValidators([Validators.required]);
      } else {
        this.registerForm.get('dealershipName')?.clearValidators();
        this.registerForm.get('dealershipAddress')?.clearValidators();
      }
      this.registerForm.get('dealershipName')?.updateValueAndValidity();
      this.registerForm.get('dealershipAddress')?.updateValueAndValidity();
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.toastService.error('Please fill in all required fields correctly');
      return;
    }

    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.toastService.error('Passwords do not match');
      return;
    }

    this.isLoading = true;
    const formData = this.registerForm.value;
    delete formData.confirmPassword;
    delete formData.terms;

    try {
      this.authService.register(formData);
      this.toastService.success('Registration successful! Welcome to CarHub');

      setTimeout(() => {
        if (formData.role === 'dealer') {
          this.router.navigate(['/dealer']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, 500);
    } catch (error) {
      this.toastService.error('Registration failed. Please try again.');
      this.isLoading = false;
    }
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get role() {
    return this.registerForm.get('role');
  }
  get terms() {
    return this.registerForm.get('terms');
  }
}
