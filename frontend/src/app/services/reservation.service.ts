import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateReservationRequest {
  petName: string;
  breed?: string;
  arrivalDate: string;
  departureDate: string;
  packageName: string;
  notes?: string;
}

export interface CreateReservationResponse {
  success: boolean;
  reservationId: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) {}

  createReservation(data: CreateReservationRequest): Observable<CreateReservationResponse> {
    return this.http.post<CreateReservationResponse>(`${this.apiUrl}/create`, data);
  }
}
