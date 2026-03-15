import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Info, Flag, Eye, Landmark, GraduationCap, HeartPulse, PiggyBank, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';

export default function About() {
  const { t } = useTranslation();
  const [siteContent, setSiteContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, statsRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/stats')
        ]);
        
        const contentData = await contentRes.json();
        const statsData = await statsRes.json();

        if (contentData.objectives) {
          contentData.objectives = JSON.parse(contentData.objectives);
        }
        setSiteContent(contentData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <main className={isGodMode ? 'bg-dark-grey text-white' : ''}>
        {/* Section 1: Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className={`absolute inset-0 -z-10 ${isGodMode ? 'bg-bright-green/5' : 'bg-primary/5 dark:bg-primary/10'}`}></div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider ${isGodMode ? 'bg-bright-green/20 text-bright-green' : 'bg-primary/20 text-primary'}`}>
              <Info className="size-4" /> {t('about.intro_badge')}
            </div>
            <h1 className={`text-4xl md:text-6xl font-black mb-6 leading-tight ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-50'}`}>
              {t('about.title')}
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isGodMode ? 'text-white/60' : 'text-slate-600 dark:text-slate-400'}`}>
              {t('about.subtitle')}
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex justify-center"
            >
              <div className={`relative w-full max-w-4xl h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 group ${isGodMode ? 'border-white/5' : 'border-white dark:border-slate-800'}`}>
                <img 
                  alt="Association members meeting" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgvaxe2o1Gw-3GXkxotFgIcC0cXhBnUKkghSae56Ukqs8Oh5dfFnZBFxX7skI2ddI6kMAqBKJVWtn6BUKQgMqe1AFt-7nFRh4ZKJVJTUK8tAEZMqs91aUVur-xCvX233LebJyxjGwtU2oTWZGzx-9g1vXDBgv0g1yoTiVc-PGENFxn-4FUD2npNOokXRiGZ45ccOyUcdMIn0SzQUENPMl6Pv0IimPKE5nXZ6dajV3HGeCGGbftHvVz-whHD1zMIx0c6NyN542Viyof"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <p className="text-white font-medium text-lg italic">"{t('about.motto')}"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: সমিতির পরিচিতি */}
        <section className={`py-16 px-4 ${isGodMode ? 'bg-black/20' : 'bg-white dark:bg-slate-900/50'}`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className={`text-3xl font-bold flex items-center gap-3 ${isGodMode ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                <span className={`w-10 h-1 rounded-full ${isGodMode ? 'bg-bright-green' : 'bg-primary'}`}></span>
                {t('about.association_intro')}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className={`text-lg leading-relaxed whitespace-pre-wrap ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>
                  {siteContent.about_text || 'আমাদের সমিতি একটি অলাভজনক সংস্থা যা সদস্যদের কল্যাণে দীর্ঘ সময় ধরে কাজ করে যাচ্ছে। এটি প্রতিষ্ঠিত হয়েছিল ১৯৯৮ সালে স্থানীয় উন্নয়নের লক্ষ্য নিয়ে। গত দুই দশকে আমরা সহস্রাধিক পরিবারের আর্থ-সামাজিক উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করেছি।'}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-xl border ${isGodMode ? 'bg-white/5 border-white/10' : 'bg-primary/10 p-4 rounded-xl border border-primary/20'}`}
                >
                  <p className={`font-black text-3xl ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>{stats?.totalMembers || 0}</p>
                  <p className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('about.registered_members')}</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 ${isGodMode ? 'bg-bright-green' : 'bg-gradient-to-r from-primary to-emerald-300'}`}></div>
              <img 
                alt="Association office building" 
                className="relative rounded-2xl w-full h-80 object-cover shadow-lg transition-transform duration-500 group-hover:scale-[1.02]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtN86ipdSRXDst1t61yfaAEp6in8IEs5W4htIX51VITdIeEi4yaftWGPOZboruUMmAzY-bUqvCDWJc_Q6jhhPbVmkCst9UyOvGl7zY75rjMKbTgvawgrWu597bmV8mBoPRIFCOpaAGghgGSEcXM9_YfrEzcLPJFuf78AGIScWsB0jU-vI9LXFugJpajCw0beRvfY2sIGN0ICzCVNoW2M9dYaukItJ54ht3mWB0lsHRzX1yFcwC1ezcalHu67GctYybpEwT9Myn3QKd"
              />
            </motion.div>
          </div>
        </section>

        {/* Section 3: লক্ষ্য ও উদ্দেশ্য */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`p-8 md:p-12 rounded-3xl border flex flex-col items-center text-center transition-all hover:shadow-xl ${isGodMode ? 'bg-white/5 border-white/10 hover:shadow-bright-green/5' : 'bg-primary/5 dark:bg-primary/10 border-primary/20 hover:shadow-primary/5'}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-primary shadow-primary/20'}`}>
                  <Flag className="size-10" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isGodMode ? 'text-white' : ''}`}>{t('about.mission')}</h3>
                <p className={`leading-relaxed ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>
                  {siteContent.mission_text || 'আমাদের মূল লক্ষ্য হলো সদস্যদের মধ্যে সঞ্চয়ের প্রবণতা বৃদ্ধি করা এবং তাদের আর্থ-সামাজিক উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করা। আমরা চাই প্রতিটি সদস্য যেন স্বাবলম্বী হয়ে সুন্দর জীবন যাপন করতে পারে।'}
                </p>
              </motion.div>
              {/* Vision */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`p-8 md:p-12 rounded-3xl flex flex-col items-center text-center shadow-xl transition-all hover:shadow-2xl ${isGodMode ? 'bg-black/40 border border-white/5 text-white' : 'bg-slate-900 dark:bg-slate-800 text-white'}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-primary shadow-primary/20'}`}>
                  <Eye className="size-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('about.vision')}</h3>
                <p className={`leading-relaxed ${isGodMode ? 'text-white/60' : 'text-slate-300'}`}>
                  {siteContent.vision_text || 'আমরা স্বপ্ন দেখি এমন একটি সমাজের যেখানে অর্থনৈতিক বৈষম্য থাকবে না। আগামী ৫ বছরের মধ্যে আমরা আমাদের কার্যক্রমকে ডিজিটাল প্ল্যাটফর্মে নিয়ে যাওয়ার এবং ১০ হাজার নতুন সদস্য যুক্ত করার পরিকল্পনা করছি।'}
                </p>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Section 4: সমিতির মূল উদ্দেশ্য */}
        <section className={`py-16 px-4 ${isGodMode ? 'bg-black/40' : 'bg-slate-50 dark:bg-slate-950'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${isGodMode ? 'text-white' : ''}`}>{t('about.objectives')}</h2>
              <p className={isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}>{t('about.objectives_subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteContent.objectives && siteContent.objectives.length > 0 ? (
                siteContent.objectives.map((obj: string, i: number) => (
                  <div key={i} className={`p-6 rounded-2xl border hover:shadow-lg transition-shadow flex flex-col items-center text-center ${isGodMode ? 'bg-white/5 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <Target className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-10 mb-4`} />
                    <p className={`text-sm font-medium ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{obj}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className={`p-6 rounded-2xl border hover:shadow-lg transition-shadow ${isGodMode ? 'bg-white/5 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <PiggyBank className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-10 mb-4`} />
                    <h4 className={`text-lg font-bold mb-2 ${isGodMode ? 'text-white' : ''}`}>{t('about.savings_growth')}</h4>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('about.savings_desc')}</p>
                  </div>
                  <div className={`p-6 rounded-2xl border hover:shadow-lg transition-shadow ${isGodMode ? 'bg-white/5 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <GraduationCap className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-10 mb-4`} />
                    <h4 className={`text-lg font-bold mb-2 ${isGodMode ? 'text-white' : ''}`}>{t('about.education_support')}</h4>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('about.education_support_desc')}</p>
                  </div>
                  <div className={`p-6 rounded-2xl border hover:shadow-lg transition-shadow ${isGodMode ? 'bg-white/5 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <HeartPulse className={`${isGodMode ? 'text-bright-green' : 'text-primary'} size-10 mb-4`} />
                    <h4 className={`text-lg font-bold mb-2 ${isGodMode ? 'text-white' : ''}`}>{t('about.medical_welfare')}</h4>
                    <p className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>{t('about.medical_welfare_desc')}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
