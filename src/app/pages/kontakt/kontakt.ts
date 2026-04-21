import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  questionForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      this.submitted.set(false);
      return;
    }

    console.log(this.questionForm.getRawValue());
    this.submitted.set(true);
    this.questionForm.reset();
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
