import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formular } from './formular.component';

describe('Formular', () => {
  let component: Formular;
  let fixture: ComponentFixture<Formular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formular],
    }).compileComponents();

    fixture = TestBed.createComponent(Formular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
