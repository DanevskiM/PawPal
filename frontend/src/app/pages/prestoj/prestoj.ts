import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-prestoj',
  imports: [CommonModule, FormsModule],
  templateUrl: './prestoj.html',
  styleUrl: './prestoj.css',
})
export class PrestojComponent {
  selectedPackage = 'Comfort - 2.100 ден/ноќ';

  selectPackage(paket: string) {
    this.selectedPackage = paket;
  }
}
