import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearch } from './car-search';

describe('CarSearch', () => {
  let component: CarSearch;
  let fixture: ComponentFixture<CarSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(CarSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
