import React, { useState, useEffect } from 'react';
const API = 'http://127.0.0.1:8000';

const anomalies = [
  { type: 'Unusual Login Time', user: 'Arjun Mehta', detail: 'Login at 3:24 AM from unknown IP', severity: 'High', time: '2 mins ago' },
  { type: 'Multiple Failed Attempts', user: 'Ravi Kumar', detail: '5 failed login attempts in 10 mins', severity: 'Medium', time: '14 mins ago' },
  { type: 'Privilege Escalation', user: 'Kiran Patel', detail: 'Attempted to access admin panel', severity: 'High', time: '1 hour ago' },
];

const accessLogs = [
  { user: 'Arjun Mehta', action: 'Accessed Production DB', time: '3:24 AM', status: 'Flagged' },
  { user: 'Priya Sharma', action: 'Updated HR Records', time: '9:15 AM', status: 'Normal' },
  { user: 'Ravi Kumar', action: 'Deployed to Staging', time: '10:30 AM', status: 'Normal' },
  { user: 'Kiran Patel', action: 'Accessed Admin Panel', time: '11:45 AM', status: 'Blocked' },
  { user: 'Sneha Reddy', action: 'Updated Product Roadmap', time: '12:00 PM', status: 'Normal' },
];

const riskStyle = {
  Low: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Medium: { backgroundColor: '#fefce8', color: '#ca8a04', border: '1px solid #fde047' },
  High: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
};

const statusStyle = {
  Active: { backgroundColor: '#F2E9E4', color: '#22223B', border: '1px solid #C9ADA7' },
  Flagged: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
  Inactive: { backgroundColor: '#f8fafc', color: '#94a3b8', border: '1px solid #e2e8f0' },
};

const logStyle = {
  Normal: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Flagged: { backgroundColor: '#fef2f2', color: '#dc2626' },
  Blocked: { backgroundColor: '#fef2f2', color: '#dc2626' },
};

function IdentityAccess() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '', role: '', dept: '', access: 'Standard'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

 const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API}/employees`);
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.error('FETCH ERROR:', err);
      setLoading(false);
    }
  };
const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.role) return;
    try {
      const res = await fetch(`${API}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      const data = await res.json();
      setEmployees([...employees, data]);
      setNewEmployee({ name: '', role: '', dept: '', access: 'Standard' });
      setShowForm(false);
    } catch (err) {
      console.error('SAVE ERROR:', err);
    }
  };

  const handleDeleteEmployee = async (docId) => {
    try {
      await fetch(`${API}/employees/${docId}`, { method: 'DELETE' });
      setEmployees(employees.filter(e => e.docId !== docId));
    } catch (err) {
      console.error('DELETE ERROR:', err);
    }
  };

  const filtered = employees.filter(emp => {
    const matchSearch = (emp.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (emp.id || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || emp.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Identity & Access Management</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>AI-powered identity monitoring and access control</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Add Identity
        </button>
      </div>

      {/* Add Employee Form */}
      {showForm && (
        <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Add New Identity</p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <input
              placeholder="Full Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}
            />
            <input
              placeholder="Role"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}
            />
            <input
              placeholder="Department"
              value={newEmployee.dept}
              onChange={(e) => setNewEmployee({ ...newEmployee, dept: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}
            />
            <select
              value={newEmployee.access}
              onChange={(e) => setNewEmployee({ ...newEmployee, access: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}
            >
              <option>Standard</option>
              <option>Admin</option>
              <option>Super Admin</option>
              <option>Read Only</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddEmployee}
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
          { label: 'Total Identities', value: employees.length.toString(), change: '+12 this month' },
          { label: 'Active Sessions', value: '847', change: 'Right now' },
          { label: 'AI Anomalies', value: '3', change: 'Needs review', alert: true },
          { label: 'Access Policies', value: '24', change: 'Configured' },
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

      {/* AI Anomaly Alerts */}
      <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
          <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#9A8C98' }}>
            AI Anomaly Detection
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {anomalies.map((anomaly, i) => (
            <div key={i} className="p-3 rounded-lg border"
              style={{ backgroundColor: '#fef2f2', borderColor: '#fca5a5' }}>
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium" style={{ color: '#dc2626' }}>{anomaly.type}</p>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={riskStyle[anomaly.severity]}>
                  {anomaly.severity}
                </span>
              </div>
              <p className="text-xs font-medium mb-1" style={{ color: '#22223B' }}>{anomaly.user}</p>
              <p className="text-xs" style={{ color: '#9A8C98' }}>{anomaly.detail}</p>
              <p className="text-xs mt-2" style={{ color: '#C9ADA7' }}>{anomaly.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Identity Table */}
      <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#9A8C98' }}>
            Identity Registry
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', color: '#22223B', backgroundColor: '#F2E9E4' }}
            />
            {['All', 'Active', 'Flagged', 'Inactive'].map((f) => (
              <button key={f}
                onClick={() => setFilter(f)}
                className="text-xs px-3 py-1.5 rounded-lg border"
                style={{
                  backgroundColor: filter === f ? '#22223B' : '#F2E9E4',
                  color: filter === f ? '#F2E9E4' : '#4A4E69',
                  borderColor: '#C9ADA7'
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>Loading employees...</p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No employees yet. Click "+ Add Identity" to get started!</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F2E9E4' }}>
                {['ID', 'Name', 'Role', 'Department', 'Access Level', 'Last Login', 'Risk', 'Status', 'Action'].map((h) => (
                  <th key={h} className="text-left pb-3 text-xs font-medium uppercase tracking-widest"
                    style={{ color: '#9A8C98' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.docId} style={{ borderBottom: '1px solid #F2E9E4' }}>
                  <td className="py-3 text-xs font-medium" style={{ color: '#4A4E69' }}>{emp.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                        style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                        {(emp.name || '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#22223B' }}>{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{emp.role}</td>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{emp.dept}</td>
                  <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{emp.access}</td>
                  <td className="py-3 text-xs" style={{ color: '#9A8C98' }}>{emp.lastLogin}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={riskStyle[emp.risk] || riskStyle.Low}>
                      {emp.risk || 'Low'}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle[emp.status] || statusStyle.Active}>
                      {emp.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-3">
                    <button onClick={() => handleDeleteEmployee(emp.docId)}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Access Logs */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
          Recent Access Logs
        </p>
        <div className="space-y-2">
          {accessLogs.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: '#F2E9E4' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                  {log.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: '#22223B' }}>{log.user}</p>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{log.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs" style={{ color: '#9A8C98' }}>{log.time}</p>
                <span className="text-xs px-2 py-0.5 rounded-full" style={logStyle[log.status]}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IdentityAccess;