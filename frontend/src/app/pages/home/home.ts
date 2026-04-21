import { Component } from '@angular/core';
import { Formular } from '../../formular/formular.component';
import { ReviewsComponent } from '../../reviews/reviews.component';
import { ContactHome } from '../../contact-home/contact-home';

@Component({
  selector: 'app-home',
  imports: [Formular, ReviewsComponent, ContactHome],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
