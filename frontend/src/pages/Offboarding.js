import React, { useState } from 'react';

const offboardingEmployees = [
  {
    id: 'OFF001',
    name: 'Arjun Mehta',
    role: 'DevOps Lead',
    dept: 'Engineering',
    lastDay: '30 Jun 2026',
    progress: 60,
    reason: 'Resignation',
    initials: 'AM',
    steps: [
      { name: 'Resignation Accepted', status: 'Done' },
      { name: 'Knowledge Transfer', status: 'Done' },
      { name: 'Asset Return', status: 'Active' },
      { name: 'Exit Interview', status: 'Pending' },
      { name: 'Account Deactivation', status: 'Pending' },
      { name: 'Full & Final Settlement', status: 'Pending' },
    ]
  },
  {
    id: 'OFF002',
    name: 'Rohit Gupta',
    role: 'Sales Manager',
    dept: 'Sales',
    lastDay: '25 Jun 2026',
    progress: 80,
    reason: 'Retirement',
    initials: 'RG',
    steps: [
      { name: 'Resignation Accepted', status: 'Done' },
      { name: 'Knowledge Transfer', status: 'Done' },
      { name: 'Asset Return', status: 'Done' },
      { name: 'Exit Interview', status: 'Active' },
      { name: 'Account Deactivation', status: 'Pending' },
      { name: 'Full & Final Settlement', status: 'Pending' },
    ]
  },
  {
    id: 'OFF003',
    name: 'Nisha Verma',
    role: 'UX Designer',
    dept: 'Design',
    lastDay: '28 Jun 2026',
    progress: 30,
    reason: 'Termination',
    initials: 'NV',
    steps: [
      { name: 'Resignation Accepted', status: 'Done' },
      { name: 'Knowledge Transfer', status: 'Active' },
      { name: 'Asset Return', status: 'Pending' },
      { name: 'Exit Interview', status: 'Pending' },
      { name: 'Account Deactivation', status: 'Pending' },
      { name: 'Full & Final Settlement', status: 'Pending' },
    ]
  },
];

const assets = [
  { asset: 'MacBook Pro 14"', id: 'AST001', status: 'Returned' },
  { asset: 'iPhone 13', id: 'AST002', status: 'Pending' },
  { asset: 'Access Card', id: 'AST003', status: 'Pending' },
  { asset: 'Office Keys', id: 'AST004', status: 'Returned' },
];

const reasonStyle = {
  Resignation: { backgroundColor: '#eef0f8', color: '#4A4E69', border: '1px solid #4A4E69' },
  Retirement: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Termination: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
};

const stepStyle = {
  Done: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Active: { backgroundColor: '#eef0f8', color: '#4A4E69', border: '1px solid #4A4E69' },
  Pending: { backgroundColor: '#F2E9E4', color: '#9A8C98', border: '1px solid #C9ADA7' },
};

const assetStyle = {
  Returned: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Pending: { backgroundColor: '#fef2f2', color: '#dc2626' },
};

function Offboarding() {
  const [selected, setSelected] = useState(offboardingEmployees[0]);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Offboarding Workflow</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Automated separation and offboarding management</p>
        </div>
        <button className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Start Offboarding
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Active Offboarding', value: '8', change: '3 ending this week' },
          { label: 'Pending Assets', value: '12', change: 'To be returned', alert: true },
          { label: 'Exit Interviews', value: '5', change: 'Scheduled this week' },
          { label: 'Completed', value: '94', change: 'This quarter' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border"
            style={{
              backgroundColor: '#fff',
              borderColor: '#C9ADA7',
              borderLeft: stat.alert ? '3px solid #dc2626' : undefined
            }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9A8C98' }}>{stat.label}</p>
            <p className="text-2xl font-medium" style={{ color: stat.alert ? '#dc2626' : '#22223B' }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: '#4A4E69' }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">

        {/* Employee List */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Active Cases
          </p>
          {offboardingEmployees.map((emp) => (
            <div key={emp.id}
              onClick={() => setSelected(emp)}
              className="p-3 rounded-lg mb-2 cursor-pointer border"
              style={{
                backgroundColor: selected.id === emp.id ? '#F2E9E4' : '#fff',
                borderColor: selected.id === emp.id ? '#22223B' : '#C9ADA7'
              }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                    {emp.initials}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#22223B' }}>{emp.name}</p>
                    <p className="text-xs" style={{ color: '#9A8C98' }}>{emp.role}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={reasonStyle[emp.reason]}>
                  {emp.reason}
                </span>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#4A4E69' }}>Last Day: {emp.lastDay}</span>
                <span style={{ color: '#22223B' }}>{emp.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: '#F2E9E4' }}>
                <div className="h-1.5 rounded-full"
                  style={{ width: `${emp.progress}%`, background: 'linear-gradient(90deg, #9A8C98, #22223B)' }}>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Steps */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Workflow Progress
          </p>

          {/* Employee Info */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg"
            style={{ backgroundColor: '#F2E9E4' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
              {selected.initials}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#22223B' }}>{selected.name}</p>
              <p className="text-xs" style={{ color: '#9A8C98' }}>{selected.role} • {selected.dept}</p>
              <p className="text-xs mt-0.5" style={{ color: '#C9ADA7' }}>Last Day: {selected.lastDay}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {selected.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                style={{ backgroundColor: '#F2E9E4' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                  style={{
                    backgroundColor: step.status === 'Done' ? '#16a34a' : step.status === 'Active' ? '#22223B' : '#C9ADA7',
                    color: '#fff'
                  }}>
                  {step.status === 'Done' ? '✓' : i + 1}
                </div>
                <p className="text-xs flex-1" style={{ color: '#22223B' }}>{step.name}</p>
                <span className="text-xs px-2 py-0.5 rounded-full" style={stepStyle[step.status]}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F2E9E4' }}>
            <div className="flex justify-between text-xs mb-2">
              <span style={{ color: '#4A4E69' }}>Overall Progress</span>
              <span className="font-medium" style={{ color: '#22223B' }}>{selected.progress}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ backgroundColor: '#C9ADA7' }}>
              <div className="h-2 rounded-full"
                style={{ width: `${selected.progress}%`, background: 'linear-gradient(90deg, #9A8C98, #22223B)' }}>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">

          {/* Asset Return */}
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
              Asset Return Tracker
            </p>
            {assets.map((asset, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b"
                style={{ borderColor: '#F2E9E4' }}>
                <div>
                  <p className="text-xs font-medium" style={{ color: '#22223B' }}>{asset.asset}</p>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{asset.id}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={assetStyle[asset.status]}>
                  {asset.status}
                </span>
              </div>
            ))}
          </div>

          {/* AI Checklist */}
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22223B' }}></div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Checklist</p>
            </div>
            <div className="space-y-2">
              {[
                'Revoke all system access on last day',
                'Collect laptop and access card',
                'Transfer ongoing projects to team',
                'Complete exit interview by 28 Jun',
                'Process final settlement within 30 days',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg"
                  style={{ backgroundColor: '#fff' }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: '#C9ADA7' }}></div>
                  <p className="text-xs" style={{ color: '#4A4E69' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offboarding;