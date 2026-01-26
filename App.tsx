
import React, { useState } from 'react';
import { View, Tender, InventoryItem, ManagerProfile, CompanyProfile, AppAlert, SubmissionHistory, InventoryTransaction } from './types';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import TenderDetail from './components/TenderDetail';
import ResponseGenerator from './components/ResponseGenerator';
import Analytics from './components/Analytics';
import InventoryManager from './components/InventoryManager';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import { MOCK_INVENTORY, COMPANY_PROFILE as MOCK_COMPANY, MOCK_TENDERS } from './mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionHistory[]>([
    { 
      tenderId: 'T-HIST-001', 
      title: 'Bulk Wheat Distribution Phase 1', 
      date: '2023-08-12', 
      score: 88, 
      status: 'Won', 
      lessonsLearned: 'Competitive pricing in dairy sector beats technical edge.' 
    },
    { 
      tenderId: 'T-HIST-002', 
      title: 'Regional Supply of Fortified Oil', 
      date: '2023-09-05', 
      score: 74, 
      status: 'Lost', 
      rejectionReason: 'Missing ISO 9001 certification proof', 
      lessonsLearned: 'Always append Vol 4 with updated compliance certs.' 
    },
    {
      tenderId: 'T-HIST-003',
      title: 'Defense Pulses Supply (Phase 2)',
      date: '2023-11-20',
      score: 92,
      status: 'Won',
      lessonsLearned: 'Direct farm-to-depot logistics plan reduced delivery risk score.'
    },
    {
      tenderId: 'T-HIST-004',
      title: 'Municipal Tea Supply Contract',
      date: '2024-01-15',
      score: 61,
      status: 'Lost',
      rejectionReason: 'Sample packaging did not meet "Bio-degradable" clause',
      lessonsLearned: 'Verify eco-compliance for beverages sector for Municipal authorities.'
    }
  ]);

  const [alerts, setAlerts] = useState<AppAlert[]>([
    {
      id: 'A1',
      type: 'deadline',
      title: 'Tender Closing Soon',
      message: 'IRCTC UHT Milk tender expires in 12 days. Draft response is 0% complete.',
      tenderId: 'T-8829102',
      timestamp: new Date()
    },
    {
      id: 'A2',
      type: 'stock',
      title: 'Inventory Shortfall',
      message: 'Sunflower Oil stock is at 25% of required quantity for Dept of Food bid.',
      tenderId: 'T-112233',
      timestamp: new Date()
    },
    {
      id: 'A3',
      type: 'system',
      title: 'AI Intelligence Update',
      message: 'New outcome data synced from CPC. Fit scores for Spices sector updated.',
      timestamp: new Date()
    }
  ]);

  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  
  const [managerProfile, setManagerProfile] = useState<ManagerProfile>({
    name: 'Vikram Singh',
    sector: 'Grains & Pulses',
    designation: 'Senior Procurement Manager'
  });

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: MOCK_COMPANY.name,
    phone: '+91 9876543210',
    email: 'contact@agroprime.com',
    products: 'Large-scale FMCG distribution, Grain processing, Basmati Export'
  });

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  const [customTemplate, setCustomTemplate] = useState<string>(`# TITLE PAGE
- Logos: Attached (Brand Identity Layer)
- Title: [TENDER_TITLE]
- Client: [AUTHORITY_NAME]
- Prepared By: ${managerProfile.name}, ${companyProfile.name}
- Validity: 30 Days from submission

# SUMMARY OF OUR PROPOSAL
(Executive Summary - Max 2 pages)
- Purpose of document
- Understanding of requirements
- Proposed methodology and value-add
- Why ${companyProfile.name} should be preferred

# SECTION A – OUR UNDERSTANDING OF YOUR REQUIREMENTS
## Background and context
(Demonstrate industry knowledge and strategic fit)
## Our understanding of your project requirements
(Refined objectives based on tender specifications)

# SECTION B – OUR PROPOSED APPROACH
## Proposed Approach
## Patient and Public Involvement
## Ethics and Governance
## Dissemination Strategy
## Intellectual Property

# SECTION C – OUR PROJECT TEAM AND EXPERIENCE
## Project Team
## Recent relevant experience

# SECTION D – PROJECT AND RISK MANAGEMENT
## Project management
## Project plan
## Project Costs
## Risk register`);

  const handleTenderSelect = (tender: Tender) => {
    setSelectedTender(tender);
    setCurrentView('detail');
  };

  const handleUpdateHistoryFeedback = (id: string, status: SubmissionHistory['status'], reason: string, lesson: string) => {
    setSubmissionHistory(prev => prev.map(h => 
      h.tenderId === id ? { ...h, status, rejectionReason: reason, lessonsLearned: lesson } : h
    ));
    // Trigger an alert for the learning loop
    const newAlert: AppAlert = {
      id: `AL-${Date.now()}`,
      type: 'system',
      title: 'Learning Log Updated',
      message: `AI Model updated with lessons from ${id}. Future drafts will self-correct.`,
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleNotificationAction = (tenderId: string, action: 'budget' | 'remind' | 'notInterested') => {
    if (action === 'notInterested') {
      setAlerts(prev => prev.filter(a => a.tenderId !== tenderId));
    } else {
      alert(`Action "${action}" recorded for tender ${tenderId}.`);
    }
  };

  const handleFinalizeReport = (reportText: string) => {
    if (!selectedTender) return;
    const qtyValue = parseInt(selectedTender.estimatedQuantity) || 0;
    const matchingItem = inventory.find(i => 
      selectedTender.category.toLowerCase().includes(i.name.toLowerCase().split(' ')[0]) || 
      i.name.toLowerCase().includes(selectedTender.category.toLowerCase().split(' ')[0])
    );
    
    if (matchingItem) {
      const newTransaction: InventoryTransaction = {
        id: `TX-${Date.now()}`,
        itemId: matchingItem.id,
        itemName: matchingItem.name,
        qty: -qtyValue,
        type: 'allocation',
        timestamp: new Date().toISOString(),
        reference: selectedTender.id
      };
      setTransactions(prev => [newTransaction, ...prev]);
      setInventory(prev => prev.map(item => item.id === matchingItem.id ? { ...item, availableQty: item.availableQty - qtyValue } : item));
    }

    setSubmissionHistory(prev => [{
      tenderId: selectedTender.id,
      title: selectedTender.title,
      date: new Date().toISOString().split('T')[0],
      score: 95,
      status: 'Pending'
    }, ...prev]);

    alert(`TenderFlow AI: Response committed to pipeline. Stock allocated.`);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onSelectTender={handleTenderSelect} managerProfile={managerProfile} />;
      case 'detail':
        return selectedTender ? (
          <TenderDetail tender={selectedTender} onBack={() => setCurrentView('dashboard')} onProceed={() => setCurrentView('generator')} />
        ) : <Dashboard onSelectTender={handleTenderSelect} managerProfile={managerProfile} />;
      case 'generator':
        return selectedTender ? (
          <ResponseGenerator tender={selectedTender} customTemplate={customTemplate} logoUrl={logoUrl} manager={managerProfile} company={companyProfile} history={submissionHistory} onBack={() => setCurrentView('detail')} onFinish={handleFinalizeReport} />
        ) : <Dashboard onSelectTender={handleTenderSelect} managerProfile={managerProfile} />;
      case 'inventory':
        return <InventoryManager items={inventory} setItems={setInventory} transactions={transactions} setTransactions={setTransactions} />;
      case 'analytics':
        return <Analytics history={submissionHistory} onUpdateFeedback={handleUpdateHistoryFeedback} />;
      case 'settings':
        return <Settings template={customTemplate} setTemplate={setCustomTemplate} logo={logoUrl} setLogo={setLogoUrl} profile={managerProfile} setProfile={setManagerProfile} company={companyProfile} setCompany={setCompanyProfile} />;
      case 'notifications':
        return <Notifications alerts={alerts} onAction={handleNotificationAction} />;
      default:
        return <Dashboard onSelectTender={handleTenderSelect} managerProfile={managerProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center selection:bg-indigo-100">
      <div className="w-full md:max-w-3xl lg:max-w-4xl bg-white min-h-screen shadow-2xl relative overflow-x-hidden border-x border-slate-200">
        <div className="fixed top-4 right-4 z-[60]">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest hidden sm:inline">TenderFlow AI Active</span>
            <span className="text-[11px] font-black text-slate-800 sm:hidden">AI LIVE</span>
          </div>
        </div>

        <main className="min-h-screen">
          {renderContent()}
        </main>
        
        {currentView !== 'generator' && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none z-50">
            <div className="w-full md:max-w-3xl lg:max-w-4xl pointer-events-auto">
              <BottomNav currentView={currentView} setView={setCurrentView} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
