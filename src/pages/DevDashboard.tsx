import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Activity, 
  Database, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Server, 
  Code,
  Globe,
  Lock,
  Eye,
  Settings,
  LogOut,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import DevSidebar from '../components/DevSidebar';

interface SystemMetric {
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: string;
}

export default function DevDashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: 'CPU Usage', value: '12.4%', status: 'optimal', trend: '-2.1%' },
    { label: 'Memory', value: '1.2GB / 4GB', status: 'optimal', trend: '+0.5%' },
    { label: 'API Latency', value: '42ms', status: 'optimal', trend: '-5ms' },
    { label: 'Database Load', value: '8%', status: 'optimal', trend: 'stable' },
  ]);

  const [logs, setLogs] = useState<string[]>([
    'System kernel initialized...',
    'Auth service connected to cluster-0',
    'Database migration check: SUCCESS',
    'God Mode session started for developer',
    'Monitoring active on port 3000',
  ]);

  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetSystem = async () => {
    setIsResetting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] INITIATING FULL SYSTEM WIPE...`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] DISCONNECTING ACTIVE SESSIONS...`]);
    
    try {
      // Simulate some delay for "power" feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch('/api/dev/reset', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] DATABASE TABLES PURGED: members, transactions, notices, messages, loans.`]);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] SITE CONTENT RE-INITIALIZED TO DEFAULTS.`]);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] SYSTEM RESET SUCCESSFUL: All data cleared.`]);
        alert('System has been reset to zero successfully. All data wiped.');
      } else {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] CRITICAL ERROR DURING RESET: ${data.error}`]);
      }
    } catch (error) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] SYSTEM RESET ERROR: Connection failed.`]);
    } finally {
      setIsResetting(false);
      setShowResetConfirm(false);
    }
  };

  const isGodMode = localStorage.getItem('godMode') === 'true';

  return (
    <div className="bg-dark-grey min-h-screen flex font-mono text-bright-green overflow-hidden">
      <DevSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b border-bright-green/20 bg-black/40 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Terminal className="size-5" />
            <h2 className="text-lg font-black tracking-tighter uppercase">Developer Control Center</h2>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bright-green/10 text-bright-green hover:bg-bright-green hover:text-black transition-all text-xs font-black uppercase tracking-widest cursor-pointer border border-bright-green/20"
            >
              <Globe className="size-4" />
              <span>View Website</span>
            </button>
            <button 
              onClick={() => navigate('/admin/content')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia/10 text-fuchsia hover:bg-fuchsia hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer border border-fuchsia/20"
            >
              <Code className="size-4" />
              <span>Edit Website</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-bright-green/10 rounded-full border border-bright-green/20">
              <span className="size-2 bg-bright-green rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">Live System Feed</span>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('userRole');
                localStorage.removeItem('godMode');
                navigate('/login');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-hot-pink/10 text-hot-pink hover:bg-hot-pink hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer border border-hot-pink/20"
            >
              <LogOut className="size-4" />
              <span>Terminate Session</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">System Overview</h1>
              <p className="text-zinc-500 font-medium">Root access granted. Monitoring active.</p>
            </div>
            <div className="flex gap-3">
              {!showResetConfirm ? (
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                >
                  <ShieldAlert className="size-5" />
                  <span>Reset System to Zero</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleResetSystem}
                    disabled={isResetting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isResetting ? "Resetting..." : "Confirm Reset (Wipe All Data)"}
                  </button>
                  <button 
                    onClick={() => setShowResetConfirm(false)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <button 
                onClick={() => navigate('/dev-console')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-bright-green text-black font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Code className="size-5" />
                <span>Open Console</span>
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/40 border-2 border-bright-green/10 p-6 rounded-2xl hover:border-bright-green/40 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-bright-green/10 rounded-lg text-bright-green group-hover:bg-bright-green group-hover:text-black transition-all">
                    {i === 0 ? <Cpu className="size-5" /> : i === 1 ? <Database className="size-5" /> : i === 2 ? <Zap className="size-5" /> : <Server className="size-5" />}
                  </div>
                  <span className="text-[10px] font-black text-bright-green/60 uppercase tracking-widest">{metric.trend}</span>
                </div>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{metric.label}</p>
                <h3 className="text-2xl font-black text-white tracking-tighter">{metric.value}</h3>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Terminal Feed */}
            <div className="lg:col-span-2 bg-black rounded-2xl border border-bright-green/20 overflow-hidden flex flex-col h-[400px] shadow-2xl">
              <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-bright-green/10">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-red-500"></div>
                  <div className="size-2 rounded-full bg-yellow-500"></div>
                  <div className="size-2 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live_Kernel_Feed.log</span>
                </div>
                <Activity className="size-4 text-bright-green animate-pulse" />
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-2 text-xs">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-zinc-700 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-bright-green/80">{log}</span>
                  </div>
                ))}
                <div className="flex gap-2 text-bright-green animate-pulse">
                  <span>$</span>
                  <span className="w-2 h-4 bg-bright-green"></span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-6">
              <div className="bg-black/40 border-2 border-bright-green/10 p-6 rounded-2xl shadow-xl">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white">Security Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-bright-green/5 rounded-xl border border-bright-green/10">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="size-4 text-bright-green" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Firewall</span>
                    </div>
                    <span className="text-[10px] font-black text-bright-green">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bright-green/5 rounded-xl border border-bright-green/10">
                    <div className="flex items-center gap-3">
                      <Lock className="size-4 text-bright-green" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Encryption</span>
                    </div>
                    <span className="text-[10px] font-black text-bright-green">AES-256</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-hot-pink/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 size-32 bg-hot-pink/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <h4 className="font-black uppercase tracking-tighter text-xl mb-3 text-hot-pink relative z-10">Critical Alert</h4>
                <p className="text-xs font-medium text-white/50 mb-6 relative z-10 leading-relaxed italic">Unauthorized access attempt detected from IP 192.168.1.1. System lockdown initiated.</p>
                <button className="w-full py-3 rounded-xl bg-hot-pink text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer relative z-10">
                  Investigate Threat
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
