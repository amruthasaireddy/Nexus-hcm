import React, { useState, useEffect } from 'react';

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
  const API = 'http://127.0.0.1:8000';
  const [offboardingEmployees, setOffboardingEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', dept: '', lastDay: '', reason: 'Resignation' });

  useEffect(() => {
    fetchOffboarding();
  }, []);

  const fetchOffboarding = async () => {
    try {
      const res = await fetch(`${API}/offboarding`);
      const data = await res.json();
      setOffboardingEmployees(data);
      if (data.length > 0) setSelected(data[0]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching offboarding', err);
      setLoading(false);
    }
  };

  const handleAddOffboarding = async () => {
    if (!newEmployee.name || !newEmployee.role) return;
    try {
      const res = await fetch(`${API}/offboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      const data = await res.json();
      const updated = [...offboardingEmployees, data];
      setOffboardingEmployees(updated);
      setSelected(data);
      setNewEmployee({ name: '', role: '', dept: '', lastDay: '', reason: 'Resignation' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding offboarding', err);
    }
  };

  const handleDeleteOffboarding = async (docId) => {
    try {
      await fetch(`${API}/offboarding/${docId}`, { method: 'DELETE' });
      const updated = offboardingEmployees.filter(e => e.docId !== docId);
      setOffboardingEmployees(updated);
      if (selected && selected.docId === docId) {
        setSelected(updated.length > 0 ? updated[0] : null);
      }
    } catch (err) {
      console.error('Error deleting offboarding', err);
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Offboarding Workflow</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Automated separation and offboarding management</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Start Offboarding
        </button>
      </div>

      {/* Add Offboarding Form */}
      {showForm && (
        <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Start New Offboarding</p>
          <div className="grid grid-cols-5 gap-2 mb-3">
            <input placeholder="Full Name" value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Role" value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Department" value={newEmployee.dept}
              onChange={(e) => setNewEmployee({ ...newEmployee, dept: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Last Day" value={newEmployee.lastDay}
              onChange={(e) => setNewEmployee({ ...newEmployee, lastDay: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <select value={newEmployee.reason}
              onChange={(e) => setNewEmployee({ ...newEmployee, reason: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}>
              <option>Resignation</option>
              <option>Retirement</option>
              <option>Termination</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddOffboarding}
              className="text-xs px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
              Save
            </button>
            <button onClick={() => setShowForm(false)}
              className="text-xs px-4 py-2 rounded-lg font-medium border"
              style={{ borderColor: '#C9ADA7', color: '#4A4E69' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Active Offboarding', value: offboardingEmployees.length.toString(), change: 'Currently in progress' },
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
          {loading ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>Loading...</p>
          ) : offboardingEmployees.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No cases yet. Click "+ Start Offboarding"!</p>
          ) : (
            offboardingEmployees.map((emp) => (
              <div key={emp.docId}
                onClick={() => setSelected(emp)}
                className="p-3 rounded-lg mb-2 cursor-pointer border"
                style={{
                  backgroundColor: selected && selected.docId === emp.docId ? '#F2E9E4' : '#fff',
                  borderColor: selected && selected.docId === emp.docId ? '#22223B' : '#C9ADA7'
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={reasonStyle[emp.reason] || reasonStyle.Resignation}>
                      {emp.reason}
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteOffboarding(emp.docId); }}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                      ✕
                    </button>
                  </div>
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
            ))
          )}
        </div>

        {/* Workflow Steps */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Workflow Progress
          </p>

          {!selected ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>
              No offboarding cases yet. Click "+ Start Offboarding" to begin!
            </p>
          ) : (
            <>
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

              <div className="space-y-2">
                {(selected.steps || []).map((step, i) => (
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
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">

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
                'Complete exit interview before last day',
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