import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  LifeBuoy, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

interface SupportTicket {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'in-progress' | 'resolved';
}

export default function SupportManagement() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchTickets();
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket({ ...selectedTicket, status: status as any });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'all') return true;
    return ticket.status === activeTab;
  });

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'new').length,
    pending: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <div className={`font-['Public_Sans',sans-serif] flex h-screen overflow-hidden ${isGodMode ? 'bg-dark-grey text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className={`h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 ${isGodMode ? 'bg-dark-grey border-white/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors group" title={t('common.back_to_dashboard')}>
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h2 className="text-xl font-bold">{t('support.title')}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
                placeholder={t('support.search_placeholder')} 
                type="text"
              />
            </div>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
          </div>
        </header>

        <div className="p-8 flex flex-col gap-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: t('support.stats.total'), value: stats.total, color: 'text-primary' },
              { label: t('support.stats.new'), value: stats.new, color: 'text-emerald-500' },
              { label: t('support.stats.resolved'), value: stats.resolved, color: 'text-primary' },
              { label: t('support.stats.pending'), value: stats.pending, color: 'text-amber-500' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl border shadow-sm flex flex-col gap-2 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <span className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>{stat.label}</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content Section */}
          <div className={`rounded-xl border shadow-sm overflow-hidden ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
            {/* Tabs */}
            <div className={`flex border-b px-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}>
              {[
                { id: 'all', label: t('support.tabs.all'), count: stats.total },
                { id: 'new', label: t('support.tabs.new'), count: stats.new },
                { id: 'in-progress', label: t('support.tabs.pending'), count: stats.pending },
                { id: 'resolved', label: t('support.tabs.resolved'), count: stats.resolved }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${
                    activeTab === tab.id 
                      ? 'text-primary border-primary' 
                      : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-primary'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`${isGodMode ? 'bg-black/40 text-white/40' : 'bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'}`}>
                    <th className={`px-6 py-4 text-sm font-bold border-b ${isGodMode ? 'border-white/5' : 'border-slate-200 dark:border-slate-800'}`}>{t('support.table.name_email')}</th>
                    <th className={`px-6 py-4 text-sm font-bold border-b ${isGodMode ? 'border-white/5' : 'border-slate-200 dark:border-slate-800'}`}>{t('support.table.subject')}</th>
                    <th className={`px-6 py-4 text-sm font-bold border-b ${isGodMode ? 'border-white/5' : 'border-slate-200 dark:border-slate-800'}`}>{t('support.table.date')}</th>
                    <th className={`px-6 py-4 text-sm font-bold border-b ${isGodMode ? 'border-white/5' : 'border-slate-200 dark:border-slate-800'}`}>{t('support.table.status')}</th>
                    <th className={`px-6 py-4 text-sm font-bold border-b ${isGodMode ? 'border-white/5' : 'border-slate-200 dark:border-slate-800'} text-right`}>{t('support.table.action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-500">{t('support.table.loading')}</td>
                    </tr>
                  ) : filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-500">{t('support.table.no_data')}</td>
                    </tr>
                  ) : filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                            {ticket.name.substring(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{ticket.name}</p>
                            <p className="text-[10px] text-slate-500">{ticket.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
                          {ticket.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{ticket.date}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={ticket.status}
                          onChange={(e) => updateStatus(ticket.id, e.target.value)}
                          className={`bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer ${
                            ticket.status === 'new' ? 'text-emerald-600 dark:text-emerald-400' :
                            ticket.status === 'in-progress' ? 'text-amber-600 dark:text-amber-400' :
                            'text-primary'
                          }`}
                        >
                          <option value="new">{t('support.status.new')}</option>
                          <option value="in-progress">{t('support.status.pending')}</option>
                          <option value="resolved">{t('support.status.resolved')}</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-primary hover:text-primary/80 font-bold text-sm cursor-pointer"
                        >
                          {t('support.table.details')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('support.table.showing_entries', { count: filteredTickets.length })}</p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-primary/10 text-slate-400 hover:text-primary">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm shadow-primary/40">১</button>
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-primary/10 text-slate-400 hover:text-primary">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Message Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold">{t('support.modal.title')}</h3>
                <button 
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <PlusCircle className="size-6 rotate-45 text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold">{t('support.modal.sender')}</label>
                    <p className="font-bold">{selectedTicket.name}</p>
                    <p className="text-sm text-slate-500">{selectedTicket.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold">{t('support.modal.date')}</label>
                    <p className="font-bold">{selectedTicket.date}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold">{t('support.modal.subject')}</label>
                  <p className="font-bold text-lg">{selectedTicket.subject}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-2">{t('support.modal.message')}</label>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedTicket.message}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold">{t('support.modal.update_status')}</label>
                    <select 
                      value={selectedTicket.status}
                      onChange={(e) => updateStatus(selectedTicket.id, e.target.value)}
                      className="text-sm rounded-lg border-slate-200 dark:border-slate-700 focus:ring-primary focus:border-primary"
                    >
                      <option value="new">{t('support.status.new')}</option>
                      <option value="in-progress">{t('support.status.pending')}</option>
                      <option value="resolved">{t('support.status.resolved')}</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => setSelectedTicket(null)}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm"
                  >
                    {t('support.modal.close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
