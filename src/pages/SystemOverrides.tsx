import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Save, 
  RefreshCw, 
  AlertTriangle,
  TrendingUp,
  Users,
  Wallet,
  Landmark,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';

interface FundAllocation {
  label: string;
  percentage: number;
  amount: number;
}

export default function SystemOverrides() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<any>({});
  const [overrides, setOverrides] = useState({
    manual_total_funds: '0',
    manual_paid_members: '0',
    manual_due_amount: '0',
    manual_reserve_capital: '0',
    manual_operational_costs: '0'
  });

  const isGodMode = localStorage.getItem('godMode') === 'true';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, contentRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/content')
      ]);
      const statsData = await statsRes.json();
      const contentData = await contentRes.json();
      
      setStats(statsData);
      setOverrides({
        manual_total_funds: contentData.manual_total_funds || '0',
        manual_paid_members: contentData.manual_paid_members || '0',
        manual_due_amount: contentData.manual_due_amount || '0',
        manual_reserve_capital: contentData.manual_reserve_capital || '0',
        manual_operational_costs: contentData.manual_operational_costs || '0'
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const keys = Object.keys(overrides);
      await Promise.all(keys.map(key => 
        fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value: (overrides as any)[key] })
        })
      ));
      await fetchData();
      alert('System overrides saved successfully!');
    } catch (error) {
      console.error('Error saving overrides:', error);
      alert('Failed to save overrides');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-grey">
        <RefreshCw className="size-8 text-fuchsia animate-spin" />
      </div>
    );
  }

  return (
    <div className={`font-['Public_Sans',sans-serif] flex h-screen w-full overflow-hidden ${isGodMode ? 'bg-dark-grey text-white' : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className={`h-16 border-b backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 ${isGodMode ? 'bg-dark-grey border-white/5' : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80'}`}>
          <div className="flex items-center gap-2">
            <Database className="text-fuchsia size-5" />
            <h2 className="text-lg font-black tracking-tighter uppercase">Developer Overrides</h2>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-fuchsia text-white rounded-lg font-black text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <RefreshCw className="size-4 animate-spin" /> : <Save className="size-4" />}
            SAVE OVERRIDES
          </button>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          <div className="bg-fuchsia/10 border border-fuchsia/20 rounded-xl p-6 flex items-start gap-4">
            <AlertTriangle className="size-6 text-fuchsia shrink-0 mt-1" />
            <div>
              <h3 className="font-black text-fuchsia uppercase tracking-tight">Developer Warning</h3>
              <p className="text-sm text-zinc-400">
                These settings directly override calculated system statistics. Use them for testing, demonstrations, or manual adjustments. 
                Setting a value to "0" will revert to the automatically calculated value where applicable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core Metrics */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-zinc-500">
                <Activity className="size-4" />
                <h3 className="text-xs font-black uppercase tracking-widest">Core Financial Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { key: 'manual_total_funds', label: 'Total Funds', icon: Wallet, color: 'text-emerald-500' },
                  { key: 'manual_paid_members', label: 'Paid Members', icon: Users, color: 'text-blue-500' },
                  { key: 'manual_due_amount', label: 'Due Amount', icon: AlertTriangle, color: 'text-amber-500' },
                  { key: 'manual_reserve_capital', label: 'Reserve Capital', icon: ShieldCheck, color: 'text-cyan-500' },
                  { key: 'manual_operational_costs', label: 'Operational Costs', icon: TrendingUp, color: 'text-rose-500' },
                ].map((item) => (
                  <div key={item.key} className={`p-4 rounded-xl border ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <item.icon className={`size-4 ${item.color}`} />
                        <label className="text-sm font-bold uppercase tracking-tight">{item.label}</label>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Manual Override</span>
                    </div>
                    <input 
                      type="number"
                      value={(overrides as any)[item.key]}
                      onChange={(e) => setOverrides({ ...overrides, [item.key]: e.target.value })}
                      className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-lg font-black outline-none focus:border-fuchsia/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Live Preview */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-zinc-500">
                <Activity className="size-4" />
                <h3 className="text-xs font-black uppercase tracking-widest">Live Dashboard Preview</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-fuchsia/5 border border-fuchsia/20 rounded-xl">
                  <p className="text-[10px] font-bold text-fuchsia uppercase mb-1">Total Funds</p>
                  <p className="text-4xl font-black">৳{parseInt(overrides.manual_total_funds).toLocaleString()}</p>
                </div>
                <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Paid Members</p>
                  <p className="text-4xl font-black">{overrides.manual_paid_members}</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-auto p-8 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Developer System Overrides v1.0</p>
        </footer>
      </main>
    </div>
  );
}
function X({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
