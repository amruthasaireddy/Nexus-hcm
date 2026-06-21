import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import RightPanel from './RightPanel';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// TEMPORARY TEST FUNCTION
window.testFirebase = async () => {
  try {
    console.log('Testing Firebase write...');
    const docRef = await addDoc(collection(db, 'test'), { test: 'hello', time: Date.now() });
    console.log('SUCCESS! Doc written with ID:', docRef.id);
  } catch (e) {
    console.error('TEST FAILED:', e);
  }
};

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