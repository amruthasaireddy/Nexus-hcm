import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import RightPanel from './RightPanel';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F2E9E4' }}>
      {/* LEFT SIDEBAR */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* MIDDLE MAIN */}
      <div className="flex-1 overflow-y-auto">
        <Dashboard activePage={activePage} />
      </div>

      {/* RIGHT PANEL */}
      <RightPanel />
    </div>
  );
}

export default App;