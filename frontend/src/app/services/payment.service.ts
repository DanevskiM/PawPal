import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payment';
  private stripePromise = loadStripe('pk_test_51RQCgqBNSO5IdjEOJrtfgdJfpRJIUUqWI1XegYwJIuM1KQ7oPKQSPBOTX44s81LpV8huFGkUCVMzkEQ2koBvXU0F00AoSo92bk');

  constructor(private http: HttpClient) {}

  createPayment(data: {
    amount: number;
    reservationId: number;
    packageName?: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  async getStripe() {
    return await this.stripePromise;
  }
}