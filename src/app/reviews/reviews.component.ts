import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [],
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews = [
    { text: 'Одлична услуга!', name: 'Ана' },
    { text: 'Прекрасен персонал!', name: 'Марко' },
    { text: 'Моето куче беше среќно!', name: 'Елена' },
    { text: 'Повторно би дошол!', name: 'Игор' },
  ];

  currentIndex = 0;
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
      this.cdr.detectChanges();
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
