import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlientiReviews } from './klienti-reviews';

describe('KlientiReviews', () => {
  let component: KlientiReviews;
  let fixture: ComponentFixture<KlientiReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlientiReviews],
    }).compileComponents();

    fixture = TestBed.createComponent(KlientiReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
