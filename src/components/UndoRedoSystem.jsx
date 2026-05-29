import React, { useState } from 'react';
import { 
  Undo, 
  Redo, 
  Plus, 
  Trash2, 
  History, 
  Layers, 
  HelpCircle
} from 'lucide-react';

export default function UndoRedoSystem() {
  // Card palettes
  const cardColors = [
    { name: 'Amber', bg: 'from-amber-400 to-orange-500 text-white' },
    { name: 'Purple', bg: 'from-purple-400 to-indigo-500 text-white' },
    { name: 'Emerald', bg: 'from-emerald-400 to-teal-500 text-white' },
    { name: 'Sapphire', bg: 'from-cyan-400 to-blue-500 text-white' }
  ];

  // Initial notepad state
  const initialNotes = ['Welcome to Structify! Write your ideas.'];

  // React state arrays representing Stacks
  const [notes, setNotes] = useState(initialNotes);
  const [undoStack, setUndoStack] = useState([initialNotes]);
  const [redoStack, setRedoStack] = useState([]);
  
  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState(cardColors[0].bg);

  // Add: Push new state to Undo Stack, clear Redo Stack
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Create next state
    const nextNotes = [...notes, inputText.trim()];
    
    // Update states
    setNotes(nextNotes);
    setUndoStack([...undoStack, nextNotes]); // Push new state onto Undo Stack
    setRedoStack([]); // Clear Redo Stack on new action branch
    setInputText('');
  };

  // Delete: Push new state to Undo Stack, clear Redo Stack
  const handleDeleteNote = (idxToDelete) => {
    const nextNotes = notes.filter((_, idx) => idx !== idxToDelete);
    
    setNotes(nextNotes);
    setUndoStack([...undoStack, nextNotes]);
    setRedoStack([]);
  };

  // Undo: Pop from Undo Stack, Push to Redo Stack
  const handleUndo = () => {
    if (undoStack.length <= 1) return; // Keep initial state

    // Pop the current state from the end of the Undo Stack
    const current = undoStack[undoStack.length - 1];
    const previous = undoStack[undoStack.length - 2];

    setNotes(previous);
    setUndoStack(undoStack.slice(0, -1)); // Pop
    setRedoStack([...redoStack, current]); // Push current to Redo Stack
  };

  // Redo: Pop from Redo Stack, Push to Undo Stack
  const handleRedo = () => {
    if (redoStack.length === 0) return;

    // Pop the state from the end of the Redo Stack
    const nextState = redoStack[redoStack.length - 1];

    setNotes(nextState);
    setUndoStack([...undoStack, nextState]); // Push nextState to Undo Stack
    setRedoStack(redoStack.slice(0, -1)); // Pop
  };

  // Clear Board
  const handleClear = () => {
    setNotes([]);
    setUndoStack([[]]);
    setRedoStack([]);
  };

  return (
    <div className="space-y-8 animate-popIn">
      
      {/* --- CONTROL BAR --- */}
      <div className="glass p-4 px-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold">Stack Coordinates Controls</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Undo pops state snapshots back to previous ticks; Redo pushes them forward again.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleUndo}
            disabled={undoStack.length <= 1}
            className="flex items-center gap-1.5 p-2 px-4 rounded-xl border border-purple-500/20 text-purple-500 hover:bg-purple-500/10 disabled:opacity-35 disabled:hover:bg-transparent text-xs font-bold transition-all"
          >
            <Undo size={14} />
            <span>Undo</span>
          </button>
          
          <button
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="flex items-center gap-1.5 p-2 px-4 rounded-xl border border-indigo-500/20 text-indigo-500 hover:bg-indigo-500/10 disabled:opacity-35 disabled:hover:bg-transparent text-xs font-bold transition-all"
          >
            <Redo size={14} />
            <span>Redo</span>
          </button>
        </div>
      </div>

      {/* --- CANVAS AND STACKS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Memo Notepad */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Note Input */}
          <div className="glass p-5 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Add Sticky Memo</h3>
            <form onSubmit={handleAddNote} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type an idea, task, or reminder..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-all"
                  maxLength={100}
                  required
                />
                
                <button
                  type="submit"
                  className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-500/10 transition-all flex items-center gap-1 px-5"
                >
                  <Plus size={16} />
                  <span>Add Note</span>
                </button>
              </div>

              {/* Palette */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Card Palette:</span>
                <div className="flex gap-2">
                  {cardColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.bg)}
                      className={`w-6 h-6 rounded-full bg-gradient-to-tr ${color.bg} border-2 transition-all ${
                        selectedColor === color.bg ? 'border-purple-600 dark:border-purple-400 scale-125 shadow-md' : 'border-transparent hover:scale-110'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Sticky Canvas */}
          <div className="glass p-6 rounded-2xl min-h-[300px] flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex justify-between">
              <span>Interactive Memo Board</span>
              <span className="text-xs font-normal text-slate-500">
                Notes: {notes.length}
              </span>
            </h3>

            {notes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {notes.map((note, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl bg-gradient-to-tr ${selectedColor} shadow-md flex flex-col justify-between min-h-[140px] relative group overflow-hidden`}
                  >
                    <p className="text-sm font-medium leading-relaxed break-words">{note}</p>
                    
                    <div className="flex justify-between items-center mt-4 border-t border-white/20 pt-3">
                      <span className="text-[10px] opacity-75">Saved Snapshot</span>
                      <button
                        onClick={() => handleDeleteNote(idx)}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-rose-500/90 hover:text-white transition-all text-white opacity-0 group-hover:opacity-100"
                        title="Delete note"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-center text-slate-400">
                <HelpCircle size={40} className="text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs">Memo board is empty. Add sticky notes above!</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Stack Columns */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-5 rounded-2xl flex flex-col h-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Dual Stack Visualizer
            </h3>
            
            <div className="grid grid-cols-2 gap-4 flex-1 min-h-[380px]">
              
              {/* Undo Stack Column */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-slate-500 mb-2 flex items-center gap-1 uppercase">
                  <Layers size={10} /> Undo Stack
                </div>
                
                <div className="flex-1 w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 p-2.5 flex flex-col-reverse gap-1.5 overflow-y-auto">
                  {undoStack.map((snap, idx) => {
                    const isTop = idx === undoStack.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-center text-[10px] font-bold truncate transition-all duration-300 ${
                          isTop
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Snapshot [{idx}]
                        <span className="block text-[8px] opacity-75 font-normal">
                          {snap.length} {snap.length === 1 ? 'note' : 'notes'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span className="text-[10px] font-bold text-purple-500 mt-2">
                  Top (Pop/Push)
                </span>
              </div>

              {/* Redo Stack Column */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-slate-500 mb-2 flex items-center gap-1 uppercase">
                  <History size={10} /> Redo Stack
                </div>

                <div className="flex-1 w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 p-2.5 flex flex-col-reverse gap-1.5 overflow-y-auto">
                  {redoStack.map((snap, idx) => {
                    const isTop = idx === redoStack.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-center text-[10px] font-bold truncate transition-all duration-300 ${
                          isTop
                            ? 'bg-indigo-500 text-white shadow-md'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Redo [{idx}]
                        <span className="block text-[8px] opacity-75 font-normal">
                          {snap.length} {snap.length === 1 ? 'note' : 'notes'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span className="text-[10px] font-bold text-indigo-500 mt-2">
                  Top (Pop/Push)
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* --- BEHIND THE SCENES STATE --- */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Behind the Scenes: Coordinate Stack Logic
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          The undo-redo mechanism uses two independent Stack structures. Every time you change the sticky notes, we push the new state list onto the <strong className="text-purple-500">Undo Stack</strong> and empty the <strong className="text-indigo-500">Redo Stack</strong>. When you hit Undo, we pop the top state from the Undo Stack, push it onto the Redo Stack, and render the next element on the top of the Undo Stack. Redoing reverses this operation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Undo Stack Array (LIFO)</span>
            <pre className="p-3 mt-1.5 rounded-xl bg-slate-900 text-purple-400 dark:bg-slate-950 font-mono text-[10px] max-h-48 overflow-y-auto shadow-inner border border-slate-800/50">
              {JSON.stringify(undoStack, null, 2)}
            </pre>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Redo Stack Array (LIFO)</span>
            <pre className="p-3 mt-1.5 rounded-xl bg-slate-900 text-indigo-400 dark:bg-slate-950 font-mono text-[10px] max-h-48 overflow-y-auto shadow-inner border border-slate-800/50">
              {JSON.stringify(redoStack, null, 2)}
            </pre>
          </div>
        </div>
      </div>

    </div>
  );
}
