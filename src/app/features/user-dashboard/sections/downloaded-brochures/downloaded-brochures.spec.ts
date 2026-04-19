import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadedBrochures } from './downloaded-brochures';

describe('DownloadedBrochures', () => {
  let component: DownloadedBrochures;
  let fixture: ComponentFixture<DownloadedBrochures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadedBrochures],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadedBrochures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
