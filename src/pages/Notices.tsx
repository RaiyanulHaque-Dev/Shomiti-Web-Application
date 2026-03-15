import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Megaphone,
  Info,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ArrowLeft,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';

interface Notice {
  id: number;
  title: string;
  date: string;
  type: string;
  content: string;
}

export default function Notices() {
  const { t } = useTranslation();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/notices');
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices
    .filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            n.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
                              (categoryFilter === t('notices.categories.general') && n.type === 'megaphone') ||
                              (categoryFilter === t('notices.categories.meeting') && n.type === 'calendar_month') ||
                              (categoryFilter === t('notices.categories.financial') && n.type === 'account_balance_wallet') ||
                              (categoryFilter === t('notices.categories.urgent') && n.type === 'alert');
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'new') return b.id - a.id;
      return a.id - b.id;
    });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'calendar_month': return t('notices.categories.meeting');
      case 'person_add': return t('notices.categories.membership');
      case 'account_balance_wallet': return t('notices.categories.financial');
      case 'alert': return t('notices.categories.urgent');
      case 'info': return t('notices.categories.info');
      default: return t('notices.categories.general');
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'calendar_month': return 'bg-emerald-100 text-emerald-600 border-emerald-500';
      case 'person_add': return 'bg-green-100 text-green-600 border-green-500';
      case 'account_balance_wallet': return 'bg-primary/10 text-primary border-primary';
      case 'alert': return 'bg-red-100 text-red-600 border-red-500';
      case 'info': return 'bg-cyan-100 text-cyan-600 border-cyan-500';
      default: return 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const handleView = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <main className={`flex-1 w-full px-4 py-12 ${isGodMode ? 'bg-dark-grey text-white' : ''}`}>
        <div className="max-w-[960px] mx-auto">
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link to="/" className={`inline-flex items-center gap-2 transition-colors group ${isGodMode ? 'text-white/40 hover:text-bright-green' : 'text-slate-500 hover:text-primary'}`}>
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">{t('common.back_to_home')}</span>
            </Link>
          </motion.div>

          {/* Title Section */}
          <div className="mb-8 space-y-2 text-center md:text-left">
            <h1 className={`text-4xl font-black ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{t('notices.title')}</h1>
            <p className={`font-medium ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>{t('notices.subtitle')}</p>
          </div>

          {/* Search and Filters */}
          <div className={`p-6 rounded-xl border shadow-sm space-y-6 mb-10 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900/50 border-primary/10'}`}>
            <div className="relative w-full">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
                <Search className="size-5" />
              </div>
              <input 
                className={`block w-full pl-12 pr-4 py-3 border-none rounded-lg focus:ring-2 focus:ring-primary/50 outline-none ${isGodMode ? 'bg-white/5 text-white placeholder:text-white/20' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`} 
                placeholder={t('notices.search_placeholder')} 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {['all', t('notices.categories.general'), t('notices.categories.meeting'), t('notices.categories.financial'), t('notices.categories.urgent')].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      categoryFilter === cat 
                        ? (isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white')
                        : (isGodMode ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-primary/10 text-primary hover:bg-primary/20')
                    }`}
                  >
                    {cat === 'all' ? t('notices.categories.all') : cat}
                  </button>
                ))}
              </div>
              {/* Sorting */}
              <div className={`flex items-center gap-2 p-1 rounded-lg w-fit ${isGodMode ? 'bg-black/40' : 'bg-slate-50 dark:bg-slate-950'}`}>
                <button 
                  onClick={() => setSortOrder('new')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    sortOrder === 'new' 
                      ? (isGodMode ? 'bg-bright-green text-black shadow-sm' : 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-slate-100')
                      : (isGodMode ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')
                  }`}
                >
                  {t('notices.sort.new')}
                </button>
                <button 
                  onClick={() => setSortOrder('old')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    sortOrder === 'old' 
                      ? (isGodMode ? 'bg-bright-green text-black shadow-sm' : 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-slate-100')
                      : (isGodMode ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')
                  }`}
                >
                  {t('notices.sort.old')}
                </button>
              </div>
            </div>
          </div>

          {/* Notice List */}
          <div className="space-y-4">
            {loading ? (
              <div className={`text-center py-20 ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('common.loading')}</div>
            ) : filteredNotices.length === 0 ? (
              <div className={`text-center py-20 rounded-xl border border-dashed ${isGodMode ? 'bg-black/40 border-white/10' : 'bg-white dark:bg-slate-900/50 border-primary/20'}`}>
                <Megaphone className={`size-12 mx-auto mb-4 ${isGodMode ? 'text-white/10' : 'text-slate-300'}`} />
                <p className={`${isGodMode ? 'text-white/40' : 'text-slate-500'} font-medium`}>{t('notices.no_notices')}</p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={notice.id}
                  className={`group p-5 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all border-y border-r ${
                    isGodMode 
                      ? 'bg-black/40 border-white/5' 
                      : 'bg-white dark:bg-slate-900/50 border-primary/5'
                  } ${getTypeStyles(notice.type)}`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                          notice.type === 'alert' ? 'bg-red-100 text-red-600' : (isGodMode ? 'bg-bright-green/10 text-bright-green' : 'bg-primary/10 text-primary')
                        }`}>
                          {getTypeLabel(notice.type)}
                        </span>
                        <span className={`text-sm flex items-center gap-1 ${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>
                          <Calendar className="size-4" /> {notice.date}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold transition-colors ${isGodMode ? 'text-white group-hover:text-bright-green' : 'text-slate-900 dark:text-slate-100 group-hover:text-primary'}`}>
                        {notice.title}
                      </h3>
                      <p className={`text-sm leading-relaxed max-w-2xl ${isGodMode ? 'text-white/60' : 'text-slate-600 dark:text-slate-400'}`}>
                        {notice.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <button className={`p-2 rounded-lg transition-colors cursor-pointer ${isGodMode ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-primary/10 text-primary hover:bg-primary/20'}`} title={t('notices.download_title')}>
                        <Download className="size-5" />
                      </button>
                      <button 
                        onClick={() => handleView(notice)}
                        className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm cursor-pointer ${
                          isGodMode ? 'bg-bright-green text-black hover:bg-white' : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                      >
                        {t('notices.view_details')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-2">
          <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/10 transition-colors cursor-pointer">
            <ChevronLeft className="size-5" />
          </button>
          <button className="size-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold cursor-pointer">১</button>
          <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/10 transition-colors cursor-pointer">২</button>
          <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/10 transition-colors cursor-pointer">৩</button>
          <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/10 transition-colors cursor-pointer">
            <ChevronRight className="size-5" />
          </button>
        </div>

      {/* View Notice Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedNotice && (
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getTypeStyles(selectedNotice.type)}`}>
                        {getTypeLabel(selectedNotice.type)}
                      </span>
                      <span className="text-sm text-slate-500 flex items-center gap-1 font-semibold">
                        <Calendar className="size-4" /> {selectedNotice.date}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedNotice.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="size-6 rotate-180" />
                  </button>
                </div>

                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                    {selectedNotice.content}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {t('close') || 'Close'}
                  </button>
                  <button 
                    className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="size-5" />
                    {t('notices.download_title') || 'Download'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
        </div>
      </main>
    </Layout>
  );
}
