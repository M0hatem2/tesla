import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipDetails } from './dealership-details';

describe('DealershipDetails', () => {
  let component: DealershipDetails;
  let fixture: ComponentFixture<DealershipDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealershipDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(DealershipDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
