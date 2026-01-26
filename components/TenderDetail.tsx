
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Info, CheckCircle2, AlertTriangle, Sparkles, BrainCircuit, FileText, ChevronDown, ChevronUp, ShieldAlert, Target, ShieldCheck, Zap, History, LayoutPanelLeft } from 'lucide-react';
import { Tender, AIResponse } from '../types';
import { getTenderFitScore } from '../geminiService';
import { MOCK_INVENTORY as MOCK_INVENTORY_DATA } from '../mockData';

interface TenderDetailProps {
  tender: Tender;
  onBack: () => void;
  onProceed: () => void;
}

const RiskBadge: React.FC<{ label: string; level: string }> = ({ label, level }) => {
  const colors = {
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    High: 'bg-red-100 text-red-700 border-red-200'
  };
  return (
    <div className="flex flex-col gap-1 flex-1">
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label} Risk</span>
      <div className={`text-[11px] font-bold px-3 py-1.5 rounded-xl text-center border ${colors[level as keyof typeof colors] || 'bg-slate-100'}`}>
        {level}
      </div>
    </div>
  );
};

const TenderDetail: React.FC<TenderDetailProps> = ({ tender, onBack, onProceed }) => {
  const [analysis, setAnalysis] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => {
    const analyze = async () => {
      setLoading(true);
      const res = await getTenderFitScore(tender);
      setAnalysis(res);
      setLoading(false);
    };
    analyze();
  }, [tender]);

  const checkInventory = () => {
    // Improved matching logic for demo purposes
    const item = MOCK_INVENTORY_DATA.find(i => {
      const catMatch = tender.category.toLowerCase().includes(i.name.toLowerCase().split(' ')[0]);
      const titleMatch = tender.title.toLowerCase().includes(i.name.toLowerCase().split(' ')[0]);
      return catMatch || titleMatch;
    });
    
    if (!item) return { status: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-50', message: 'Category not tracked' };
    
    const reqValue = parseInt(tender.estimatedQuantity.replace(/,/g, ''));
    if (isNaN(reqValue)) return { status: 'Manual Check', color: 'text-amber-700', bg: 'bg-amber-50', message: 'Parsing error in quantity' };

    if (item.availableQty >= reqValue * 1.5) return { status: 'Stock Available', color: 'text-emerald-700', bg: 'bg-emerald-50', message: `Available: ${item.availableQty} ${item.unit}` };
    if (item.availableQty >= reqValue) return { status: 'Partial Stock', color: 'text-amber-700', bg: 'bg-amber-50', message: `Lead time: 5-7 days (${item.availableQty} units ready)` };
    return { status: 'Insufficient Stock', color: 'text-red-700', bg: 'bg-red-50', message: `Required: ${reqValue}, Available: ${item.availableQty}` };
  };

  const inv = checkInventory();

  return (
    <div className="pb-32 bg-slate-50 min-h-screen animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-8 pb-4 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Tenderflow AI</h2>
            <span className="text-[10px] text-indigo-600 font-bold uppercase">{tender.id}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-2xl border border-indigo-100">
          <ShieldCheck size={14} className="text-indigo-600" />
          <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Validated</span>
        </div>
      </header>

      <main className="px-6 mt-6 space-y-6">
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tender.category}</p>
          </div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">{tender.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Target size={14} className="text-indigo-500" />
            <p className="text-sm font-bold text-slate-600">{tender.authority}</p>
          </div>
        </section>

        {/* DECISION SUPPORT: RISK RADAR */}
        <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-indigo-600" /> Decision Risk Radar
              </h3>
              <span className="text-[9px] font-bold text-slate-400">Decision-Support Layer</span>
           </div>
           <div className="flex gap-4">
              <RiskBadge label="Compliance" level={analysis?.risks.compliance || '...'} />
              <RiskBadge label="Delivery" level={analysis?.risks.delivery || '...'} />
              <RiskBadge label="Margin" level={analysis?.risks.margin || '...'} />
           </div>
        </section>

        {/* AI SUITABILITY ENGINE (Summary Card) */}
        <section className="bg-slate-900 rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden ring-4 ring-indigo-500/5">
          <div className="absolute top-[-20px] right-[-20px] p-6 opacity-5 rotate-12">
            <BrainCircuit size={180} />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-indigo-300">AI Suitability Engine</span>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-sm">
              Flash 3.0 Engine
            </div>
          </div>
          
          {loading ? (
            <div className="py-10 animate-pulse space-y-4">
              <div className="h-16 w-32 bg-white/10 rounded-3xl"></div>
              <div className="h-4 w-full bg-white/5 rounded-full"></div>
            </div>
          ) : (
            <>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-7xl font-black tracking-tighter leading-none italic">{analysis?.score}</span>
                <span className="text-2xl font-black text-indigo-400 mb-2">%</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-300 border-l-4 border-indigo-500/40 pl-5 py-1">
                {analysis?.reasoning}
              </p>
            </>
          )}
        </section>

        {/* EXPLAINABILITY BREAKDOWN (Collapsible Section) */}
        {!loading && analysis && (
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <button 
              onClick={() => setShowExplain(!showExplain)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                  <LayoutPanelLeft size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Score Attribution Logic</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">View detailed breakdown</p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${showExplain ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-slate-400" />
              </div>
            </button>

            {showExplain && (
              <div className="px-6 pb-6 pt-2 space-y-6 animate-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2 tracking-widest">
                      <CheckCircle2 size={12} /> Strategic Fits
                    </h4>
                    <div className="space-y-2">
                      {analysis.explainability.pros.map((pro, i) => (
                        <div key={i} className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                          <p className="text-[11px] text-emerald-800 font-medium leading-tight">{pro}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2 tracking-widest">
                      <AlertTriangle size={12} /> Friction Points
                    </h4>
                    <div className="space-y-2">
                      {analysis.explainability.cons.map((con, i) => (
                        <div key={i} className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                          <p className="text-[11px] text-amber-800 font-medium leading-tight">{con}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-2 tracking-widest">
                    <History size={12} /> Institutional Intelligence
                  </h4>
                  <p className="text-[11px] leading-relaxed text-indigo-900 font-medium italic">
                    "{analysis.explainability.historyInsight}"
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* DOMAIN INTELLIGENCE: AUTHORITY LAYER */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
               <ShieldAlert size={18} />
             </div>
             <div>
               <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Authority Intelligence Layer</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase">Scalability Layer v2.1</p>
             </div>
           </div>
           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-indigo-900 mb-1">Entity Behavior Profile:</p>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{tender.authorityTrait || "Historical patterns suggest this PSU values deep compliance over low margins. Recommended focus: technical benchmarks."}"
              </p>
           </div>
        </section>

        {/* STOCK CHECK */}
        <section className={`${inv.bg} rounded-3xl p-6 border border-slate-100`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> Stock Readiness Check
            </h3>
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${inv.color} bg-white shadow-sm ring-1 ring-inset ring-current/20`}>
              {inv.status}
            </span>
          </div>
          <p className={`text-sm font-bold ${inv.color} mb-1`}>{inv.message}</p>
          <p className="text-[10px] text-slate-500 font-medium">Real-time mock inventory audit.</p>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-6 flex gap-4 shadow-2xl z-50 rounded-t-[2.5rem]">
        <button 
          onClick={onBack}
          className="flex-1 py-5 px-4 bg-slate-100 text-slate-500 font-black rounded-3xl active:scale-95 transition-all text-[11px] uppercase tracking-[0.2em]"
        >
          Discard
        </button>
        <button 
          onClick={onProceed}
          className="flex-[2] py-5 px-4 bg-indigo-600 text-white font-black rounded-3xl active:scale-95 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] ring-8 ring-indigo-50"
        >
          <BrainCircuit size={20} />
          Generate Strategy
        </button>
      </div>
    </div>
  );
};

export default TenderDetail;
