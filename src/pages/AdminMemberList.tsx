import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Bell, 
  User, 
  Calendar, 
  Mail, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Plus,
  Edit,
  Trash2,
  X,
  Camera,
  Home,
  Megaphone,
  LogOut,
  UserPlus,
  LayoutDashboard,
  Wallet,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmationModal from '../components/ConfirmationModal';

interface Member {
  id: number;
  name: string;
  role: string;
  joined_date: string;
  status: string;
  email?: string;
  mobile?: string;
  nid_number?: string;
  address?: string;
  nid_front?: string;
  nid_back?: string;
  profile_picture?: string;
}

export default function AdminMemberList() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    joined_date: new Date().toISOString().split('T')[0],
    status: 'active',
    profile_picture: '',
    mobile: '',
    email: '',
    nid_number: '',
    address: '',
    nid_front: '',
    nid_back: ''
  });

  const isGodMode = localStorage.getItem('godMode') === 'true';

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        setMembers([]);
        return;
      }

      const mockImages = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFBelP6ilCTa_YjNph88Y5ALo-32Q1qXMCuWYwp4C6SyDqsYWG-5KFj-054n8wJ5C4MdoIUJQU167xSYPLcx0i5PhpCLLbHy1ZhAhl54X2hEK2PqbHywT9yFnHpvS9U27qoz020nR0MiAT4qxw23POmrRUrW8V7Ddgw92e--uiaLlFzcvqd48kB3n1V3-1c6wOWo7JxtusXGlPkPxOHA1Xhw5VXRDcLE2YqO7h3tNR-Kt4-QczF2e4WpXEu-6Pg2GbD3qfKyLAQmNc",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBEEOW7Xe4EPRtXWSb9mc8KhIKPnUpzZBSzbhQerx5UG60QwvYs08vz34FSePdcD7lj3Cu8iRTwkXc6dmJo6LtOKzuYfEdSkqYKZWkbi8BEjYXSvLenXhagdYNmqNaqPPi9OM7UYJ-S_XREWDgCe1gjv7u6N2lMFkq1qZHYwJ0vVo7tXN5GtOUjzCeM9AwH2wB7oEhuu_bud7UzDHtHfEXsBXzIAzrsotQvkjRMUmqjCDysHXouZ_fmAeWPTluejSUw0zNGA_8U1TSm",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMINpi_R9G-BTeTXxpw_vj-5SRP9NsNnye9SXAJuRGn0pApEdh-2QyNA-CfdU1h7xD5E6JYWD0oB5mprmNRWCXwu_9eVGRI7MvwtUl54vjM69nmylVTEVOKPUK5DwXK4doqABdbh0mr4fUCEGqRr1b8hMZ_Vzj_oxJrKJgl_mdd-zdmJFCpeWCxgx0DKke8hN7dm4rrvCLUk5pBM_JykNBBwIjRqii45A4aSzYM-GwSHSQOGr5D6MC2J6-PkfpjxJDHuwHyY5nHKwr",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCic1Cu4oKMoPH4_4CwAZTZBAoSRZvCbw6d-jny1R7pSb8AhuD42D928QzaaaS6ZEqiFyhSPjyuffb_-F41px-p23iemMHjwewRjyVPN0WMu3zsHXAi6yL6Zw7C0mE_6Hrg47ZdAbG8bEPB7uZFxtf49CUzj5dkEFfnI3BBi_BrFfHlN5xPkIy05kkK7xcZuqMCOj_NpNaaG25GwsK1cdFo_jjAXiEHl2u0LEXqcMdvg_ZyajC1DfSzezTmrkTDKG21xd5ODsWguoJS"
      ];

      const enhancedData = data.map((m: any, i: number) => ({
        ...m,
        email: m.email || `${(m.name || '').toLowerCase().replace(/\s/g, '')}@example.com`,
        profile_picture: m.profile_picture || mockImages[i % mockImages.length]
      }));

      setMembers(enhancedData);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode ? `/api/members/${editingMemberId}` : '/api/members';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          joined_date: formData.joined_date,
          status: formData.status,
          profile_picture: formData.profile_picture,
          mobile: formData.mobile,
          email: formData.email,
          nid_number: formData.nid_number,
          address: formData.address,
          nid_front: formData.nid_front,
          nid_back: formData.nid_back
        })
      });
      if (response.ok) {
        setIsAddModalOpen(false);
        setIsEditMode(false);
        setEditingMemberId(null);
        setFormData({
          name: '',
          role: '',
          joined_date: new Date().toISOString().split('T')[0],
          status: 'active',
          profile_picture: '',
          mobile: '',
          email: '',
          nid_number: '',
          address: '',
          nid_front: '',
          nid_back: ''
        });
        fetchMembers();
      }
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const handleEdit = (member: Member) => {
    setFormData({
      name: member.name,
      role: member.role,
      joined_date: member.joined_date,
      status: member.status,
      profile_picture: member.profile_picture || '',
      mobile: member.mobile || '',
      email: member.email || '',
      nid_number: member.nid_number || '',
      address: member.address || '',
      nid_front: member.nid_front || '',
      nid_back: member.nid_back || ''
    });
    setEditingMemberId(member.id);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string = 'profile_picture') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleView = (member: Member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setMemberToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    try {
      const response = await fetch(`/api/members/${memberToDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const filteredMembers = members.filter(m => {
    const name = (m.name || '').toLowerCase();
    const id = (m.id || '').toString().toLowerCase();
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = name.includes(search) || id.includes(search);
    const matchesRole = roleFilter === '' || roleFilter === t('members.filter_by_role') || m.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex font-['Public_Sans','Noto_Sans_Bengali',sans-serif]">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors group" title={t('common.back_to_dashboard')}>
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h2 className="text-xl font-bold">{t('members.title')}</h2>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <nav className={`flex text-sm ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>
              <span>{t('members.breadcrumb_dashboard')}</span>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">{t('members.breadcrumb_members')}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 outline-none" 
                placeholder={t('members.search_placeholder')} 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              <UserPlus className="size-4" />
              {t('members.add_new')}
            </button>
          </div>
        </header>

        {/* Filters & Table Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Filters Area */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex gap-2">
                <button 
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${statusFilter === 'all' ? 'bg-fuchsia text-white shadow-lg shadow-fuchsia/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-fuchsia'}`}
                >
                  {t('members.all_members')}
                </button>
                <button 
                  onClick={() => setStatusFilter('active')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${statusFilter === 'active' ? 'bg-bright-green text-black shadow-lg shadow-bright-green/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-bright-green'}`}
                >
                  {t('members.active')}
                </button>
                <button 
                  onClick={() => setStatusFilter('inactive')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${statusFilter === 'inactive' ? 'bg-terracotta text-white shadow-lg shadow-terracotta/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-terracotta'}`}
                >
                  {t('members.inactive')}
                </button>
                <button 
                  onClick={() => setStatusFilter('pending')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${statusFilter === 'pending' ? 'bg-sage text-white shadow-lg shadow-sage/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sage'}`}
                >
                  {t('members.pending')}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest py-1.5 focus:ring-fuchsia outline-none"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option>{t('members.filter_by_role')}</option>
                  <option>{t('members.roles.president')}</option>
                  <option>{t('members.roles.general_secretary')}</option>
                  <option>{t('members.roles.secretary')}</option>
                  <option>{t('members.roles.treasurer')}</option>
                  <option>{t('members.roles.general_member')}</option>
                </select>
                <button className="p-1.5 text-slate-500 hover:bg-fuchsia/10 hover:text-fuchsia rounded-lg cursor-pointer transition-colors">
                  <Filter className="size-4" />
                </button>
              </div>
            </div>

            {/* Members Grid */}
            <div className="p-6">
              {loading ? (
                <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-4">
                  <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-bold uppercase tracking-widest text-xs">{t('common.loading')}</p>
                </div>
              ) : paginatedMembers.length === 0 ? (
                <div className="py-20 text-center text-slate-500 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                  <Users className="size-16 mx-auto mb-4 opacity-10" />
                  <p className="font-bold uppercase tracking-widest text-xs">{t('members.no_members_found')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className={`p-6 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden flex flex-col ${
                        isGodMode 
                          ? 'bg-white/5 border-white/5 hover:border-bright-green/20 hover:bg-white/[0.07]' 
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20'
                      }`}
                    >
                      {/* Status Badge */}
                      <div className="absolute top-6 right-6">
                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                          member.status === 'active' ? 'text-bright-green' :
                          member.status === 'pending' ? 'text-sage' :
                          'text-terracotta'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            member.status === 'active' ? 'bg-bright-green animate-pulse' :
                            member.status === 'pending' ? 'bg-sage' :
                            'bg-terracotta'
                          }`}></span> 
                          {member.status === 'active' ? t('members.active') : member.status === 'pending' ? t('members.pending') : t('members.inactive')}
                        </span>
                      </div>

                      <div className="flex items-start gap-4 mb-6">
                        <div className="relative shrink-0">
                          <div className={`absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity ${isGodMode ? 'bg-bright-green' : 'bg-primary'}`}></div>
                          <img 
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-transparent group-hover:border-white/10 transition-all shadow-lg relative z-10" 
                            src={member.profile_picture || `https://picsum.photos/seed/${member.id}/100/100`} 
                            alt={member.name}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0 pt-1">
                          <h3 className={`text-lg font-black uppercase tracking-tight mb-0.5 transition-colors leading-tight truncate ${isGodMode ? 'text-white group-hover:text-bright-green' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                            {member.name}
                          </h3>
                          
                          <p className={`text-[10px] font-bold mb-2 truncate ${isGodMode ? 'text-white/40' : 'text-slate-400'}`}>
                            {member.email}
                          </p>

                          <span className={`inline-block px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            member.role === 'সভাপতি' || member.role === t('members.roles.president') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            member.role === 'সম্পাদক' || member.role === t('members.roles.secretary') ? 'bg-primary/10 text-primary' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1">
                        <div className={`w-full grid grid-cols-2 gap-4 pt-4 mt-auto border-t ${isGodMode ? 'border-white/5' : 'border-slate-50 dark:border-slate-800'}`}>
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{t('members.table.id')}</p>
                            <p className={`font-mono text-xs font-bold ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>#MB-{member.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{t('members.table.joined_date')}</p>
                            <p className={`text-xs font-bold ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{member.joined_date}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-6 w-full">
                          <button 
                            onClick={() => handleView(member)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                              isGodMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            <Eye className="size-4" />
                            {t('common.details')}
                          </button>
                          <button 
                            onClick={() => handleEdit(member)}
                            className={`p-3 rounded-2xl transition-all cursor-pointer ${
                              isGodMode ? 'bg-bright-green/10 text-bright-green hover:bg-bright-green hover:text-black' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                            }`}
                          >
                            <Edit className="size-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(member.id)}
                            className={`p-3 rounded-2xl transition-all cursor-pointer ${
                              isGodMode ? 'bg-hot-pink/10 text-hot-pink hover:bg-hot-pink hover:text-white' : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'
                            }`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                {t('members.pagination.showing')} {filteredMembers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} {t('members.pagination.to')} {Math.min(currentPage * itemsPerPage, filteredMembers.length)} ({t('members.pagination.of')} {filteredMembers.length} {t('members.pagination.members')})
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="size-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === page 
                        ? 'bg-primary text-white' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Side Slide-over Panel (Add Member Form) */}
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[450px] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
            >
              {/* Form Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {isEditMode ? t('common.edit') : t('members.modal.title')}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {isEditMode ? 'Update member information' : t('members.modal.subtitle')}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditMode(false);
                    setEditingMemberId(null);
                  }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Photo Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('members.modal.photo_label')}</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 overflow-hidden">
                      {formData.profile_picture ? (
                        <img src={formData.profile_picture} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Camera className="size-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="member-photo-upload"
                      />
                      <label 
                        htmlFor="member-photo-upload"
                        className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-bold cursor-pointer transition-colors mb-2"
                      >
                        {t('common.upload') || 'Upload Photo'}
                      </label>
                      <p className="text-[10px] text-slate-500">{t('members.modal.upload_hint')}</p>
                    </div>
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">{t('members.modal.full_name')}</label>
                    <input 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" 
                      placeholder={t('members.modal.name_placeholder')} 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">{t('members.modal.mobile')}</label>
                      <input 
                        required
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                        placeholder={t('members.modal.mobile_placeholder')} 
                        type="text"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">{t('contact.label_email')}</label>
                      <input 
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                        placeholder="example@email.com" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">{t('members.modal.role')}</label>
                      <select 
                        required
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="">{t('members.modal.select_role')}</option>
                        <option value={t('members.roles.president')}>{t('members.roles.president')}</option>
                        <option value={t('members.roles.general_secretary')}>{t('members.roles.general_secretary')}</option>
                        <option value={t('members.roles.treasurer')}>{t('members.roles.treasurer')}</option>
                        <option value={t('members.roles.general_member')}>{t('members.roles.general_member')}</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">{t('members.modal.joined_date')}</label>
                      <input 
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                        type="date"
                        value={formData.joined_date}
                        onChange={(e) => setFormData({...formData, joined_date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">NID Number</label>
                    <input 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                      placeholder="Enter NID Number" 
                      type="text"
                      value={formData.nid_number}
                      onChange={(e) => setFormData({...formData, nid_number: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">{t('members.modal.address')}</label>
                    <textarea 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                      placeholder={t('members.modal.address_placeholder')} 
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">NID Front</label>
                      <div className="flex flex-col gap-2">
                        <div className="w-full h-24 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                          {formData.nid_front ? (
                            <img src={formData.nid_front} className="w-full h-full object-cover" alt="NID Front" />
                          ) : (
                            <Camera className="size-6 text-slate-400" />
                          )}
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'nid_front')}
                          className="hidden"
                          id="nid-front-upload"
                        />
                        <label htmlFor="nid-front-upload" className="text-center py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold cursor-pointer">Upload</label>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">NID Back</label>
                      <div className="flex flex-col gap-2">
                        <div className="w-full h-24 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                          {formData.nid_back ? (
                            <img src={formData.nid_back} className="w-full h-full object-cover" alt="NID Back" />
                          ) : (
                            <Camera className="size-6 text-slate-400" />
                          )}
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'nid_back')}
                          className="hidden"
                          id="nid-back-upload"
                        />
                        <label htmlFor="nid-back-upload" className="text-center py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold cursor-pointer">Upload</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">{t('members.status') || 'Status'}</label>
                    <select 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="active">{t('members.active')}</option>
                      <option value="inactive">{t('members.inactive')}</option>
                      <option value="pending">{t('members.pending')}</option>
                    </select>
                  </div>
                </div>
              </form>

              {/* Form Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex gap-3">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg font-bold text-sm hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  {t('common.save')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* View Member Details Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedMember && (
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
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-xl font-bold">{t('common.details')}</h3>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
                  <X className="size-5" />
                </button>
              </div>
              <div className="p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img 
                    className="w-32 h-32 rounded-3xl object-cover shadow-xl ring-4 ring-primary/10" 
                    src={selectedMember.profile_picture || `https://picsum.photos/seed/${selectedMember.id}/200/200`} 
                    alt={selectedMember.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase border-2 border-white dark:border-slate-900 shadow-lg ${
                    selectedMember.status === 'active' ? 'bg-primary text-white' : 'bg-slate-400 text-white'
                  }`}>
                    {selectedMember.status}
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{selectedMember.name}</h4>
                <p className="text-primary font-bold uppercase tracking-widest text-xs mt-1">{selectedMember.role}</p>
                
                <div className="w-full grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">{t('members.table.id')}</p>
                    <p className="font-mono text-sm">#MB-{selectedMember.id}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">{t('members.table.joined_date')}</p>
                    <p className="text-sm font-semibold">{selectedMember.joined_date}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">Mobile</p>
                    <p className="text-sm font-semibold">{selectedMember.mobile || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">NID Number</p>
                    <p className="text-sm font-semibold">{selectedMember.nid_number || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left col-span-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">Email Address</p>
                    <p className="text-sm font-semibold">{selectedMember.email}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left col-span-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">Address</p>
                    <p className="text-sm font-semibold">{selectedMember.address || 'N/A'}</p>
                  </div>
                  {selectedMember.nid_front && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left col-span-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-2">NID Front</p>
                      <img src={selectedMember.nid_front} className="w-full rounded-lg border border-slate-200 dark:border-slate-700" alt="NID Front" />
                    </div>
                  )}
                  {selectedMember.nid_back && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left col-span-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-2">NID Back</p>
                      <img src={selectedMember.nid_back} className="w-full rounded-lg border border-slate-200 dark:border-slate-700" alt="NID Back" />
                    </div>
                  )}
                </div>
                
                <div className="mt-8 w-full flex gap-3">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="flex-1 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {t('close') || 'Close'}
                  </button>
                  <button 
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleEdit(selectedMember);
                    }}
                    className="flex-1 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer"
                  >
                    {t('common.edit') || 'Edit'}
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
        title={t('members.delete_title') || 'Delete Member'}
        message={t('members.delete_confirm') || 'Are you sure you want to delete this member? This action cannot be undone and will remove all associated data.'}
        confirmText={t('common.delete') || 'Delete'}
        cancelText={t('common.cancel') || 'Cancel'}
        type="danger"
      />
    </div>
  );
}
