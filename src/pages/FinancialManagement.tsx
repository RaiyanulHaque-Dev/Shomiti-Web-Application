import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  Users, 
  Wallet, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  TrendingUp, 
  Info, 
  AlertTriangle, 
  Plus, 
  Receipt, 
  Edit3,
  Landmark,
  PiggyBank,
  CalendarDays,
  Hourglass,
  User,
  UploadCloud,
  RotateCcw,
  ArrowLeft,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
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
  monthlyCollection: number;
  dueAmount: number;
}

export default function FinancialManagement() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    member_name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    receipt_no: '',
    description: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [transRes, statsRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/stats')
      ]);
      const transData = await transRes.json();
      const statsData = await statsRes.json();
      
      // Ensure transData is an array
      const dataArray = Array.isArray(transData) ? transData : [];
      
      // Mocking some extra fields for the UI
      const enhancedTrans = dataArray.map((t: any, i: number) => ({
        ...t,
        member_id: t.member_id || `M-10${23 + i}`,
        receipt_no: t.receipt_no || `#RX-99${20 - i}`
      }));
      
      setTransactions(enhancedTrans);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          member_name: formState.member_name,
          amount: Number(formState.amount),
          date: formState.date,
          receipt_no: formState.receipt_no,
          description: formState.description || 'Monthly Subscription',
          member_id: 'M-' + Math.floor(Math.random() * 10000)
        })
      });

      if (response.ok) {
        setFormState({
          member_name: '',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          receipt_no: '',
          description: ''
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleView = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsViewModalOpen(true);
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  const filteredTransactions = transactions.filter(tx => 
    (tx.member_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.member_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.receipt_no || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`font-['Public_Sans',sans-serif] flex h-screen w-full overflow-hidden ${isGodMode ? 'bg-dark-grey text-white' : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className={`h-16 border-b border-primary/10 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 ${isGodMode ? 'bg-dark-grey/80' : 'bg-white/80 dark:bg-slate-950/80'}`}>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors group" title={t('common.back_to_dashboard')}>
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2">
              <Wallet className="text-primary size-5" />
              <h2 className="text-lg font-bold tracking-tight">{t('financial.title')}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input 
                className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-64 outline-none" 
                placeholder={t('financial.search_placeholder')} 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">{t('financial.admin_user')}</p>
                <p className="text-[10px] text-slate-500 uppercase">{t('financial.super_admin')}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">A</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 space-y-8">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border border-primary/10 shadow-sm ${isGodMode ? 'bg-black/40' : 'bg-white dark:bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} text-sm font-medium`}>{t('financial.stats.total_collection')}</span>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <PiggyBank className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{formatCurrency(stats?.totalFunds || 0)}</h3>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border border-primary/10 shadow-sm ${isGodMode ? 'bg-black/40' : 'bg-white dark:bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} text-sm font-medium`}>{t('financial.stats.this_month')}</span>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <CalendarDays className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{formatCurrency(stats?.monthlyCollection || 0)}</h3>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border border-primary/10 shadow-sm ${isGodMode ? 'bg-black/40' : 'bg-white dark:bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} text-sm font-medium`}>{t('financial.stats.due_amount')}</span>
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                  <Hourglass className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{formatCurrency(stats?.dueAmount || 0)}</h3>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl border border-primary/10 shadow-sm ${isGodMode ? 'bg-black/40' : 'bg-white dark:bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} text-sm font-medium`}>{t('financial.stats.total_members')}</span>
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                  <User className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{stats?.totalMembers || 0}</h3>
              </div>
            </motion.div>
          </div>

          {/* Transaction Table Section */}
          <div className={`rounded-xl border border-primary/10 shadow-sm overflow-hidden ${isGodMode ? 'bg-black/40' : 'bg-white dark:bg-slate-900'}`}>
            <div className={`p-6 border-b flex flex-wrap items-center justify-between gap-4 ${isGodMode ? 'border-white/5' : 'border-slate-100 dark:border-slate-800'}`}>
              <h3 className="text-lg font-bold">{t('financial.table.title')}</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20 transition-all cursor-pointer"
                >
                  <Plus className="size-4" />
                  {t('financial.table.add_new')}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={`${isGodMode ? 'bg-black/40 text-white/40' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'} text-xs font-bold uppercase tracking-wider`}>
                    <th className="px-6 py-4">{t('financial.table.member_name')}</th>
                    <th className="px-6 py-4">{t('financial.table.id')}</th>
                    <th className="px-6 py-4">{t('financial.table.amount')}</th>
                    <th className="px-6 py-4">{t('financial.table.date')}</th>
                    <th className="px-6 py-4">{t('financial.table.receipt_no')}</th>
                    <th className="px-6 py-4 text-right">{t('financial.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500">{t('common.loading')}</td>
                    </tr>
                  ) : filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isGodMode ? 'bg-white/10' : 'bg-slate-200 dark:bg-slate-700'}`}>
                            {(tx.member_name || '').split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className={`text-sm font-semibold ${isGodMode ? 'text-white' : ''}`}>{tx.member_name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{tx.member_id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary">{formatCurrency(tx.amount)}</td>
                      <td className={`px-6 py-4 text-sm ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{tx.date}</td>
                      <td className={`px-6 py-4 text-sm ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>
                        {tx.receipt_no ? (
                          <button 
                            onClick={() => handleView(tx)}
                            className="hover:text-primary hover:underline transition-colors cursor-pointer"
                          >
                            {tx.receipt_no}
                          </button>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleView(tx)}
                          className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer" 
                          title={t('financial.table.view_receipt')}
                        >
                          <Receipt className="size-5" />
                        </button>
                        <button className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer" title={t('financial.table.edit')}>
                          <Edit3 className="size-5" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500 italic">
                        {t('ledger.no_data') || 'No transactions found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">{t('financial.pagination.total_transactions')}: 1,254</span>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 text-xs hover:bg-slate-50 cursor-pointer">{t('financial.pagination.prev')}</button>
                <button className="px-3 py-1.5 rounded bg-primary text-white text-xs cursor-pointer">1</button>
                <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 text-xs hover:bg-slate-50 cursor-pointer">2</button>
                <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 text-xs hover:bg-slate-50 cursor-pointer">{t('financial.pagination.next')}</button>
              </div>
            </div>
          </div>

          {/* Add New Record Form (Integrated Section) */}
          <div ref={formRef} className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Plus className="text-primary size-6" />
              <h3 className="text-lg font-bold">{t('financial.form.title')}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('financial.form.name_id_label')}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                  <input 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary outline-none" 
                    placeholder={t('financial.form.name_id_placeholder')} 
                    type="text"
                    required
                    value={formState.member_name}
                    onChange={(e) => setFormState({...formState, member_name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('financial.form.amount_label')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                  <input 
                    className="w-full pl-8 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary outline-none" 
                    placeholder={t('financial.form.amount_placeholder')} 
                    type="number"
                    required
                    value={formState.amount}
                    onChange={(e) => setFormState({...formState, amount: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('financial.form.date_label')}</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                  <input 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary outline-none" 
                    type="date"
                    required
                    value={formState.date}
                    onChange={(e) => setFormState({...formState, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('financial.form.receipt_no_label')}</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                  <input 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary outline-none" 
                    placeholder={t('financial.form.receipt_no_placeholder')} 
                    type="text"
                    value={formState.receipt_no}
                    onChange={(e) => setFormState({...formState, receipt_no: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('financial.form.description_label') || 'Description'}</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-slate-400 size-4" />
                  <textarea 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary outline-none min-h-[42px]" 
                    placeholder={t('financial.form.description_placeholder') || 'e.g. Monthly Subscription'} 
                    value={formState.description}
                    onChange={(e) => setFormState({...formState, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('financial.form.upload_label')}</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer group">
                    <div className="text-center">
                      <UploadCloud className="text-slate-400 group-hover:text-primary mx-auto mb-1" />
                      <p className="text-xs text-slate-500">{t('financial.form.upload_hint')}</p>
                    </div>
                    <input className="hidden" type="file"/>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 text-center px-1">{t('financial.form.no_image')}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="px-6 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition-all cursor-pointer" type="reset">{t('financial.form.reset_btn')}</button>
                <button className="px-10 py-2 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all cursor-pointer" type="submit">{t('financial.form.save_btn')}</button>
              </div>
            </form>
          </div>
        </div>
        {/* Footer Content */}
        <footer className="mt-auto p-8 border-t border-primary/10 text-center">
          <p className="text-slate-500 text-xs">{t('financial.footer_copyright')}</p>
        </footer>
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
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Transaction Receipt</h3>
                    {selectedTx.receipt_no ? (
                      <button 
                        onClick={() => window.open(`https://picsum.photos/seed/${selectedTx.receipt_no}/800/1200`, '_blank')}
                        className="text-primary hover:underline font-mono text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {selectedTx.receipt_no}
                        <Receipt className="size-3" />
                      </button>
                    ) : (
                      <p className="text-slate-500 font-mono text-xs">No Receipt Number</p>
                    )}
                  </div>
                  <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                    <Receipt className="size-8" />
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
                    <Plus className="size-4" />
                    Print Receipt
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
