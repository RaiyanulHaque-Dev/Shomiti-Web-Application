import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { X, Mail, Calendar, Eye, ArrowLeft, Filter, ChevronLeft, ChevronRight, Search, Users } from 'lucide-react';
import Layout from '../components/Layout';

interface Member {
  id: number;
  name: string;
  role: string;
  joined_date: string;
  status: string;
  email?: string;
  profile_picture?: string;
}

export default function MemberList() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      
      const mockImages = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFBelP6ilCTa_YjNph88Y5ALo-32Q1qXMCuWYwp4C6SyDqsYWG-5KFj-054n8wJ5C4MdoIUJQU167xSYPLcx0i5PhpCLLbHy1ZhAhl54X2hEK2PqbHywT9yFnHpvS9U27qoz020nR0MiAT4qxw23POmrRUrW8V7Ddgw92e--uiaLlFzcvqd48kB3n1V3-1c6wOWo7JxtusXGlPkPxOHA1Xhw5VXRDcLE2YqO7h3tNR-Kt4-QczF2e4WpXEu-6Pg2GbD3qfKyLAQmNc",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBEEOW7Xe4EPRtXWSb9mc8KhIKPnUpzZBSzbhQerx5UG60QwvYs08vz34FSePdcD7lj3Cu8iRTwkXc6dmJo6LtOKzuYfEdSkqYKZWkbi8BEjYXSvLenXhagdYNmqNaqPPi9OM7UYJ-S_XREWDgCe1gjv7u6N2lMFkq1qZHYwJ0vVo7tXN5GtOUjzCeM9AwH2wB7oEhuu_bud7UzDHtHfEXsBXzIAzrsotQvkjRMUmqjCDysHXouZ_fmAeWPTluejSUw0zNGA_8U1TSm",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMINpi_R9G-BTeTXxpw_vj-5SRP9NsNnye9SXAJuRGn0pApEdh-2QyNA-CfdU1h7xD5E6JYWD0oB5mprmNRWCXwu_9eVGRI7MvwtUl54vjM69nmylVTEVOKPUK5DwXK4doqABdbh0mr4fUCEGqRr1b8hMZ_Vzj_oxJrKJgl_mdd-zdmJFCpeWCxgx0DKke8hN7dm4rrvCLUk5pBM_JykNBBwIjRqii45A4aSzYM-GwSHSQOGr5D6MC2J6-PkfpjxJDHuwHyY5nHKwr",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCic1Cu4oKMoPH4_4CwAZTZBAoSRZvCbw6d-jny1R7pSb8AhuD42D928QzaaaS6ZEqiFyhSPjyuffb_-F41px-p23iemMHjwewRjyVPN0WMu3zsHXAi6yL6Zw7C0mE_6Hrg47ZdAbG8bEPB7uZFxtf49CUzj5dkEFfnI3BBi_BrFfHlN5xPkIy05kkK7xcZuqMCOj_NpNaaG25GwsK1cdFo_jjAXiEHl2u0LEXqcMdvg_ZyajC1DfSzezTmrkTDKG21xd5ODsWguoJS"
      ];

      const enhancedData = data.map((m: any, i: number) => ({
        ...m,
        email: `${m.name.toLowerCase().replace(/\s/g, '')}@example.com`,
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

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.id.toString().includes(searchTerm);
    const matchesRole = roleFilter === '' || roleFilter === t('members.filter_by_role') || m.role === roleFilter;
    const isActive = m.status === 'active';
    return matchesSearch && matchesRole && isActive;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  const handleView = (member: Member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <div className={`min-h-screen font-['Public_Sans','Noto_Sans_Bengali',sans-serif] ${isGodMode ? 'bg-dark-grey text-white' : 'bg-slate-50 dark:bg-slate-950'}`}>
        {/* Hero Section */}
        <section className={`pt-12 pb-10 text-white relative overflow-hidden ${isGodMode ? 'bg-black/40' : 'bg-primary'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-start gap-8">
              <Link to="/" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md transition-all group ${isGodMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold">{t('common.back_to_home')}</span>
              </Link>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-md border ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/10'}`}
              >
                <Users className={`size-6 ${isGodMode ? 'text-bright-green' : ''}`} />
                <span className={`text-lg font-black uppercase tracking-[0.2em] ${isGodMode ? 'text-white' : ''}`}>{t('members.title')}</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className={`rounded-2xl shadow-xl border overflow-hidden ${isGodMode ? 'bg-black/40 border-white/5 shadow-none' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
            {/* Search & Filter Bar */}
            <div className={`p-6 border-b flex flex-col md:flex-row gap-4 items-center justify-between ${isGodMode ? 'border-white/5 bg-white/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50'}`}>
              <div className="relative w-full md:w-96">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-5 ${isGodMode ? 'text-bright-green' : 'text-slate-400'}`} />
                <input 
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all border ${isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-bright-green placeholder:text-white/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary'}`} 
                  placeholder={t('members.search_placeholder')} 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select 
                  className={`flex-1 md:w-48 px-4 py-2.5 rounded-xl outline-none text-sm border ${isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-bright-green' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary'}`}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="" className={isGodMode ? 'bg-dark-grey text-white' : ''}>{t('members.filter_by_role')}</option>
                  <option className={isGodMode ? 'bg-dark-grey text-white' : ''}>{t('members.roles.president')}</option>
                  <option className={isGodMode ? 'bg-dark-grey text-white' : ''}>{t('members.roles.general_secretary')}</option>
                  <option className={isGodMode ? 'bg-dark-grey text-white' : ''}>{t('members.roles.secretary')}</option>
                  <option className={isGodMode ? 'bg-dark-grey text-white' : ''}>{t('members.roles.treasurer')}</option>
                  <option className={isGodMode ? 'bg-dark-grey text-white' : ''}>{t('members.roles.general_member')}</option>
                </select>
                <button className={`p-2.5 rounded-xl transition-colors border ${isGodMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <Filter className={`size-5 ${isGodMode ? 'text-bright-green' : 'text-slate-500'}`} />
                </button>
              </div>
            </div>

            {/* Members Grid */}
            <div className="p-6">
              {loading ? (
                <div className={`py-20 text-center ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('common.loading')}</div>
              ) : paginatedMembers.length === 0 ? (
                <div className={`py-20 text-center ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('members.no_members_found')}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedMembers.map((member) => (
                    <motion.div 
                      key={member.id}
                      whileHover={{ y: -5 }}
                      className={`group border rounded-2xl overflow-hidden transition-all ${isGodMode ? 'bg-white/5 border-white/5 hover:shadow-bright-green/10' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/10'}`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          src={member.profile_picture || `https://picsum.photos/seed/${member.id}/400/300`} 
                          alt={member.name}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            member.status === 'active' ? (isGodMode ? 'bg-bright-green text-black' : 'bg-green-500 text-white') : 'bg-slate-500 text-white'
                          }`}>
                            {member.status === 'active' ? t('members.active') : t('members.inactive')}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>{member.role}</p>
                        <h3 className={`text-lg font-black mb-4 ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{member.name}</h3>
                        <div className={`flex items-center justify-between pt-4 border-t ${isGodMode ? 'border-white/5' : 'border-slate-100 dark:border-slate-700'}`}>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${isGodMode ? 'text-white/20' : 'text-slate-400'}`}>#MB-{member.id}</span>
                          <button 
                            onClick={() => handleView(member)}
                            className={`p-2 rounded-full transition-all cursor-pointer ${isGodMode ? 'bg-white/5 text-white/60 hover:bg-bright-green hover:text-black' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white'}`}
                          >
                            <Eye className="size-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className={`p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isGodMode ? 'border-white/5 bg-white/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30'}`}>
              <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>
                {t('members.pagination.showing')} {filteredMembers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} {t('members.pagination.to')} {Math.min(currentPage * itemsPerPage, filteredMembers.length)} {t('members.pagination.of')} {filteredMembers.length}
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-xl border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isGodMode ? 'border-white/10 text-white/40 hover:bg-white/10' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800'}`}
                >
                  <ChevronLeft className="size-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                      currentPage === page 
                        ? (isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white')
                        : (isGodMode ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700')
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`p-2 rounded-xl border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isGodMode ? 'border-white/10 text-white/40 hover:bg-white/10' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800'}`}
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </main>

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
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-2xl shadow-2xl z-50 overflow-hidden border ${isGodMode ? 'bg-dark-grey border-white/10' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <div className={`p-6 border-b flex items-center justify-between ${isGodMode ? 'border-white/10 bg-white/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}>
                  <h3 className={`text-xl font-bold ${isGodMode ? 'text-white' : ''}`}>{t('common.details')}</h3>
                  <button onClick={() => setIsViewModalOpen(false)} className={`p-2 rounded-full transition-colors cursor-pointer ${isGodMode ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                    <X className="size-5" />
                  </button>
                </div>
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <img 
                      className={`w-32 h-32 rounded-3xl object-cover shadow-xl ring-4 ${isGodMode ? 'ring-bright-green/10' : 'ring-primary/10'}`} 
                      src={selectedMember.profile_picture || `https://picsum.photos/seed/${selectedMember.id}/200/200`} 
                      alt={selectedMember.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase border-2 shadow-lg ${
                      selectedMember.status === 'active' ? (isGodMode ? 'bg-bright-green text-black border-dark-grey' : 'bg-primary text-white border-white dark:border-slate-900') : 'bg-slate-400 text-white border-white dark:border-slate-900'
                    }`}>
                      {selectedMember.status}
                    </div>
                  </div>
                  <h4 className={`text-2xl font-black ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{selectedMember.name}</h4>
                  <p className={`font-bold uppercase tracking-widest text-xs mt-1 ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>{selectedMember.role}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-4 mt-8">
                    <div className={`p-4 rounded-xl border text-left ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-tighter mb-1 ${isGodMode ? 'text-white/20' : 'text-slate-500'}`}>{t('members.table.id')}</p>
                      <p className={`font-mono text-sm ${isGodMode ? 'text-white' : ''}`}>#MB-{selectedMember.id}</p>
                    </div>
                    <div className={`p-4 rounded-xl border text-left ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-tighter mb-1 ${isGodMode ? 'text-white/20' : 'text-slate-500'}`}>{t('members.table.joined_date')}</p>
                      <p className={`text-sm font-semibold ${isGodMode ? 'text-white' : ''}`}>{selectedMember.joined_date}</p>
                    </div>
                    <div className={`p-4 rounded-xl border text-left col-span-2 ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-tighter mb-1 ${isGodMode ? 'text-white/20' : 'text-slate-500'}`}>Email Address</p>
                      <p className={`text-sm font-semibold ${isGodMode ? 'text-white' : ''}`}>{selectedMember.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 w-full">
                    <button 
                      onClick={() => setIsViewModalOpen(false)}
                      className={`w-full px-6 py-3 rounded-xl font-bold shadow-lg transition-all cursor-pointer ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20 hover:bg-white' : 'bg-primary text-white shadow-primary/20 hover:opacity-90'}`}
                    >
                      {t('close') || 'Close'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
