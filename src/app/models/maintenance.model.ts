export interface MaintenanceSchedule {
  service: string;
  lastDone: number;
  nextDue: number;
  status: 'ok' | 'due-soon' | 'overdue';
}

export interface MaintenanceTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  fullText: string;
}

export interface ServiceCenter {
  id: string;
  name: string;
  city: string;
  address: string;
  specialties: string[];
  rating: number;
  phone: string;
}
