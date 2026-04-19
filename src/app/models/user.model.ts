export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: 'buyer' | 'dealer' | 'admin';
  city?: string;
  avatar?: string;
  isBanned: boolean;
  createdAt: string;
  favorites: string[];
  downloadedBrochures: BrochureDownload[];
}

export interface BrochureDownload {
  carId: string;
  carName: string;
  downloadDate: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: 'buyer' | 'dealer';
  dealershipName?: string;
  dealershipAddress?: string;
  city?: string;
}
