// ================================================
// PawCare MK – Custom Form Validators
// ================================================

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PawCareValidators {

  /** Macedonian phone number: +389 XX XXX XXX or 07X XXX XXX */
  static macedonianPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const cleaned = control.value.replace(/\s/g, '');
      const valid = /^(\+3897\d{7}|07\d{7})$/.test(cleaned);
      return valid ? null : { macedonianPhone: true };
    };
  }

  /** Check-out must be after check-in */
  static checkOutAfterCheckIn(checkInKey: string, checkOutKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const checkIn = group.get(checkInKey)?.value;
      const checkOut = group.get(checkOutKey)?.value;
      if (!checkIn || !checkOut) return null;
      return new Date(checkOut) > new Date(checkIn)
        ? null
        : { checkOutBeforeCheckIn: true };
    };
  }

  /** Require at least one checkbox selected */
  static atLeastOne(controlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const arr = group.get(controlName)?.value as string[];
      return arr && arr.length > 0 ? null : { atLeastOne: true };
    };
  }

  /** Postal code: 4-digit Macedonian format */
  static postalCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return /^\d{4}$/.test(control.value) ? null : { postalCode: true };
    };
  }

  /** Weight: must be positive number */
  static positiveWeight(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = parseFloat(control.value);
      if (isNaN(val)) return null;
      return val > 0 && val < 200 ? null : { positiveWeight: true };
    };
  }
}

/** Human-readable error messages in Macedonian */
export const ERROR_MESSAGES: Record<string, string> = {
  required: 'Ова поле е задолжително',
  email: 'Внесете валидна е-пошта',
  macedonianPhone: 'Формат: +389 70 000 000 или 070 000 000',
  postalCode: 'Поштенски број мора да биде 4 цифри',
  positiveWeight: 'Тежината мора да биде помеѓу 0 и 200 кг',
  minlength: 'Внесете барем 2 карактери',
  checkOutBeforeCheckIn: 'Датумот на заминување мора да биде после пристигнувањето',
};

export function getErrorMessage(control: AbstractControl | null): string {
  if (!control || !control.errors) return '';
  const firstKey = Object.keys(control.errors)[0];
  return ERROR_MESSAGES[firstKey] ?? 'Невалидна вредност';
}
