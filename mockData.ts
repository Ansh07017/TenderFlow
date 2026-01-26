
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
  },
  {
    id: 'T-991022',
    title: 'Whole Spices Supply for Central Police Canteens',
    authority: 'Central Police Canteen (CPC)',
    region: 'All India',
    category: 'Spices & Condiments',
    deadline: addDays(25),
    estimatedQuantity: '50 MT',
    budget: '₹1.2 Crores',
    status: TenderStatus.OPEN,
    description: 'Supply of high-quality Black Pepper, Turmeric, and Cumin seeds. Must be free from adulterants and meet Agmark Grade 1 standards.',
    compliance: ['Agmark Grade 1', 'FSSAI License', 'Import/Export Code (if applicable)'],
    authorityTrait: 'Purity focused; uses independent lab testing for every batch. Zero tolerance for quality deviations.'
  },
  {
    id: 'T-773322',
    title: 'Annual Contract for Packaged Drinking Water',
    authority: 'Air India SATS',
    region: 'Karnataka',
    category: 'Beverages',
    deadline: addDays(8),
    estimatedQuantity: '1,000,000 Bottles (500ml)',
    budget: '₹90 Lakhs',
    status: TenderStatus.OPEN,
    description: 'Supply of 500ml PET bottles for in-flight catering. Brand visibility and eco-friendly packaging are priorities.',
    compliance: ['BIS Certification', 'FSSAI License', 'Plastic Waste Management Plan'],
    authorityTrait: 'Brand conscious; looks for partners with strong environmental, social, and governance (ESG) commitments.'
  },
  {
    id: 'T-554411',
    title: 'Cleaning & Hygiene Kits for Municipal Staff',
    authority: 'Greater Mumbai Municipal Corporation (MCGM)',
    region: 'Maharashtra',
    category: 'Home Care',
    deadline: addDays(15),
    estimatedQuantity: '20,000 Kits',
    budget: '₹40 Lakhs',
    status: TenderStatus.OPEN,
    description: 'Kits containing Soap, Sanitizer, and Floor Cleaners for sanitation workers. Bulk packaging preferred for easy distribution.',
    compliance: ['Drug License (Sanitizer)', 'FSSAI (if applicable)', 'ISO 9001'],
    authorityTrait: 'Logistics driven; requires evidence of last-mile distribution capabilities in urban slums.'
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Basmati Rice (Long Grain)', availableQty: 600, unit: 'MT' },
  { id: 'inv-2', name: 'UHT Milk (500ml Tetrapak)', availableQty: 45000, unit: 'Units' },
  { id: 'inv-3', name: 'Sunflower Oil (Refined)', availableQty: 50, unit: 'MT' },
  { id: 'inv-4', name: 'Tea Premix (Classic)', availableQty: 1200, unit: 'Kg' },
  { id: 'inv-5', name: 'Whole Spices (Assorted)', availableQty: 75, unit: 'MT' },
  { id: 'inv-6', name: 'Drinking Water (500ml PET)', availableQty: 250000, unit: 'Units' },
  { id: 'inv-7', name: 'Hygiene Kits (Standard)', availableQty: 5000, unit: 'Kits' }
];

export const COMPANY_PROFILE = {
  name: 'AgroPrime Solutions Pvt Ltd',
  specialization: 'Large-scale FMCG distribution and food processing',
  turnover: '₹50 Crores annually',
  experience: '12 years in government supply chains',
  certificates: ['FSSAI Platinum', 'ISO 9001', 'ISO 22000', 'Agmark Certified'],
  warehouses: ['Delhi (Hub)', 'Mumbai (Regional)', 'Bengaluru (Logistics Center)'],
  fleetSize: '45 Temperature-controlled Trucks',
  keyClients: ['Defense Ministry', 'Indian Railways', 'UNICEF Food Program']
};
