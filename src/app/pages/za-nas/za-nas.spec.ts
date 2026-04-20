import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaNas } from './za-nas';

describe('ZaNas', () => {
  let component: ZaNas;
  let fixture: ComponentFixture<ZaNas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZaNas],
    }).compileComponents();

    fixture = TestBed.createComponent(ZaNas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
