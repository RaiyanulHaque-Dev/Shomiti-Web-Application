import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  Eye, 
  Save, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon, 
  PlusCircle, 
  Trash2, 
  Info,
  Globe,
  Layout,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

export default function ContentManagement() {
  const { t } = useTranslation();
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      if (data.objectives) {
        data.objectives = JSON.parse(data.objectives);
      }
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (key: string, value: any) => {
    try {
      const valToSave = typeof value === 'string' ? value : JSON.stringify(value);
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: valToSave })
      });
      alert(t('content_mgmt.labels.saved_msg'));
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...content.objectives];
    newObjectives[index] = value;
    setContent({ ...content, objectives: newObjectives });
  };

  const addObjective = () => {
    setContent({ ...content, objectives: [...(content.objectives || []), ''] });
  };

  const removeObjective = (index: number) => {
    const newObjectives = content.objectives.filter((_: any, i: number) => i !== index);
    setContent({ ...content, objectives: newObjectives });
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  if (loading) return <div className={`flex items-center justify-center h-screen ${isGodMode ? 'bg-dark-grey text-bright-green' : ''}`}>{t('common.loading')}</div>;

  return (
    <div className={`font-['Public_Sans',sans-serif] flex h-screen overflow-hidden ${isGodMode ? 'bg-dark-grey text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'}`}>
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className={`h-16 border-b px-6 py-3 lg:px-10 flex items-center justify-between sticky top-0 z-10 ${isGodMode ? 'bg-dark-grey border-white/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors group" title={t('common.back_to_dashboard')}>
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="text-primary">
              <Layout className="size-8" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">{t('content_mgmt.header_title')}</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <div className="hidden md:flex items-center bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/10">
              <Search className="text-primary size-5" />
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-primary/50 outline-none" placeholder={t('content_mgmt.search_placeholder')} type="text"/>
            </div>
            <button className="p-2 rounded-lg bg-primary/5 text-slate-700 dark:text-slate-200 hover:bg-primary/10 transition-colors">
              <Bell className="size-5" />
            </button>
            <button className="p-2 rounded-lg bg-primary/5 text-slate-700 dark:text-slate-200 hover:bg-primary/10 transition-colors">
              <Settings className="size-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
              <img 
                alt="User" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkcP1_DBYyt66Ya64lcfBx1iIGDSHIfYqcc_4Lhf7chieq0bWf74W-L1BkJZ1oWA7DRa23iRAQyo2TlRXMfgBkDi2y89hAvxAWMW10K35KhgbclDBO97XhcXJdlqciDLw40kUHdb0SuWOQ4taRtQ8nQM_sgFlt2SVN9ijH4guEnOAqKtRl7YW_qkUDi_khS0s6LlKylbBkf1Cm99NYPkn33nFrxUglAu4F3l5Dsofabxi_769A9rt0BQEP1R7ic6aSxJybs055Fj7k"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className={`text-3xl font-black tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{t('content_mgmt.title')}</h1>
                <p className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'} mt-1`}>{t('content_mgmt.subtitle')}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.open('/', '_blank')}
                  className="flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-lg text-primary font-bold hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <Eye className="size-5" />
                  {t('content_mgmt.view_website')}
                </button>
              </div>
            </div>

            {/* Editor Sections */}
            <div className="space-y-6">
              {/* 1. Homepage Hero */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl shadow-sm border p-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded text-sm">1</span>
                    {t('content_mgmt.sections.hero')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('content_mgmt.labels.hero_title')}</label>
                    <input 
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3 outline-none border" 
                      type="text" 
                      value={content.hero_title || ''}
                      onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('content_mgmt.labels.hero_subtitle')}</label>
                    <textarea 
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3 outline-none border" 
                      rows={3}
                      value={content.hero_subtitle || ''}
                      onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => saveContent('hero_title', content.hero_title)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="size-4" />
                      {t('content_mgmt.labels.save_title')}
                    </button>
                    <button 
                      onClick={() => saveContent('hero_subtitle', content.hero_subtitle)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="size-4" />
                      {t('content_mgmt.labels.save_subtitle')}
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* 2. About Us */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-xl shadow-sm border p-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded text-sm">2</span>
                    {t('content_mgmt.sections.about')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <textarea 
                      className="w-full border-none focus:ring-0 bg-slate-50 dark:bg-slate-800 text-sm p-4 outline-none" 
                      rows={6}
                      value={content.about_text || ''}
                      onChange={(e) => setContent({ ...content, about_text: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => saveContent('about_text', content.about_text)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="size-4" />
                      {t('content_mgmt.labels.save_btn')}
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* 3. Mission Statement */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-xl shadow-sm border p-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded text-sm">3</span>
                    {t('content_mgmt.sections.mission')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <textarea 
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3 outline-none border" 
                    rows={3}
                    value={content.mission_text || ''}
                    onChange={(e) => setContent({ ...content, mission_text: e.target.value })}
                  ></textarea>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => saveContent('mission_text', content.mission_text)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="size-4" />
                      {t('content_mgmt.labels.save_btn')}
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* 4. Vision Statement */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-xl shadow-sm border p-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded text-sm">4</span>
                    {t('content_mgmt.sections.vision')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <textarea 
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3 outline-none border" 
                    rows={3}
                    value={content.vision_text || ''}
                    onChange={(e) => setContent({ ...content, vision_text: e.target.value })}
                  ></textarea>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => saveContent('vision_text', content.vision_text)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="size-4" />
                      {t('content_mgmt.labels.save_btn')}
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* 5. Core Objectives */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`rounded-xl shadow-sm border p-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded text-sm">5</span>
                    {t('content_mgmt.sections.objectives')}
                  </h2>
                  <button 
                    onClick={addObjective}
                    className="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <PlusCircle className="size-4" /> {t('content_mgmt.labels.objectives_add')}
                  </button>
                </div>
                <div className="space-y-3">
                  {(content.objectives || []).map((obj: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1 relative">
                        <input 
                          className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3 outline-none border" 
                          type="text" 
                          value={obj}
                          onChange={(e) => updateObjective(i, e.target.value)}
                        />
                      </div>
                      <button 
                        onClick={() => removeObjective(i)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => saveContent('objectives', content.objectives)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="size-4" />
                      {t('content_mgmt.labels.save_list')}
                    </button>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
