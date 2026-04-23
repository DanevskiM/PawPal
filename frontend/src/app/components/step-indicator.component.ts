import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="stepper"
      role="progressbar"
      [attr.aria-valuenow]="currentStep + 1"
      [attr.aria-valuemin]="1"
      [attr.aria-valuemax]="totalSteps"
    >
      <div class="steps-row">
        @for (step of steps; track $index) {
          <div
            class="step"
            [class.active]="$index === currentStep"
            [class.done]="$index < currentStep"
          >
            <div class="step-bubble">
              @if ($index < currentStep) {
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 7l3 3 6-6"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
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
  styles: [
    `
      .stepper {
        width: 100%;
        margin-bottom: 2rem;
        font-family: 'Montserrat', sans-serif;
      }

      .steps-row {
        display: flex;
        align-items: center;
      }

      .step {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .step-bubble {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid #d4c9b5;
        background: #fdfaf5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        color: #5c5245;
        font-family: 'Montserrat', sans-serif;
        flex-shrink: 0;
        transition: all 0.25s ease;
      }

      .step.active .step-bubble {
        background: #1b2a4a;
        border-color: #1b2a4a;
        color: white;
        box-shadow: 0 0 0 3px rgba(27, 42, 74, 0.12);
      }

      .step.done .step-bubble {
        background: #b8976a;
        border-color: #b8976a;
        color: white;
      }

      .step-label {
        font-size: 12px;
        color: #5c5245;
        font-weight: 500;
        white-space: nowrap;
        font-family: 'Montserrat', sans-serif;
      }

      .step.active .step-label {
        color: #1b2a4a;
        font-weight: 700;
      }

      .step.done .step-label {
        color: #b8976a;
      }

      .connector {
        flex: 1;
        height: 1px;
        background: #d4c9b5;
        min-width: 30px;
        transition: background 0.3s ease;
      }

      .connector.done {
        background: #b8976a;
      }

      .step-counter {
        font-size: 11px;
        color: #5c5245;
        font-family: 'Montserrat', sans-serif;
        text-align: right;
        margin-top: 0.75rem;
        letter-spacing: 0.06em;
      }
    `,
  ],
})
export class StepIndicatorComponent {
  @Input() steps: { label: string; icon: string }[] = [];
  @Input() currentStep = 0;
  @Input() totalSteps = 3;
}
