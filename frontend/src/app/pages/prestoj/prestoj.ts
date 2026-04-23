// import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

// import { PaymentService } from '../../services/payment.service';
// import { ReservationService } from '../../services/reservation.service';

// @Component({
//   selector: 'app-prestoj',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './prestoj.html',
//   styleUrl: './prestoj.css',
// })
// export class PrestojComponent implements AfterViewInit {
//   selectedPackage = 'Comfort - 2.100 ден/ноќ';
//   showPaymentChoice = false;

//   petName = '';
//   breed = '';
//   arrivalDate = '';
//   departureDate = '';
//   notes = '';

//   today = new Date().toISOString().split('T')[0];

//   pendingPaymentData: {
//     amount: number;
//     reservationId: number;
//     packageName?: string;
//   } | null = null;

//   clientSecret: string | null = null;

//   isSubmitting = false;
//   isCreatingPayment = false;
//   isConfirmingPayment = false;
//   paymentMessage = '';

//   stripe: Stripe | null = null;
//   elements: StripeElements | null = null;

//   constructor(
//     private paymentService: PaymentService,
//     private reservationService: ReservationService,
//     private cdr: ChangeDetectorRef,
//   ) {}

//   async ngAfterViewInit() {
//     this.stripe = await loadStripe(
//       'pk_test_51RQCgqBNSO5IdjEOJrtfgdJfpRJIUUqWI1XegYwJIuM1KQ7oPKQSPBOTX44s81LpV8huFGkUCVMzkEQ2koBvXU0F00AoSo92bk',
//     );
//   }

//   selectPackage(paket: string) {
//     this.selectedPackage = paket;
//   }

//   isDateRangeValid(): boolean {
//     if (!this.arrivalDate || !this.departureDate) return false;

//     const today = new Date(this.today);
//     const arrival = new Date(this.arrivalDate);
//     const departure = new Date(this.departureDate);

//     today.setHours(0, 0, 0, 0);
//     arrival.setHours(0, 0, 0, 0);
//     departure.setHours(0, 0, 0, 0);

//     return arrival >= today && departure > arrival;
//   }

//   isFormValid(): boolean {
//     return !!(
//       this.petName.trim() &&
//       this.arrivalDate &&
//       this.departureDate &&
//       this.selectedPackage &&
//       this.isDateRangeValid()
//     );
//   }

//   submitReservation() {
//     if (!this.isFormValid()) {
//       alert('Пополнете ги задолжителните полиња.');
//       return;
//     }

//     const reservationData = {
//       petName: this.petName.trim(),
//       breed: this.breed.trim(),
//       arrivalDate: this.arrivalDate,
//       departureDate: this.departureDate,
//       packageName: this.selectedPackage,
//       notes: this.notes.trim(),
//     };

//     this.isSubmitting = true;
//     this.showPaymentChoice = false;
//     this.clientSecret = null;
//     this.pendingPaymentData = null;
//     this.paymentMessage = '';

//     this.reservationService.createReservation(reservationData).subscribe({
//       next: (response: any) => {
//         const reservationId = Number(response?.reservationId);

//         this.pendingPaymentData = {
//           amount: this.getPackageAmount(),
//           reservationId,
//           packageName: this.selectedPackage,
//         };

//         this.showPaymentChoice = true;
//         this.isSubmitting = false;
//         this.cdr.detectChanges();
//       },
//       error: (error) => {
//         this.isSubmitting = false;
//         this.showPaymentChoice = false;
//         this.cdr.detectChanges();
//         alert(error?.error?.message || 'Reservation failed');
//       },
//     });
//   }

//   proceedToPayment() {
//     if (!this.pendingPaymentData) {
//       alert('Нема резервација за плаќање.');
//       return;
//     }

//     this.isCreatingPayment = true;
//     this.paymentMessage = '';

//     this.paymentService.createPayment(this.pendingPaymentData).subscribe({
//       next: async (response: any) => {
//         this.clientSecret = response?.clientSecret ?? null;
//         this.isCreatingPayment = false;
//         this.cdr.detectChanges();

//         if (this.clientSecret) {
//           await this.mountPaymentElement();
//         }
//       },
//       error: (error) => {
//         this.isCreatingPayment = false;
//         this.cdr.detectChanges();
//         alert(error?.error?.message || 'Payment initialization failed');
//       },
//     });
//   }

//   async mountPaymentElement() {
//     if (!this.stripe || !this.clientSecret) return;

//     const container = document.getElementById('payment-element');
//     if (!container) return;

//     container.innerHTML = '';

//     this.elements = this.stripe.elements({
//       clientSecret: this.clientSecret,
//     });

//     const paymentElement = this.elements.create('payment');
//     paymentElement.mount('#payment-element');
//   }

//   async confirmPayment() {
//     if (!this.stripe || !this.elements) return;

//     this.isConfirmingPayment = true;
//     this.paymentMessage = '';
//     this.cdr.detectChanges();

//     const { error } = await this.stripe.confirmPayment({
//       elements: this.elements,
//       confirmParams: {
//         return_url: 'http://localhost:4200/payment-success',
//       },
//       redirect: 'if_required',
//     });

//     this.isConfirmingPayment = false;

//     if (error) {
//       this.paymentMessage = error.message || 'Payment failed.';
//     } else {
//       this.paymentMessage = 'Плаќањето е успешно потврдено.';
//       this.showPaymentChoice = false;
//     }

//     this.cdr.detectChanges();
//   }

//   cancelPayment() {
//     this.showPaymentChoice = false;
//     this.pendingPaymentData = null;
//     this.clientSecret = null;
//     this.paymentMessage = '';
//     this.cdr.detectChanges();
//   }

//   getPackageAmount(): number {
//     if (this.selectedPackage.includes('Basic')) return 120000;
//     if (this.selectedPackage.includes('Comfort')) return 210000;
//     if (this.selectedPackage.includes('Luxury')) return 350000;
//     return 210000;
//   }
// }

import { Component, ChangeDetectorRef, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

import { PaymentService } from '../../services/payment.service';
import { ReservationService } from '../../services/reservation.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-prestoj',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestoj.html',
  styleUrl: './prestoj.css',
})
export class PrestojComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paymentService = inject(PaymentService);
  private reservationService = inject(ReservationService);
  private registrationService = inject(RegistrationService);
  private cdr = inject(ChangeDetectorRef);

  registrationId: string | null = null;
  registrationData: any = null;
  isLoadingRegistration = true;

  selectedPackage = 'Comfort - 2.100 ден/ноќ';
  showPaymentChoice = false;

  pendingPaymentData: {
    amount: number;
    reservationId: number;
    packageName?: string;
  } | null = null;

  clientSecret: string | null = null;

  isSubmitting = false;
  isCreatingPayment = false;
  isConfirmingPayment = false;
  paymentMessage = '';

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;

  async ngAfterViewInit(): Promise<void> {
    this.stripe = await loadStripe(
      'pk_test_51RQCgqBNSO5IdjEOJrtfgdJfpRJIUUqWI1XegYwJIuM1KQ7oPKQSPBOTX44s81LpV8huFGkUCVMzkEQ2koBvXU0F00AoSo92bk',
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        this.router.navigate(['/registracija']);
        return;
      }

      const serviceId = this.registrationService.registrationId();

      if (!serviceId || String(serviceId) !== String(id)) {
        this.router.navigate(['/registracija']);
        return;
      }

      this.registrationId = id;
      this.loadRegistration(id);
    });
  }

  loadRegistration(id: string): void {
    this.isLoadingRegistration = true;
    this.registrationData = null;
    this.showPaymentChoice = false;
    this.clientSecret = null;
    this.pendingPaymentData = null;
    this.paymentMessage = '';

    this.reservationService.getRegistrationById(id).subscribe({
      next: (response: any) => {
        this.registrationData = response;
        this.isLoadingRegistration = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load registration:', error);
        this.isLoadingRegistration = false;
        this.cdr.detectChanges();
        this.router.navigate(['/registracija']);
      },
    });
  }

  selectPackage(paket: string): void {
    this.selectedPackage = paket;
  }

  submitReservation(): void {
    if (!this.registrationId || !this.registrationData) {
      alert('Недостасува регистрација.');
      return;
    }

    this.isSubmitting = true;
    this.showPaymentChoice = false;
    this.clientSecret = null;
    this.pendingPaymentData = null;
    this.paymentMessage = '';

    const reservationData = {
      registrationId: this.registrationId,
      packageName: this.selectedPackage,
    };

    this.reservationService.createReservation(reservationData).subscribe({
      next: (response) => {
        const reservationId = Number(response?.reservationId);

        if (!reservationId || Number.isNaN(reservationId)) {
          this.isSubmitting = false;
          this.cdr.detectChanges();
          alert('Не е вратен валиден reservationId од серверот.');
          return;
        }

        this.pendingPaymentData = {
          amount: this.getPackageAmount(),
          reservationId,
          packageName: this.selectedPackage,
        };

        this.showPaymentChoice = true;
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.showPaymentChoice = false;
        this.cdr.detectChanges();
        alert(error?.error?.message || 'Reservation failed');
      },
    });
  }

  proceedToPayment(): void {
    if (!this.pendingPaymentData) {
      alert('Нема резервација за плаќање.');
      return;
    }

    this.isCreatingPayment = true;
    this.paymentMessage = '';

    this.paymentService.createPayment(this.pendingPaymentData).subscribe({
      next: async (response: any) => {
        this.clientSecret = response?.clientSecret ?? null;
        this.isCreatingPayment = false;
        this.cdr.detectChanges();

        if (this.clientSecret) {
          await this.mountPaymentElement();
        }
      },
      error: (error) => {
        this.isCreatingPayment = false;
        this.cdr.detectChanges();
        alert(error?.error?.message || 'Payment initialization failed');
      },
    });
  }

  async mountPaymentElement(): Promise<void> {
    if (!this.stripe || !this.clientSecret) return;

    const container = document.getElementById('payment-element');
    if (!container) return;

    container.innerHTML = '';

    this.elements = this.stripe.elements({
      clientSecret: this.clientSecret,
    });

    const paymentElement = this.elements.create('payment');
    paymentElement.mount('#payment-element');
  }

  async confirmPayment(): Promise<void> {
    if (!this.stripe || !this.elements) return;

    this.isConfirmingPayment = true;
    this.paymentMessage = '';
    this.cdr.detectChanges();

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/payment-success',
      },
      redirect: 'if_required',
    });

    this.isConfirmingPayment = false;

    if (error) {
      this.paymentMessage = error.message || 'Payment failed.';
    } else {
      this.paymentMessage = 'Плаќањето е успешно потврдено.';
      this.showPaymentChoice = false;
    }

    this.cdr.detectChanges();
  }

  cancelPayment(): void {
    this.showPaymentChoice = false;
    this.pendingPaymentData = null;
    this.clientSecret = null;
    this.paymentMessage = '';
    this.cdr.detectChanges();
  }

  getPackageAmount(): number {
    if (this.selectedPackage.includes('Basic')) return 120000;
    if (this.selectedPackage.includes('Comfort')) return 210000;
    if (this.selectedPackage.includes('Luxury')) return 350000;
    return 210000;
  }
}
