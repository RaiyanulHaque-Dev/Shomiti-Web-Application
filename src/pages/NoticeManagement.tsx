import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Megaphone, 
  Calendar, 
  Trash2, 
  Edit, 
  X,
  Eye,
  Archive,
  Filter,
  FileText,
  MoreVertical,
  ArrowLeft,
  AlertTriangle,
  DollarSign,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmationModal from '../components/ConfirmationModal';

interface Notice {
  id: number;
  title: string;
  date: string;
  type: string;
  content: string;
  status?: 'Published' | 'Draft' | 'Archived';
}

export default function NoticeManagement() {
  const { t } = useTranslation();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft' | 'Archived'>('All');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    type: 'general',
    content: '',
    status: 'Published' as 'Published' | 'Draft' | 'Archived'
  });

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notices');
      const data = await response.json();
      if (Array.isArray(data)) {
        setNotices(data);
      } else {
        setNotices([]);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode && selectedNotice ? `/api/notices/${selectedNotice.id}` : '/api/notices';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsAddModalOpen(false);
        setIsEditMode(false);
        setSelectedNotice(null);
        setFormData({
          title: '',
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          type: 'general',
          content: '',
          status: 'Published'
        });
        fetchNotices();
      }
    } catch (error) {
      console.error("Error saving notice:", error);
    }
  };

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setFormData({
      title: notice.title,
      date: notice.date,
      type: notice.type || 'general',
      content: notice.content,
      status: notice.status || 'Published'
    });
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setNoticeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!noticeToDelete) return;
    try {
      const response = await fetch(`/api/notices/${noticeToDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchNotices();
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleView = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const filteredNotices = notices.filter(n => {
    const title = (n.title || '').toLowerCase();
    const content = (n.content || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = title.includes(search) || content.includes(search);
    const matchesStatus = statusFilter === 'All' || n.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <div className={`h-screen overflow-hidden flex font-['Public_Sans',sans-serif] ${isGodMode ? 'bg-dark-grey text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`h-16 border-b px-8 flex items-center justify-between shrink-0 ${isGodMode ? 'bg-dark-grey border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors group" title={t('common.back_to_dashboard')}>
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h2 className="text-xl font-bold">{t('notice_mgmt.title')}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input 
                className="w-full pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
                placeholder={t('notice_mgmt.global_search')} 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
              <span className="text-sm font-medium hidden sm:block">{t('notice_mgmt.admin_user')}</span>
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALWecjjHd_wMWKOPvvbEqLB7tCmGfuU6hxJlFNZiKHTfJYHUOGwahBd6C-MOCyCJnvOWgC0uCpwKwP5uz0tjGoTJRg3z6s9l422xvQiy-CKqxo19B8im5BkFSWvTj1CSI_COAf11IUBVZs7XqZP2M79zlglJxt05QUdVjRA6egOwKQoGzyelBP-FfFcC0tkZHmPCNN-Anft2IKn7ytaVJiml1j_TCeCgSlVVSIlgiyplP4ZUzcbYAYA0FTluvMnXxr9rWO6tDwfw10"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">{t('notice_mgmt.announcements')}</h3>
              <p className="text-slate-500 text-sm">{t('notice_mgmt.manage_broadcast')}</p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <Plus className="size-5" />
              {t('notice_mgmt.create_new')}
            </button>
          </div>

          <div className={`p-4 rounded-xl border mb-6 flex flex-wrap items-center gap-3 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input 
                className={`w-full pl-10 pr-4 py-2 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none ${isGodMode ? 'bg-white/5 text-white' : 'bg-slate-100 dark:bg-slate-800'}`} 
                placeholder={t('notice_mgmt.filter_placeholder')} 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {(['All', 'Published', 'Draft', 'Archived'] as const).map((status) => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    statusFilter === status 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {status === 'All' ? t('notice_mgmt.status.all') : 
                   status === 'Published' ? t('notice_mgmt.status.published') :
                   status === 'Draft' ? t('notice_mgmt.status.draft') :
                   t('notice_mgmt.status.archived')}
                </button>
              ))}
            </div>
          </div>

          <div className={`rounded-xl border overflow-hidden shadow-sm ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
            <table className="w-full text-left border-collapse">
              <thead className={`${isGodMode ? 'bg-black/40' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                <tr>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('notice_mgmt.table.title')}</th>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('notice_mgmt.table.date')}</th>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('notice_mgmt.table.status')}</th>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-right ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('notice_mgmt.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500">{t('notice_mgmt.table.loading')}</td>
                  </tr>
                ) : filteredNotices.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500">{t('notice_mgmt.table.no_data')}</td>
                  </tr>
                ) : (
                  filteredNotices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-8 rounded-lg flex items-center justify-center ${
                            notice.type === 'urgent' ? 'bg-red-100 text-red-600' :
                            notice.type === 'financial' ? 'bg-emerald-100 text-emerald-600' :
                            notice.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                            isGodMode ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary'
                          }`}>
                            {notice.type === 'urgent' ? <AlertTriangle className="size-5" /> :
                             notice.type === 'financial' ? <DollarSign className="size-5" /> :
                             notice.type === 'meeting' ? <Users className="size-5" /> :
                             <FileText className="size-5" />}
                          </div>
                          <div>
                            <p className={`font-semibold ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{notice.title}</p>
                            <p className={`text-xs truncate max-w-[200px] ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{notice.content}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{notice.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          notice.status === 'Published' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : notice.status === 'Draft'
                            ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          <span className={`size-1.5 rounded-full ${
                            notice.status === 'Published' ? 'bg-green-500' : notice.status === 'Draft' ? 'bg-slate-400' : 'bg-amber-500'
                          }`}></span>
                          {notice.status === 'Published' ? t('notice_mgmt.status.published') :
                           notice.status === 'Draft' ? t('notice_mgmt.status.draft') :
                           t('notice_mgmt.status.archived')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(notice)}
                            className="p-1.5 text-slate-400 hover:text-primary transition-colors cursor-pointer" 
                            title="View"
                          >
                            <Eye className="size-5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(notice)}
                            className="p-1.5 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer" 
                            title="Edit"
                          >
                            <Edit className="size-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(notice.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer" 
                            title="Delete"
                          >
                            <Trash2 className="size-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              {t('notice_mgmt.pagination.showing', { count: filteredNotices.length, total: notices.length })}
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer">{t('notice_mgmt.pagination.previous')}</button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 cursor-pointer">{t('notice_mgmt.pagination.next')}</button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Notice Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold">{isEditMode ? t('notice_mgmt.modal.edit_title') || 'Edit Notice' : t('notice_mgmt.modal.create_title')}</h3>
                <button onClick={() => { setIsAddModalOpen(false); setIsEditMode(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
                  <X className="size-5" />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">{t('notice_mgmt.modal.label_title')}</label>
                  <input 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                    placeholder={t('notice_mgmt.modal.placeholder_title')} 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">{t('notice_mgmt.modal.label_type') || 'Notice Type'}</label>
                    <select 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="general">{t('notice_mgmt.type.general') || 'General'}</option>
                      <option value="urgent">{t('notice_mgmt.type.urgent') || 'Urgent'}</option>
                      <option value="financial">{t('notice_mgmt.type.financial') || 'Financial'}</option>
                      <option value="meeting">{t('notice_mgmt.type.meeting') || 'Meeting'}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">{t('notice_mgmt.modal.label_status')}</label>
                    <select 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    >
                      <option value="Published">{t('notice_mgmt.status.published')}</option>
                      <option value="Draft">{t('notice_mgmt.status.draft')}</option>
                      <option value="Archived">{t('notice_mgmt.status.archived')}</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">{t('notice_mgmt.modal.label_date')}</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">{t('notice_mgmt.modal.label_content')}</label>
                  <textarea 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none min-h-[120px]" 
                    placeholder={t('notice_mgmt.modal.placeholder_content')} 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {t('notice_mgmt.modal.btn_cancel')}
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    {t('notice_mgmt.modal.btn_save')}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold">{t('notice_mgmt.table.title')}</h3>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
                  <X className="size-5" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{selectedNotice.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="size-4" /> {selectedNotice.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedNotice.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>{selectedNotice.status}</span>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedNotice.content}</p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    {t('close') || 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={t('notice_mgmt.delete_title') || 'Delete Notice'}
        message={t('notice_mgmt.delete_confirm') || 'Are you sure you want to delete this notice? This action cannot be undone.'}
        confirmText={t('common.delete') || 'Delete'}
        cancelText={t('common.cancel') || 'Cancel'}
        type="danger"
      />
    </div>
  );
}
