import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grooming',
  imports: [],
  templateUrl: './grooming.html',
  styleUrl: './grooming.css',
})

export class GroomingComponent{
  activeTab=1;

  setTab(tab:number)
  {
    this.activeTab=tab;
  }
  faqs = [
    { question: 'Што треба да донесам?', answer: 'твојот одговор...', open: false },
    { question: 'Дали вашите фризери се разбираат за расата?', answer: 'твојот одговор...', open: false },
    { question: 'Што ако на моето милениче не му се допаѓа?', answer: 'твојот одговор...', open: false },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

}

