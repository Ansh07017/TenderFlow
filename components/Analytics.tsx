
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Clock, Target, CheckCircle, Download, Calendar, Filter, FileSpreadsheet, History, XCircle, Award, MessageSquareQuote } from 'lucide-react';
import { SubmissionHistory } from '../types';

interface AnalyticsProps {
  history: SubmissionHistory[];
  onUpdateFeedback: (id: string, status: SubmissionHistory['status'], reason: string, lesson: string) => void;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Analytics: React.FC<AnalyticsProps> = ({ history, onUpdateFeedback }) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({ status: 'Won', reason: '', lesson: '' });

  // Dynamic Chart Data based on timeframe
  const getChartData = () => {
    if (timeframe === 'weekly') {
      return [
        { name: 'Mon', count: 4 }, { name: 'Tue', count: 7 }, { name: 'Wed', count: 5 }, { name: 'Thu', count: 9 }, { name: 'Fri', count: 6 },
      ];
    } else if (timeframe === 'monthly') {
      return [
        { name: 'Week 1', count: 18 }, { name: 'Week 2', count: 24 }, { name: 'Week 3', count: 15 }, { name: 'Week 4', count: 32 },
      ];
    } else {
      return [
        { name: 'Q1', count: 65 }, { name: 'Q2', count: 82 }, { name: 'Q3', count: 45 }, { name: 'Q4', count: 91 },
      ];
    }
  };

  const activeData = getChartData();

  const exportCSV = () => {
    const headers = ['Tender ID', 'Title', 'Date', 'Fit Score', 'Status', 'Rejection Reason', 'Lessons Learned'];
    const rows = history.map(s => [
      s.tenderId, 
      `"${s.title.replace(/"/g, '""')}"`, 
      s.date, 
      s.score, 
      s.status, 
      `"${(s.rejectionReason || '').replace(/"/g, '""')}"`, 
      `"${(s.lessonsLearned || '').replace(/"/g, '""')}"`
    ].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tender_intelligence_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pb-32 p-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">INTELLIGENCE</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Operational Performance & AI Learning</p>
        </div>
        <button 
          onClick={exportCSV}
          className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-100"
        >
          <FileSpreadsheet size={16} />
          <span className="text-[10px] font-black uppercase">Export CSV</span>
        </button>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <Award className="text-indigo-600 mb-2" size={24} />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Win Rate</p>
          <p className="text-3xl font-black text-slate-900">72%</p>
          <div className="mt-2 flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
            <TrendingUp size={12} /> +12.4% vs Last Month
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <Clock className="text-amber-500 mb-2" size={24} />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Drafting Savings</p>
          <p className="text-3xl font-black text-slate-900">142h</p>
          <div className="mt-2 text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
            AI Automated 84 Responses
          </div>
        </div>
      </div>

      {/* Colorful Chart Section */}
      <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Activity Volume</h3>
            <p className="text-[10px] text-slate-400 font-medium">Tenders Reviewed & Submitted</p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {(['weekly', 'monthly', 'yearly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                  timeframe === t ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400'
                }`}
              >
                {t.slice(0, 1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 700}} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f8fafc', radius: 10}}
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold'}}
              />
              <Bar dataKey="count" radius={[10, 10, 10, 10]}>
                {activeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Submission Log & Learning Loop */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
            <History size={16} className="text-indigo-600" />
            Learning Log
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syncing with AI Model</span>
        </div>
        
        <div className="space-y-3">
          {history.map((sub) => (
            <div key={sub.tenderId} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    sub.status === 'Won' ? 'bg-emerald-50 text-emerald-600' : 
                    sub.status === 'Lost' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {sub.status === 'Won' ? <Award size={20} /> : 
                     sub.status === 'Lost' ? <XCircle size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{sub.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{sub.tenderId} • {sub.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                    sub.status === 'Won' ? 'bg-emerald-100 text-emerald-700' : 
                    sub.status === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>

              {editingId === sub.tenderId ? (
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl space-y-3 animate-in fade-in zoom-in-95">
                  <select 
                    className="w-full text-xs font-bold p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                    value={feedback.status}
                    onChange={(e) => setFeedback({...feedback, status: e.target.value as any})}
                  >
                    <option value="Won">Outcome: Won</option>
                    <option value="Lost">Outcome: Lost / Rejected</option>
                    <option value="Pending">Outcome: Pending</option>
                  </select>
                  <input 
                    placeholder="Primary reason for rejection (if any)"
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                    value={feedback.reason}
                    onChange={(e) => setFeedback({...feedback, reason: e.target.value})}
                  />
                  <textarea 
                    placeholder="Lesson learned for future AI responses?"
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none resize-none"
                    rows={2}
                    value={feedback.lesson}
                    onChange={(e) => setFeedback({...feedback, lesson: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingId(null)}
                      className="flex-1 py-2 text-[10px] font-black uppercase text-slate-500"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        onUpdateFeedback(sub.tenderId, feedback.status as any, feedback.reason, feedback.lesson);
                        setEditingId(null);
                      }}
                      className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase"
                    >
                      Save Insights
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase">Fit Score</span>
                      <span className="text-xs font-bold text-slate-700">{sub.score}%</span>
                    </div>
                    {sub.lessonsLearned && (
                       <div className="flex flex-col max-w-[150px]">
                        <span className="text-[9px] font-black text-indigo-400 uppercase">Lesson Learned</span>
                        <span className="text-[10px] font-medium text-slate-600 truncate italic">"{sub.lessonsLearned}"</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setEditingId(sub.tenderId);
                      setFeedback({ status: sub.status, reason: sub.rejectionReason || '', lesson: sub.lessonsLearned || '' });
                    }}
                    className="flex items-center gap-1.5 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    <MessageSquareQuote size={14} /> Update
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Analytics;
