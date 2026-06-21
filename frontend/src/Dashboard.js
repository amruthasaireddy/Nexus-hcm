import React, { useState, useEffect } from 'react';
import IdentityAccess from './pages/IdentityAccess';
import Organisation from './pages/Organisation';
import Onboarding from './pages/Onboarding';
import Offboarding from './pages/Offboarding';
import ITAssets from './pages/ITAssets';
import PolicyKb from './pages/PolicyKb';
import BenefitsAdmin from './pages/BenefitsAdmin';

const statusStyle = {
  Active: { backgroundColor: '#F2E9E4', color: '#22223B', border: '1px solid #C9ADA7' },
  Onboarding: { backgroundColor: '#eef0f8', color: '#4A4E69', border: '1px solid #4A4E69' },
  Offboarding: { backgroundColor: '#fdf6f4', color: '#C9ADA7', border: '1px solid #C9ADA7' },
};

function Dashboard({ activePage }) {
  const API = 'http://127.0.0.1:8000';
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activePage === 'Dashboard') {
      fetchStats();
    }
  }, [activePage]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/dashboard/stats`);
      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard stats', err);
      setLoading(false);
    }
  };

  if (activePage === 'Identity & Access') return <IdentityAccess />;
  if (activePage === 'Organisation') return <Organisation />;
  if (activePage === 'Onboarding') return <Onboarding />;
  if (activePage === 'Offboarding') return <Offboarding />;
  if (activePage === 'IT Assets') return <ITAssets />;
  if (activePage === 'Policy KB') return <PolicyKb />;
  if (activePage === 'Benefits Admin') return <BenefitsAdmin />;

  const statCards = stats ? [
    { label: 'Total Employees', value: stats.totalEmployees.toString(), change: 'Identities registered' },
    { label: 'Active Onboarding', value: stats.activeOnboarding.toString(), change: 'In progress' },
    { label: 'Active Offboarding', value: stats.activeOffboarding.toString(), change: 'Cases ongoing', alert: stats.activeOffboarding > 0 },
    { label: 'IT Assets', value: stats.totalAssets.toString(), change: 'Tracked in system' },
  ] : [];
 const modules = stats ? [
    { icon: '/id-card.png', name: 'Identity & Access', count: `${stats.totalEmployees} identities` },
    { icon: '/connection.png', name: 'Organisation', count: '12 departments' },
    { icon: '/handshake.png', name: 'Onboarding', count: `${stats.activeOnboarding} in progress` },
    { icon: '/information-technology.png', name: 'IT Assets', count: `${stats.totalAssets} assets` },
    { icon: '/privacy-policy.png', name: 'Policy KB', count: '98% AI resolved' },
    { icon: '/recovery.png', name: 'Benefits Admin', count: `${stats.benefitsEnrolled} enrolled` },
  ] : [];

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

      {loading ? (
        <p className="text-xs text-center py-10" style={{ color: '#9A8C98' }}>Loading dashboard...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {statCards.map((stat) => (
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
            {(!stats || stats.recentEmployees.length === 0) ? (
              <p className="text-xs text-center py-4" style={{ color: '#9A8C98' }}>
                No employees added yet. Go to Identity & Access to add some!
              </p>
            ) : (
              stats.recentEmployees.map((emp) => (
                <div key={emp.docId} className="flex items-center gap-3 py-2 border-b"
                  style={{ borderColor: '#F2E9E4' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                    style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                    {(emp.name || '').split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#22223B' }}>{emp.name}</p>
                    <p className="text-xs" style={{ color: '#9A8C98' }}>{emp.role}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={statusStyle[emp.status] || statusStyle.Active}>
                    {emp.status || 'Active'}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Modules */}
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>Modules</p>
            <div className="grid grid-cols-3 gap-3">
              {modules.map((mod) => (
                <div key={mod.name} className="p-3 rounded-lg border cursor-pointer"
                  style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
                   <img src={mod.icon} alt={mod.name} className="w-6 h-6 mb-2" />
                  <p className="text-xs font-medium" style={{ color: '#22223B' }}>{mod.name}</p>
                  <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{mod.count}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;