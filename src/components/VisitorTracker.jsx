import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Download, 
  Trash2, 
  AlertCircle, 
  Calendar, 
  Globe,
  HelpCircle
} from 'lucide-react';

export default function VisitorTracker() {
  // Preloaded unique guests
  const initialVisitors = [
    { email: 'alex@mit.edu', name: 'Alex Johnson', time: 'May 17, 23:10:04' },
    { email: 'sarah@stanford.edu', name: 'Sarah Connor', time: 'May 17, 23:12:45' }
  ];

  // States
  const [visitors, setVisitors] = useState(initialVisitors);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Add: Set Uniqueness Verification
  const handleAddVisitor = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !cleanName) return;

    // ES6 Set Uniqueness Validation
    const uniqueEmails = new Set(visitors.map(v => v.email));
    
    if (uniqueEmails.has(cleanEmail)) {
      setError(`Duplicate registration! "${cleanEmail}" is already registered in the Set.`);
      return;
    }

    // Insert new visitor
    const newVisitor = {
      email: cleanEmail,
      name: cleanName,
      time: new Date().toLocaleString()
    };

    setVisitors([...visitors, newVisitor]);
    setEmail('');
    setName('');
    setError('');
  };

  // Remove individual
  const handleDeleteVisitor = (emailToDelete) => {
    setVisitors(visitors.filter(v => v.email !== emailToDelete));
  };

  // Clear all
  const handleClear = () => {
    setVisitors([]);
    setError('');
  };

  // JSON List Export
  const handleExportJSON = () => {
    if (visitors.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(visitors, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "unique_visitors.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Get initials for profile badge
  const getInitials = (fullName) => {
    return fullName.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="space-y-8 animate-popIn">
      
      {/* --- DUPLICATE ALERT CARD --- */}
      {error && (
        <div className="glass border-l-4 border-rose-500 bg-rose-500/10 p-4 rounded-xl flex items-start gap-3 shadow-lg">
          <AlertCircle className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-xs font-bold text-rose-500">Set Constraint Violation!</h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* --- STATS COUNTERS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500">
            <UserCheck size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Set Size (Unique Count)</span>
            <h4 className="text-2xl font-black mt-0.5">{visitors.length}</h4>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-500">
            <Globe size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last Visitor Joined</span>
            <h4 className="text-xs font-bold truncate max-w-[170px] mt-1.5 text-slate-700 dark:text-slate-200">
              {visitors.length > 0 ? visitors[visitors.length - 1].name : 'None'}
            </h4>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-500">
            <UserCheck size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Lookup Efficiency</span>
            <h4 className="text-sm font-extrabold text-indigo-500 mt-1">O(1) Constant</h4>
          </div>
        </div>
      </div>

      {/* --- CORE WORKSPACE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Register Guest */}
        <div className="lg:col-span-5 glass p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Register Entity
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Unique Portal Gateway</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Register a new visitor email address. Duplicate entries are automatically checked and discarded.
            </p>

            <form onSubmit={handleAddVisitor} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Visitor Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  maxLength={40}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/10 transition-all"
              >
                <Plus size={16} />
                <span>Register Visitor (Set.add)</span>
              </button>
            </form>
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mt-6 flex gap-3">
            <button
              onClick={handleExportJSON}
              disabled={visitors.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 p-3 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent rounded-xl text-xs font-bold transition-all"
            >
              <Download size={14} />
              <span>Export (JSON)</span>
            </button>
            
            <button
              onClick={handleClear}
              disabled={visitors.length === 0}
              className="p-3 text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-800/80 hover:border-rose-500/30 rounded-xl transition-all"
              title="Clear all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Visitor Grid List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass p-6 rounded-2xl flex flex-col min-h-[380px]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex justify-between">
              <span>Unique Visitor List (Set Members)</span>
              <span className="text-xs font-normal text-slate-500">Unordered Keys</span>
            </h3>

            {visitors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {visitors.map((v) => (
                  <div
                    key={v.email}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 relative overflow-hidden flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-sm bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
                      {getInitials(v.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                        {v.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {v.email}
                      </p>
                      <span className="text-[8px] text-slate-400 block mt-1">Joined: {v.time.split(',')[0]}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteVisitor(v.email)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                      title="Remove from set"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-center text-slate-400">
                <HelpCircle size={40} className="text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs">No unique visitors registered yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* --- BEHIND THE SCENES --- */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Behind the Scenes: Set Data Structure
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          A JavaScript <code>Set</code> stores unique elements of any type. When checking if a visitor is unique, we call the highly-efficient <code>Set.prototype.has()</code> method, which returns in average <strong>O(1) time complexity</strong>, unlike arrays which require <code>O(N)</code> scans.
        </p>
        <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 dark:bg-slate-950 font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800/50">
          {`// Unique visitor emails Set structure:\n`}
          {JSON.stringify(Array.from(new Set(visitors.map(v => v.email))), null, 2)}
        </pre>
      </div>

    </div>
  );
}
