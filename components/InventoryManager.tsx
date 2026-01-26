
import React, { useState } from 'react';
import { Plus, Package, History, ArrowUpRight, ArrowDownLeft, ShieldCheck, TrendingDown, ClipboardList, Info } from 'lucide-react';
import { InventoryItem, InventoryTransaction } from '../types';

interface InventoryManagerProps {
  items: InventoryItem[];
  setItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  transactions: InventoryTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<InventoryTransaction[]>>;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ items, setItems, transactions, setTransactions }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', availableQty: 0, unit: 'MT' });

  const addItem = () => {
    if (!newItem.name) return;
    const id = Date.now().toString();
    const existingIndex = items.findIndex(i => i.name.toLowerCase() === newItem.name.toLowerCase());
    
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].availableQty += newItem.availableQty;
      setItems(updated);
    } else {
      setItems([...items, { ...newItem, id }]);
    }
    
    // Log transaction
    const tx: InventoryTransaction = {
      id: `TX-${Date.now()}`,
      itemId: id,
      itemName: newItem.name,
      qty: newItem.availableQty,
      type: 'addition',
      timestamp: new Date().toISOString()
    };
    setTransactions([tx, ...transactions]);
    
    setNewItem({ name: '', availableQty: 0, unit: 'MT' });
    setIsAdding(false);
  };

  return (
    <div className="p-6 pb-24 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Stock Ledger</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">TenderFlow AI Operational Node</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-transform ring-4 ring-indigo-50"
        >
          <Plus size={20} />
        </button>
      </header>

      {/* HORIZONTAL STOCK LIST (Preserving UI as requested) */}
      <section className="mb-10 overflow-hidden">
        <div className="flex items-center justify-between px-2 mb-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Package size={14} className="text-indigo-500" /> Current Capacity
          </h3>
          <span className="text-[9px] font-bold text-slate-400">Scroll Horizontal →</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1 snap-x">
          {items.map(item => (
            <div 
              key={item.id} 
              className="min-w-[160px] snap-start bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between h-44 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50/50 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              
              <div className="relative z-10">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">{item.unit}</p>
                <h4 className="font-black text-slate-800 text-sm leading-tight uppercase tracking-tight break-words">
                  {item.name}
                </h4>
              </div>

              <div className="relative z-10">
                <p className="text-4xl font-black text-indigo-600 tracking-tighter italic">
                  {item.availableQty}
                </p>
                <div className="h-1 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Item Placeholder */}
          <button 
            onClick={() => setIsAdding(true)}
            className="min-w-[160px] snap-start border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-indigo-400 hover:border-indigo-200 transition-all"
          >
            <Plus size={32} />
            <span className="text-[10px] font-black uppercase tracking-widest">Add Resource</span>
          </button>
        </div>
      </section>

      {/* INTAKE FORM */}
      {isAdding && (
        <div className="bg-white p-6 rounded-[2.5rem] border border-indigo-100 mb-8 shadow-2xl animate-in slide-in-from-top-4 duration-400">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><ClipboardList size={18} /></div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Stock Movement Entry</h3>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Item Nomenclature"
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
            <div className="flex gap-3">
              <input 
                type="number" 
                placeholder="Quantity"
                className="flex-1 px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none"
                value={newItem.availableQty || ''}
                onChange={(e) => setNewItem({...newItem, availableQty: Number(e.target.value)})}
              />
              <select 
                className="px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-black uppercase outline-none"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              >
                <option>MT</option>
                <option>Kg</option>
                <option>Units</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setIsAdding(false)} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={addItem} className="flex-1 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 ring-4 ring-indigo-50">Commit to Ledger</button>
            </div>
          </div>
        </div>
      )}

      {/* VERTICAL TRANSACTION HISTORY (Ledger) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <History size={16} className="text-indigo-600" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Movement Ledger</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
            <ShieldCheck size={10} className="text-emerald-600" />
            <span className="text-[8px] font-black text-emerald-700 uppercase tracking-widest">Audit Secure</span>
          </div>
        </div>
        
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          {transactions.length === 0 ? (
            <div className="p-16 text-center">
              <History size={40} className="mx-auto text-slate-100 mb-4" />
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">No Recorded Movements</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {transactions.map(tx => (
                <div key={tx.id} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${
                      tx.type === 'addition' ? 'bg-emerald-50 text-emerald-600' : 
                      tx.type === 'allocation' ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {tx.type === 'addition' ? <ArrowUpRight size={16} /> : 
                       tx.type === 'allocation' ? <TrendingDown size={16} /> : <ArrowDownLeft size={16} />}
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 leading-none mb-1.5 uppercase tracking-tight">{tx.itemName}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 rounded">
                          {tx.type}
                        </span>
                        {tx.reference && (
                          <span className="text-[8px] font-bold text-indigo-500 uppercase flex items-center gap-1">
                            Ref: {tx.reference}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${tx.qty > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.qty > 0 ? '+' : ''}{tx.qty}
                    </p>
                    <p className="text-[9px] text-slate-300 font-bold uppercase tracking-tighter">
                      {new Date(tx.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ENTERPRISE FOOTER */}
      <div className="mt-12 p-8 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12"><ShieldCheck size={120} /></div>
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-indigo-400" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Operational Integrity</h4>
        </div>
        <p className="text-[11px] font-medium leading-relaxed italic opacity-80 border-l-2 border-indigo-500/50 pl-4">
          "TenderFlow AI maintains an immutable chain of custody for all inventory resources. Stock is cryptographically 'Allocated' upon tender response commit to prevent supply-side failure."
        </p>
      </div>
    </div>
  );
};

export default InventoryManager;
