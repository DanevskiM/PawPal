// import {
//   Component,
//   OnInit,
//   inject,
//   computed,
//   ChangeDetectionStrategy,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
//   AbstractControl,
// } from '@angular/forms';

// import { RegistrationService } from '../services/registration.service';
// import { StepIndicatorComponent } from './step-indicator.component';
// import { FEEDING_SCHEDULES, RegistrationForm } from '../models/registration.model';

// @Component({
//   selector: 'app-registration-form',
//   standalone: true,
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   imports: [CommonModule, ReactiveFormsModule, StepIndicatorComponent],
//   templateUrl: './registration-form.component.html',
//   styleUrls: ['./registration-form.component.scss'],
// })
// export class RegistrationFormComponent implements OnInit {
//   private fb = inject(FormBuilder);
//   protected svc = inject(RegistrationService);

//   readonly feedingSchedules = FEEDING_SCHEDULES;

//   readonly activeStep = computed(() => this.svc.currentStep() + 1);
//   readonly submitStatus = this.svc.submitStatus;

//   get isFirst(): boolean { return this.svc.currentStep() === 0; }
//   get isLast(): boolean { return this.svc.currentStep() === this.svc.TOTAL_STEPS - 1; }

//   form!: FormGroup;

//   ngOnInit(): void {
//     this.buildForm();
//   }

//   private buildForm(): void {
//     this.form = this.fb.group({
//       ownerInfo: this.fb.group({
//         firstName: ['', Validators.required],
//         lastName: ['', Validators.required],
//         phone: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         emergencyContact: [''],
//       }),
//       petInfo: this.fb.group({
//         name: ['', Validators.required],
//         breed: ['', Validators.required],
//         dateOfBirth: [''],
//         weight: [null],
//         gender: ['', Validators.required],
//         neutered: [null],
//         microchipped: [null],
//         allergies: [''],
//         medicalConditions: [''],
//       }),
//       stayInfo: this.fb.group({
//         checkInDateTime: ['', Validators.required],
//         checkOutDateTime: [''],
//         feedingSchedule: [''],
//         foodBrand: [''],
//         additionalNotes: [''],
//         termsAccepted: [false, Validators.requiredTrue],
//       }),
//     });
//   }

//   private readonly stepGroupKeys = ['ownerInfo', 'petInfo', 'stayInfo'] as const;

//   get currentGroup(): FormGroup {
//     const key = this.stepGroupKeys[this.svc.currentStep()];
//     return this.form.get(key) as FormGroup;
//   }

//   ctrl(groupKey: string, field: string): AbstractControl | null {
//     return this.form.get(`${groupKey}.${field}`);
//   }

//   get steps(): { label: string; icon: string }[] {
//     return this.svc.STEP_LABELS;
//   }

//   next(): void {
//     this.currentGroup.markAllAsTouched();
//     if (this.currentGroup.invalid) return;
//     this.svc.nextStep();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   prev(): void {
//     this.svc.prevStep();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   async submit(): Promise<void> {
//     this.form.markAllAsTouched();
//     if (this.form.invalid) return;

//     const payload: RegistrationForm = {
//       date: new Date().toISOString(),
//       ...this.form.getRawValue(),
//     };

//     await this.svc.submitRegistration(payload);
//   }

//   restart(): void {
//     this.form.reset();
//     this.svc.reset();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }
// }

import { Component, OnInit, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationService } from '../services/registration.service';
import { StepIndicatorComponent } from './step-indicator.component';
import { FEEDING_SCHEDULES, RegistrationForm } from '../models/registration.model';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, StepIndicatorComponent],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected svc = inject(RegistrationService);
  private router = inject(Router);

  readonly feedingSchedules = FEEDING_SCHEDULES;

  readonly activeStep = computed(() => this.svc.currentStep() + 1);
  readonly submitStatus = this.svc.submitStatus;

  get isFirst(): boolean {
    return this.svc.currentStep() === 0;
  }

  get isLast(): boolean {
    return this.svc.currentStep() === this.svc.TOTAL_STEPS - 1;
  }

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      ownerInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        emergencyContact: [''],
      }),
      petInfo: this.fb.group({
        name: ['', Validators.required],
        breed: ['', Validators.required],
        dateOfBirth: [''],
        weight: [null],
        gender: ['', Validators.required],
        neutered: [null],
        microchipped: [null],
        allergies: [''],
        medicalConditions: [''],
      }),
      stayInfo: this.fb.group({
        checkInDateTime: ['', Validators.required],
        checkOutDateTime: [''],
        feedingSchedule: [''],
        foodBrand: [''],
        additionalNotes: [''],
        termsAccepted: [false, Validators.requiredTrue],
      }),
    });
  }

  private readonly stepGroupKeys = ['ownerInfo', 'petInfo', 'stayInfo'] as const;

  get currentGroup(): FormGroup {
    const key = this.stepGroupKeys[this.svc.currentStep()];
    return this.form.get(key) as FormGroup;
  }

  ctrl(groupKey: string, field: string): AbstractControl | null {
    return this.form.get(`${groupKey}.${field}`);
  }

  get steps(): { label: string; icon: string }[] {
    return this.svc.STEP_LABELS;
  }

  next(): void {
    this.currentGroup.markAllAsTouched();
    if (this.currentGroup.invalid) return;

    this.svc.nextStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prev(): void {
    this.svc.prevStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload: RegistrationForm = {
      date: new Date().toISOString(),
      ...this.form.getRawValue(),
    };

    await this.svc.submitRegistration(payload);
  }

  async goToPrestoj(): Promise<void> {
    const registrationId = this.svc.registrationId();

    console.log('submitStatus:', this.svc.submitStatus());
    console.log('canAccessPrestoj:', this.svc.canAccessPrestoj());
    console.log('registrationId:', registrationId);

    if (!this.svc.canAccessPrestoj() || !registrationId) {
      console.warn('Navigation blocked: missing access or registrationId');
      return;
    }

    const success = await this.router.navigate(['/prestoj', registrationId]);
    console.log('Navigation success:', success);
  }

  restart(): void {
    this.form.reset();
    this.svc.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
