import React from 'react';
import IdentityAccess from './pages/IdentityAccess';
import Organisation from './pages/Organisation';
import Onboarding from './pages/Onboarding';
import Offboarding from './pages/Offboarding';



const stats = [
  { label: 'Total Employees', value: '1,284', change: '+12 this month' },
  { label: 'Active Onboarding', value: '24', change: '8 completing today' },
  { label: 'AI Anomalies', value: '3', change: 'Flagged • review', alert: true },
  { label: 'Policy Queries', value: '98%', change: 'AI resolution rate' },
];

const employees = [
  { name: 'Ravi Kumar', role: 'Software Engineer', initials: 'RK', status: 'Active' },
  { name: 'Priya Sharma', role: 'HR Manager', initials: 'PS', status: 'Onboarding' },
  { name: 'Arjun Mehta', role: 'DevOps Lead', initials: 'AM', status: 'Offboarding' },
  { name: 'Sneha Reddy', role: 'Product Manager', initials: 'SR', status: 'Active' },
];

const modules = [
  { icon: '🔐', name: 'Identity & Access', count: '1,284 identities' },
  { icon: '🏢', name: 'Organisation', count: '12 departments' },
  { icon: '🚀', name: 'Onboarding', count: '24 in progress' },
  { icon: '📦', name: 'IT Assets', count: '3,842 assets' },
  { icon: '📋', name: 'Policy KB', count: '98% AI resolved' },
  { icon: '💊', name: 'Benefits Admin', count: '1,102 enrolled' },
];

const statusStyle = {
  Active: { backgroundColor: '#F2E9E4', color: '#22223B', border: '1px solid #C9ADA7' },
  Onboarding: { backgroundColor: '#eef0f8', color: '#4A4E69', border: '1px solid #4A4E69' },
  Offboarding: { backgroundColor: '#fdf6f4', color: '#C9ADA7', border: '1px solid #C9ADA7' },
};

   
  function Dashboard({ activePage }) {
  if (activePage === 'Identity & Access') return <IdentityAccess />;
  if (activePage === 'Organisation') return <Organisation />;
  if (activePage === 'Onboarding') return <Onboarding />;
  if (activePage === 'Offboarding') return <Offboarding />;
  return (
    <div className="p-6">

      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>{activePage}</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>AI Native Human Capital Management</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full border"
            style={{ backgroundColor: '#fff', borderColor: '#C9ADA7', color: '#4A4E69' }}>
            ● System Healthy
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
            style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
            AS
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border"
            style={{
              backgroundColor: '#fff',
              borderColor: '#C9ADA7',
              borderLeft: stat.alert ? '3px solid #C9ADA7' : undefined
            }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9A8C98' }}>{stat.label}</p>
            <p className="text-2xl font-medium" style={{ color: '#22223B' }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: '#4A4E69' }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Employee Activity */}
      <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
          Recent Employee Activity
        </p>
        {employees.map((emp) => (
          <div key={emp.name} className="flex items-center gap-3 py-2 border-b"
            style={{ borderColor: '#F2E9E4' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
              {emp.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: '#22223B' }}>{emp.name}</p>
              <p className="text-xs" style={{ color: '#9A8C98' }}>{emp.role}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={statusStyle[emp.status]}>
              {emp.status}
            </span>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>Modules</p>
        <div className="grid grid-cols-3 gap-3">
          {modules.map((mod) => (
            <div key={mod.name} className="p-3 rounded-lg border cursor-pointer"
              style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
              <div className="text-xl mb-2">{mod.icon}</div>
              <p className="text-xs font-medium" style={{ color: '#22223B' }}>{mod.name}</p>
              <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{mod.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;