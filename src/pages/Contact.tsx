import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, FileText, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'query',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0]
        })
      });
      if (response.ok) {
        alert(t('contact.success_msg'));
        setFormData({ name: '', email: '', subject: 'query', message: '' });
      } else {
        alert(t('contact.error_msg'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(t('contact.fatal_error_msg'));
    } finally {
      setSending(false);
    }
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <main className={`flex-1 px-6 md:px-20 lg:px-40 py-10 max-w-[1440px] mx-auto w-full ${isGodMode ? 'bg-dark-grey text-white' : ''}`}>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-10"
        >
          <h1 className={`text-4xl font-black leading-tight tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{t('contact.title')}</h1>
          <p className={`text-lg max-w-2xl ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-xl shadow-sm border p-6 md:p-8 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/5'}`}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Mail className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-6`} />
              {t('contact.form_title')}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>{t('contact.label_name')}</label>
                  <input 
                    className={`w-full rounded-lg transition-all p-3 outline-none border ${isGodMode ? 'bg-white/5 border-white/10 text-white focus:border-bright-green' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary'}`} 
                    placeholder={t('contact.placeholder_name')} 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>{t('contact.label_email')}</label>
                  <input 
                    className={`w-full rounded-lg transition-all p-3 outline-none border ${isGodMode ? 'bg-white/5 border-white/10 text-white focus:border-bright-green' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary'}`} 
                    placeholder={t('contact.placeholder_email')} 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>{t('contact.label_subject')}</label>
                <select 
                  className={`w-full rounded-lg transition-all p-3 outline-none border ${isGodMode ? 'bg-white/5 border-white/10 text-white focus:border-bright-green' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary'}`}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="report">{t('contact.subject_options.report')}</option>
                  <option value="query">{t('contact.subject_options.query')}</option>
                  <option value="request">{t('contact.subject_options.request')}</option>
                  <option value="others">{t('contact.subject_options.others')}</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>{t('contact.label_message')}</label>
                <textarea 
                  className={`w-full rounded-lg transition-all p-3 outline-none border ${isGodMode ? 'bg-white/5 border-white/10 text-white focus:border-bright-green' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary'}`} 
                  placeholder={t('contact.placeholder_message')} 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button 
                className={`w-full md:w-auto font-bold py-3 px-10 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${sending ? 'opacity-70 cursor-not-allowed' : ''} ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20 hover:bg-white' : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'}`} 
                type="submit"
                disabled={sending}
              >
                {sending ? t('contact.sending_btn') : t('contact.send_btn')}
                <Send className="size-5" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* Info Card */}
            <div className={`rounded-xl shadow-sm border p-6 ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/5'}`}>
              <h3 className={`text-xl font-bold mb-6 ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{t('contact.info_title')}</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className={`${isGodMode ? 'bg-white/5' : 'bg-primary/10'} p-2 rounded-lg h-fit`}>
                    <MapPin className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-6`} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isGodMode ? 'text-white' : ''}`}>{t('contact.address_label')}</p>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('contact.address_value')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className={`${isGodMode ? 'bg-white/5' : 'bg-primary/10'} p-2 rounded-lg h-fit`}>
                    <Phone className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-6`} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isGodMode ? 'text-white' : ''}`}>{t('contact.phone_label')}</p>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>+৮৮০ ২-৯৮৭৬৫৪৩</p>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>+৮৮০ ১৬XXXXXXXX</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className={`${isGodMode ? 'bg-white/5' : 'bg-primary/10'} p-2 rounded-lg h-fit`}>
                    <Mail className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-6`} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isGodMode ? 'text-white' : ''}`}>{t('contact.email_label')}</p>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>support@somiti.org</p>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>info@somiti.org</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Preview Card */}
            <div className={`rounded-xl shadow-sm border overflow-hidden ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/5'}`}>
              <div className={`w-full h-48 relative ${isGodMode ? 'bg-white/5' : 'bg-slate-200 dark:bg-slate-800'}`}>
                <img 
                  alt="Map Location" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu9t9zZXOFMeQ3VRl5ji9HDTiWXSUsMy7cUXO9vn85-YxOdF6qmXDwZOhbkrSppV3EHMG4xDTOLuI53DHgTi4pmkstw_nW14R2qKsUKffD3i7VJ2lpxG3i5TU0LSKIqaJno8CV0uZJygjEbXyfKuXnyCLBTnHg9F51UtO5Dk_4Am1od_DnBEF1tLcJUZ9r6ZDTa1naf1PasgLnfcG7mVXJSsEs-Il2nZ5eYDZDrLDjojSfr-aTXFUCLTKeVaIGOINBUovmXUdFWik-"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4">
                <button className={`w-full text-center font-semibold text-sm hover:underline ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>{t('contact.google_maps')}</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Quick Links Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/faq" className={`p-6 rounded-xl transition-colors cursor-pointer group border ${isGodMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-primary/5 border-primary/10 hover:bg-primary/10'}`}>
            <HelpCircle className={`${isGodMode ? 'text-bright-green' : 'text-primary'} mb-3 size-8`} />
            <h4 className={`font-bold mb-2 transition-colors ${isGodMode ? 'group-hover:text-bright-green' : 'group-hover:text-primary'}`}>{t('contact.faq_title')}</h4>
            <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('contact.faq_desc')}</p>
          </Link>
          <Link to="/downloads" className={`p-6 rounded-xl transition-colors cursor-pointer group border ${isGodMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-primary/5 border-primary/10 hover:bg-primary/10'}`}>
            <FileText className={`${isGodMode ? 'text-bright-green' : 'text-primary'} mb-3 size-8`} />
            <h4 className={`font-bold mb-2 transition-colors ${isGodMode ? 'group-hover:text-bright-green' : 'group-hover:text-primary'}`}>{t('contact.forms_title')}</h4>
            <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('contact.forms_desc')}</p>
          </Link>
          <Link to="/rules" className={`p-6 rounded-xl transition-colors cursor-pointer group border ${isGodMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-primary/5 border-primary/10 hover:bg-primary/10'}`}>
            <ShieldCheck className={`${isGodMode ? 'text-bright-green' : 'text-primary'} mb-3 size-8`} />
            <h4 className={`font-bold mb-2 transition-colors ${isGodMode ? 'group-hover:text-bright-green' : 'group-hover:text-primary'}`}>{t('contact.rules_title')}</h4>
            <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('contact.rules_desc')}</p>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
