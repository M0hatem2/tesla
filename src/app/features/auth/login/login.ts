import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Toast } from '../../../core/services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private toastService: Toast,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.toastService.error('Please fill in all required fields correctly');
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    const success = this.authService.login(email, password);

    if (success) {
      const user = this.authService.getCurrentUser();
      this.toastService.success('Login successful!');

      setTimeout(() => {
        if (user?.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (user?.role === 'dealer') {
          this.router.navigate(['/dealer']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, 500);
    } else {
      this.toastService.error('Invalid email or password');
      this.isLoading = false;
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
