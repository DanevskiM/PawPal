import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PrestojComponent } from './pages/prestoj/prestoj';
import { GroomingComponent } from './pages/grooming/grooming';
import { UslugiComponent } from './pages/uslugi/uslugi';
import { KontaktComponent } from './pages/kontakt/kontakt';
import { ZaNasComponent } from './pages/za-nas/za-nas';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'prestoj', component: PrestojComponent },
  { path: 'grooming', component: GroomingComponent },
  { path: 'usluge', component: UslugiComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'za-nas', component: ZaNasComponent },
];