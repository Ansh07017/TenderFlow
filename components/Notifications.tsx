
import React from 'react';
// Add Sparkles to the imports from lucide-react
import { BellRing, Clock, AlertTriangle, Coins, CheckCircle, XCircle, CalendarClock, Sparkles } from 'lucide-react';
import { AppAlert, Tender } from '../types';
import { MOCK_TENDERS } from '../mockData';

interface NotificationsProps {
  alerts: AppAlert[];
  onAction: (tenderId: string, action: 'budget' | 'remind' | 'notInterested') => void;
}

const Notifications: React.FC<NotificationsProps> = ({ alerts, onAction }) => {
  return (
    <div className="p-6 pb-24 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Action Center</h1>
        <p className="text-slate-500 text-sm font-medium">Time-sensitive operational triggers</p>
      </header>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <CheckCircle size={48} className="text-slate-200 mb-4" />
            <p className="text-slate-400 text-sm">All operational workflows are current.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-5 rounded-2xl border-l-4 shadow-sm bg-white border-y border-r border-slate-100 transition-all ${
                alert.type === 'deadline' ? 'border-l-amber-500' : 
                alert.type === 'stock' ? 'border-l-red-500' : 'border-l-indigo-500'
              }`}
            >
              <div className="flex gap-4">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  alert.type === 'deadline' ? 'bg-amber-50 text-amber-600' : 
                  alert.type === 'stock' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {alert.type === 'deadline' ? <Clock size={20} /> : 
                   alert.type === 'stock' ? <AlertTriangle size={20} /> : <BellRing size={20} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                  
                  {alert.tenderId && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {alert.type === 'stock' ? (
                        <button 
                          onClick={() => onAction(alert.tenderId!, 'budget')}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider"
                        >
                          <Coins size={12} /> File Budget
                        </button>
                      ) : (
                        <button 
                          onClick={() => onAction(alert.tenderId!, 'remind')}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-wider"
                        >
                          <CalendarClock size={12} /> Remind in 4h
                        </button>
                      )}
                      
                      <button 
                        onClick={() => onAction(alert.tenderId!, 'notInterested')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-400 text-[10px] font-bold rounded-lg uppercase tracking-wider hover:text-red-500 hover:border-red-100 transition-colors"
                      >
                        <XCircle size={12} /> Not Interested
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 p-5 bg-indigo-600 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-indigo-100">
         <Sparkles className="absolute top-2 right-2 opacity-20" size={60} />
         <h4 className="font-bold text-sm mb-1">Operational Tip</h4>
         <p className="text-xs text-indigo-100 leading-relaxed">
           Filing a budget request for scale-up takes ~5 mins but increases win probability by 40% for low-stock tenders.
         </p>
      </div>
    </div>
  );
};

export default Notifications;
