import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kontakt.html',
  styleUrl: './kontakt.css',
})
export class KontaktComponent {
  private fb = inject(FormBuilder);
  submitted = signal(false);
  private contactService = inject(ContactService);

  questionForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  errorMessage = signal('');

  onSubmit(): void {
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      this.submitted.set(false);
      return;
    }

    const payload = this.questionForm.getRawValue();
    console.log(payload);

    this.contactService.submitContact(payload).subscribe({
      next: (res: any) => {
        console.log('SUCCESS RESPONSE:', res);
        this.submitted.set(true);
        this.errorMessage.set('');
        this.questionForm.reset();

        if (!res.emailSent) {
          console.warn('Saved to DB, but email failed:', res.emailError);
        }
      },
      error: (err) => {
  console.error('FULL API Error:', err);
  console.error('Backend body:', err.error);
  console.error('Backend message:', err?.error?.message);
  console.error('Backend emailError:', err?.error?.emailError);

  this.submitted.set(false);
  this.errorMessage.set(err?.error?.message || 'Настана грешка. Обидете се повторно.');
}
    });
  }

  get fullName() {
    return this.questionForm.controls.fullName;
  }

  get email() {
    return this.questionForm.controls.email;
  }

  get phone() {
    return this.questionForm.controls.phone;
  }

  get message() {
    return this.questionForm.controls.message;
  }
}
