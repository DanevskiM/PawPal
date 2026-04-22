import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-prestoj',
  imports: [CommonModule, FormsModule],
  templateUrl: './prestoj.html',
  styleUrl: './prestoj.css',
})
export class PrestojComponent {
  selectedPackage = 'Comfort - 2.100 ден/ноќ';
  showPaymentChoice = false;

  pendingPaymentData: any = null;
  clientSecret: string | null = null;

  constructor(private paymentService: PaymentService) {}

  selectPackage(paket: string) {
    this.selectedPackage = paket;
  }

  submitReservation() {
    const paymentData = {
      amount: this.getPackageAmount(),
      reservationId: 1,
      packageName: this.selectedPackage,
    };

    this.paymentService.createPayment(paymentData).subscribe({
      next: (response: any) => {
        console.log('Payment response:', response);

        this.pendingPaymentData = paymentData;
        this.clientSecret = response.clientSecret;
        this.showPaymentChoice = true;
      },
      error: (error) => {
        console.error('Payment error:', error);
        this.showPaymentChoice = false;
      },
    });
  }

  proceedToPayment() {
    if (!this.clientSecret) return;

    console.log('Open Stripe payment here with clientSecret:', this.clientSecret);

    // next step:
    // redirect to payment page OR mount Stripe Elements modal
  }

  cancelPayment() {
    this.showPaymentChoice = false;
    this.pendingPaymentData = null;
    this.clientSecret = null;
  }

  getPackageAmount(): number {
    if (this.selectedPackage.includes('Basic')) return 120000;
    if (this.selectedPackage.includes('Comfort')) return 210000;
    if (this.selectedPackage.includes('Luxury')) return 350000;
    return 210000;
  }
}