// ================================================
// PawCare MK – Registration Service
// ================================================

import { Injectable, signal } from '@angular/core';
import { RegistrationForm } from '../models/registration.model';

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  readonly submitStatus = signal<SubmitStatus>('idle');
  readonly currentStep = signal<number>(0);

  readonly TOTAL_STEPS = 3;

  readonly STEP_LABELS = [
    { label: 'Клиент', icon: '👤' },
    { label: 'Милениче', icon: '🐕' },
    { label: 'Престој', icon: '📅' },
  ];

  goToStep(step: number): void {
    if (step >= 0 && step < this.TOTAL_STEPS) {
      this.currentStep.set(step);
    }
  }

  nextStep(): void {
    this.goToStep(this.currentStep() + 1);
  }

  prevStep(): void {
    this.goToStep(this.currentStep() - 1);
  }

  get progress(): number {
    return Math.round(((this.currentStep() + 1) / this.TOTAL_STEPS) * 100);
  }

  isFirstStep(): boolean {
    return this.currentStep() === 0;
  }
  isLastStep(): boolean {
    return this.currentStep() === this.TOTAL_STEPS - 1;
  }

  /**
   * Submit registration to backend.
   * Replace the timeout with a real HttpClient call:
   *   return this.http.post('/api/registrations', payload)
   */
  async submitRegistration(payload: RegistrationForm): Promise<void> {
    this.submitStatus.set('loading');
    try {
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          console.log('Registration payload:', payload);
          Math.random() > 0.1 ? resolve() : reject(new Error('Server error'));
        }, 1500),
      );
      this.submitStatus.set('success');
    } catch {
      this.submitStatus.set('error');
    }
  }

  reset(): void {
    this.submitStatus.set('idle');
    this.currentStep.set(0);
  }
}
