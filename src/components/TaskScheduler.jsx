import React, { useState } from 'react';
import { 
  Play, 
  Plus, 
  Trash2, 
  Clock, 
  Layers, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function TaskScheduler() {
  // Pre-loaded dummy tasks
  const initialTasks = [
    { id: '1', name: 'Synthesize DB Index', category: 'Backend', time: '12:04:12' },
    { id: '2', name: 'Optimize Tailwind Assets', category: 'Design', time: '12:05:30' },
    { id: '3', name: 'Audit Security Logs', category: 'Security', time: '12:06:01' }
  ];

  // Simple React states
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState('');
  const [taskCategory, setTaskCategory] = useState('General');
  const [processingTask, setProcessingTask] = useState(null);
  const [processedCount, setProcessedCount] = useState(0);

  // Enqueue: Add to rear (Push)
  const handleEnqueue = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      name: taskName.trim(),
      category: taskCategory,
      time: new Date().toLocaleTimeString()
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  // Dequeue: Remove from front (Shift) - First In First Out
  const handleDequeue = () => {
    if (tasks.length === 0) return;

    // Grab front element
    const nextTask = tasks[0];
    
    setProcessingTask(nextTask);
    setTasks(tasks.slice(1)); // Remove the index 0 task
    setProcessedCount(prev => prev + 1);
  };

  // Clear all
  const handleClear = () => {
    setTasks([]);
    setProcessingTask(null);
    setProcessedCount(0);
  };

  return (
    <div className="space-y-8 animate-popIn">
      
      {/* --- STATS COUNTERS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-500">
            <Layers size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Queue Size</span>
            <h4 className="text-2xl font-black mt-0.5">{tasks.length}</h4>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-500">
            <Clock size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Front of Queue (Peek)</span>
            <h4 className="text-sm font-bold truncate max-w-[160px] mt-1 text-slate-700 dark:text-slate-200">
              {tasks.length > 0 ? tasks[0].name : 'None'}
            </h4>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Processed Tasks</span>
            <h4 className="text-2xl font-black mt-0.5">{processedCount}</h4>
          </div>
        </div>
      </div>

      {/* --- ADD & WORKSPACE PANELS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Create Task Form */}
        <div className="lg:col-span-5 glass p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                Operations
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Enqueue New Task</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Add tasks to the rear of the pipeline. They will queue up chronologically (FIFO).
            </p>

            <form onSubmit={handleEnqueue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Task Title
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g. Clean cached nodes"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-sm transition-all"
                  maxLength={40}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['General', 'Backend', 'Design'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTaskCategory(cat)}
                      className={`py-2 text-xs rounded-xl font-semibold border transition-all ${
                        taskCategory === cat
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                          : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/10 transition-all"
              >
                <Plus size={16} />
                <span>Enqueue Task (Push)</span>
              </button>
            </form>
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mt-6 flex gap-3">
            <button
              onClick={handleDequeue}
              disabled={tasks.length === 0}
              className="flex-1 flex items-center justify-center gap-2 p-3 border border-cyan-500/30 dark:border-cyan-500/20 text-cyan-500 hover:bg-cyan-500/10 disabled:opacity-40 disabled:hover:bg-transparent rounded-xl text-sm font-semibold transition-all"
            >
              <Play size={15} />
              <span>Process Next (Dequeue)</span>
            </button>
            
            <button
              onClick={handleClear}
              disabled={tasks.length === 0 && !processingTask}
              className="p-3 text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-800/80 hover:border-rose-500/30 rounded-xl transition-all"
              title="Clear all tasks"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Active Processing & Visualizer Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Processing Panel */}
          <div className="glass p-6 rounded-2xl relative overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Active Processing Unit
            </h3>

            {processingTask ? (
              <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {processingTask.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-2">
                      {processingTask.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Status: Active</p>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock size={10} /> Enqueued: {processingTask.time}
                  </span>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
                <HelpCircle size={32} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  CPU Idle. Press "Process Next" to handle the front element of the queue.
                </p>
              </div>
            )}
          </div>

          {/* Queue Horizontal Timeline Visualizer */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex justify-between">
              <span>Queue Visualizer</span>
              <span className="text-xs font-normal lowercase text-slate-500">
                Front (left) ➔ Rear (right)
              </span>
            </h3>

            {tasks.length > 0 ? (
              <div className="flex items-center gap-3 overflow-x-auto py-4 px-2">
                {tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className={`flex-none w-48 p-4 rounded-xl border transition-all ${
                      idx === 0
                        ? 'border-cyan-500 bg-cyan-500/[0.02] shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/20'
                        : 'border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500">
                        Index [{idx}]
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        idx === 0 
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {idx === 0 ? 'Front (FIFO)' : idx === tasks.length - 1 ? 'Rear' : 'In Line'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 truncate">
                      {task.name}
                    </h4>

                    <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/50 pt-2">
                      <span>{task.category}</span>
                      <span>{task.time.split(' ')[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
                No tasks in the queue. Enqueue tasks to see the FIFO pipeline!
              </div>
            )}
          </div>

        </div>

      </div>

      {/* --- BEHIND THE SCENES ARRAY INSPECTOR --- */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Behind the Scenes: Queue Array State
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Notice how the tasks are stored in a standard JavaScript Array. When we Enqueue, elements are appended to the end. When we Dequeue, the element at index 0 is extracted, shifting all subsequent indexes down.
        </p>
        <pre className="p-4 rounded-xl bg-slate-900 text-cyan-400 dark:bg-slate-950 font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800/50">
          {JSON.stringify(tasks, null, 2)}
        </pre>
      </div>

    </div>
  );
}
