import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const faqs = [
  {
    question: "How can I become a member of the Somiti?",
    answer: "To become a member, you need to fill out the application form available on the 'Apply' page or at our office. You will need to provide a copy of your NID, two passport-sized photographs, and the initial membership fee."
  },
  {
    question: "What are the monthly savings requirements?",
    answer: "Members are required to save a minimum of 500 BDT per month. You can save more if you wish. Savings should be deposited by the 15th of every month."
  },
  {
    question: "How do I apply for a loan?",
    answer: "After being a member for at least 6 months and maintaining regular savings, you can apply for a loan. Loan applications are reviewed by the committee based on your savings history and purpose of the loan."
  },
  {
    question: "What is the interest rate on loans?",
    answer: "Our current interest rate is 10% per annum on a reducing balance basis. This is subject to change based on the association's annual general meeting decisions."
  },
  {
    question: "Can I withdraw my savings?",
    answer: "Yes, you can withdraw your savings if you decide to leave the association. A formal resignation letter is required, and the process usually takes 30 days to clear all accounts."
  }
];

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

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
            {t('contact.faq_title')}
          </h1>
          <p className={`text-lg max-w-2xl ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>
            {t('contact.faq_desc')}
          </p>
        </motion.div>

        <div className="max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border overflow-hidden transition-all ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/5 shadow-sm'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
              >
                <span className="font-bold text-lg flex items-center gap-3">
                  <HelpCircle className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-5`} />
                  {faq.question}
                </span>
                {openIndex === index ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
              </button>
              {openIndex === index && (
                <div className={`px-6 pb-6 text-base leading-relaxed ${isGodMode ? 'text-white/60' : 'text-slate-600 dark:text-slate-400'}`}>
                  <div className="pt-2 border-t border-primary/5">
                    {faq.answer}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
