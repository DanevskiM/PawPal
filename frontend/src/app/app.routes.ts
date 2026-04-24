// import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home';
// import { PrestojComponent } from './pages/prestoj/prestoj';
// import { GroomingComponent } from './pages/grooming/grooming';
// import { UslugiComponent } from './pages/uslugi/uslugi';
// import { KontaktComponent } from './pages/kontakt/kontakt';
// import { ZaNasComponent } from './pages/za-nas/za-nas';
// import { RegistrationFormComponent } from './components/registration-form.component';
// import { IndividualniTreninziComponent } from './pages/uslugi/individualni-treninzi/individualni-treninzi';
// import { TransportComponent } from './pages/uslugi/transport/transport';
// import { RodendenskiNastaniComponent } from './pages/uslugi/rodendenski-nastani/rodendenski-nastani';
// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'prestoj', component: PrestojComponent },
//   { path: 'grooming', component: GroomingComponent },
//   { path: 'usluge', component: UslugiComponent },
//   { path: 'kontakt', component: KontaktComponent },
//   { path: 'za-nas', component: ZaNasComponent },
//   {
//     path: 'registracija',
//     component: RegistrationFormComponent,
//     title: 'Регистрација – PawCare MK',
//   },
// { path: 'uslugi/individualni-treninzi', component: IndividualniTreninziComponent },
// { path: 'uslugi/transport', component: TransportComponent },
// { path: 'uslugi/rodendenski-nastani', component: RodendenskiNastaniComponent },
// ];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PrestojComponent } from './pages/prestoj/prestoj';
import { GroomingComponent } from './pages/grooming/grooming';
import { UslugiComponent } from './pages/uslugi/uslugi';
import { KontaktComponent } from './pages/kontakt/kontakt';
import { ZaNasComponent } from './pages/za-nas/za-nas';
import { RegistrationFormComponent } from './components/registration-form.component';
import { IndividualniTreninziComponent } from './pages/uslugi/individualni-treninzi/individualni-treninzi';
import { TransportComponent } from './pages/uslugi/transport/transport';
import { RodendenskiNastaniComponent } from './pages/uslugi/rodendenski-nastani/rodendenski-nastani';
import { prestojGuard } from './guards/prestoj.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'PawPal MK' },

  {
    path: 'prestoj/:id',
    component: PrestojComponent,
    canActivate: [prestojGuard],
    title: 'PawPal MK',
  },

  { path: 'grooming', component: GroomingComponent, title: 'PawPal MK' },
  { path: 'usluge', component: UslugiComponent, title: 'PawPal MK' },
  { path: 'kontakt', component: KontaktComponent, title: 'PawPal MK' },
  { path: 'za-nas', component: ZaNasComponent, title: 'PawPal MK' },

  {
    path: 'registracija',
    component: RegistrationFormComponent,
    title: 'PawPal MK',
  },

  { path: 'prestoj', redirectTo: 'registracija', pathMatch: 'full', title: 'PawPal MK' },

  {
    path: 'uslugi/individualni-treninzi',
    component: IndividualniTreninziComponent,
    title: 'PawPal MK',
  },
  { path: 'uslugi/transport', component: TransportComponent, title: 'PawPal MK' },
  {
    path: 'uslugi/rodendenski-nastani',
    component: RodendenskiNastaniComponent,
    title: 'PawPal MK',
  },
];
