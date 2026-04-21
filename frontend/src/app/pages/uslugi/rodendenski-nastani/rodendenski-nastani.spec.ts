import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodendenskiNastani } from './rodendenski-nastani';

describe('RodendenskiNastani', () => {
  let component: RodendenskiNastani;
  let fixture: ComponentFixture<RodendenskiNastani>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodendenskiNastani],
    }).compileComponents();

    fixture = TestBed.createComponent(RodendenskiNastani);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
