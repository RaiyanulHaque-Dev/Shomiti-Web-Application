import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  PlusCircle, 
  TrendingUp, 
  History, 
  Users, 
  UserSearch, 
  Calendar, 
  Filter, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Search,
  LayoutGrid,
  ArrowLeft,
  Download,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  activeNotices: number;
  totalFunds: number;
  newMessages: number;
  paidMembers: number;
  dueMembers: number;
  monthlyCollection: number;
  dueAmount: number;
  activeLoans: number;
}

export default function TransactionLedger() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, statsRes] = await Promise.all([
          fetch('/api/transactions'),
          fetch('/api/stats')
        ]);
        const transData = await transRes.json();
        const statsData = await statsRes.json();
        
        // Mocking some extra fields for the UI
        const enhancedTrans = transData.map((t: any, i: number) => ({
          ...t,
          member_id: `M-2024-00${i + 1}`,
          receipt_no: `#TRX-88${21 - i}`
        }));
        
        setTransactions(enhancedTrans);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching ledger data:", error);
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
    tx.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.member_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <div className={`font-['Public_Sans',sans-serif] h-screen overflow-hidden flex ${isGodMode ? 'bg-dark-grey text-white' : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`h-16 border-b px-8 flex items-center justify-between shrink-0 ${isGodMode ? 'bg-dark-grey border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors group" title={t('common.back_to_dashboard')}>
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h2 className="text-xl font-bold">{t('ledger.title')}</h2>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <nav className="flex text-sm text-slate-500">
              <span>{t('ledger.breadcrumb.dashboard')}</span>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">{t('ledger.breadcrumb.transactions')}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 outline-none" 
                placeholder={t('ledger.search_placeholder')} 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => navigate('/admin/savings')}
              className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              <PlusCircle className="size-4" />
              {t('ledger.new_transaction')}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border shadow-sm flex flex-col gap-2 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/10'}`}>
                  <div className="flex items-center gap-3 text-primary">
                    <TrendingUp className="size-5" />
                    <p className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('ledger.stats.monthly_collection')}</p>
                  </div>
                  <p className={`text-3xl font-bold ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(stats?.monthlyCollection || 0)}</p>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                    <TrendingUp className="size-3" />
                    {t('ledger.stats.collection_trend')}
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border shadow-sm flex flex-col gap-2 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/10'}`}>
                  <div className="flex items-center gap-3 text-orange-500">
                    <History className="size-5" />
                    <p className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('ledger.stats.due_collection')}</p>
                  </div>
                  <p className={`text-3xl font-bold ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(stats?.dueAmount || 0)}</p>
                  <p className={`text-xs mt-2 ${isGodMode ? 'text-white/40' : 'text-slate-400'}`}>{t('ledger.stats.due_members')}</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border shadow-sm flex flex-col gap-2 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/30'}`}>
                  <div className="flex items-center gap-3 text-emerald-600">
                    <Users className="size-5" />
                    <p className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('ledger.stats.paid_members')}</p>
                  </div>
                  <p className={`text-3xl font-bold ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{stats?.paidMembers || 0}</p>
                  <p className={`text-xs mt-2 ${isGodMode ? 'text-white/40' : 'text-slate-400'}`}>{t('ledger.stats.paid_desc')}</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border shadow-sm flex flex-col gap-2 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30'}`}>
                  <div className="flex items-center gap-3 text-red-500">
                    <Users className="size-5" />
                    <p className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('ledger.stats.due_members_count')}</p>
                  </div>
                  <p className={`text-3xl font-bold ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{stats?.dueMembers || 0}</p>
                  <p className={`text-xs mt-2 ${isGodMode ? 'text-white/40' : 'text-slate-400'}`}>{t('ledger.stats.due_desc')}</p>
                </motion.div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Info className="text-primary size-5" />
                  {t('ledger.overview.title')}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500">{t('ledger.overview.total_funds')}</span>
                    <span className="font-bold">{formatCurrency(stats?.totalFunds || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500">{t('ledger.overview.active_loans')}</span>
                    <span className="font-bold">{formatCurrency(stats?.activeLoans || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">{t('ledger.overview.reserve')}</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(stats?.totalFunds || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="text-primary size-5" />
                  {t('ledger.status.title')}
                </h4>
                <div className="space-y-3">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-1000" 
                      style={{ width: `${((stats?.paidMembers || 1) / (stats?.totalMembers || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-600">{Math.round(((stats?.paidMembers || 0) / (stats?.totalMembers || 1)) * 100)}% {t('ledger.status.paid')}</span>
                    <span className="text-red-500">{Math.round(((stats?.dueMembers || 0) / (stats?.totalMembers || 1)) * 100)}% {t('ledger.status.due')}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {t('ledger.status.goal')}
                  </p>
                </div>
              </div>
            </section>

            <section className={`rounded-xl border shadow-sm overflow-hidden ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/10'}`}>
              <div className={`p-4 md:p-6 border-b ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50/50 dark:bg-slate-800/50 border-primary/5'}`}>
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  <div className="flex flex-1 gap-3">
                    <div className="relative flex-1 max-w-md">
                      <UserSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                      <input 
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary outline-none" 
                        placeholder={t('ledger.filters.search_member')} 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm">
                      <Filter className="size-4" />
                      {t('ledger.filters.filter')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm">
                      <Download className="size-4" />
                      {t('ledger.filters.export')}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`${isGodMode ? 'bg-black/40 text-white/40' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300'}`}>
                      <th className="px-6 py-4 text-sm font-semibold">{t('ledger.table.member_name')}</th>
                      <th className="px-6 py-4 text-sm font-semibold">{t('ledger.table.member_id')}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-right">{t('ledger.table.amount')}</th>
                      <th className="px-6 py-4 text-sm font-semibold">{t('ledger.table.date')}</th>
                      <th className="px-6 py-4 text-sm font-semibold">{t('ledger.table.receipt_no')}</th>
                      <th className="px-6 py-4 text-sm font-semibold">{t('ledger.table.file')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500">{t('ledger.table.loading')}</td>
                      </tr>
                    ) : filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500">{t('ledger.table.no_data')}</td>
                      </tr>
                    ) : filteredTransactions.map((tx, i) => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              i % 4 === 0 ? 'bg-primary/10 text-primary' :
                              i % 4 === 1 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                              i % 4 === 2 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                              'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                            }`}>
                              {tx.member_name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{tx.member_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{tx.member_id}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">{formatCurrency(tx.amount)}</td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{tx.date}</td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                          {tx.receipt_no ? (
                            <button 
                              onClick={() => handleView(tx)}
                              className="hover:text-primary hover:underline transition-colors cursor-pointer"
                            >
                              {tx.receipt_no}
                            </button>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleView(tx)}
                            className="text-primary hover:underline flex items-center gap-1 text-sm font-medium cursor-pointer"
                          >
                            <FileText className="size-4" />
                            {t('ledger.table.view')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 md:p-6 border-t border-primary/5 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('ledger.table.showing_entries', { count: filteredTransactions.length })}</p>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <ChevronLeft className="size-5" />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary bg-primary text-white font-bold cursor-pointer">১</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">২</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">৩</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </section>

            <div className="p-5 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/50 rounded-xl flex gap-4 items-start">
              <Info className="text-orange-600 size-6 shrink-0" />
              <div>
                <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-1">{t('ledger.policy.title')}</h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                  {t('ledger.policy.text')}
                </p>
              </div>
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
                        <Download className="size-3" />
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
                      <p className="font-bold text-slate-900 dark:text-white">{selectedTx.type}</p>
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
                    <Download className="size-4" />
                    {t('ledger.filters.export') || 'Download'}
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
