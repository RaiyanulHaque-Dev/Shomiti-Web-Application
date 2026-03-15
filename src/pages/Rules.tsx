import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const rules = [
  {
    category: "Membership Rules",
    items: [
      "Any citizen of Bangladesh aged 18 or above can apply for membership.",
      "A member must be of sound mind and have no criminal record.",
      "Membership is confirmed only after approval by the executive committee.",
      "Membership fees are non-refundable."
    ]
  },
  {
    category: "Savings & Deposits",
    items: [
      "Minimum monthly savings of 500 BDT is mandatory for all members.",
      "Savings must be deposited between the 1st and 15th of each month.",
      "A late fee of 50 BDT applies for deposits made after the 15th.",
      "Members can check their balance real-time through the dashboard."
    ]
  },
  {
    category: "Loan Policy",
    items: [
      "Members are eligible for loans after 6 months of active membership.",
      "The maximum loan amount is 5 times the member's total savings.",
      "Loan repayment must be made in monthly installments as per the agreement.",
      "Defaulting on 3 consecutive installments may lead to membership suspension."
    ]
  },
  {
    category: "Code of Conduct",
    items: [
      "Members must attend the Annual General Meeting (AGM).",
      "Any behavior harmful to the association's reputation may result in expulsion.",
      "Members must keep their contact information updated in the system.",
      "All disputes will be resolved by the executive committee's decision."
    ]
  }
];

export default function Rules() {
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
            {t('contact.rules_title')}
          </h1>
          <p className={`text-lg max-w-2xl ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>
            {t('contact.rules_desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border ${isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-primary/5 shadow-sm'}`}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-6`} />
                {section.category}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className={`size-5 mt-0.5 shrink-0 ${isGodMode ? 'text-bright-green/60' : 'text-primary/60'}`} />
                    <span className={`text-base ${isGodMode ? 'text-white/70' : 'text-slate-700 dark:text-slate-300'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className={`mt-12 p-6 rounded-xl border flex items-center gap-4 ${isGodMode ? 'bg-bright-green/10 border-bright-green/20 text-bright-green' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
          <AlertCircle className="size-6 shrink-0" />
          <p className="text-sm font-medium">
            Note: These rules are subject to change by the decision of the Executive Committee. Members will be notified of any changes through the official notice board.
          </p>
        </div>
      </main>
    </Layout>
  );
}
