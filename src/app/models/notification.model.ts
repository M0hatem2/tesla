export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'price-drop' | 'review' | 'general';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationData {
  userId: string;
  type: 'booking' | 'price-drop' | 'review' | 'general';
  title: string;
  message: string;
}
