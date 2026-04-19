import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDealers } from './manage-dealers';

describe('ManageDealers', () => {
  let component: ManageDealers;
  let fixture: ComponentFixture<ManageDealers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDealers],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageDealers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
