
export enum TenderStatus {
  OPEN = 'Open',
  CLOSING_SOON = 'Closing Soon',
  SUBMITTED = 'Submitted',
  REJECTED = 'Rejected'
}

export interface ManagerProfile {
  name: string;
  sector: string;
  designation: string;
}

export interface CompanyProfile {
  name: string;
  phone: string;
  email: string;
  products: string;
}

export interface SubmissionHistory {
  tenderId: string;
  title: string;
  date: string;
  score: number;
  status: 'Won' | 'Lost' | 'Pending' | 'Rejected';
  rejectionReason?: string;
  lessonsLearned?: string;
}

export interface RiskRadar {
  compliance: 'Low' | 'Medium' | 'High';
  delivery: 'Low' | 'Medium' | 'High';
  margin: 'Low' | 'Medium' | 'High';
}

export interface AIResponse {
  score: number;
  reasoning: string;
  explainability: {
    pros: string[];
    cons: string[];
    historyInsight: string;
  };
  risks: RiskRadar;
  draft?: string;
}

export interface Tender {
  id: string;
  title: string;
  authority: string;
  region: string;
  category: string;
  deadline: string;
  estimatedQuantity: string;
  budget: string;
  status: TenderStatus;
  description: string;
  compliance: string[];
  authorityTrait?: string; // Authority Intelligence Layer
}

export interface InventoryItem {
  id: string;
  name: string;
  availableQty: number;
  unit: string;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  itemName: string;
  qty: number;
  type: 'addition' | 'deduction' | 'allocation';
  timestamp: string;
  reference?: string;
}

export interface AppAlert {
  id: string;
  type: 'deadline' | 'stock' | 'system';
  title: string;
  message: string;
  tenderId?: string;
  timestamp: Date;
}

export type StrategyMode = 'compliance' | 'competitive';
export type GeneratorMode = 'draft' | 'assist';

export type View = 'dashboard' | 'detail' | 'generator' | 'analytics' | 'notifications' | 'inventory' | 'settings';
