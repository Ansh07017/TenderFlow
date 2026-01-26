
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Brain, Zap, Wand2, UserCheck, Bot, CheckCircle, Save, Edit3, Type, Image as ImageIcon, Layout, RotateCcw, FileType, FileText, ShieldAlert, Target } from 'lucide-react';
import { Tender, ManagerProfile, CompanyProfile, SubmissionHistory, StrategyMode, GeneratorMode } from '../types';
import { generateTenderReport } from '../geminiService';

interface ResponseGeneratorProps {
  tender: Tender;
  customTemplate?: string;
  logoUrl?: string | null;
  manager?: ManagerProfile;
  company?: CompanyProfile;
  history?: SubmissionHistory[];
  onBack: () => void;
  onFinish: (reportText: string) => void;
}

const ResponseGenerator: React.FC<ResponseGeneratorProps> = ({ 
  tender, 
  customTemplate, 
  logoUrl, 
  manager,
  company,
  history,
  onBack, 
  onFinish 
}) => {
  const [report, setReport] = useState('');
  const [generating, setGenerating] = useState(true);
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [genMode, setGenMode] = useState<GeneratorMode>('draft');
  const [strategy, setStrategy] = useState<StrategyMode>('compliance');

  const generate = async () => {
    setGenerating(true);
    // Passing strategy and historical traits to the service
    const text = await generateTenderReport(
      tender, 
      "Verified Stock Chain", 
      customTemplate,
      logoUrl ? `Brand: ${logoUrl}` : undefined,
      manager,
      company,
      history,
      genMode
    );
    setReport(text);
    setGenerating(false);
  };

  useEffect(() => {
    generate();
  }, [tender, customTemplate, genMode, strategy]);

  return (
    <div className="pb-32 min-h-screen bg-slate-100 text-slate-900 animate-in slide-in-from-bottom duration-500">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">TenderFlow Studio</span>
          <span className="font-black text-sm text-indigo-600 uppercase italic">Intel Layer v3.5</span>
        </div>
        <button 
          onClick={() => setViewMode(viewMode === 'preview' ? 'edit' : 'preview')}
          className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
            viewMode === 'edit' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
          }`}
        >
          {viewMode === 'edit' ? <Save size={14} /> : <Edit3 size={14} />}
          {viewMode === 'edit' ? 'Review' : 'Refine'}
        </button>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Control Center */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
           <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Human-in-the-Loop Mode</h4>
              <div className="bg-slate-50 p-1 rounded-2xl flex items-center">
                <button onClick={() => setGenMode('draft')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${genMode === 'draft' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}>
                  <Bot size={14} /> AI Draft
                </button>
                <button onClick={() => setGenMode('assist')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${genMode === 'assist' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}>
                  <UserCheck size={14} /> AI Assist
                </button>
              </div>
           </div>

           <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategic Posture</h4>
              <div className="bg-slate-50 p-1 rounded-2xl flex items-center">
                <button onClick={() => setStrategy('compliance')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${strategy === 'compliance' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}>
                  <ShieldAlert size={14} /> Conservative
                </button>
                <button onClick={() => setStrategy('competitive')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${strategy === 'competitive' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}>
                  <Target size={14} /> Competitive
                </button>
              </div>
           </div>
        </section>

        {generating ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/10 rounded-[2.5rem] animate-spin border-t-indigo-600"></div>
              <Brain className="absolute inset-0 m-auto text-indigo-500 animate-pulse" size={40} />
            </div>
            <div className="text-center px-10">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Authority Awareness Active</h3>
              <p className="text-slate-500 text-xs mt-2 italic leading-relaxed">
                Applying {strategy === 'compliance' ? 'high-compliance' : 'aggressive-margin'} logic based on {tender.authority}'s historical preference.
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* DOCUMENT CANVAS */}
            <div className="bg-white min-h-[1100px] rounded-[3.5rem] border border-slate-300 shadow-2xl p-14 md:p-20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
               
               <div className="flex justify-between items-start mb-20 border-b-8 border-slate-900 pb-12 relative z-10">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                       <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        {genMode === 'draft' ? 'Autonomous AI Draft' : 'AI-Assisted Framework'}
                      </span>
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200">
                        EY-Audit Quality
                      </span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 leading-[0.85] uppercase tracking-tighter max-w-[420px]">{tender.title}</h1>
                  </div>
                  {logoUrl && <img src={logoUrl} alt="Logo" className="w-24 h-24 object-contain grayscale brightness-0 opacity-70" />}
               </div>

               {viewMode === 'edit' ? (
                <textarea 
                  className="w-full min-h-[900px] p-8 text-sm font-mono focus:outline-none bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] leading-relaxed text-slate-700"
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  spellCheck={false}
                />
               ) : (
                <div className="prose prose-sm prose-slate max-w-none text-slate-900 font-serif leading-loose">
                  {report.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h2 key={i} className="text-4xl font-black text-slate-900 mt-20 mb-10 border-b-4 border-slate-900 pb-4 uppercase tracking-tighter">{line.replace('# ', '')}</h2>;
                    if (line.startsWith('## ')) return <h3 key={i} className="text-2xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-4 uppercase"><span className="w-10 h-2 bg-indigo-600 rounded-full"></span>{line.replace('## ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-8 mb-4 list-none text-[16px] text-slate-700 font-bold border-l-4 border-indigo-100 pl-6 leading-tight">{line.replace('- ', '')}</li>;
                    if (line.trim() === '') return <div key={i} className="h-8" />;
                    return <p key={i} className="mb-8 text-[18px] text-slate-800 font-medium leading-relaxed">{line}</p>;
                  })}
                  <div className="mt-40 pt-16 border-t border-slate-200 flex justify-between items-end opacity-20">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-tighter">Signatory Assurance</p>
                      <p className="text-2xl font-black text-slate-900 italic tracking-tighter underline">{manager?.name}</p>
                    </div>
                    <p className="text-[10px] font-mono font-black">TENDERFLOW_DRAFT_STAMP_99X2</p>
                  </div>
                </div>
               )}
            </div>

            <div className="mt-12 space-y-8 pb-32">
               <button onClick={() => onFinish(report)} className="w-full flex items-center justify-center gap-4 py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl ring-[14px] ring-indigo-50 active:scale-95 transition-all">
                  <CheckCircle size={24} /> Commit to Enterprise Pipeline
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResponseGenerator;
