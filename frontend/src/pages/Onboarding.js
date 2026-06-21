import React, { useState, useEffect } from 'react';

const tasks = [
  { task: 'Send welcome email', assignee: 'HR Team', due: 'Today', status: 'Done' },
  { task: 'Setup laptop', assignee: 'IT Team', due: 'Today', status: 'Active' },
  { task: 'Create email account', assignee: 'IT Team', due: 'Today', status: 'Done' },
  { task: 'Add to Slack channels', assignee: 'HR Team', due: 'Tomorrow', status: 'Pending' },
  { task: 'Schedule buddy meeting', assignee: 'Manager', due: 'Tomorrow', status: 'Pending' },
  { task: 'Assign training modules', assignee: 'HR Team', due: 'Week 1', status: 'Pending' },
];

const stepStyle = {
  Done: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Active: { backgroundColor: '#eef0f8', color: '#4A4E69', border: '1px solid #4A4E69' },
  Pending: { backgroundColor: '#F2E9E4', color: '#9A8C98', border: '1px solid #C9ADA7' },
};

const taskStyle = {
  Done: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Active: { backgroundColor: '#eef0f8', color: '#4A4E69' },
  Pending: { backgroundColor: '#F2E9E4', color: '#9A8C98' },
};

function Onboarding() {
  const API = 'http://127.0.0.1:8000';
  const [onboardingEmployees, setOnboardingEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', dept: '', startDate: '' });

  useEffect(() => {
    fetchOnboarding();
  }, []);

  const fetchOnboarding = async () => {
    try {
      const res = await fetch(`${API}/onboarding`);
      const data = await res.json();
      setOnboardingEmployees(data);
      if (data.length > 0) setSelected(data[0]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching onboarding', err);
      setLoading(false);
    }
  };

  const handleAddOnboarding = async () => {
    if (!newEmployee.name || !newEmployee.role) return;
    try {
      const res = await fetch(`${API}/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      const data = await res.json();
      const updated = [...onboardingEmployees, data];
      setOnboardingEmployees(updated);
      setSelected(data);
      setNewEmployee({ name: '', role: '', dept: '', startDate: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding onboarding', err);
    }
  };

  const handleDeleteOnboarding = async (docId) => {
    try {
      await fetch(`${API}/onboarding/${docId}`, { method: 'DELETE' });
      const updated = onboardingEmployees.filter(e => e.docId !== docId);
      setOnboardingEmployees(updated);
      if (selected && selected.docId === docId) {
        setSelected(updated.length > 0 ? updated[0] : null);
      }
    } catch (err) {
      console.error('Error deleting onboarding', err);
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Onboarding Journey Engine</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Personalised onboarding journeys powered by AI</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Start Onboarding
        </button>
      </div>

      {/* Add Onboarding Form */}
      {showForm && (
        <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Start New Onboarding</p>
          <div className="grid grid-cols-4 gap-2 mb-3">
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
            <input placeholder="Start Date" value={newEmployee.startDate}
              onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddOnboarding}
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
          { label: 'Active Onboarding', value: onboardingEmployees.length.toString(), change: 'Currently in progress' },
          { label: 'Avg Completion', value: '4.2d', change: 'Days to complete' },
          { label: 'AI Suggestions', value: '12', change: 'Personalised tasks' },
          { label: 'Completed', value: '186', change: 'This quarter' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border"
            style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9A8C98' }}>{stat.label}</p>
            <p className="text-2xl font-medium" style={{ color: '#22223B' }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: '#4A4E69' }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">

        {/* Employee List */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Active Journeys
          </p>
          {loading ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>Loading...</p>
          ) : onboardingEmployees.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No journeys yet. Click "+ Start Onboarding"!</p>
          ) : (
            onboardingEmployees.map((emp) => (
              <div key={emp.docId}
                onClick={() => setSelected(emp)}
                className="p-3 rounded-lg mb-2 cursor-pointer border relative"
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
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteOnboarding(emp.docId); }}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                    ✕
                  </button>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#4A4E69' }}>{emp.currentStep}</span>
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

        {/* Journey Details */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Journey Progress
          </p>

          {!selected ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>
              No onboarding journeys yet. Click "+ Start Onboarding" to begin!
            </p>
          ) : (
            <>
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
                  <p className="text-xs mt-0.5" style={{ color: '#C9ADA7' }}>Start: {selected.startDate}</p>
                </div>
              </div>

              {/* Steps */}
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

              {/* Overall Progress */}
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

        {/* Tasks & AI */}
        <div className="flex flex-col gap-4">

          {/* Tasks */}
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
              Onboarding Tasks
            </p>
            {tasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b"
                style={{ borderColor: '#F2E9E4' }}>
                <div>
                  <p className="text-xs font-medium" style={{ color: '#22223B' }}>{task.task}</p>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{task.assignee} • {task.due}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={taskStyle[task.status]}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>

          {/* AI Suggestions */}
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22223B' }}></div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Suggestions</p>
            </div>
            <div className="space-y-2">
              {[
                'Schedule 1:1 with manager on Day 3',
                'Assign Python training for new role',
                'Add to department Slack channel',
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg"
                  style={{ backgroundColor: '#fff' }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: '#C9ADA7' }}></div>
                  <p className="text-xs" style={{ color: '#4A4E69' }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;