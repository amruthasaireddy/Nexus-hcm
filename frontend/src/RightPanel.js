import React from 'react';

const healthData = [
  { name: 'Identity & Access', percent: 98 },
  { name: 'Onboarding Engine', percent: 94 },
  { name: 'Policy KB', percent: 99 },
  { name: 'Benefits Admin', percent: 87 },
  { name: 'IT Assets', percent: 92 },
];

const alerts = [
  { text: 'Unusual login detected', sub: 'User: AM • 2 mins ago' },
  { text: 'Access policy violation', sub: 'User: RK • 14 mins ago' },
  { text: 'Offboarding overdue', sub: 'User: AM • 1 hour ago' },
];

function RightPanel() {
  return (
    <div className="w-56 h-screen overflow-y-auto flex-shrink-0 border-l p-4"
      style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>

      {/* System Health */}
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
        System Health
      </p>
      {healthData.map((item) => (
        <div key={item.name} className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: '#4A4E69' }}>{item.name}</span>
            <span className="font-medium" style={{ color: '#22223B' }}>{item.percent}%</span>
          </div>
          <div className="h-1 rounded-full" style={{ backgroundColor: '#F2E9E4' }}>
            <div className="h-1 rounded-full"
              style={{ width: `${item.percent}%`, background: 'linear-gradient(90deg, #9A8C98, #22223B)' }}>
            </div>
          </div>
        </div>
      ))}

      <hr className="my-4" style={{ borderColor: '#F2E9E4' }} />

      {/* AI Alerts */}
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
        AI Alerts
      </p>
      {alerts.map((alert, i) => (
        <div key={i} className="flex gap-2 pb-3 mb-3 border-b" style={{ borderColor: '#F2E9E4' }}>
          <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#C9ADA7' }}></div>
          <div>
            <p className="text-xs font-medium" style={{ color: '#22223B' }}>{alert.text}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9A8C98' }}>{alert.sub}</p>
          </div>
        </div>
      ))}

      <hr className="my-4" style={{ borderColor: '#F2E9E4' }} />

      {/* Quick Actions */}
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
        Quick Actions
      </p>
      {['+ Add Employee', '+ Start Onboarding', '+ Raise IT Request'].map((btn) => (
        <button key={btn}
          className="w-full text-left text-xs px-3 py-2 rounded-lg mb-2 border"
          style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7', color: '#22223B' }}>
          {btn}
        </button>
      ))}

      <hr className="my-4" style={{ borderColor: '#F2E9E4' }} />

      {/* AI Insight */}
      <div className="rounded-lg p-3" style={{ backgroundColor: '#F2E9E4' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22223B' }}></div>
          <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Insight</p>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: '#4A4E69' }}>
          3 anomalies detected in Identity module. Review access logs for Arjun Mehta immediately.
        </p>
      </div>
    </div>
  );
}

export default RightPanel;