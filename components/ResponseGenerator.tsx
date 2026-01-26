
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Brain, Zap, Wand2, UserCheck, Bot, CheckCircle, Save, Edit3, Type, Image as ImageIcon, Layout, RotateCcw, FileType, FileText, ShieldAlert, Target, FileDown, Printer, Share2, FileJson, FilePlus } from 'lucide-react';
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
      // PDF is handled best by the system print dialog in prototypes
      window.print();
      return;
    }

    // Mocking file download for Word and PowerPoint
    const fileName = `TenderResponse_${tender.id}_${new Date().toISOString().split('T')[0]}.${format}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    alert(`Enterprise Export Triggered: ${format.toUpperCase()} generated. Check your downloads.`);
  };

  return (
    <div className="pb-32 min-h-screen bg-slate-100 text-slate-900 animate-in slide-in-from-bottom duration-500 print:bg-white">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 print:hidden">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">TenderFlow Studio</span>
          <span className="font-black text-sm text-indigo-600 uppercase italic">Intel Layer v3.5</span>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setViewMode(viewMode === 'preview' ? 'edit' : 'preview')}
            className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
              viewMode === 'edit' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
            }`}
          >
            {viewMode === 'edit' ? <Save size={14} /> : <Edit3 size={14} />}
            {viewMode === 'edit' ? 'Review' : 'Refine'}
          </button>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        {/* Control Center (Hidden when printing) */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 print:hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            {/* EXPORT ACTION BAR (Hidden when printing) */}
            <div className="mb-6 flex justify-end print:hidden">
              <div className="relative">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-3xl font-black text-[10px] uppercase tracking-widest text-slate-700 shadow-sm hover:shadow-lg transition-all active:scale-95"
                >
                  <FileDown size={16} className="text-indigo-600" />
                  Distribute Dossier
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-4 z-50 animate-in zoom-in-95 duration-200">
                    <div className="space-y-1">
                      <button 
                        onClick={() => handleExport('pdf')}
                        className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                      >
                        <div className="p-2 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform"><Printer size={18} /></div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase">Export PDF</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">System Print Engine</p>
                        </div>
                      </button>
                      <button 
                        onClick={() => handleExport('docx')}
                        className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                      >
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform"><FileType size={18} /></div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase">Export MS Word</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">Editable .docx file</p>
                        </div>
                      </button>
                      <button 
                        onClick={() => handleExport('pptx')}
                        className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                      >
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform"><Layout size={18} /></div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase">Export PowerPoint</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">Presentation Pitch Deck</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DOCUMENT CANVAS */}
            <div className="bg-white min-h-[1100px] rounded-[3.5rem] border border-slate-300 shadow-2xl p-10 md:p-20 relative overflow-hidden print:shadow-none print:border-none print:rounded-none print:p-0">
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50/30 rounded-full blur-3xl -mr-20 -mt-20 print:hidden"></div>
               
               <div className="flex justify-between items-start mb-20 border-b-8 border-slate-900 pb-12 relative z-10 print:mb-10 print:pb-6 print:border-b-4">
                  <div className="space-y-4">
                    <div className="flex gap-2 print:hidden">
                       <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        {genMode === 'draft' ? 'Autonomous AI Draft' : 'AI-Assisted Framework'}
                      </span>
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200">
                        EY-Audit Quality
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[0.85] uppercase tracking-tighter max-w-[420px] print:text-4xl">{tender.title}</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest print:text-[12px]">{tender.authority} • {tender.id}</p>
                  </div>
                  {logoUrl && <img src={logoUrl} alt="Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain grayscale brightness-0 opacity-70" />}
               </div>

               {viewMode === 'edit' ? (
                <textarea 
                  className="w-full min-h-[900px] p-8 text-sm font-mono focus:outline-none bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] leading-relaxed text-slate-700 print:hidden"
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  spellCheck={false}
                />
               ) : (
                <div className="prose prose-sm prose-slate max-w-none text-slate-900 font-serif leading-loose print:text-black">
                  {report.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h2 key={i} className="text-3xl md:text-4xl font-black text-slate-900 mt-16 mb-8 border-b-4 border-slate-900 pb-4 uppercase tracking-tighter break-before-page">{line.replace('# ', '')}</h2>;
                    if (line.startsWith('## ')) return <h3 key={i} className="text-xl md:text-2xl font-black text-slate-900 mt-10 mb-4 flex items-center gap-4 uppercase"><span className="w-8 h-1.5 bg-indigo-600 rounded-full print:bg-black"></span>{line.replace('## ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-3 list-none text-[15px] md:text-[16px] text-slate-700 font-bold border-l-4 border-indigo-100 pl-6 leading-tight print:border-l-2 print:border-black">{line.replace('- ', '')}</li>;
                    if (line.trim() === '') return <div key={i} className="h-6" />;
                    return <p key={i} className="mb-6 text-[16px] md:text-[18px] text-slate-800 font-medium leading-relaxed">{line}</p>;
                  })}
                  <div className="mt-20 md:mt-40 pt-16 border-t border-slate-200 flex justify-between items-end opacity-20 print:opacity-100 print:mt-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-tighter">Signatory Assurance</p>
                      <p className="text-xl md:text-2xl font-black text-slate-900 italic tracking-tighter underline">{manager?.name}</p>
                    </div>
                    <p className="text-[8px] md:text-[10px] font-mono font-black">TENDERFLOW_DRAFT_STAMP_99X2</p>
                  </div>
                </div>
               )}
            </div>

            <div className="mt-12 space-y-8 pb-32 print:hidden">
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
