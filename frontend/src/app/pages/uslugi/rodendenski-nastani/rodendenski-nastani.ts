import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rodendenski-nastani',
  imports: [RouterLink, CommonModule],
  templateUrl: './rodendenski-nastani.html',
  styleUrl: './rodendenski-nastani.css',
})
export class RodendenskiNastaniComponent {
  activeSection = '';

  toggle(section: string) {
    this.activeSection = this.activeSection === section ? '' : section;
  }
}
