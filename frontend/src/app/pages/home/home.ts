import { Component } from '@angular/core';
import { Formular } from '../../formular/formular.component';
import { HomeIntroComponent } from '../../components/home-intro/home-intro';
import { KlientiReviews } from '../../components/klienti-reviews/klienti-reviews';
import { Nagradi } from '../../components/nagradi/nagradi';

@Component({
  selector: 'app-home',
  imports: [Formular, HomeIntroComponent, KlientiReviews, Nagradi],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}