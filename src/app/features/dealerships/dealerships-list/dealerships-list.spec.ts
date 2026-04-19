import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipsList } from './dealerships-list';

describe('DealershipsList', () => {
  let component: DealershipsList;
  let fixture: ComponentFixture<DealershipsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealershipsList],
    }).compileComponents();

    fixture = TestBed.createComponent(DealershipsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
