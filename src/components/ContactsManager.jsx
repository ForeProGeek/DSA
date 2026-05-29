import React, { useState } from 'react';
import { 
  Contact, 
  Plus, 
  Trash2, 
  Edit2, 
  Search, 
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';

export default function ContactsManager() {
  // Pre-fill contacts list using ES6 Map
  const initialMap = new Map([
    ['Joshua Adebayo', { phone: '08123456789', email: 'joshua@progeek.com' }],
    ['Dr. Helen Peterson', { phone: '09098765432', email: 'helen@sqi.org' }],
    ['Marcus Rashford', { phone: '07011223344', email: 'marcus@manutd.com' }]
  ]);

  // States
  const [contacts, setContacts] = useState(initialMap);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto Mode indicator (Map.has check)
  const isEditing = contacts.has(name.trim());

  // Map.set operation (Insert / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || !phone.trim()) return;

    // Create shallow copy to trigger React re-render
    const nextMap = new Map(contacts);
    nextMap.set(cleanName, {
      phone: phone.trim(),
      email: email.trim() || 'No email provided'
    });

    setContacts(nextMap);
    setName('');
    setPhone('');
    setEmail('');
  };

  // Map.delete operation
  const handleDelete = (key) => {
    const nextMap = new Map(contacts);
    nextMap.delete(key);
    setContacts(nextMap);
  };

  // Map.get pre-fill
  const handleEdit = (key) => {
    const data = contacts.get(key);
    if (!data) return;
    setName(key);
    setPhone(data.phone);
    setEmail(data.email === 'No email provided' ? '' : data.email);
  };

  const handleClear = () => {
    setContacts(new Map());
  };

  // Simple static initials gradient helper
  const getInitials = (str) => {
    return str.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2);
  };

  // Get a stable color class based on name length
  const getAvatarColor = (str) => {
    const colors = [
      'bg-rose-500 text-white',
      'bg-blue-500 text-white',
      'bg-emerald-500 text-white',
      'bg-amber-500 text-white',
      'bg-indigo-500 text-white',
      'bg-purple-500 text-white'
    ];
    return colors[str.length % colors.length];
  };

  // Filter map entries by key or value matches
  const filteredEntries = Array.from(contacts.entries()).filter(([key, val]) => 
    key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    val.phone.includes(searchQuery) ||
    val.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-popIn">
      
      {/* --- STATS COUNTERS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-500">
            <Contact size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Entries (Map.size)</span>
            <h4 className="text-2xl font-black mt-0.5">{contacts.size}</h4>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-500">
            <span className="font-extrabold text-sm">#</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Unique Keys (Names)</span>
            <h4 className="text-xs font-bold truncate max-w-[170px] mt-1 text-slate-700 dark:text-slate-200">
              {Array.from(contacts.keys()).join(', ') || 'None'}
            </h4>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500">
            <span className="font-bold text-sm">✔</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Search Retrieval</span>
            <h4 className="text-sm font-extrabold text-emerald-500 mt-1">O(1) Direct Mapping</h4>
          </div>
        </div>
      </div>

      {/* --- CORE WORKSPACE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Key-Value Input Map Form */}
        <div className="lg:col-span-5 glass p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isEditing ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-rose-500/10 text-rose-600'
              }`}>
                {isEditing ? 'Edit Mode' : 'Create Mode'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Map Entry Form</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Enter a unique name as the map key, and phone/email details as the associated value.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Unique Name (Map Key)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Joshua Adebayo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none text-sm transition-all"
                  maxLength={40}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 08123456789"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. joshua@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                className={`w-full mt-4 flex items-center justify-center gap-2 p-3 text-white rounded-xl text-sm font-semibold shadow-lg transition-all ${
                  isEditing 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-500/10'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-rose-500/10'
                }`}
              >
                <Plus size={16} />
                <span>{isEditing ? 'Update Contact (Overwrite)' : 'Insert Contact (Map.set)'}</span>
              </button>
            </form>
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mt-6 flex justify-end">
            <button
              onClick={handleClear}
              disabled={contacts.size === 0}
              className="p-3 text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-800/80 hover:border-rose-500/30 rounded-xl transition-all"
              title="Clear map"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Key-Value Table Directory */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass p-6 rounded-2xl flex flex-col min-h-[380px]">
            
            {/* Search Bar */}
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keys, phone numbers, or email values instantly..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none text-xs transition-all"
              />
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex justify-between">
              <span>Directory Map Table</span>
              <span>Matches: {filteredEntries.length}</span>
            </h3>

            {filteredEntries.length > 0 ? (
              <div className="space-y-3 overflow-y-auto max-h-[340px] pr-1">
                {filteredEntries.map(([key, val]) => (
                  <div
                    key={key}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${getAvatarColor(key)}`}>
                        {getInitials(key)}
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{key}</h4>
                        <div className="mt-1 flex flex-col gap-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                          <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400">
                            <Phone size={10} /> {val.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail size={10} /> {val.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(key)}
                        className="text-slate-400 hover:text-amber-500 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        title="Edit entry"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(key)}
                        className="text-slate-400 hover:text-rose-500 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        title="Delete key"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-center text-slate-400">
                <HelpCircle size={40} className="text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs">No contacts match your query.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* --- BEHIND THE SCENES --- */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Behind the Scenes: Map Entries Representation
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          A JavaScript <code>Map</code> stores key-value pairs where both keys and values can be any type. Here, the unique <strong>Name</strong> acts as the key, and the object containing phone and email forms the value. When we look up a contact by name, we call <code>Map.prototype.get(name)</code>, which runs in <strong>O(1) average time complexity</strong>. Below are the raw entries:
        </p>
        <pre className="p-4 rounded-xl bg-slate-900 text-rose-400 dark:bg-slate-950 font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800/50">
          {`// Map Entries (Array.from(map.entries())):\n`}
          {JSON.stringify(Array.from(contacts.entries()), null, 2)}
        </pre>
      </div>

    </div>
  );
}
