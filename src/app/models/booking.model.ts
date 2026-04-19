export interface Booking {
  id: string;
  userId: string;
  carId: string;
  dealerId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  nationalId: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  rejectionReason?: string;
  createdAt: string;
  referenceNumber: string;
}

export interface BookingData {
  carId: string;
  dealerId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  nationalId: string;
  specialRequests?: string;
}
