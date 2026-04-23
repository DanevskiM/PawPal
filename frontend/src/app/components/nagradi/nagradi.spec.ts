import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nagradi } from './nagradi';

describe('Nagradi', () => {
  let component: Nagradi;
  let fixture: ComponentFixture<Nagradi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nagradi],
    }).compileComponents();

    fixture = TestBed.createComponent(Nagradi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
