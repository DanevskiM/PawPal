import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Formular } from './formular/formular.component';
import { ReviewsComponent } from './reviews/reviews.component';

@Component({
  selector: 'app-root',
  imports: [Header, Formular, ReviewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  protected readonly title = signal('PawPal');
}
