import { Component } from '@angular/core';
import { Formular } from '../../formular/formular.component';
import { ReviewsComponent } from '../../reviews/reviews.component';

@Component({
  selector: 'app-home',
  imports: [Formular, ReviewsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
