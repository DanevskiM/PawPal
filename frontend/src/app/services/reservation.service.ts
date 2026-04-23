// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface CreateReservationRequest {
//   petName: string;
//   breed?: string;
//   arrivalDate: string;
//   departureDate: string;
//   packageName: string;
//   notes?: string;
// }

// export interface CreateReservationResponse {
//   success: boolean;
//   reservationId: number;
//   message: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ReservationService {
//   private apiUrl = 'http://localhost:3000/api/reservations';

//   constructor(private http: HttpClient) {}

//   createReservation(data: CreateReservationRequest): Observable<CreateReservationResponse> {
//     return this.http.post<CreateReservationResponse>(`${this.apiUrl}/create`, data);
//   }
// }

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateReservationPayload {
  registrationId: string | number;
  packageName: string;
}

export interface CreateReservationResponse {
  reservationId: number;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http = inject(HttpClient);

  private readonly registrationsApiUrl = 'http://localhost:3000/api/registrations';
  private readonly reservationsApiUrl = 'http://localhost:3000/api/reservations';

  getRegistrationById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.registrationsApiUrl}/${id}`);
  }

  createReservation(payload: CreateReservationPayload): Observable<CreateReservationResponse> {
    // Append /create to match the backend handler
    return this.http.post<CreateReservationResponse>(`${this.reservationsApiUrl}/create`, payload);
  }
}
