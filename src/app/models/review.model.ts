export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  carId: string;
  dealerId: string;
  rating: number;
  exterior: number;
  interior: number;
  performance: number;
  valueForMoney: number;
  dealerService: number;
  text: string;
  recommended: boolean;
  helpfulCount: number;
  reply?: string;
  isFlagged: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface ReviewData {
  carId: string;
  dealerId: string;
  rating: number;
  exterior: number;
  interior: number;
  performance: number;
  valueForMoney: number;
  dealerService: number;
  text: string;
  recommended: boolean;
}
