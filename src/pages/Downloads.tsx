import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, FileArchive, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const forms = [
  {
    title: "Membership Application Form",
    description: "Standard form for new members to join the association.",
    size: "245 KB",
    type: "PDF"
  },
  {
    title: "Loan Application Form",
    description: "Form required to apply for business or personal loans.",
    size: "180 KB",
    type: "PDF"
  },
  {
    title: "Savings Withdrawal Form",
    description: "Use this form to request partial or full withdrawal of savings.",
    size: "150 KB",
    type: "PDF"
  },
  {
    title: "Nominee Change Form",
    description: "Form to update or change your registered nominee information.",
    size: "120 KB",
    type: "PDF"
  },
  {
    title: "Annual Report 2023",
    description: "Complete financial and activity report for the previous year.",
    size: "2.4 MB",
    type: "PDF"
  }
];

export default function Downloads() {
  const { t } = useTranslation();
  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <main className={`flex-1 px-6 md:px-20 lg:px-40 py-10 max-w-[1440px] mx-auto w-full ${isGodMode ? 'bg-dark-grey text-white' : ''}`}>
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/contact" 
            className={`flex items-center gap-2 text-sm font-medium transition-colors group ${isGodMode ? 'text-white/40 hover:text-bright-green' : 'text-slate-500 hover:text-primary'}`}
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>{t('common.back')}</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-10"
        >
          <h1 className={`text-4xl font-black leading-tight tracking-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            {t('contact.forms_title')}
          </h1>
          <p className={`text-lg max-w-2xl ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>
            {t('contact.forms_desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((form, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border flex items-start gap-4 group transition-all ${isGodMode ? 'bg-black/40 border-white/5 hover:border-bright-green/30' : 'bg-white dark:bg-slate-900 border-primary/5 shadow-sm hover:border-primary/30'}`}
            >
              <div className={`p-3 rounded-lg ${isGodMode ? 'bg-white/5' : 'bg-primary/10'}`}>
                <FileText className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-8`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{form.title}</h3>
                <p className={`text-sm mb-4 ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{form.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono opacity-50 uppercase">{form.type} • {form.size}</span>
                  <button className={`flex items-center gap-2 text-sm font-bold hover:underline ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
                    <Download className="size-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={`mt-12 p-8 rounded-2xl border text-center ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}>
          <FileArchive className="size-12 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-bold mb-2">Need a physical copy?</h3>
          <p className={`max-w-md mx-auto mb-6 ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>
            All forms are also available at our main office during business hours. Please bring your member ID card for assistance.
          </p>
          <button className={`font-bold py-3 px-8 rounded-lg transition-all ${isGodMode ? 'bg-bright-green text-black hover:bg-white' : 'bg-primary text-white hover:bg-primary/90'}`}>
            Contact Office
          </button>
        </div>
      </main>
    </Layout>
  );
}
