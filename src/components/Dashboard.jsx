import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Clock, 
  History, 
  Users, 
  Contact, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Code,
  BookOpen
} from 'lucide-react';

export default function Dashboard({ activeTab, setActiveTab, children }) {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Synchronize dark mode class with body element
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { 
      id: 'queue', 
      name: 'Task Scheduler', 
      subtitle: 'First In First Out (FIFO)', 
      icon: Clock, 
      color: 'from-cyan-500 to-blue-600',
      structure: 'Queue',
      desc: 'Elements are added at the rear (enqueue) and removed from the front (dequeue). Ensures fair, chronological order.'
    },
    { 
      id: 'stack', 
      name: 'Undo-Redo Canvas', 
      subtitle: 'Last In First Out (LIFO)', 
      icon: History, 
      color: 'from-purple-500 to-indigo-600',
      structure: 'Stack',
      desc: 'Elements are pushed and popped from the top of the stack. Two stacks are coordinated to reverse actions.'
    },
    { 
      id: 'set', 
      name: 'Visitor Tracker', 
      subtitle: 'Unique Unordered Collection', 
      icon: Users, 
      color: 'from-emerald-500 to-teal-600',
      structure: 'Set',
      desc: 'Stores only unique entries. Duplicate submissions are automatically ignored. Offers extremely fast lookup checks.'
    },
    { 
      id: 'map', 
      name: 'Contacts Manager', 
      subtitle: 'Key-Value Direct Access', 
      icon: Contact, 
      color: 'from-rose-500 to-pink-600',
      structure: 'Map',
      desc: 'Stores data in key-value pairs (Key ➔ Value). Keys are unique. Provides instantaneous O(1) reads, updates, and deletes.'
    }
  ];

  const currentNav = navItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex flex-col w-80 glass border-r border-slate-200/50 dark:border-slate-800/30 p-6 z-10">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20">
            <Layers size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Structify
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Data Structures Lab</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg shadow-indigo-500/10 scale-[1.02]' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/20' : 'bg-slate-200/50 dark:bg-slate-800/60 group-hover:bg-slate-300/50'
                }`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className={`text-[10px] ${isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.structure}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Info Card / Explainer */}
        {currentNav && (
          <div className="mt-auto p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className="text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Structure: {currentNav.structure}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {currentNav.desc}
            </p>
          </div>
        )}
      </aside>

      {/* --- HEADER (Mobile & Tablet) --- */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-slate-800/50 glass z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white">
            <Layers size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100">Structify</h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">Lab Sandbox</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200/50 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-200/50 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Sliding Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-slate-950/40 backdrop-blur-sm z-30 h-screen transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="glass border-b border-slate-200/60 dark:border-slate-800/50 p-6 flex flex-col gap-3 shadow-2xl animate-popIn" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Select Application</h2>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-lg text-left transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white font-semibold' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon size={16} />
                  <div>
                    <span className="text-sm block">{item.name}</span>
                    <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.structure} • {item.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col overflow-y-auto relative p-4 sm:p-6 md:p-8">
        
        {/* Top Control Bar (Desktop Only) */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {currentNav?.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {currentNav?.subtitle}
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-medium text-sm transition-all shadow-sm"
          >
            {isDark ? (
              <>
                <Sun size={15} className="text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-indigo-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Screen Slot */}
        <div className="flex-1 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
