import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stepper" role="progressbar"
         [attr.aria-valuenow]="currentStep + 1"
         [attr.aria-valuemin]="1"
         [attr.aria-valuemax]="totalSteps">

      <div class="progress-track">
        <div class="progress-fill"
             [style.width.%]="((currentStep + 1) / totalSteps) * 100">
        </div>
      </div>

      <div class="steps-row">
        @for (step of steps; track $index) {
          <div class="step" [class.active]="$index === currentStep"
               [class.done]="$index < currentStep">
            <div class="step-bubble">
              @if ($index < currentStep) {
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              } @else {
                <span>{{ $index + 1 }}</span>
              }
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>

          @if ($index < steps.length - 1) {
            <div class="connector" [class.done]="$index < currentStep"></div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .stepper { width: 100%; margin-bottom: 1.5rem; }

    .progress-track {
      height: 3px;
      background: #E0D9CC;
      border-radius: 2px;
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #4A7C59;
      border-radius: 2px;
      transition: width 0.35s cubic-bezier(.4,0,.2,1);
    }

    .steps-row {
      display: flex;
      align-items: flex-start;
    }

    .connector {
      flex: 1;
      height: 1.5px;
      background: #E0D9CC;
      margin-top: 14px;
      transition: background 0.3s;
    }
    .connector.done { background: #4A7C59; }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      min-width: 56px;
    }

    .step-bubble {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px solid #D0C9BD;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 500;
      color: #8E9485;
      transition: all 0.25s;
    }

    .step.active .step-bubble {
      background: #4A7C59;
      border-color: #4A7C59;
      color: white;
      box-shadow: 0 0 0 4px rgba(74,124,89,0.15);
    }

    .step.done .step-bubble {
      background: #EEF3EA;
      border-color: #4A7C59;
      color: #27500A;
    }

    .step-label {
      font-size: 0.7rem;
      color: #8E9485;
      font-weight: 400;
      white-space: nowrap;
    }

    .step.active .step-label { color: #27500A; font-weight: 500; }
    .step.done  .step-label  { color: #4A7C59; }
  `],
})
export class StepIndicatorComponent {
  @Input() steps: { label: string; icon: string }[] = [];
  @Input() currentStep = 0;
  @Input() totalSteps = 5;
}
