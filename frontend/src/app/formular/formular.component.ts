import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StepIndicatorComponent } from '../components/step-indicator.component';

@Component({
  selector: 'app-formular',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepIndicatorComponent, RouterLink],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css',
})
export class Formular implements OnInit {

  private fb = inject(FormBuilder);

  activeStep = signal(1);
  submitStatus = signal<'idle' | 'loading' | 'success'>('idle');

  readonly TOTAL_STEPS = 3;

  readonly steps = [
    { num: 1, label: 'Сопственик' },
    { num: 2, label: 'Куче' },
    { num: 3, label: 'Престој' },
  ];

  readonly genders = ['Машко', 'Женско'];
  readonly feedingSchedules = ['1x дневно', '2x дневно', '3x дневно', 'По потреба'];

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      ownerInfo: this.fb.group({
        firstName:        ['', Validators.required],
        lastName:         ['', Validators.required],
        phone:            ['', Validators.required],
        email:            ['', [Validators.required, Validators.email]],
        emergencyContact: [''],
      }),
      petInfo: this.fb.group({
        name:              ['', Validators.required],
        breed:             ['', Validators.required],
        gender:            ['', Validators.required],
        dateOfBirth:       [''],
        weight:            [''],
        neutered:          [null],
        microchipped:      [null],
        allergies:         [''],
        medicalConditions: [''],
      }),
      stayInfo: this.fb.group({
        checkInDateTime:  ['', Validators.required],
        checkOutDateTime: [''],
        feedingSchedule:  [''],
        foodBrand:        [''],
        additionalNotes:  [''],
        termsAccepted:    [false, Validators.requiredTrue],
      }),
    });
  }

  get currentGroup(): FormGroup {
    const keys = ['ownerInfo', 'petInfo', 'stayInfo'];
    return this.form.get(keys[this.activeStep() - 1]) as FormGroup;
  }

  ctrl(group: string, field: string) {
    return this.form.get(`${group}.${field}`);
  }

  next(): void {
    this.currentGroup.markAllAsTouched();
    if (this.currentGroup.invalid) return;
    if (this.activeStep() < this.TOTAL_STEPS) {
      this.activeStep.update(s => s + 1);
    }
  }

  prev(): void {
    if (this.activeStep() > 1) {
      this.activeStep.update(s => s - 1);
    }
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submitStatus.set('loading');
    await new Promise(r => setTimeout(r, 1500));
    this.submitStatus.set('success');
  }

  restart(): void {
    this.form.reset();
    this.activeStep.set(1);
    this.submitStatus.set('idle');
  }

  get isFirst(): boolean { return this.activeStep() === 1; }
  get isLast():  boolean { return this.activeStep() === this.TOTAL_STEPS; }
  get progress(): number { return (this.activeStep() / this.TOTAL_STEPS) * 100; }
}