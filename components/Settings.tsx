
import React, { useState } from 'react';
import { Save, FileText, Info, Image as ImageIcon, Check, User, Briefcase, Building, Phone, Mail, ShoppingBag, Download, MonitorSmartphone, Smartphone, ShieldCheck } from 'lucide-react';
import { ManagerProfile, CompanyProfile } from '../types';

interface SettingsProps {
  template: string;
  setTemplate: (t: string) => void;
  logo: string | null;
  setLogo: (l: string | null) => void;
  profile: ManagerProfile;
  setProfile: (p: ManagerProfile) => void;
  company: CompanyProfile;
  setCompany: (c: CompanyProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ template, setTemplate, logo, setLogo, profile, setProfile, company, setCompany }) => {
  const [saveStatus, setSaveStatus] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleDownloadAPK = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("TenderFlow_v1.0.2_Production.apk build complete. (Demo Simulation: In a real environment, this would start a secure enterprise download)");
    }, 2500);
  };

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Control Center</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Enterprise Configuration & Distribution</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* LEFT COLUMN: BUSINESS PROFILE */}
        <div className="space-y-8">
          <section className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm h-full">
            <div className="bg-[#337ab7] px-6 py-5">
               <h3 className="text-white font-black text-center text-xs uppercase tracking-widest leading-relaxed">
                 Business Profile Optimization
               </h3>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Company Name *</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="AgroPrime Solutions"
                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    value={company.name}
                    onChange={(e) => setCompany({...company, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Mobile / Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      value={company.phone}
                      onChange={(e) => setCompany({...company, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Enterprise Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      value={company.email}
                      onChange={(e) => setCompany({...company, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Services / Products Portfolio *</label>
                <div className="relative">
                  <ShoppingBag className="absolute left-4 top-5 text-slate-400" size={18} />
                  <textarea 
                    rows={4}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-indigo-100 outline-none resize-none transition-all"
                    value={company.products}
                    onChange={(e) => setCompany({...company, products: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: AI TEMPLATE */}
        <div className="space-y-8">
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <FileText size={20} />
              </div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Drafting Template Logic</h3>
            </div>
            
            <p className="text-[10px] text-slate-400 mb-4 font-bold uppercase tracking-tight">
              AI applies UWE Bristol structural constraints to all dossiers.
            </p>

            <textarea 
              className="w-full h-[380px] p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-xs font-mono text-slate-700 focus:ring-4 focus:ring-indigo-100 outline-none transition-all leading-relaxed"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            />

            <button 
              className={`w-full mt-8 py-5 rounded-3xl flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl ${
                saveStatus ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white active:scale-95 ring-8 ring-indigo-50'
              }`}
              onClick={handleSave}
            >
              {saveStatus ? <Check size={20} /> : <Save size={20} />}
              {saveStatus ? 'Dossier Logic Updated' : 'Synchronize Config'}
            </button>
          </section>
        </div>
      </div>

      {/* ENTERPRISE DISTRIBUTION AT THE BOTTOM */}
      <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden ring-8 ring-slate-100">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Smartphone size={200} /></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500 rounded-xl text-white">
                  <MonitorSmartphone size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Enterprise Distribution Hub</h3>
                  <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-tighter">Mobile & Desktop Access</p>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-300 font-medium italic border-l-2 border-indigo-500/50 pl-6 mb-6">
                "TenderFlow is optimized for field operations. Deploy the mobile APK to procurement managers or sync via PWA for local terminal access."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button 
                onClick={handleDownloadAPK}
                disabled={isDownloading}
                className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-xl hover:bg-slate-50 disabled:opacity-50 min-w-[200px]"
              >
                {isDownloading ? (
                  <div className="w-5 h-5 border-2 border-slate-900/10 border-t-slate-900 rounded-full animate-spin"></div>
                ) : <Download size={18} />}
                Download APK
              </button>
              <button 
                onClick={() => alert("PWA: Add to Home Screen enabled. Check browser menu for 'Install App'.")}
                className="flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 text-white border border-indigo-400 rounded-3xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all min-w-[200px]"
              >
                <Smartphone size={18} />
                Install PWA
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
