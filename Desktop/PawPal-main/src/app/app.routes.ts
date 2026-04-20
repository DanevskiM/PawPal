import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registracija', pathMatch: 'full' },
  {
    path: 'registracija',
    component: RegistrationFormComponent,
    title: 'Регистрација – PawCare MK',
  },
];
