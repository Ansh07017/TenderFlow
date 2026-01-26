
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Brain, Zap, Wand2, UserCheck, Bot, CheckCircle, Save, Edit3, Type, Image as ImageIcon, Layout, RotateCcw, FileType, FileText, ShieldAlert, Target, FileDown, Printer, Share2, FileJson, FilePlus } from 'lucide-react';
import { Tender, ManagerProfile, CompanyProfile, SubmissionHistory, StrategyMode, GeneratorMode } from '../types';
import { generateTenderReport } from '../geminiService';
import Logo from './Logo';

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
  const [showExportMenu, setShowExportMenu] = useState(false);

  const generate = async () => {
    setGenerating(true);
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

  const handleExport = (format: 'pdf' | 'docx' | 'pptx') => {
    setShowExportMenu(false);
    
    if (format === 'pdf') {
      window.print();
      return;
    }

    const fileName = `TenderResponse_${tender.id}_${new Date().toISOString().split('T')[0]}.${format}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    alert(`Enterprise Export Triggered: ${format.toUpperCase()} generated.`);
  };

  return (
    <div className="pb-32 min-h-screen bg-slate-100 text-slate-900 animate-in slide-in-from-bottom duration-500 print:bg-white">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 print:hidden">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
            <ChevronLeft size={20} />
          </button>
          <Logo size="sm" />
        </div>
        <div className="flex flex-col items-end">
          <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Dossier Studio</span>
          <span className="font-black text-[9px] text-indigo-600 uppercase tracking-tighter">AI Tier 3 Active</span>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 print:hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operation Mode</h4>
                <div className="bg-slate-50 p-1 rounded-2xl flex items-center">
                  <button onClick={() => setGenMode('draft')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${genMode === 'draft' ? 'bg-[#00509d] text-white shadow-md' : 'text-slate-400'}`}>
                    <Bot size={14} /> AI Draft
                  </button>
                  <button onClick={() => setGenMode('assist')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${genMode === 'assist' ? 'bg-[#00509d] text-white shadow-md' : 'text-slate-400'}`}>
                    <UserCheck size={14} /> AI Assist
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategic Posture</h4>
                <div className="bg-slate-50 p-1 rounded-2xl flex items-center">
                  <button onClick={() => setStrategy('compliance')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${strategy === 'compliance' ? 'bg-[#7cb342] text-white shadow-md' : 'text-slate-400'}`}>
                    <ShieldAlert size={14} /> Reliable
                  </button>
                  <button onClick={() => setStrategy('competitive')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${strategy === 'competitive' ? 'bg-[#7cb342] text-white shadow-md' : 'text-slate-400'}`}>
                    <Target size={14} /> Aggressive
                  </button>
                </div>
              </div>
           </div>
        </section>

        {generating ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-500/10 rounded-[2rem] animate-spin border-t-[#00509d]"></div>
              <Logo size="sm" showText={false} />
            </div>
            <div className="text-center px-10">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Synthesizing Dossier...</h3>
              <p className="text-slate-500 text-[10px] uppercase font-bold mt-2 tracking-widest">Applying historical lessons and stock verification</p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 flex justify-between items-center print:hidden px-2">
              <button 
                onClick={() => setViewMode(viewMode === 'preview' ? 'edit' : 'preview')}
                className={`px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                  viewMode === 'edit' ? 'bg-[#00509d] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
                }`}
              >
                {viewMode === 'edit' ? <Save size={14} /> : <Edit3 size={14} />}
                {viewMode === 'edit' ? 'Save & Preview' : 'Edit Source'}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-3xl font-black text-[10px] uppercase tracking-widest text-slate-700 shadow-sm hover:shadow-lg transition-all active:scale-95"
                >
                  <FileDown size={16} className="text-[#00509d]" />
                  Distribute
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-4 z-50 animate-in zoom-in-95 duration-200">
                    <div className="space-y-1">
                      <button onClick={() => handleExport('pdf')} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group">
                        <div className="p-2 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform"><Printer size={18} /></div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase">Export PDF</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Print Ready</p>
                        </div>
                      </button>
                      <button onClick={() => handleExport('docx')} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform"><FileType size={18} /></div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase">Export Word</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Editable .docx</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white min-h-[1100px] rounded-[3rem] border border-slate-200 shadow-2xl p-10 md:p-20 relative overflow-hidden print:shadow-none print:border-none print:rounded-none print:p-0">
               <div className="flex justify-between items-start mb-16 border-b-4 border-slate-900 pb-10 relative z-10 print:mb-10 print:pb-6">
                  <div className="space-y-4">
                    <Logo size="md" />
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter max-w-[420px] print:text-4xl">{tender.title}</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest print:text-[12px]">{tender.authority} • {tender.id}</p>
                  </div>
               </div>

               {viewMode === 'edit' ? (
                <textarea 
                  className="w-full min-h-[800px] p-8 text-sm font-mono focus:outline-none bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] leading-relaxed text-slate-700 print:hidden"
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  spellCheck={false}
                />
               ) : (
                <div className="prose prose-sm prose-slate max-w-none text-slate-900 font-serif leading-loose print:text-black">
                  {report.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-black text-slate-900 mt-12 mb-6 border-b-2 border-slate-900 pb-2 uppercase tracking-tighter">{line.replace('# ', '')}</h2>;
                    if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-black text-slate-900 mt-8 mb-4 uppercase">{line.replace('## ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-2 list-none text-slate-700 border-l-4 border-blue-100 pl-4">{line.replace('- ', '')}</li>;
                    if (line.trim() === '') return <div key={i} className="h-4" />;
                    return <p key={i} className="mb-4 text-slate-800 font-medium">{line}</p>;
                  })}
                </div>
               )}
            </div>

            <div className="mt-12 pb-32 print:hidden">
               <button onClick={() => onFinish(report)} className="w-full py-6 bg-[#00509d] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all">
                  Commit to Enterprise Pipeline
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResponseGenerator;
