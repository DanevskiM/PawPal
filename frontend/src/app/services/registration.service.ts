// // // ================================================
// // // PawCare MK – Registration Service
// // // ================================================

// // import { Injectable, signal } from '@angular/core';
// // import { RegistrationForm } from '../models/registration.model';

// // export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// // @Injectable({ providedIn: 'root' })
// // export class RegistrationService {
// //   readonly submitStatus = signal<SubmitStatus>('idle');
// //   readonly currentStep = signal<number>(0);

// //   readonly TOTAL_STEPS = 3;

// //   readonly STEP_LABELS = [
// //     { label: 'Клиент', icon: '👤' },
// //     { label: 'Милениче', icon: '🐕' },
// //     { label: 'Престој', icon: '📅' },
// //   ];

// //   goToStep(step: number): void {
// //     if (step >= 0 && step < this.TOTAL_STEPS) {
// //       this.currentStep.set(step);
// //     }
// //   }

// //   nextStep(): void {
// //     this.goToStep(this.currentStep() + 1);
// //   }

// //   prevStep(): void {
// //     this.goToStep(this.currentStep() - 1);
// //   }

// //   get progress(): number {
// //     return Math.round(((this.currentStep() + 1) / this.TOTAL_STEPS) * 100);
// //   }

// //   isFirstStep(): boolean {
// //     return this.currentStep() === 0;
// //   }
// //   isLastStep(): boolean {
// //     return this.currentStep() === this.TOTAL_STEPS - 1;
// //   }

// //   /**
// //    * Submit registration to backend.
// //    * Replace the timeout with a real HttpClient call:
// //    *   return this.http.post('/api/registrations', payload)
// //    */
// //   async submitRegistration(payload: RegistrationForm): Promise<void> {
// //     this.submitStatus.set('loading');
// //     try {
// //       await new Promise<void>((resolve, reject) =>
// //         setTimeout(() => {
// //           console.log('Registration payload:', payload);
// //           Math.random() > 0.1 ? resolve() : reject(new Error('Server error'));
// //         }, 1500),
// //       );
// //       this.submitStatus.set('success');
// //     } catch {
// //       this.submitStatus.set('error');
// //     }
// //   }

// //   reset(): void {
// //     this.submitStatus.set('idle');
// //     this.currentStep.set(0);
// //   }
// // }

// import { Injectable, signal, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';
// import { RegistrationForm } from '../models/registration.model';

// export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// @Injectable({ providedIn: 'root' })
// export class RegistrationService {
//   private http = inject(HttpClient);

//   readonly submitStatus = signal<SubmitStatus>('idle');
//   readonly currentStep = signal<number>(0);

//   readonly TOTAL_STEPS = 3;

//   readonly STEP_LABELS = [
//     { label: 'Клиент', icon: '👤' },
//     { label: 'Милениче', icon: '🐕' },
//     { label: 'Престој', icon: '📅' },
//   ];

//   private readonly apiUrl = 'http://localhost:3000/api/registrations';

//   goToStep(step: number): void {
//     if (step >= 0 && step < this.TOTAL_STEPS) {
//       this.currentStep.set(step);
//     }
//   }

//   nextStep(): void {
//     this.goToStep(this.currentStep() + 1);
//   }

//   prevStep(): void {
//     this.goToStep(this.currentStep() - 1);
//   }

//   get progress(): number {
//     return Math.round(((this.currentStep() + 1) / this.TOTAL_STEPS) * 100);
//   }

//   isFirstStep(): boolean {
//     return this.currentStep() === 0;
//   }

//   isLastStep(): boolean {
//     return this.currentStep() === this.TOTAL_STEPS - 1;
//   }

//   async submitRegistration(payload: RegistrationForm): Promise<void> {
//     this.submitStatus.set('loading');
//     try {
//       await firstValueFrom(this.http.post(this.apiUrl, payload));
//       this.submitStatus.set('success');
//     } catch (error) {
//       console.error('Registration payload error:', error);
//       this.submitStatus.set('error');
//     }
//   }

//   reset(): void {
//     this.submitStatus.set('idle');
//     this.currentStep.set(0);
//   }
// }

// // ================================================
// // PawCare MK – Registration Service
// // ================================================

// import { Injectable, signal } from '@angular/core';
// import { RegistrationForm } from '../models/registration.model';

// export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// @Injectable({ providedIn: 'root' })
// export class RegistrationService {
//   readonly submitStatus = signal<SubmitStatus>('idle');
//   readonly currentStep = signal<number>(0);

//   readonly TOTAL_STEPS = 3;

//   readonly STEP_LABELS = [
//     { label: 'Клиент', icon: '👤' },
//     { label: 'Милениче', icon: '🐕' },
//     { label: 'Престој', icon: '📅' },
//   ];

//   goToStep(step: number): void {
//     if (step >= 0 && step < this.TOTAL_STEPS) {
//       this.currentStep.set(step);
//     }
//   }

//   nextStep(): void {
//     this.goToStep(this.currentStep() + 1);
//   }

//   prevStep(): void {
//     this.goToStep(this.currentStep() - 1);
//   }

//   get progress(): number {
//     return Math.round(((this.currentStep() + 1) / this.TOTAL_STEPS) * 100);
//   }

//   isFirstStep(): boolean {
//     return this.currentStep() === 0;
//   }
//   isLastStep(): boolean {
//     return this.currentStep() === this.TOTAL_STEPS - 1;
//   }

//   /**
//    * Submit registration to backend.
//    * Replace the timeout with a real HttpClient call:
//    *   return this.http.post('/api/registrations', payload)
//    */
//   async submitRegistration(payload: RegistrationForm): Promise<void> {
//     this.submitStatus.set('loading');
//     try {
//       await new Promise<void>((resolve, reject) =>
//         setTimeout(() => {
//           console.log('Registration payload:', payload);
//           Math.random() > 0.1 ? resolve() : reject(new Error('Server error'));
//         }, 1500),
//       );
//       this.submitStatus.set('success');
//     } catch {
//       this.submitStatus.set('error');
//     }
//   }

//   reset(): void {
//     this.submitStatus.set('idle');
//     this.currentStep.set(0);
//   }
// }

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface StepItem {
  label: string;
  icon: string;
}

export interface RegistrationFormPayload {
  ownerName?: string;
  ownerSurname?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  petName?: string;
  petType?: string;
  petBreed?: string;
  petAge?: number | string;
  petWeight?: number | string;
  notes?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/registrations';

  readonly STEP_LABELS: StepItem[] = [
    { label: 'Сопственик', icon: 'user' },
    { label: 'Миленик', icon: 'paw' },
    { label: 'Преглед', icon: 'clipboard' },
    { label: 'Потврда', icon: 'check-circle' },
  ];

  readonly TOTAL_STEPS = this.STEP_LABELS.length;

  currentStep = signal(0);

  private _registrationCompleted = signal(false);
  private _registrationId = signal<string | number | null>(null);

  submitStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  readonly registrationCompleted = computed(() => this._registrationCompleted());
  readonly registrationId = computed(() => this._registrationId());

  readonly canAccessPrestoj = computed(
    () => this.registrationCompleted() && !!this.registrationId(),
  );

  nextStep(): void {
    if (this.currentStep() < this.TOTAL_STEPS - 1) {
      this.currentStep.update((step) => step + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((step) => step - 1);
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step <= this.TOTAL_STEPS) {
      this.currentStep.set(step);
    }
  }

  async submitRegistration(payload: RegistrationFormPayload): Promise<any> {
    this.submitStatus.set('loading');

    try {
      const response = await firstValueFrom(this.http.post<any>(this.apiUrl, payload));

      console.log('registration response:', response);

      const registrationId =
        response?.id ??
        response?.registrationId ??
        response?._id ??
        response?.registration?.id ??
        response?.registration?._id ??
        null;

      this._registrationCompleted.set(true);
      this._registrationId.set(registrationId);
      this.submitStatus.set('success');

      console.log('Saved registrationId:', registrationId);

      return response;
    } catch (error) {
      console.error('Registration payload error:', error);
      this._registrationCompleted.set(false);
      this._registrationId.set(null);
      this.submitStatus.set('error');
      throw error;
    }
  }

  markRegistrationCompleted(registrationId: string | number | null): void {
    this._registrationCompleted.set(true);
    this._registrationId.set(registrationId);
    this.submitStatus.set('success');
  }

  resetSubmissionState(): void {
    this._registrationCompleted.set(false);
    this._registrationId.set(null);
    this.submitStatus.set('idle');
  }

  resetWizard(): void {
    this.currentStep.set(0);
  }

  reset(): void {
    this.currentStep.set(0);
    this._registrationCompleted.set(false);
    this._registrationId.set(null);
    this.submitStatus.set('idle');
  }
}
