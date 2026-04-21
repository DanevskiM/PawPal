// ================================================
// PawCare MK – Registration Form Component
// Angular 17+ Standalone | Reactive Forms
// ================================================

import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

import { RegistrationService } from '../services/registration.service';
import { PawCareValidators } from '../shared/pawcare.validators';
import { StepIndicatorComponent } from './step-indicator.component';
import { FieldErrorComponent } from './field-error.component';
import {
  BEHAVIOR_CHALLENGES,
  OWNERSHIP_DURATIONS,
  FEEDING_SCHEDULES,
  ANIMAL_REACTIONS,
  RegistrationForm,
} from '../models/registration.model';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, StepIndicatorComponent, FieldErrorComponent],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected svc = inject(RegistrationService);

  // ---- Exposed constants for template ----
  readonly behaviorChallenges = BEHAVIOR_CHALLENGES;
  readonly ownershipDurations = OWNERSHIP_DURATIONS;
  readonly feedingSchedules = FEEDING_SCHEDULES;
  readonly animalReactions = ANIMAL_REACTIONS;

  // ---- Signals ----
  readonly touchedStep = signal<number>(-1);
  readonly isSubmitting = computed(() => this.svc.submitStatus() === 'loading');
  readonly isSuccess = computed(() => this.svc.submitStatus() === 'success');
  readonly isError = computed(() => this.svc.submitStatus() === 'error');

  // ---- Form ----
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  // ============================================================
  // FORM BUILDER
  // ============================================================
  private buildForm(): void {
    this.form = this.fb.group({
      // Step 1 – Client info
      clientInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', [Validators.required, PawCareValidators.postalCode()]],
        phone: ['', [Validators.required, PawCareValidators.macedonianPhone()]],
        mobilePhone: ['', PawCareValidators.macedonianPhone()],
        email: ['', [Validators.required, Validators.email]],
        emergencyContact: ['', Validators.required],
        alternativePerson: ['', Validators.required],
      }),

      // Step 2 – Pet info
      petInfo: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        breed: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        weight: [null, PawCareValidators.positiveWeight()],
        gender: ['', Validators.required],
        neutered: [null, Validators.required],
        microchipped: [null, Validators.required],
        ownershipDuration: ['', Validators.required],
      }),

      // Step 3 – Health
      healthInfo: this.fb.group({
        vaccinated: [null, Validators.required],
        vaccinationNote: [''],
        vetName: ['', Validators.required],
        clinicName: ['', Validators.required],
        medicalConditions: [''],
        allergies: [''],
        physicalLimitations: [''],
        fleaTreatment: [null, Validators.required],
        heartwormTreatment: [null, Validators.required],
      }),

      // Step 4 – Behavior
      behaviorInfo: this.fb.group({
        previousTraining: [''],
        previousHotelStay: [null, Validators.required],
        trainedToStayAlone: [null, Validators.required],
        reactionToAnimals: ['', Validators.required],
        favoriteReward: [''],
        favoriteToys: [''],
        behaviorChallenges: [[]], // string[]
        additionalNotes: [''],
      }),

      // Step 5 – Stay & feeding
      stayInfo: this.fb.group(
        {
          checkInDateTime: ['', Validators.required],
          checkOutDateTime: ['', Validators.required],
          feedingSchedule: ['', Validators.required],
          feedingInstructions: [''],
          foodBrand: [''],
          acceptsTreats: [null, Validators.required],
          foodAllergies: [''],
          termsAccepted: [false, Validators.requiredTrue],
        },
        {
          validators: PawCareValidators.checkOutAfterCheckIn('checkInDateTime', 'checkOutDateTime'),
        },
      ),
    });
  }

  // ============================================================
  // STEP GROUPS (map index → FormGroup key)
  // ============================================================
  private readonly stepGroupKeys = [
    'clientInfo',
    'petInfo',
    'healthInfo',
    'behaviorInfo',
    'stayInfo',
  ] as const;

  get currentGroup(): FormGroup {
    const key = this.stepGroupKeys[this.svc.currentStep()];
    return this.form.get(key) as FormGroup;
  }

  ctrl(groupKey: string, field: string): AbstractControl | null {
    return this.form.get(`${groupKey}.${field}`);
  }

  // ============================================================
  // BEHAVIOR CHALLENGES checkbox array
  // ============================================================
  isChallengeChecked(challenge: string): boolean {
    const arr: string[] = this.ctrl('behaviorInfo', 'behaviorChallenges')?.value ?? [];
    return arr.includes(challenge);
  }

  toggleChallenge(challenge: string): void {
    const ctrl = this.ctrl('behaviorInfo', 'behaviorChallenges')!;
    const arr: string[] = [...(ctrl.value ?? [])];
    const idx = arr.indexOf(challenge);
    if (idx === -1) arr.push(challenge);
    else arr.splice(idx, 1);
    ctrl.setValue(arr);
    ctrl.markAsDirty();
  }

  // ============================================================
  // NAVIGATION
  // ============================================================
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

  // ============================================================
  // SUBMIT
  // ============================================================
  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload: RegistrationForm = {
      date: new Date().toISOString(),
      ...this.form.getRawValue(),
    };

    await this.svc.submitRegistration(payload);
  }

  restart(): void {
    this.form.reset();
    this.svc.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================================
  // HELPERS
  // ============================================================
  get stepIndex(): number {
    return this.svc.currentStep();
  }
  get steps(): { label: string; icon: string }[] {
    return this.svc.STEP_LABELS;
  }
}
