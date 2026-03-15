import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  History, 
  Info, 
  Calendar,
  ShieldCheck,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { formatCurrency } from '../utils/format';

interface Stats {
  totalMembers: number;
  activeNotices: number;
  totalFunds: number;
  newMessages: number;
  paidMembers: number;
  dueMembers: number;
  monthlyCollection: number;
  dueAmount: number;
}

export default function Transparency() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <main className={`flex-1 w-full px-4 py-10 ${isGodMode ? 'bg-dark-grey text-white' : ''}`}>
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/" className={`p-2 rounded-lg transition-colors group ${isGodMode ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'}`}>
                <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {t('transparency.title')}
              </h1>
            </div>
            <p className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} max-w-2xl`}>
              {t('transparency.subtitle')}
            </p>
          </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border shadow-sm ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/10'}`}
              >
                <div className="flex items-center gap-3 text-primary mb-4">
                  <div className={`p-2 rounded-lg ${isGodMode ? 'bg-white/10' : 'bg-primary/10'}`}>
                    <TrendingUp className="size-6" />
                  </div>
                  <h3 className={`font-bold text-sm uppercase tracking-wider ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('transparency.total_funds')}</h3>
                </div>
                <p className={`text-3xl font-black ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(stats?.totalFunds || 0)}</p>
                <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                  <ShieldCheck className="size-3" />
                  Verified & Secure
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl border shadow-sm ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/10'}`}
              >
                <div className="flex items-center gap-3 text-emerald-600 mb-4">
                  <div className={`p-2 rounded-lg ${isGodMode ? 'bg-white/10' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>
                    <Users className="size-6" />
                  </div>
                  <h3 className={`font-bold text-sm uppercase tracking-wider ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('transparency.paid_members')}</h3>
                </div>
                <p className={`text-3xl font-black ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{stats?.paidMembers || 0}</p>
                <p className={`text-xs mt-2 ${isGodMode ? 'text-white/40' : 'text-slate-400'}`}>{t('ledger.stats.paid_desc')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-2xl border shadow-sm ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/10'}`}
              >
                <div className="flex items-center gap-3 text-orange-500 mb-4">
                  <div className={`p-2 rounded-lg ${isGodMode ? 'bg-white/10' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                    <History className="size-6" />
                  </div>
                  <h3 className={`font-bold text-sm uppercase tracking-wider ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('transparency.due_amount')}</h3>
                </div>
                <p className={`text-3xl font-black ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(stats?.dueAmount || 0)}</p>
                <p className="text-xs text-orange-600 font-bold mt-2">{stats?.dueMembers || 0} {t('financial.stats.members_due')}</p>
              </motion.div>
            </section>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 gap-8">
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                  <h2 className="font-bold text-xl flex items-center gap-2">
                    <Calendar className="text-primary size-5" />
                    {t('transparency.collection_status')}
                  </h2>
                </div>
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="relative size-48 mb-6">
                    <svg className="size-full" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100 dark:text-slate-800 stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary stroke-current"
                        strokeWidth="3"
                        strokeDasharray={`${Math.round(((stats?.paidMembers || 0) / (stats?.totalMembers || 1)) * 100)}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-slate-900 dark:text-white">
                        {Math.round(((stats?.paidMembers || 0) / (stats?.totalMembers || 1)) * 100)}%
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Collected</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{stats?.paidMembers || 0}</p>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{t('ledger.status.paid')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-500">{stats?.dueMembers || 0}</p>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{t('ledger.status.due')}</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Transparency Note */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm shrink-0">
                <ShieldCheck className="text-emerald-600 size-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-2">{t('transparency.commitment_title')}</h3>
                <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  {t('transparency.commitment_text')}
                </p>
              </div>
            </motion.div>
          </div>
        )}
        </div>
      </main>
    </Layout>
  );
}
