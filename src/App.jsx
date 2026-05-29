import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TaskScheduler from './components/TaskScheduler';
import UndoRedoSystem from './components/UndoRedoSystem';
import VisitorTracker from './components/VisitorTracker';
import ContactsManager from './components/ContactsManager';

function App() {
  const [activeTab, setActiveTab] = useState('queue');

  // Dynamically render the active mini-application
  const renderActiveApp = () => {
    switch (activeTab) {
      case 'queue':
        return <TaskScheduler />;
      case 'stack':
        return <UndoRedoSystem />;
      case 'set':
        return <VisitorTracker />;
      case 'map':
        return <ContactsManager />;
      default:
        return <TaskScheduler />;
    }
  };

  return (
    <Dashboard activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveApp()}
    </Dashboard>
  );
}

export default App;
