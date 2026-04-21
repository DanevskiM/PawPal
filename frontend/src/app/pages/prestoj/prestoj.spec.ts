import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestojComponent } from './prestoj';

describe('PrestojComponent', () => {
  let component: PrestojComponent;
  let fixture: ComponentFixture<PrestojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestojComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrestojComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
