import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Search, 
  LogOut, 
  PlusCircle, 
  UserPlus, 
  Users, 
  Megaphone, 
  Wallet, 
  MessageSquare, 
  ChevronRight, 
  Mail, 
  FileText,
  TrendingUp,
  Landmark,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { formatCurrency } from '../utils/format';

interface Transaction {
  id: number;
  member_name: string;
  description: string;
  date: string;
  amount: number;
  type: string;
  receipt_no?: string;
  member_id?: string;
}

interface Stats {
  totalMembers: number;
  activeMembers: number;
  activeNotices: number;
  totalFunds: number;
  newMessages: number;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, statsRes] = await Promise.all([
          fetch('/api/transactions'),
          fetch('/api/stats')
        ]);
        const transData = await transRes.json();
        const statsData = await statsRes.json();
        
        const transactionsArray = Array.isArray(transData) ? transData : [];
        const enhancedTrans = transactionsArray.map((t: any, i: number) => ({
          ...t,
          member_id: `M-2024-00${i + 1}`,
          receipt_no: `#TRX-88${21 - i}`
        }));

        setTransactions(enhancedTrans);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleView = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsViewModalOpen(true);
  };

  const filteredTransactions = transactions.filter(tx => 
    (tx.member_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.receipt_no || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-['Public_Sans',sans-serif] flex h-screen overflow-hidden text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Search className="text-slate-400 size-5" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-64" 
              placeholder={t('common.search_placeholder')} 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase tracking-tighter text-slate-600 dark:text-slate-300">
                {t('dashboard.welcome')}
              </span>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('userRole');
                localStorage.removeItem('godMode');
                navigate('/login');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold uppercase tracking-widest cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">{t('dashboard.overview')}</h2>
              <p className="text-slate-500 font-medium">{t('dashboard.summary')}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/admin/notices')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle className="size-5" />
                <span>{t('dashboard.new_notice')}</span>
              </button>
              <button 
                onClick={() => navigate('/admin/members')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all cursor-pointer shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <UserPlus className="size-5" />
                <span>{t('dashboard.add_member')}</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 p-6 rounded-2xl border-2 flex flex-col gap-4 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Users className="size-6" />
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{t('dashboard.total_members')}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black tracking-tighter">{stats?.totalMembers || 0} {t('dashboard.units.members')}</h3>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">{stats?.activeMembers || 0} {t('members.active')}</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 p-6 rounded-2xl border-2 flex flex-col gap-4 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                  <Megaphone className="size-6" />
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{t('dashboard.active_notices')}</p>
                <h3 className="text-3xl font-black tracking-tighter">{stats?.activeNotices || 0} {t('dashboard.units.items')}</h3>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 p-6 rounded-2xl border-2 flex flex-col gap-4 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <Wallet className="size-6" />
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{t('dashboard.total_funds')}</p>
                <h3 className="text-3xl font-black tracking-tighter">{formatCurrency(stats?.totalFunds || 0)}</h3>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 p-6 rounded-2xl border-2 flex flex-col gap-4 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                  <MessageSquare className="size-6" />
                </div>
                {stats?.newMessages > 0 && <span className="flex size-2 bg-blue-500 rounded-full animate-ping"></span>}
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{t('dashboard.new_messages')}</p>
                <h3 className="text-3xl font-black tracking-tighter">{stats?.newMessages || 0} {t('dashboard.units.items')}</h3>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Table */}
            <motion.div 
              className="lg:col-span-2 rounded-2xl border-2 overflow-hidden shadow-xl bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
            >
              <div className="p-6 border-b flex justify-between items-center border-slate-50 dark:border-slate-800">
                <h3 className="font-bold uppercase tracking-widest text-sm">{t('dashboard.recent_transactions')}</h3>
                <button 
                  onClick={() => navigate('/ledger')}
                  className="text-xs font-bold uppercase tracking-widest hover:underline cursor-pointer text-primary"
                >
                  {t('dashboard.view_all')}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.table.member_name')}</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('dashboard.table.description')}</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right text-slate-500">{t('dashboard.table.amount')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {filteredTransactions.length > 0 ? filteredTransactions.slice(0, 6).map((tx) => (
                      <tr 
                        key={tx.id} 
                        onClick={() => handleView(tx)}
                        className="transition-colors cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
                              {(tx.member_name || '').substring(0, 2)}
                            </div>
                            <span className="font-bold text-sm">{tx.member_name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">{tx.description}</td>
                        <td className="px-6 py-4 text-sm font-bold text-right text-primary">{formatCurrency(tx.amount)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">
                          {t('ledger.no_data')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <div className="space-y-6">
              <motion.div 
                className="rounded-2xl border-2 p-6 shadow-xl bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
              >
                <h3 className="font-bold uppercase tracking-widest text-sm mb-6">{t('dashboard.quick_actions')}</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => navigate('/admin/savings')}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left cursor-pointer group bg-primary/5 border-primary/10 hover:bg-primary/10"
                  >
                    <div className="flex items-center gap-3">
                      <PlusCircle className="text-primary size-5" />
                      <span className="font-bold uppercase tracking-widest text-[10px]">{t('dashboard.actions.new_payment')}</span>
                    </div>
                    <ChevronRight className="text-zinc-500 size-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left cursor-pointer group bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:bg-slate-100">
                    <div className="flex items-center gap-3">
                      <Mail className="text-zinc-500 size-5" />
                      <span className="font-bold uppercase tracking-widest text-[10px]">{t('dashboard.actions.send_sms')}</span>
                    </div>
                    <ChevronRight className="text-zinc-500 size-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left cursor-pointer group bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:bg-slate-100">
                    <div className="flex items-center gap-3">
                      <FileText className="text-zinc-500 size-5" />
                      <span className="font-bold uppercase tracking-widest text-[10px]">{t('dashboard.actions.download_report')}</span>
                    </div>
                    <ChevronRight className="text-zinc-500 size-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
              {/* Info Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group bg-gradient-to-br from-primary to-indigo-600"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 size-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <h4 className="font-bold uppercase tracking-tighter text-xl mb-3 relative z-10">{t('dashboard.system_update.title')}</h4>
                <p className="text-xs font-medium text-white/70 mb-6 relative z-10 leading-relaxed">{t('dashboard.system_update.text')}</p>
                <button className="w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer relative z-10 bg-white/20 hover:bg-white/30">
                  {t('dashboard.system_update.learn_more')}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* View Receipt Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedTx && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Receipt</h3>
                    {selectedTx.receipt_no ? (
                      <button 
                        onClick={() => window.open(`https://picsum.photos/seed/${selectedTx.receipt_no}/800/1200`, '_blank')}
                        className="text-primary hover:underline font-mono text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {selectedTx.receipt_no}
                        <FileText className="size-3" />
                      </button>
                    ) : (
                      <p className="text-slate-500 font-mono text-xs">No Receipt Number</p>
                    )}
                  </div>
                  <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                    <Wallet className="size-8" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Name</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedTx.member_name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member ID</p>
                      <p className="font-mono text-sm">{selectedTx.member_id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedTx.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Type</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedTx.type || 'Payment'}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amount Paid</p>
                    <p className="text-4xl font-black text-primary">৳{selectedTx.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {t('close') || 'Close'}
                  </button>
                  <button 
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="size-4" />
                    Print
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
