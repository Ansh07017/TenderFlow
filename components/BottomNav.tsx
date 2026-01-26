
import React from 'react';
import { Search, Bell, BarChart3, Database, Settings as SettingsIcon } from 'lucide-react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const tabs = [
    { id: 'dashboard', icon: Search, label: 'Explore' },
    { id: 'inventory', icon: Database, label: 'Stock' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'analytics', icon: BarChart3, label: 'Insights' },
    { id: 'settings', icon: SettingsIcon, label: 'Config' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-3 flex justify-around items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id || (tab.id === 'dashboard' && currentView === 'detail');
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id as View)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
