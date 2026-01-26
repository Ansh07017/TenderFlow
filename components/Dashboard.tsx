
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Package, ChevronRight, Clock, Star, LayoutGrid } from 'lucide-react';
import { Tender, TenderStatus, ManagerProfile } from '../types';
import { MOCK_TENDERS } from '../mockData';

interface DashboardProps {
  onSelectTender: (tender: Tender) => void;
  managerProfile: ManagerProfile;
}

const CountdownTimer: React.FC<{ deadline: string }> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(deadline).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      if (weeks >= 1) setTimeLeft(`${weeks}w`);
      else if (days >= 1) setTimeLeft(`${days}d`);
      else if (hours >= 1) setTimeLeft(`${hours}h`);
      else setTimeLeft(`${minutes}m`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex items-center text-indigo-600 font-black text-[10px] gap-1 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100 uppercase tracking-tighter">
      <Clock size={10} />
      <span>{timeLeft}</span>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onSelectTender, managerProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState(managerProfile.sector || 'All');

  const categories = ['All', 'Grains & Pulses', 'Dairy', 'Oils & Fats', 'Beverages', 'Home Care', 'Spices & Condiments'];

  const filteredTenders = MOCK_TENDERS.filter(t => 
    (filterCategory === 'All' || t.category === filterCategory) &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.authority.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pb-32 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <header className="px-6 md:px-10 py-8 bg-white border-b border-slate-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Discovery Matrix</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Market intelligence for {managerProfile.sector}</p>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-xl rotate-3 hidden sm:block opacity-20">
             <LayoutGrid size={18} />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search FMCG tenders..."
              className="w-full pl-12 pr-5 py-4 bg-slate-100 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black whitespace-nowrap transition-all uppercase tracking-widest flex items-center gap-2 border ${
                  filterCategory === cat 
                  ? 'bg-[#00509d] text-white border-[#00509d] shadow-lg shadow-blue-100' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                {cat === managerProfile.sector && <Star size={10} fill="currentColor" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-6 md:px-10 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTenders.length > 0 ? (
          filteredTenders.map(tender => (
            <div 
              key={tender.id}
              onClick={() => onSelectTender(tender)}
              className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    tender.status === TenderStatus.CLOSING_SOON 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {tender.status}
                  </span>
                  <CountdownTimer deadline={tender.deadline} />
                </div>

                <h3 className="text-lg font-black text-slate-800 leading-[1.2] group-hover:text-[#00509d] transition-colors uppercase tracking-tight mb-2">
                  {tender.title}
                </h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest truncate">{tender.authority}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="p-1.5 bg-slate-50 rounded-lg"><MapPin size={12} className="text-slate-400" /></div>
                    <span className="text-[10px] font-bold truncate">{tender.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="p-1.5 bg-slate-50 rounded-lg"><Package size={12} className="text-slate-400" /></div>
                    <span className="text-[10px] font-bold">{tender.estimatedQuantity}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">ID: {tender.id.split('-')[1] || tender.id}</span>
                <div className="flex items-center gap-2 text-[#00509d] font-black text-[10px] uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl group-hover:bg-[#00509d] group-hover:text-white transition-all">
                  Analyze <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Package size={28} className="text-slate-300" />
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">No Tenders Detected</p>
            <button onClick={() => setFilterCategory('All')} className="text-[#00509d] text-[10px] font-black uppercase tracking-widest mt-4 hover:underline underline-offset-4">Reset Filtering Matrix</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
