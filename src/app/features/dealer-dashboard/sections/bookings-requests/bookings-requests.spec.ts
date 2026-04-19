import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsRequests } from './bookings-requests';

describe('BookingsRequests', () => {
  let component: BookingsRequests;
  let fixture: ComponentFixture<BookingsRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsRequests],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
