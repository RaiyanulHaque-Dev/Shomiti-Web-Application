import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  HandCoins, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  FileText,
  ShieldCheck,
  Clock,
  Upload,
  User,
  Building2,
  Paperclip,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { formatCurrency } from '../utils/format';

export default function Apply() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<'selection' | 'form' | 'success'>('selection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    nid_number: '',
    address: '',
    nid_front: '',
    nid_back: ''
  });

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'membership') {
      setStep('form');
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'nid_front' | 'nid_back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'Member',
          status: 'pending'
        })
      });

      if (!response.ok) throw new Error('Failed to submit application');
      
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <Layout>
      <main className={`pt-24 pb-20 px-4 min-h-screen ${isGodMode ? 'bg-dark-grey text-white' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'selection' && (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 text-center"
              >
                <div className="space-y-4">
                  <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${isGodMode ? 'text-white' : ''}`}>Apply for Membership</h1>
                  <p className={`text-lg max-w-2xl mx-auto ${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>
                    Join our association to access exclusive benefits, savings programs, and community support.
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <motion.button
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setStep('form')}
                    className={`group w-full p-8 rounded-3xl border shadow-xl text-left flex flex-col gap-6 transition-all cursor-pointer ${
                      isGodMode 
                        ? 'bg-black/40 border-white/5 shadow-none' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-slate-200/50 dark:shadow-none'
                    }`}
                  >
                    <div className={`size-16 rounded-2xl flex items-center justify-center transition-colors ${
                      isGodMode ? 'bg-white/10 text-white group-hover:bg-bright-green group-hover:text-black' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}>
                      <UserPlus className="size-8" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${isGodMode ? 'text-white' : ''}`}>Membership Application</h3>
                      <p className={`${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>Start your journey towards financial security today. Join our community and grow together.</p>
                    </div>
                    <div className={`mt-auto flex items-center gap-2 font-bold ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
                      <span>Start Application</span>
                      <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.button>
                </div>

                <div className={`pt-12 border-t grid grid-cols-1 md:grid-cols-3 gap-8 ${isGodMode ? 'border-white/5' : 'border-slate-200 dark:border-slate-800'}`}>
                  {[
                    { icon: ShieldCheck, title: "Secure Process", desc: "Your data is protected with end-to-end encryption." },
                    { icon: Clock, title: "Quick Review", desc: "Applications are typically reviewed within 48 hours." },
                    { icon: FileText, title: "Easy Documentation", desc: "Minimal paperwork required for your convenience." }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 text-center">
                      <div className={`size-12 rounded-full flex items-center justify-center ${isGodMode ? 'bg-white/5 text-white/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <item.icon className="size-6" />
                      </div>
                      <h4 className={`font-bold ${isGodMode ? 'text-white' : ''}`}>{item.title}</h4>
                      <p className={`text-xs ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`rounded-3xl border shadow-2xl overflow-hidden ${
                  isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className={`p-8 border-b flex items-center justify-between ${
                  isGodMode ? 'border-white/5 bg-white/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'
                }`}>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setStep('selection')}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isGodMode ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <ArrowLeft className="size-5" />
                    </button>
                    <div>
                      <h2 className={`text-2xl font-bold ${isGodMode ? 'text-white' : ''}`}>
                        Membership Application
                      </h2>
                      <p className={`text-xs ${isGodMode ? 'text-white/40' : 'text-slate-500'}`}>Please provide accurate information</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold">
                      {error}
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className={`flex items-center gap-2 ${isGodMode ? 'text-bright-green' : 'text-primary'}`}>
                      <User className="size-5" />
                      <h3 className="font-bold uppercase tracking-wider text-sm">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                            isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary'
                          }`} 
                          placeholder="Enter your full name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>Mobile Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={formData.mobile}
                          onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                            isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary'
                          }`} 
                          placeholder="01XXXXXXXXX" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>Email Address</label>
                        <input 
                          required 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                            isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary'
                          }`} 
                          placeholder="example@email.com" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>NID Number</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.nid_number}
                          onChange={(e) => setFormData(prev => ({ ...prev, nid_number: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                            isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary'
                          }`} 
                          placeholder="Enter your NID number" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>Address</label>
                      <textarea 
                        rows={3} 
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                          isGodMode ? 'bg-white/5 border-white/10 text-white focus:ring-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary'
                        }`} 
                        placeholder="Village, Post Office, Upazila, District"
                      ></textarea>
                    </div>
                  </div>

                  {/* NID Uploads */}
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className={`flex items-center gap-2 ${isGodMode ? 'text-white/40' : 'text-slate-600'}`}>
                      <Paperclip className="size-5" />
                      <h3 className="font-bold uppercase tracking-wider text-sm">NID Document Upload</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>NID Front Side</label>
                        <div className="relative">
                          <input 
                            required 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            id="nid-front-upload" 
                            onChange={(e) => handleFileChange(e, 'nid_front')}
                          />
                          <label htmlFor="nid-front-upload" className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                            isGodMode ? 'bg-white/5 border-white/10 hover:border-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary'
                          }`}>
                            {formData.nid_front ? (
                              <div className="flex items-center gap-2 text-bright-green">
                                <CheckCircle2 className="size-5" />
                                <span className="text-sm font-bold">Front Uploaded</span>
                              </div>
                            ) : (
                              <>
                                <Upload className={`size-5 transition-colors ${isGodMode ? 'text-white/20 group-hover:text-bright-green' : 'text-slate-400 group-hover:text-primary'}`} />
                                <span className={`text-sm transition-colors ${isGodMode ? 'text-white/40 group-hover:text-bright-green' : 'text-slate-500 group-hover:text-primary'}`}>Upload Front Side</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className={`text-sm font-bold ${isGodMode ? 'text-white/60' : 'text-slate-700 dark:text-slate-300'}`}>NID Back Side</label>
                        <div className="relative">
                          <input 
                            required 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            id="nid-back-upload" 
                            onChange={(e) => handleFileChange(e, 'nid_back')}
                          />
                          <label htmlFor="nid-back-upload" className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                            isGodMode ? 'bg-white/5 border-white/10 hover:border-bright-green' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary'
                          }`}>
                            {formData.nid_back ? (
                              <div className="flex items-center gap-2 text-bright-green">
                                <CheckCircle2 className="size-5" />
                                <span className="text-sm font-bold">Back Uploaded</span>
                              </div>
                            ) : (
                              <>
                                <Upload className={`size-5 transition-colors ${isGodMode ? 'text-white/20 group-hover:text-bright-green' : 'text-slate-400 group-hover:text-primary'}`} />
                                <span className={`text-sm transition-colors ${isGodMode ? 'text-white/40 group-hover:text-bright-green' : 'text-slate-500 group-hover:text-primary'}`}>Upload Back Side</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <p className={`text-[10px] italic ${isGodMode ? 'text-white/20' : 'text-slate-500'}`}>Accepted formats: JPG, PNG. Max file size: 5MB.</p>
                  </div>

                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                    isGodMode ? 'bg-white/5 border-white/10' : 'bg-primary/5 border-primary/10'
                  }`}>
                    <input required type="checkbox" id="terms" className={`size-5 rounded border-slate-300 focus:ring-primary ${isGodMode ? 'bg-white/10 text-bright-green' : 'text-primary'}`} />
                    <label htmlFor="terms" className={`text-sm ${isGodMode ? 'text-white/40' : 'text-slate-600 dark:text-slate-400'}`}>
                      I agree to the association's terms and conditions and confirm that the information provided is correct.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-primary shadow-primary/30'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-12 rounded-3xl border shadow-2xl text-center space-y-8 ${
                  isGodMode ? 'bg-black/40 border-white/5' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className={`size-24 rounded-full mx-auto flex items-center justify-center ${
                  isGodMode ? 'bg-bright-green/10 text-bright-green' : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                }`}>
                  <CheckCircle2 className="size-16" />
                </div>
                <div className="space-y-4">
                  <h2 className={`text-3xl font-black tracking-tight ${isGodMode ? 'text-white' : ''}`}>Application Submitted!</h2>
                  <p className={`text-lg max-w-md mx-auto ${isGodMode ? 'text-white/40' : 'text-slate-500 dark:text-slate-400'}`}>
                    Thank you for your application. Our team will review your information and contact you via mobile or email within 48 hours.
                  </p>
                </div>
                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/"
                    className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105 ${
                      isGodMode ? 'bg-bright-green text-black shadow-bright-green/20' : 'bg-primary text-white shadow-primary/30'
                    }`}
                  >
                    Back to Home
                  </Link>
                  <button 
                    onClick={() => setStep('selection')}
                    className={`px-8 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                      isGodMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    New Application
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </Layout>
  );
}
