import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceUpdates } from './price-updates';

describe('PriceUpdates', () => {
  let component: PriceUpdates;
  let fixture: ComponentFixture<PriceUpdates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceUpdates],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceUpdates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
