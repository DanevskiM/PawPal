import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { Formular } from './formular/formular.component';
import { ReviewsComponent } from './reviews/reviews.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, Formular, ReviewsComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PawPal';
}
