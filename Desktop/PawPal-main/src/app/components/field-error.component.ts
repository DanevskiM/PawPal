// ================================================
// PawCare MK – Field Error Component
// ================================================

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { getErrorMessage } from '../shared/pawcare.validators';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (shouldShow) {
      <span class="field-error" role="alert">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
          <path d="M6 3.5v3M6 8h.01" stroke="currentColor" stroke-linecap="round"/>
        </svg>
        {{ message }}
      </span>
    }
  `,
  styles: [`
    .field-error {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: #c0392b;
      margin-top: 4px;
      animation: fadeIn 0.15s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class FieldErrorComponent {
  @Input() control: AbstractControl | null = null;

  get shouldShow(): boolean {
    return !!(this.control?.invalid && (this.control.dirty || this.control.touched));
  }

  get message(): string {
    return getErrorMessage(this.control);
  }
}
