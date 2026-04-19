import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingModels } from './upcoming-models';

describe('UpcomingModels', () => {
  let component: UpcomingModels;
  let fixture: ComponentFixture<UpcomingModels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingModels],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingModels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
