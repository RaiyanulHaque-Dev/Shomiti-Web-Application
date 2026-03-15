import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CalendarDays, 
  UserPlus, 
  Wallet, 
  ChevronRight, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  FileText,
  X,
  Calendar,
  Download,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Editable } from '../components/Editable';
import { MediaEditable } from '../components/MediaEditable';
import { EditableArea } from '../components/EditableArea';
import { SectionWrapper } from '../components/SectionWrapper';
import { PageBuilder } from '../components/PageBuilder';
import { useGodMode } from '../context/GodModeContext';
import { formatCurrency } from '../utils/format';

interface Notice {
  id: number;
  title: string;
  date: string;
  type: string;
  content: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [siteContent, setSiteContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, contentRes, statsRes] = await Promise.all([
          fetch('/api/notices'),
          fetch('/api/content'),
          fetch('/api/stats')
        ]);
        
        const noticesData = await noticesRes.json();
        const contentData = await contentRes.json();
        const statsData = await statsRes.json();
        
        setNotices(noticesData);
        setSiteContent(contentData);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
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

  const { sectionOrder, isVisualEditMode, isGodMode } = useGodMode();

  const defaultOrder = ['hero', 'urgent', 'stats', 'notices', 'objectives', 'mission_vision', 'cta', 'builder'];
  const activeOrder = sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  const sections: Record<string, React.ReactNode> = {
    hero: (
      <SectionWrapper key="hero" id="hero" title="Hero Banner">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="rounded-2xl overflow-hidden">
            <div className="flex min-h-[350px] md:min-h-[450px] flex-col gap-6 items-center justify-center p-6 md:p-12 text-center relative shadow-2xl shadow-primary/10" 
                 style={{ background: isGodMode ? 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)' : 'linear-gradient(135deg, var(--color-primary) 0%, #004d00 100%)' }}>
              <div className="flex flex-col gap-4 max-w-2xl z-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`self-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-2 ${isGodMode ? 'bg-bright-green text-black' : 'bg-white/20 text-white backdrop-blur-md border border-white/30'}`}
                >
                  {t('common.info') || 'Welcome'}
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.9 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.2,
                    scale: {
                      type: "spring",
                      damping: 12,
                      stiffness: 100
                    }
                  }}
                  className="text-white text-3xl md:text-8xl font-black leading-tight tracking-tighter drop-shadow-2xl"
                >
                  <Editable id="home.hero_title">
                    {siteContent.hero_title || t('home.hero_title')}
                  </Editable>
                </motion.h1>
                <p className="text-white/90 text-sm md:text-lg font-medium max-w-xl mx-auto">
                  <Editable id="home.hero_subtitle">
                    {siteContent.hero_subtitle || t('home.hero_subtitle')}
                  </Editable>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 z-10 w-full sm:w-auto px-4">
                <Link 
                  to="/apply?type=membership"
                  className={`flex items-center justify-center rounded-xl h-14 px-10 text-lg font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-xl ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-primary text-white shadow-primary/30 hover:bg-primary/90'}`}
                >
                  <Editable id="home.apply_now_btn">{t('home.get_started')}</Editable>
                </Link>
                <Link 
                  to="/about"
                  className={`flex items-center justify-center rounded-xl h-14 px-10 border-2 backdrop-blur-md text-lg font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${isGodMode ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-white/30 bg-white/10 text-white hover:bg-white hover:text-slate-900'}`}
                >
                  <Editable id="home.learn_more_btn">{t('home.learn_more')}</Editable>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </SectionWrapper>
    ),
    urgent: (
      <SectionWrapper key="urgent" id="urgent" title="Urgent Announcement">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10"
        >
          <div className={`border-l-4 p-5 md:p-6 rounded-2xl flex items-start gap-4 shadow-sm ${isGodMode ? 'bg-white/5 border-bright-green' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
            <div className={`p-2 rounded-lg shrink-0 ${isGodMode ? 'bg-bright-green text-black' : 'bg-red-500 text-white'}`}>
              <AlertTriangle className="size-6 md:size-8" />
            </div>
            <div>
              <h3 className={`font-black text-lg uppercase tracking-tight ${isGodMode ? 'text-white' : 'text-red-700 dark:text-red-400'}`}>
                <Editable id="home.urgent_title">{t('home.urgent_announcement')}</Editable>
              </h3>
              <p className={`text-sm md:text-base mt-1 font-medium ${isGodMode ? 'text-white/60' : 'text-red-600 dark:text-red-300'}`}>
                <Editable id="home.urgent_text">{t('home.urgent_announcement_text')}</Editable>
              </p>
            </div>
          </div>
        </motion.section>
      </SectionWrapper>
    ),
    notices: (
      <SectionWrapper key="notices" id="notices" title="Notice Board">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between px-2">
              <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{t('home.recent_notices')}</h2>
              <Link className={`text-sm font-bold flex items-center gap-1 hover:underline px-3 py-1.5 rounded-lg ${isGodMode ? 'bg-white/5 text-bright-green' : 'bg-primary/5 text-primary'}`} to="/notices">
                {t('common.view_all')} <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className={`p-10 text-center ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{t('common.loading')}</div>
              ) : notices.length > 0 ? (
                notices.slice(0, 4).map((notice, idx) => (
                  <motion.div 
                    key={notice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={() => handleViewNotice(notice)}
                    className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all shadow-sm cursor-pointer group relative overflow-hidden ${isGodMode ? 'bg-white/5 border-white/5 hover:border-bright-green hover:shadow-bright-green/5' : 'bg-white dark:bg-slate-900/50 border-primary/5 hover:border-primary hover:shadow-xl hover:shadow-primary/5'}`}
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform ${isGodMode ? 'bg-bright-green' : 'bg-primary'}`}></div>
                    <div className={`flex items-center justify-center rounded-xl shrink-0 size-14 md:size-16 transition-colors ${isGodMode ? 'bg-white/5 text-bright-green group-hover:bg-bright-green group-hover:text-black' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                      {notice.type === 'calendar_month' && <CalendarDays className="size-8 md:size-10" />}
                      {notice.type === 'person_add' && <UserPlus className="size-8 md:size-10" />}
                      {notice.type === 'account_balance_wallet' && <Wallet className="size-8 md:size-10" />}
                      {!['calendar_month', 'person_add', 'account_balance_wallet'].includes(notice.type) && <FileText className="size-8 md:size-10" />}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className={`text-lg md:text-xl font-bold transition-colors truncate ${isGodMode ? 'text-white group-hover:text-bright-green' : 'text-slate-900 dark:text-slate-100 group-hover:text-primary'}`}>{notice.title}</p>
                      <div className={`flex items-center gap-3 text-xs md:text-sm mt-1 ${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="size-4" />
                          {notice.date}
                        </span>
                        <span className={`w-1 h-1 rounded-full ${isGodMode ? 'bg-white/20' : 'bg-slate-300'}`}></span>
                        <span className={`font-bold uppercase tracking-wider text-[10px] ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>{getTypeLabel(notice.type)}</span>
                      </div>
                    </div>
                    <ChevronRight className={`transition-transform group-hover:translate-x-1 shrink-0 ${isGodMode ? 'text-white/20 group-hover:text-bright-green' : 'text-slate-300 group-hover:text-primary'}`} />
                  </motion.div>
                ))
              ) : (
                <div className={`p-10 text-center border-2 border-dashed rounded-2xl ${isGodMode ? 'text-white/20 border-white/10' : 'text-slate-500 border-slate-100'}`}>
                  {t('notices.no_notices')}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <h2 className={`text-2xl font-black tracking-tight px-2 ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{t('common.quick_links')}</h2>
            <EditableArea
              id="home.quick_links"
              defaultItems={[
                { id: 'members', label: t('home.member_list'), icon: 'users', link: '/members', color: 'primary' },
                { id: 'transparency', label: t('home.financial_reports'), icon: 'trending-up', link: '/transparency', color: 'slate' }
              ]}
              newItemTemplate={{ id: `link-${Date.now()}`, label: 'New Link', icon: 'file-text', link: '#', color: 'primary' }}
              className="flex flex-col gap-4"
            >
              {(item: any) => (
                <Link 
                  key={item.id}
                  to={item.link}
                  className={`flex flex-col items-center justify-center gap-4 p-10 rounded-2xl transition-all transform hover:-translate-y-1 group ${
                    isGodMode 
                      ? 'bg-white/5 text-white hover:bg-white/10 border border-white/5' 
                      : item.color === 'primary' 
                        ? 'bg-primary text-white hover:shadow-2xl hover:shadow-primary/30'
                        : 'bg-slate-950 dark:bg-slate-900 border-slate-950 dark:border-slate-800 text-white hover:bg-slate-900'
                  }`}
                >
                  <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform ${isGodMode ? 'bg-bright-green/10 text-bright-green' : 'bg-white/20'}`}>
                    {item.icon === 'users' && <Users className="size-12" />}
                    {item.icon === 'trending-up' && <TrendingUp className="size-12" />}
                    {item.icon === 'file-text' && <FileText className="size-12" />}
                  </div>
                  <span className="text-2xl font-black uppercase tracking-tight">{item.label}</span>
                </Link>
              )}
            </EditableArea>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl shadow-sm border ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-white dark:bg-slate-900/50 border-primary/5'}`}
            >
              <h3 className={`font-black text-xl mb-6 uppercase tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{t('common.contact_us')}</h3>
              <div className="space-y-5">
                <div className={`flex gap-4 items-center text-sm md:text-base transition-colors cursor-pointer group ${isGodMode ? 'text-white/60 hover:text-bright-green' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}>
                  <div className={`p-2 rounded-lg transition-colors ${isGodMode ? 'bg-white/5 group-hover:bg-bright-green/10' : 'bg-primary/5 group-hover:bg-primary/10'}`}>
                    <Phone className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-5`} />
                  </div>
                  <span className="font-semibold">{t('home.contact_phone')}</span>
                </div>
                <div className={`flex gap-4 items-center text-sm md:text-base transition-colors cursor-pointer group ${isGodMode ? 'text-white/60 hover:text-bright-green' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}>
                  <div className={`p-2 rounded-lg transition-colors ${isGodMode ? 'bg-white/5 group-hover:bg-bright-green/10' : 'bg-primary/5 group-hover:bg-primary/10'}`}>
                    <Mail className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-5`} />
                  </div>
                  <span className="font-semibold">info@somiti-home.com</span>
                </div>
                <div className={`flex gap-4 items-center text-sm md:text-base transition-colors cursor-pointer group ${isGodMode ? 'text-white/60 hover:text-bright-green' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}>
                  <div className={`p-2 rounded-lg transition-colors ${isGodMode ? 'bg-white/5 group-hover:bg-bright-green/10' : 'bg-primary/5 group-hover:bg-primary/10'}`}>
                    <MapPin className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-5`} />
                  </div>
                  <span className="font-semibold leading-tight">{t('home.contact_address')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    ),
    stats: (
      <SectionWrapper key="stats" id="stats" title="Statistics">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10"
        >
          {[
            { label: t('about.registered_members'), value: stats?.totalMembers?.toString() || '0', icon: Users, color: 'primary' },
            { label: t('financial.stats.total_collection'), value: formatCurrency(stats?.totalFunds || 0), icon: Wallet, color: 'amber' },
            { label: t('about.savings_growth'), value: '0%', icon: TrendingUp, color: 'blue' }
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 md:p-8 rounded-3xl text-center border transition-all hover:shadow-xl ${
                isGodMode 
                  ? 'bg-white/5 border-white/5 hover:border-bright-green/30' 
                  : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className={`mx-auto size-12 md:size-16 rounded-2xl flex items-center justify-center mb-4 ${
                isGodMode ? 'bg-bright-green/10 text-bright-green' : 'bg-primary/5 text-primary'
              }`}>
                <stat.icon className="size-6 md:size-8" />
              </div>
              <div className={`text-2xl md:text-4xl font-black mb-1 ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                <Editable id={`home.stat_value_${i}`}>{stat.value}</Editable>
              </div>
              <div className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>
                <Editable id={`home.stat_label_${i}`}>{stat.label}</Editable>
              </div>
            </div>
          ))}
        </motion.div>
      </SectionWrapper>
    ),
    objectives: (
      <SectionWrapper key="objectives" id="objectives" title="Core Objectives">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              <Editable id="home.objectives_title">{t('about.objectives')}</Editable>
            </h2>
            <p className={`max-w-2xl mx-auto font-medium ${isGodMode ? 'text-white/60' : 'text-slate-500'}`}>
              <Editable id="home.objectives_subtitle">{t('about.objectives_subtitle')}</Editable>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t('about.savings_growth'), desc: t('about.savings_desc'), icon: Wallet },
              { title: t('about.education_support'), desc: t('about.education_support_desc'), icon: GraduationCap },
              { title: t('about.medical_welfare'), desc: t('about.medical_welfare_desc'), icon: AlertTriangle }
            ].map((obj, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-[2.5rem] border transition-all h-full flex flex-col ${
                  isGodMode 
                    ? 'bg-white/5 border-white/5 hover:border-bright-green/30' 
                    : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5'
                }`}
              >
                <div className={`size-14 rounded-2xl flex items-center justify-center mb-6 ${
                  isGodMode ? 'bg-bright-green text-black' : 'bg-primary text-white'
                }`}>
                  <obj.icon className="size-7" />
                </div>
                <h3 className={`text-xl font-black mb-4 leading-tight uppercase tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  <Editable id={`home.obj_title_${i}`}>{obj.title}</Editable>
                </h3>
                <p className={`text-sm leading-relaxed font-medium ${isGodMode ? 'text-white/60' : 'text-slate-500'}`}>
                  <Editable id={`home.obj_desc_${i}`}>{obj.desc}</Editable>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    ),
    mission_vision: (
      <SectionWrapper key="mission_vision" id="mission_vision" title="Mission & Vision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-10 md:p-14 rounded-[3rem] relative overflow-hidden ${
              isGodMode ? 'bg-white/5 text-white' : 'bg-slate-900 text-white'
            }`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="size-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              <Editable id="home.mission_title">{t('about.mission')}</Editable>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-80 font-medium">
              <Editable id="home.mission_text">
                {t('about.subtitle')}
              </Editable>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-10 md:p-14 rounded-[3rem] relative overflow-hidden border-4 ${
              isGodMode 
                ? 'bg-bright-green text-black border-bright-green' 
                : 'bg-white text-slate-900 border-primary shadow-2xl shadow-primary/10 dark:bg-slate-800 dark:text-white dark:border-slate-700'
            }`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Users className="size-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              <Editable id="home.vision_title">{t('about.vision')}</Editable>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-80 font-medium">
              <Editable id="home.vision_text">
                {t('about.subtitle')}
              </Editable>
            </p>
          </motion.div>
        </div>
      </SectionWrapper>
    ),
    cta: (
      <SectionWrapper key="cta" id="cta" title="Call to Action">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className={`p-10 md:p-20 rounded-[3rem] text-center relative overflow-hidden ${isGodMode ? 'bg-white/5 border border-white/10' : 'bg-primary text-white shadow-2xl shadow-primary/20'}`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                <Editable id="home.cta_title">{t('home.cta_title')}</Editable>
              </h2>
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10 font-medium">
                <Editable id="home.cta_subtitle">{t('home.cta_subtitle')}</Editable>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/apply?type=membership"
                  className={`px-12 py-5 rounded-2xl text-xl font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-2xl ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-white text-primary hover:bg-slate-50 shadow-white/20'}`}
                >
                  {t('home.get_started')}
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </SectionWrapper>
    ),
    builder: (
      <SectionWrapper key="builder" id="builder" title="Custom Page Content">
        <PageBuilder />
      </SectionWrapper>
    )
  };

  return (
    <Layout>
      <main className={`flex flex-col flex-1 w-full px-4 py-6 md:py-10 ${isGodMode ? 'bg-dark-grey' : 'max-w-[1200px] mx-auto'}`}>
        <div className={isGodMode ? 'max-w-[1200px] mx-auto w-full' : ''}>
          {activeOrder.map(sectionId => sections[sectionId])}
        </div>
      </main>

      {/* View Notice Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedNotice && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl rounded-3xl shadow-2xl z-[110] overflow-hidden border ${isGodMode ? 'bg-dark-grey border-white/10' : 'bg-white dark:bg-slate-900'}`}
            >
              <div className="p-6 md:p-10 space-y-8">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isGodMode ? 'bg-bright-green text-black' : getTypeStyles(selectedNotice.type)}`}>
                        {getTypeLabel(selectedNotice.type)}
                      </span>
                      <span className={`text-sm flex items-center gap-1 font-bold ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>
                        <Calendar className="size-4" /> {selectedNotice.date}
                      </span>
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-black leading-tight tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {selectedNotice.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className={`p-2 rounded-full transition-colors cursor-pointer shrink-0 ${isGodMode ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <X className="size-6" />
                  </button>
                </div>

                <div className={`p-6 md:p-8 rounded-3xl border max-h-[40vh] overflow-y-auto custom-scrollbar ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700'}`}>
                  <p className={`leading-relaxed whitespace-pre-wrap text-base md:text-lg font-medium ${isGodMode ? 'text-white/80' : 'text-slate-700 dark:text-slate-300'}`}>
                    {selectedNotice.content}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className={`flex-1 px-8 py-4 rounded-2xl font-bold transition-colors cursor-pointer ${isGodMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
                  >
                    {t('close') || 'Close'}
                  </button>
                  <button 
                    className={`flex-1 px-8 py-4 rounded-2xl font-bold shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20 hover:bg-white' : 'bg-primary text-white shadow-primary/20 hover:opacity-90'}`}
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
    </Layout>
  );
}
