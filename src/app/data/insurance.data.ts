import { Insurance } from '../models/insurance.model';

export const INSURANCE_DATA: Insurance[] = [
  {
    id: 'ins1',
    type: 'third-party',
    name: 'Third Party Insurance',
    description: 'Basic coverage required by law',
    coverage: [
      'Liability for third party injuries',
      'Third party property damage',
      'Legal expenses',
    ],
    priceRange: '$200 - $400/year',
    icon: 'shield',
  },
  {
    id: 'ins2',
    type: 'comprehensive',
    name: 'Comprehensive Insurance',
    description: 'Full coverage for your vehicle',
    coverage: [
      'All third party coverage',
      'Own vehicle damage',
      'Theft protection',
      'Fire damage',
      'Natural disasters',
      'Windshield coverage',
    ],
    priceRange: '$800 - $2000/year',
    icon: 'shield-check',
  },
  {
    id: 'ins3',
    type: 'third-party-fire-theft',
    name: 'Third Party + Fire & Theft',
    description: 'Mid-level protection',
    coverage: ['All third party coverage', 'Fire damage', 'Theft protection'],
    priceRange: '$400 - $800/year',
    icon: 'shield-plus',
  },
];
