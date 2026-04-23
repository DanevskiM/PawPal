import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-klienti-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './klienti-reviews.html',
  styleUrl: './klienti-reviews.css',
})
export class KlientiReviews implements OnInit, OnDestroy {

  activeReview = 0;

  reviews = [
    {
      stars: '★ ★ ★ ★ ★',
      quote: '„Никогаш не би го оставиле нашето куче на друго место!"',
      text: 'Персоналот е неверојатен, секогаш се грижат и нè информираат. Нашето куче секогаш оди среќно и доаѓа уредено.',
      name: 'Ана Петрова',
      location: 'PawPal Скопје'
    },
    {
      stars: '★ ★ ★ ★ ★',
      quote: '„Најдобриот груминг салон во Скопје!"',
      text: 'Мојот лабрадор изгледа совршено после секоја посета. Стручен тим и прекрасен простор.',
      name: 'Марко Симоновски',
      location: 'PawPal Скопје'
    },
    {
      stars: '★ ★ ★ ★ ★',
      quote: '„Мирна сум кога знам дека моето куче е кај PawPal!"',
      text: 'Индивидуален пристап и постојана комуникација. Препорачувам на сите сопственици на кучиња.',
      name: 'Елена Мицевска',
      location: 'PawPal Скопје'
    },
  ];

  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.activeReview = (this.activeReview + 1) % this.reviews.length;
      this.cdr.detectChanges();
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  setReview(index: number): void {
    this.activeReview = index;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.activeReview = (this.activeReview + 1) % this.reviews.length;
      this.cdr.detectChanges();
    }, 4000);
  }
}