import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prestoj } from './prestoj';

describe('Prestoj', () => {
  let component: Prestoj;
  let fixture: ComponentFixture<Prestoj>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prestoj],
    }).compileComponents();

    fixture = TestBed.createComponent(Prestoj);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
