import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uslugi } from './uslugi';

describe('Uslugi', () => {
  let component: Uslugi;
  let fixture: ComponentFixture<Uslugi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uslugi],
    }).compileComponents();

    fixture = TestBed.createComponent(Uslugi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
