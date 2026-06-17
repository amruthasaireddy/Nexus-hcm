import React, { useState } from 'react';

const departments = [
  { id: 'DEPT001', name: 'Engineering', head: 'Arjun Mehta', employees: 342, budget: '₹2.4Cr', health: 94, status: 'Healthy' },
  { id: 'DEPT002', name: 'Human Resources', head: 'Priya Sharma', employees: 48, budget: '₹0.8Cr', health: 98, status: 'Healthy' },
  { id: 'DEPT003', name: 'Product', head: 'Sneha Reddy', employees: 124, budget: '₹1.2Cr', health: 87, status: 'Warning' },
  { id: 'DEPT004', name: 'Analytics', head: 'Kiran Patel', employees: 86, budget: '₹0.9Cr', health: 92, status: 'Healthy' },
  { id: 'DEPT005', name: 'Design', head: 'Meera Nair', employees: 54, budget: '₹0.6Cr', health: 96, status: 'Healthy' },
  { id: 'DEPT006', name: 'Sales', head: 'Rahul Verma', employees: 218, budget: '₹1.8Cr', health: 78, status: 'Critical' },
  { id: 'DEPT007', name: 'Finance', head: 'Anita Joshi', employees: 62, budget: '₹0.7Cr', health: 95, status: 'Healthy' },
  { id: 'DEPT008', name: 'Marketing', head: 'Dev Malhotra', employees: 94, budget: '₹1.1Cr', health: 89, status: 'Warning' },
];

const orgChart = [
  { name: 'Vikram Singh', role: 'CEO', level: 0 },
  { name: 'Arjun Mehta', role: 'CTO', level: 1 },
  { name: 'Priya Sharma', role: 'CHRO', level: 1 },
  { name: 'Sneha Reddy', role: 'CPO', level: 1 },
  { name: 'Rahul Verma', role: 'CSO', level: 1 },
];

const healthStyle = {
  Healthy: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Warning: { backgroundColor: '#fefce8', color: '#ca8a04', border: '1px solid #fde047' },
  Critical: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
};

function Organisation() {
  const [activeTab, setActiveTab] = useState('Departments');

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Organisation Structure</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Live organisation health monitor and structure</p>
        </div>
        <button className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Add Department
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Departments', value: '12', change: '8 active now' },
          { label: 'Total Employees', value: '1,284', change: '+12 this month' },
          { label: 'Avg Health Score', value: '91%', change: 'Above target' },
          { label: 'Critical Depts', value: '1', change: 'Needs attention', alert: true },
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

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {['Departments', 'Org Chart', 'Health Monitor'].map((tab) => (
          <button key={tab}
            onClick={() => setActiveTab(tab)}
            className="text-xs px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: activeTab === tab ? '#22223B' : '#fff',
              color: activeTab === tab ? '#F2E9E4' : '#4A4E69',
              borderColor: '#C9ADA7'
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Departments Tab */}
      {activeTab === 'Departments' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Department Registry
          </p>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F2E9E4' }}>
                {['ID', 'Department', 'Head', 'Employees', 'Budget', 'Health', 'Status'].map((h) => (
                  <th key={h} className="text-left pb-3 text-xs font-medium uppercase tracking-widest"
                    style={{ color: '#9A8C98' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} style={{ borderBottom: '1px solid #F2E9E4' }}>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{dept.id}</td>
                  <td className="py-3 text-xs font-medium" style={{ color: '#22223B' }}>{dept.name}</td>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{dept.head}</td>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{dept.employees}</td>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{dept.budget}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: '#F2E9E4', width: '60px' }}>
                        <div className="h-1.5 rounded-full"
                          style={{ width: `${dept.health}%`, background: 'linear-gradient(90deg, #9A8C98, #22223B)' }}>
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: '#22223B' }}>{dept.health}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={healthStyle[dept.status]}>
                      {dept.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Org Chart Tab */}
      {activeTab === 'Org Chart' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#9A8C98' }}>
            Organisation Hierarchy
          </p>

          {/* CEO */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-xl border text-center w-48"
              style={{ backgroundColor: '#22223B', borderColor: '#22223B' }}>
              <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium"
                style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}>VS</div>
              <p className="text-sm font-medium" style={{ color: '#F2E9E4' }}>Vikram Singh</p>
              <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Chief Executive Officer</p>
            </div>
          </div>

          {/* Line */}
          <div className="flex justify-center mb-4">
            <div className="w-px h-8" style={{ backgroundColor: '#C9ADA7' }}></div>
          </div>

          {/* C-Suite */}
          <div className="flex justify-center gap-4 mb-4">
            {orgChart.filter(o => o.level === 1).map((person) => (
              <div key={person.name} className="p-3 rounded-xl border text-center w-36"
                style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
                <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <p className="text-xs font-medium" style={{ color: '#22223B' }}>{person.name}</p>
                <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{person.role}</p>
              </div>
            ))}
          </div>

          {/* Departments under each */}
          <div className="flex justify-center gap-4">
            {departments.slice(0, 4).map((dept) => (
              <div key={dept.id} className="p-3 rounded-xl border text-center w-36"
                style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
                <p className="text-xs font-medium" style={{ color: '#22223B' }}>{dept.name}</p>
                <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{dept.employees} employees</p>
                <span className="text-xs px-2 py-0.5 rounded-full mt-2 inline-block"
                  style={healthStyle[dept.status]}>
                  {dept.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Monitor Tab */}
      {activeTab === 'Health Monitor' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Live Department Health Monitor
          </p>
          <div className="grid grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="p-4 rounded-xl border"
                style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium" style={{ color: '#22223B' }}>{dept.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={healthStyle[dept.status]}>
                    {dept.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span style={{ color: '#4A4E69' }}>Health Score</span>
                  <span className="font-medium" style={{ color: '#22223B' }}>{dept.health}%</span>
                </div>
                <div className="h-2 rounded-full mb-3" style={{ backgroundColor: '#C9ADA7' }}>
                  <div className="h-2 rounded-full"
                    style={{
                      width: `${dept.health}%`,
                      background: dept.health > 90
                        ? 'linear-gradient(90deg, #9A8C98, #22223B)'
                        : dept.health > 80
                        ? 'linear-gradient(90deg, #ca8a04, #fde047)'
                        : 'linear-gradient(90deg, #dc2626, #fca5a5)'
                    }}>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: '#9A8C98' }}>Head: {dept.head}</span>
                  <span style={{ color: '#9A8C98' }}>{dept.employees} employees</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Organisation;