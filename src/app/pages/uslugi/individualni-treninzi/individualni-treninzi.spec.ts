import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualniTreninzi } from './individualni-treninzi';

describe('IndividualniTreninzi', () => {
  let component: IndividualniTreninzi;
  let fixture: ComponentFixture<IndividualniTreninzi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualniTreninzi],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualniTreninzi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
