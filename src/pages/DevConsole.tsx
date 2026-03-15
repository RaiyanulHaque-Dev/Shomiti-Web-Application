import React, { useState, useEffect, useMemo } from 'react';
import { 
  Terminal, 
  RotateCcw, 
  ShieldAlert, 
  Activity, 
  Database, 
  Trash2,
  Lock,
  Unlock,
  Eye,
  Settings,
  Edit3,
  Search,
  Save,
  RefreshCw,
  Globe,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  Zap,
  Cpu,
  HardDrive,
  Network,
  Bug,
  Radar,
  Skull,
  ChevronRight,
  Play,
  Type,
  Image as ImageIcon,
  Layers,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';
import DevSidebar from '../components/DevSidebar';
import { useGodMode } from '../context/GodModeContext';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug' | 'critical';
  message: string;
  module: string;
}

type Tab = 'console' | 'database' | 'metrics' | 'security' | 'visual';

export default function DevConsole() {
  const { 
    isVisualEditMode, 
    setVisualEditMode, 
    clearAllOverrides, 
    uiOverrides,
    deleteOverride,
    activeEditor,
    setActiveEditor
  } = useGodMode();
  const [activeTab, setActiveTab] = useState<Tab>('console');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isGodMode, setIsGodMode] = useState(localStorage.getItem('godMode') === 'true');
  const [isResetting, setIsResetting] = useState(false);
  const [isNuking, setIsNuking] = useState(false);
  const [lsData, setLsData] = useState<Record<string, string>>({});
  const [searchKey, setSearchKey] = useState('');
  const [systemStats, setSystemStats] = useState<any[]>([]);
  const [threatLevel, setThreatLevel] = useState(12);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [healthScore, setHealthScore] = useState(98);

  // Generate mock real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 30) + 50,
          requests: Math.floor(Math.random() * 100) + 10,
        };
        const next = [...prev, newPoint];
        if (next.length > 20) return next.slice(1);
        return next;
      });
    }, 2000);

    // Initial logs
    const mockLogs: LogEntry[] = [
      { id: 1, timestamp: new Date().toISOString(), level: 'info', message: 'Kernel initialized', module: 'SYS' },
      { id: 2, timestamp: new Date().toISOString(), level: 'debug', message: 'Vite HMR bridge established', module: 'DEV' },
      { id: 3, timestamp: new Date().toISOString(), level: 'info', message: 'God Mode context mounted', module: 'AUTH' },
    ];
    setLogs(mockLogs);

    refreshLS();
    return () => clearInterval(interval);
  }, []);

  const refreshLS = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) data[key] = localStorage.getItem(key) || '';
    }
    setLsData(data);
  };

  const toggleGodMode = () => {
    const newState = !isGodMode;
    setIsGodMode(newState);
    localStorage.setItem('godMode', newState.toString());
    addLog(newState ? 'warn' : 'info', `God Mode ${newState ? 'ENABLED' : 'DISABLED'}`, 'AUTH');
  };

  const addLog = (level: LogEntry['level'], message: string, module: string) => {
    const newLog: LogEntry = {
      id: Math.random() * Date.now(),
      timestamp: new Date().toISOString(),
      level,
      message,
      module
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const resetToZero = async () => {
    if (!confirm('GLOBAL ZERO RESET: This will zero out all numeric counters in LocalStorage. Proceed?')) return;
    setIsResetting(true);
    addLog('critical', 'INITIATING GLOBAL ZERO RESET...', 'SYS');
    
    await new Promise(r => setTimeout(r, 1500));
    
    // Scan all keys and zero out numeric ones
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const val = localStorage.getItem(key);
        if (val && !isNaN(Number(val)) && key !== 'godMode' && key !== 'threatLevel') {
          localStorage.setItem(key, '0');
          count++;
        }
      }
    }
    
    addLog('info', `Reset ${count} numeric counters to zero.`, 'DB');
    setIsResetting(false);
    refreshLS();
  };

  const nukeAllData = async () => {
    if (!confirm('☢️ NUKE ALL DATA ☢️\n\nThis will wipe EVERYTHING in local storage, session storage, and clear all cookies. You will be logged out. Continue?')) return;
    
    setIsNuking(true);
    addLog('critical', 'SYSTEM PURGE INITIATED', 'SYS');
    
    // Dramatic countdown
    for (let i = 3; i > 0; i--) {
      addLog('critical', `PURGE IN T-MINUS ${i}...`, 'SYS');
      await new Promise(r => setTimeout(r, 800));
    }

    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    addLog('critical', 'SYSTEM WIPED. REBOOTING...', 'SYS');
    setTimeout(() => window.location.href = '/login', 1000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    addLog('debug', `> ${terminalInput}`, 'USER');

    if (cmd === 'help') {
      addLog('info', 'Available commands: help, clear, god, nuke, zero, status, threat', 'SYS');
    } else if (cmd === 'clear') {
      setLogs([]);
    } else if (cmd === 'god') {
      toggleGodMode();
    } else if (cmd === 'nuke') {
      nukeAllData();
    } else if (cmd === 'zero') {
      resetToZero();
    } else if (cmd === 'status') {
      addLog('info', `System Health: ${healthScore}% | Threat Level: ${threatLevel}% | God Mode: ${isGodMode}`, 'SYS');
    } else if (cmd === 'threat') {
      investigateThreat();
    } else {
      addLog('error', `Unknown command: ${cmd}`, 'SYS');
    }

    setTerminalInput('');
  };

  const investigateThreat = async () => {
    setIsInvestigating(true);
    addLog('warn', 'Starting Deep Packet Inspection...', 'SEC');
    await new Promise(r => setTimeout(r, 2000));
    addLog('error', 'Detected suspicious activity from IP 192.168.1.105', 'SEC');
    await new Promise(r => setTimeout(r, 1000));
    addLog('info', 'Tracing origin... Location: Unknown', 'SEC');
    setThreatLevel(prev => Math.min(prev + 15, 100));
    setIsInvestigating(false);
  };

  const updateLS = (key: string, value: string) => {
    localStorage.setItem(key, value);
    refreshLS();
    addLog('debug', `SET ${key} = ${value}`, 'DB');
  };

  const deleteLS = (key: string) => {
    localStorage.removeItem(key);
    refreshLS();
    addLog('warn', `DEL ${key}`, 'DB');
  };

  const exportLS = () => {
    const data = JSON.stringify(lsData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system_dump_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    addLog('info', 'System data exported to JSON', 'DB');
  };

  const bulkDelete = () => {
    if (!confirm('Are you sure you want to delete ALL filtered keys?')) return;
    const keysToDelete = Object.keys(lsData).filter(key => key.toLowerCase().includes(searchKey.toLowerCase()));
    keysToDelete.forEach(key => localStorage.removeItem(key));
    refreshLS();
    addLog('warn', `Bulk deleted ${keysToDelete.length} keys`, 'DB');
  };

  return (
    <div className="bg-black min-h-screen flex font-mono text-bright-green selection:bg-bright-green selection:text-black">
      <DevSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-bright-green/20 bg-zinc-950 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-bright-green/10 p-2 rounded border border-bright-green/30">
              <Terminal className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-widest uppercase">Root Console v2.5.0</h2>
              <div className="flex items-center gap-2 text-[8px] text-zinc-500 font-bold uppercase">
                <span className="flex items-center gap-1"><Activity className="size-2" /> System: Stable</span>
                <span className="flex items-center gap-1"><ShieldCheck className="size-2" /> Security: Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded border text-[10px] font-black uppercase tracking-widest transition-all ${isGodMode ? 'bg-hot-pink/10 border-hot-pink text-hot-pink animate-pulse' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
              {isGodMode ? 'God Mode Active' : 'Standard Access'}
            </div>
            <div className={`px-3 py-1 rounded border text-[10px] font-black uppercase tracking-widest ${isVisualEditMode ? 'bg-fuchsia/10 border-fuchsia text-fuchsia' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
              {isVisualEditMode ? 'Visual Edit: ON' : 'Visual Edit: OFF'}
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex bg-zinc-950 border-b border-bright-green/10 px-8 shrink-0">
          {[
            { id: 'console', icon: Terminal, label: 'Console' },
            { id: 'visual', icon: Edit3, label: 'Visual Editor' },
            { id: 'database', icon: Database, label: 'DB Explorer' },
            { id: 'metrics', icon: BarChart3, label: 'Metrics' },
            { id: 'security', icon: ShieldAlert, label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'border-bright-green text-bright-green bg-bright-green/5' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'console' && (
              <motion.div 
                key="console"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <ActionCard 
                    title="God Mode Override"
                    desc="Bypass all permission checks."
                    icon={ShieldAlert}
                    color="fuchsia"
                    active={isGodMode}
                    onClick={toggleGodMode}
                    actionIcon={isGodMode ? Unlock : Lock}
                  />
                  <ActionCard 
                    title="Global Zero Reset"
                    desc="Zero out all system counters."
                    icon={RotateCcw}
                    color="terracotta"
                    active={isResetting}
                    onClick={resetToZero}
                    actionIcon={Trash2}
                  />
                  <ActionCard 
                    title="Nuke All Data"
                    desc="Wipe local storage completely."
                    icon={Skull}
                    color="red-600"
                    onClick={nukeAllData}
                    actionIcon={Zap}
                  />
                  <div className="bg-zinc-900/50 border border-hot-pink/30 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase mb-1">Dev Password</h3>
                      <p className="text-[10px] text-zinc-500 uppercase">Update root access key.</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <input 
                        id="new-root-pass"
                        type="password" 
                        placeholder="New Pass"
                        className="flex-1 bg-black border border-hot-pink/20 rounded px-3 py-2 text-xs text-hot-pink outline-none focus:border-hot-pink"
                      />
                      <button 
                        onClick={() => {
                          const val = (document.getElementById('new-root-pass') as HTMLInputElement).value;
                          if (val) {
                            localStorage.setItem('devPassword', val);
                            addLog('info', 'Root password updated', 'AUTH');
                            alert('Password updated');
                          }
                        }}
                        className="bg-hot-pink text-white px-3 py-2 rounded text-[10px] font-black uppercase"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>

                {/* Logs Terminal */}
                <div className="bg-black rounded-2xl border border-bright-green/20 overflow-hidden flex flex-col h-[450px] shadow-2xl">
                  <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-bright-green/10">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-red-500"></div>
                      <div className="size-2 rounded-full bg-yellow-500"></div>
                      <div className="size-2 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">system_kernel.log</span>
                    </div>
                    <button onClick={() => setLogs([])} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase">Clear</button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-[10px] custom-scrollbar">
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-4 group hover:bg-white/5 p-1 rounded">
                        <span className="text-zinc-600 shrink-0">[{log.timestamp.split('T')[1].split('.')[0]}]</span>
                        <span className={`font-black shrink-0 w-16 ${
                          log.level === 'error' || log.level === 'critical' ? 'text-hot-pink' : 
                          log.level === 'warn' ? 'text-terracotta' : 
                          log.level === 'debug' ? 'text-fuchsia' : 'text-sage'
                        }`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="text-zinc-500 shrink-0">[{log.module}]</span>
                        <span className="text-zinc-300">{log.message}</span>
                      </div>
                    ))}
                    <div className="flex gap-2 text-bright-green mt-2">
                      <span>$</span>
                      <form onSubmit={handleTerminalSubmit} className="flex-1">
                        <input 
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          className="bg-transparent border-none outline-none w-full text-bright-green caret-bright-green"
                          autoFocus
                          placeholder="type 'help' for commands..."
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'visual' && (
              <motion.div 
                key="visual"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-zinc-900 border border-fuchsia/30 p-8 rounded-2xl">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter">Visual Override Engine</h3>
                      <p className="text-xs text-zinc-400 mt-1">Modify any UI element in real-time. Changes are stored in the override registry.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex bg-black p-1 rounded-xl border border-white/5">
                        <button 
                          onClick={() => setActiveEditor('text')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeEditor === 'text' ? 'bg-bright-green text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                          <Type size={14} /> Text
                        </button>
                        <button 
                          onClick={() => setActiveEditor('media')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeEditor === 'media' ? 'bg-hot-pink text-white' : 'text-zinc-500 hover:text-white'}`}
                        >
                          <ImageIcon size={14} /> Media
                        </button>
                        <button 
                          onClick={() => setActiveEditor('layout')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeEditor === 'layout' ? 'bg-fuchsia text-white' : 'text-zinc-500 hover:text-white'}`}
                        >
                          <Layers size={14} /> Layout
                        </button>
                      </div>
                      <button 
                        onClick={() => setVisualEditMode(!isVisualEditMode)}
                        className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest transition-all ${
                          isVisualEditMode 
                            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {isVisualEditMode ? 'Exit Editor' : 'Enter Editor'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Overrides ({Object.keys(uiOverrides).length})</h4>
                      <div className="bg-black rounded-xl border border-white/5 max-h-[400px] overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {Object.entries(uiOverrides).length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 text-zinc-700">
                            <Layers size={48} className="mb-4 opacity-10" />
                            <p className="text-xs italic">No active overrides detected.</p>
                          </div>
                        ) : (
                          Object.entries(uiOverrides).map(([id, val]) => (
                            <div key={id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-white/5 group hover:border-bright-green/30 transition-all">
                              <div className="flex flex-col min-w-0">
                                <span className="text-[8px] font-black text-bright-green uppercase tracking-widest mb-1">{id}</span>
                                <span className="text-xs text-white truncate max-w-[200px]">
                                  {typeof val === 'string' ? val : Array.isArray(val) ? `List (${val.length} items)` : 'Object'}
                                </span>
                              </div>
                              <button 
                                onClick={() => deleteOverride(id)}
                                className="p-2 text-zinc-600 hover:text-hot-pink transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                      {Object.keys(uiOverrides).length > 0 && (
                        <button 
                          onClick={clearAllOverrides}
                          className="w-full py-3 rounded-xl border border-hot-pink/30 text-hot-pink text-[10px] font-black uppercase tracking-widest hover:bg-hot-pink hover:text-white transition-all"
                        >
                          Clear All Overrides
                        </button>
                      )}
                    </div>

                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
                      <div className={`p-4 rounded-full ${isVisualEditMode ? 'bg-bright-green/10 text-bright-green animate-pulse' : 'bg-zinc-800 text-zinc-600'}`}>
                        <Eye size={32} />
                      </div>
                      <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm">Editor Status</h4>
                        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                          {isVisualEditMode 
                            ? `You are currently in ${activeEditor.toUpperCase()} mode. Hover over elements on the website to see edit controls.` 
                            : 'Enable the editor to start modifying the website content directly.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'database' && (
              <motion.div 
                key="database"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900 border border-bright-green/20 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-bright-green/10 flex justify-between items-center bg-black/40">
                    <div className="flex items-center gap-3">
                      <Database className="size-6 text-bright-green" />
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Global Data Explorer</h3>
                        <p className="text-[8px] text-zinc-500 font-bold uppercase">Direct LocalStorage Access</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-zinc-500" />
                        <input 
                          type="text" 
                          placeholder="Filter keys..."
                          value={searchKey}
                          onChange={(e) => setSearchKey(e.target.value)}
                          className="bg-black border border-bright-green/20 rounded-full pl-8 pr-4 py-2 text-xs outline-none focus:border-bright-green text-white w-64"
                        />
                      </div>
                      <button 
                        onClick={exportLS}
                        title="Export to JSON"
                        className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-white hover:text-black transition-all"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={bulkDelete}
                        title="Bulk Delete Filtered"
                        className="p-2 bg-red-600/10 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={refreshLS}
                        className="p-2 bg-bright-green/10 text-bright-green rounded-lg hover:bg-bright-green hover:text-black transition-all"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left text-xs">
                      <thead className="sticky top-0 bg-zinc-900 border-b border-bright-green/10 z-10">
                        <tr>
                          <th className="px-8 py-4 text-zinc-500 font-black uppercase tracking-widest">Key</th>
                          <th className="px-8 py-4 text-zinc-500 font-black uppercase tracking-widest">Value</th>
                          <th className="px-8 py-4 text-zinc-500 font-black uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {Object.entries(lsData)
                          .filter(([key]) => key.toLowerCase().includes(searchKey.toLowerCase()))
                          .map(([key, value]) => (
                          <tr key={key} className="hover:bg-white/5 group transition-colors">
                            <td className="px-8 py-4 font-black text-zinc-400">{key}</td>
                            <td className="px-8 py-4">
                              <input 
                                type="text" 
                                defaultValue={value}
                                onBlur={(e) => updateLS(key, e.target.value)}
                                className="bg-transparent border-none focus:ring-1 focus:ring-bright-green/30 rounded px-2 w-full text-bright-green font-mono"
                              />
                            </td>
                            <td className="px-8 py-4 text-right">
                              <button 
                                onClick={() => deleteLS(key)}
                                className="text-zinc-600 hover:text-hot-pink opacity-0 group-hover:opacity-100 transition-all p-2"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div 
                key="metrics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Real-time Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard label="CPU Usage" value={`${systemStats[systemStats.length-1]?.cpu || 0}%`} icon={Cpu} color="bright-green" />
                  <StatCard label="Memory Load" value={`${systemStats[systemStats.length-1]?.memory || 0}%`} icon={HardDrive} color="fuchsia" />
                  <StatCard label="Request Rate" value={`${systemStats[systemStats.length-1]?.requests || 0} req/s`} icon={Network} color="hot-pink" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl h-[350px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">System Load (CPU vs Memory)</h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-[8px] text-bright-green font-bold uppercase">
                          <div className="size-1.5 bg-bright-green rounded-full"></div> CPU
                        </div>
                        <div className="flex items-center gap-1 text-[8px] text-fuchsia font-bold uppercase">
                          <div className="size-1.5 bg-fuchsia rounded-full"></div> MEM
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={systemStats}>
                          <defs>
                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D946EF" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#D946EF" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="time" stroke="#666" fontSize={10} />
                          <YAxis stroke="#666" fontSize={10} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
                            itemStyle={{ color: '#00FF00' }}
                          />
                          <Area type="monotone" dataKey="cpu" stroke="#00FF00" fillOpacity={1} fill="url(#colorCpu)" />
                          <Area type="monotone" dataKey="memory" stroke="#D946EF" fillOpacity={1} fill="url(#colorMem)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl h-[350px] flex flex-col">
                    <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Network Traffic (Requests)</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={systemStats}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="time" stroke="#666" fontSize={10} />
                          <YAxis stroke="#666" fontSize={10} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
                          />
                          <Bar dataKey="requests" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* System Health Breakdown */}
                <div className="bg-zinc-900 border border-bright-green/10 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="size-16 rounded-full border-4 border-bright-green flex items-center justify-center">
                      <span className="text-xl font-black text-white">{healthScore}%</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-widest">System Health Breakdown</h3>
                      <p className="text-[10px] text-zinc-500 uppercase">Real-time integrity analysis</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <HealthMetric label="Database Integrity" score={100} />
                    <HealthMetric label="Network Latency" score={94} />
                    <HealthMetric label="Security Shield" score={100 - threatLevel} />
                    <HealthMetric label="Resource Overhead" score={88} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Threat Level */}
                  <div className="bg-zinc-900 border border-red-600/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                    <div className="relative size-40 mb-6">
                      <svg className="size-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="transparent"
                          stroke="#222"
                          strokeWidth="12"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="transparent"
                          stroke="#DC2626"
                          strokeWidth="12"
                          strokeDasharray={440}
                          strokeDashoffset={440 - (440 * threatLevel) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-white">{threatLevel}%</span>
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-widest">Threat Level</span>
                      </div>
                    </div>
                    
                    {/* Threat Map Simulation */}
                    <div className="w-full h-32 bg-black rounded-xl border border-red-600/20 mb-6 overflow-hidden relative">
                      <div className="absolute inset-0 opacity-20">
                        <svg viewBox="0 0 200 100" className="w-full h-full">
                          <path d="M20,50 Q50,20 80,50 T140,50 T180,50" fill="none" stroke="#DC2626" strokeWidth="0.5" />
                          <circle cx="40" cy="30" r="2" fill="#DC2626" className="animate-pulse" />
                          <circle cx="120" cy="70" r="2" fill="#DC2626" className="animate-pulse" />
                          <circle cx="160" cy="40" r="2" fill="#DC2626" className="animate-pulse" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Radar className={`size-12 text-red-600/30 ${isInvestigating ? 'animate-spin' : ''}`} />
                      </div>
                      <div className="absolute bottom-2 left-2 text-[6px] text-red-600 font-bold uppercase">Global Threat Map</div>
                    </div>

                    <button 
                      onClick={investigateThreat}
                      disabled={isInvestigating}
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        isInvestigating 
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                          : 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                      }`}
                    >
                      {isInvestigating ? (
                        <>
                          <RefreshCw className="size-4 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Radar className="size-4" />
                          Investigate Threat
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security Logs */}
                  <div className="lg:col-span-2 bg-black border border-red-600/20 rounded-2xl overflow-hidden flex flex-col h-[400px]">
                    <div className="bg-zinc-950 px-6 py-4 border-b border-red-600/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="size-5 text-red-600" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Security Event Log</h3>
                      </div>
                      <span className="text-[10px] text-red-600 font-black animate-pulse">LIVE_MONITORING</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-[10px]">
                      {logs.filter(l => l.module === 'SEC' || l.level === 'critical').map(log => (
                        <div key={log.id} className="flex gap-4 p-2 bg-red-600/5 border border-red-600/10 rounded">
                          <span className="text-red-600/60">[{log.timestamp.split('T')[1].split('.')[0]}]</span>
                          <span className="text-red-600 font-black uppercase">[{log.level}]</span>
                          <span className="text-white">{log.message}</span>
                        </div>
                      ))}
                      {logs.filter(l => l.module === 'SEC').length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-700">
                          <ShieldCheck size={48} className="mb-4 opacity-20" />
                          <p className="uppercase font-black tracking-widest">No active threats detected</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Tools */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ToolCard 
                    title="Firewall Override" 
                    desc="Bypass global IP filtering." 
                    icon={Zap} 
                    onClick={() => addLog('warn', 'Firewall bypassed. All ports open.', 'SEC')}
                  />
                  <ToolCard 
                    title="Deep Scan" 
                    desc="Inspect all incoming packets." 
                    icon={Radar} 
                    onClick={() => addLog('info', 'Deep scan initiated. No anomalies found.', 'SEC')}
                  />
                  <ToolCard 
                    title="Auto-Patch" 
                    desc="Fix known vulnerabilities." 
                    icon={Bug} 
                    onClick={() => {
                      setThreatLevel(prev => Math.max(0, prev - 10));
                      addLog('info', 'System patched. Threat level reduced.', 'SEC');
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* God Mode Overlay */}
        <AnimatePresence>
          {isGodMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              {/* Matrix-like falling characters simulation */}
              <div className="absolute inset-0 flex justify-around opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: -100 }}
                    animate={{ y: '100vh' }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
                    className="text-[10px] font-black text-bright-green writing-vertical"
                  >
                    {Array.from({ length: 20 }).map(() => String.fromCharCode(Math.floor(Math.random() * 93) + 33)).join('')}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ActionCard({ title, desc, icon: Icon, color, active, onClick, actionIcon: ActionIcon }: any) {
  const colorMap: Record<string, string> = {
    'fuchsia': 'border-fuchsia text-fuchsia bg-fuchsia',
    'terracotta': 'border-terracotta text-terracotta bg-terracotta',
    'red-600': 'border-red-600 text-red-600 bg-red-600',
    'hot-pink': 'border-hot-pink text-hot-pink bg-hot-pink',
  };

  const activeStyles = colorMap[color] || 'border-bright-green text-bright-green bg-bright-green';
  const [borderColor, textColor, bgColor] = activeStyles.split(' ');

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`bg-zinc-900 border-2 p-6 rounded-2xl shadow-lg transition-all ${
        active ? `${borderColor} shadow-lg` : 'border-zinc-800'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <Icon className={`size-8 ${active ? 'text-white' : textColor}`} />
        <button 
          onClick={onClick}
          className={`p-2 rounded-lg transition-all ${active ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500'}`}
        >
          <ActionIcon className="size-6" />
        </button>
      </div>
      <h3 className={`text-sm font-black uppercase mb-1 ${active ? 'text-white' : 'text-white'}`}>{title}</h3>
      <p className={`text-[10px] uppercase ${active ? 'text-white/70' : 'text-zinc-500'}`}>{desc}</p>
    </motion.div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  const colorClass = color === 'bright-green' ? 'text-bright-green' : color === 'fuchsia' ? 'text-fuchsia' : 'text-hot-pink';
  const bgClass = color === 'bright-green' ? 'bg-bright-green/10' : color === 'fuchsia' ? 'bg-fuchsia/10' : 'bg-hot-pink/10';
  const borderClass = color === 'bright-green' ? 'border-bright-green/20' : color === 'fuchsia' ? 'border-fuchsia/20' : 'border-hot-pink/20';

  return (
    <div className={`p-6 rounded-2xl border ${bgClass} ${borderClass}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-black/40 ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
          <p className={`text-2xl font-black ${colorClass}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ title, desc, icon: Icon, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="bg-zinc-950 border border-white/5 p-6 rounded-2xl flex items-center gap-4 group hover:border-red-600/30 transition-all cursor-pointer"
    >
      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-red-600/10 group-hover:text-red-600 transition-all">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-xs font-black text-white uppercase">{title}</h4>
        <p className="text-[10px] text-zinc-500 uppercase">{desc}</p>
      </div>
      <ChevronRight className="ml-auto size-4 text-zinc-700 group-hover:text-red-600 transition-all" />
    </div>
  );
}

function HealthMetric({ label, score }: { label: string, score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
        <span className="text-zinc-500">{label}</span>
        <span className={score > 90 ? 'text-bright-green' : score > 70 ? 'text-terracotta' : 'text-hot-pink'}>{score}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={`h-full ${score > 90 ? 'bg-bright-green' : score > 70 ? 'bg-terracotta' : 'bg-hot-pink'}`}
        />
      </div>
    </div>
  );
}

