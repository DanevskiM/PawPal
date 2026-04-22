import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grooming',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grooming.html',
  styleUrl: './grooming.css',
})
export class GroomingComponent {

  private cdr = inject(ChangeDetectorRef);

  activeTab = 1;

  setTab(tab: number) {
    this.activeTab = tab;
  }

  faqs = [
    { question: 'Од колку часот е прием и отпуштање на моето куче?', answer: 'Пријавување и одјавување на вашиот миленик е дозволено секој ден од неделата од 08:30 до 19:30 часот.', open: false },
    { question: 'Дали морам да пополнам формулар за регистрација?', answer: 'Да, формуларот е задолжителен при првиот престој. Со него му овозможувате на нашиот тим да ги познава навиките и карактерот на вашето куче.', open: false },
    { question: 'Дали да донесам сопствена храна?', answer: 'Да, ве советуваме да донесете сопствена храна. Измерете ја точната количина и означете ја со името на кучето.', open: false },
    { question: 'Дали моето милениче ќе има вода за пиење?', answer: 'Секако! Сите наши гости имаат постојан пристап до свежа вода во текот на целиот ден.', open: false },
    { question: 'Дали вашите грумери се разбираат за расата на моето куче?', answer: 'Нашиот тим е специјализиран за сите раси и големини на кучиња.', open: false },
    { question: 'Што ако моето куче има страв или претходна траума од груминг?', answer: 'Нашиот тим е обучен да работи со чувствителни кучиња. Пристапуваме со трпеливост и без брзање.', open: false },
    { question: 'Дали кучињата се под надзор во текот на целиот ден?', answer: 'Да, нашиот стручен тим работи во три смени и обезбедува постојан надзор.', open: false },
    { question: 'Дали моето куче може да дојде ако не е вакцинирано?', answer: 'За безбедноста на сите наши гости, задолжително е кучињата да бидат вакцинирани. Донесете ја здравствената книшка при пријавување.', open: false },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
    this.cdr.markForCheck();
  }
}