import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PawPal';
}
