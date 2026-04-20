import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grooming } from './grooming';

describe('Grooming', () => {
  let component: Grooming;
  let fixture: ComponentFixture<Grooming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grooming],
    }).compileComponents();

    fixture = TestBed.createComponent(Grooming);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
