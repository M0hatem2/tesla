import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Car as CarService } from '../../../core/services/car';
import { Booking as BookingService } from '../../../core/services/booking';
import { Auth } from '../../../core/services/auth';
import { Toast } from '../../../core/services/toast';
import { Car } from '../../../models/car.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <h1 class="text-3xl font-bold text-center mb-8">Book Test Drive</h1>

          @if (car) {
            <div class="card mb-6">
              <div class="flex gap-4">
                <img [src]="car.images[0]" class="w-32 h-24 object-cover rounded" />
                <div>
                  <h3 class="text-xl font-bold">{{ car.make }} {{ car.model }}</h3>
                  <p class="text-gray-600">{{ car.year }} • {{ car.fuelType }}</p>
                </div>
              </div>
            </div>

            <div class="card">
              <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold mb-2">Full Name *</label>
                    <input type="text" formControlName="customerName" class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Email *</label>
                    <input type="email" formControlName="customerEmail" class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Phone *</label>
                    <input type="tel" formControlName="customerPhone" class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">National ID *</label>
                    <input type="text" formControlName="nationalId" class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Preferred Date *</label>
                    <input type="date" formControlName="date" [min]="minDate" class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Time Slot *</label>
                    <select formControlName="timeSlot" class="input-field">
                      <option value="">Select time</option>
                      @for (slot of availableSlots; track slot) {
                        <option [value]="slot">{{ slot }}</option>
                      }
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Special Requests</label>
                    <textarea
                      formControlName="specialRequests"
                      rows="3"
                      class="input-field"
                    ></textarea>
                  </div>

                  <button type="submit" [disabled]="isLoading" class="btn-primary w-full">
                    @if (isLoading) {
                      <span>Booking...</span>
                    } @else {
                      <span>Confirm Booking</span>
                    }
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class BookingFormComponent implements OnInit {
  car: Car | undefined;
  bookingForm: FormGroup;
  isLoading = false;
  minDate = '';
  availableSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private bookingService: BookingService,
    private authService: Auth,
    private toastService: Toast,
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    const user = this.authService.getCurrentUser();

    this.bookingForm = this.fb.group({
      customerName: [user?.fullName || '', Validators.required],
      customerEmail: [user?.email || '', [Validators.required, Validators.email]],
      customerPhone: [user?.phone || '', Validators.required],
      nationalId: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      specialRequests: [''],
    });
  }

  ngOnInit(): void {
    const carId = this.route.snapshot.params['carId'];
    this.car = this.carService.getCarById(carId);
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || !this.car) {
      this.toastService.error('Please fill all required fields');
      return;
    }

    this.isLoading = true;

    const bookingData = {
      ...this.bookingForm.value,
      carId: this.car.id,
      dealerId: this.car.dealerId,
    };

    const booking = this.bookingService.createBooking(bookingData);

    this.toastService.success('Test drive booked successfully!');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
