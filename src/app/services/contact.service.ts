import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/contact';

  submitContact(data: { fullName: string; email: string; phone: string; message: string }) {
    return this.http.post(this.apiUrl, data);
  }
}
