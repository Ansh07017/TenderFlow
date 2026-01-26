
import { Tender, TenderStatus, InventoryItem } from './types';

// Helper to set deadlines relative to now for the timer demo
const now = new Date();
const addDays = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const addHours = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

export const MOCK_TENDERS: Tender[] = [
  {
    id: 'T-53299355',
    title: 'Supply of Basmati Rice for Defense Canteens',
    authority: 'Army Service Corps (ASC)',
    region: 'Delhi / NCR',
    category: 'Grains & Pulses',
    deadline: addDays(45),
    estimatedQuantity: '500 MT',
    budget: '₹4.5 Crores',
    status: TenderStatus.OPEN,
    description: 'Procurement of Grade A Long-Grain Basmati Rice for multiple defense canteen depots across Northern India. Moisture content must be below 12%. Packaging in 50kg jute bags.',
    compliance: ['FSSAI License', 'GST Registration', 'ISO 22000', '3-Year Turnover Proof'],
    authorityTrait: 'Strict adherence to technical specifications; values logistics depth over lowest price.'
  },
  {
    id: 'T-8829102',
    title: 'Daily Procurement of Fresh UHT Milk',
    authority: 'Indian Railways - IRCTC',
    region: 'Maharashtra',
    category: 'Dairy',
    deadline: addDays(12),
    estimatedQuantity: '100,000 Liters/Month',
    budget: '₹60 Lakhs',
    status: TenderStatus.CLOSING_SOON,
    description: 'Supply of 500ml Tetrapaks of UHT treated milk. Shelf life minimum 6 months. Required for express train pantry services.',
    compliance: ['FSSAI License', 'Sterilization Certification', 'Cold Storage Logistics Proof'],
    authorityTrait: 'Highly price-sensitive; prefers concise executive summaries with clear unit-cost breakdowns.'
  },
  {
    id: 'T-112233',
    title: 'Bulk Supply of Edible Sunflower Oil',
    authority: 'Department of Food & Public Distribution',
    region: 'Karnataka',
    category: 'Oils & Fats',
    deadline: addDays(3),
    estimatedQuantity: '200 MT',
    budget: '₹2.8 Crores',
    status: TenderStatus.OPEN,
    description: 'Fortified Sunflower oil for distribution under PDS scheme. High quality refined oil required with Vitamin A and D fortification.',
    compliance: ['FSSAI License', 'Fortification Certificate', 'Pollution Control NOC'],
    authorityTrait: 'Compliance-heavy requirements; values detailed risk mitigation strategies for supply disruptions.'
  },
  {
    id: 'T-445566',
    title: 'Instant Coffee & Tea Premixes for PSU Offices',
    authority: 'Oil & Natural Gas Corporation (ONGC)',
    region: 'Gujarat',
    category: 'Beverages',
    deadline: addHours(1.5),
    estimatedQuantity: '5,000 Kg',
    budget: '₹15 Lakhs',
    status: TenderStatus.OPEN,
    description: 'Premixes for automated vending machines. Sugar-free variants also required. Annual rate contract format.',
    compliance: ['FSSAI License', 'Sample Testing Approval', 'MSME Registration (Preferred)'],
    authorityTrait: 'Values innovation and premium quality; prefers sample-led technical pitches.'
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Basmati Rice (Long Grain)', availableQty: 600, unit: 'MT' },
  { id: 'inv-2', name: 'UHT Milk (500ml Tetrapak)', availableQty: 45000, unit: 'Units' },
  { id: 'inv-3', name: 'Sunflower Oil (Refined)', availableQty: 50, unit: 'MT' },
  { id: 'inv-4', name: 'Tea Premix (Classic)', availableQty: 1200, unit: 'Kg' }
];

export const COMPANY_PROFILE = {
  name: 'AgroPrime Solutions Pvt Ltd',
  specialization: 'Large-scale FMCG distribution and food processing',
  turnover: '₹50 Crores annually',
  experience: '12 years in government supply chains',
  certificates: ['FSSAI Platinum', 'ISO 9001', 'ISO 22000', 'Agmark Certified']
};
