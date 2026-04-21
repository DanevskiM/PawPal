import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroomingComponent } from './grooming';

describe('GroomingComponent', () => {
  let component: GroomingComponent;
  let fixture: ComponentFixture<GroomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroomingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroomingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

