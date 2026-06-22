import React, { useState, useEffect } from 'react';
 

const healthStyle = {
  Healthy: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Warning: { backgroundColor: '#fefce8', color: '#ca8a04', border: '1px solid #fde047' },
  Critical: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
};

function Organisation() {
  const API = 'http://127.0.0.1:8000';
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Departments');
  const [showForm, setShowForm] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', head: '', employees: '', budget: '' });
  const [ceo, setCeo] = useState({ name: 'Vikram Singh', title: 'Chief Executive Officer' });
const [editCeo, setEditCeo] = useState(false);
const [newCeo, setNewCeo] = useState({ name: '', title: '' });

 useEffect(() => {
  fetchDepartments();
  fetchCeo();
}, []);

const fetchCeo = async () => {
  try {
    const res = await fetch(`${API}/ceo`);
    const data = await res.json();
    setCeo(data);
  } catch (err) {
    console.error('Error fetching CEO', err);
  }
};

const handleUpdateCeo = async () => {
  if (!newCeo.name || !newCeo.title) return;
  try {
    const res = await fetch(`${API}/ceo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCeo)
    });
    const data = await res.json();
    setCeo(data);
    setEditCeo(false);
    setNewCeo({ name: '', title: '' });
  } catch (err) {
    console.error('Error updating CEO', err);
  }
};
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API}/departments`);
      const data = await res.json();
      setDepartments(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching departments', err);
      setLoading(false);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDept.name || !newDept.head) return;
    try {
      const res = await fetch(`${API}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDept, employees: parseInt(newDept.employees) || 0 })
      });
      const data = await res.json();
      setDepartments([...departments, data]);
      setNewDept({ name: '', head: '', employees: '', budget: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding department', err);
    }
  };

  const handleDeleteDepartment = async (docId) => {
    try {
      await fetch(`${API}/departments/${docId}`, { method: 'DELETE' });
      setDepartments(departments.filter(d => d.docId !== docId));
    } catch (err) {
      console.error('Error deleting department', err);
    }
  };

  const totalEmployees = departments.reduce((sum, d) => sum + (d.employees || 0), 0);
  const avgHealth = departments.length > 0
    ? Math.round(departments.reduce((sum, d) => sum + (d.health || 0), 0) / departments.length)
    : 0;
  const criticalCount = departments.filter(d => d.status === 'Critical').length;

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Organisation Structure</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Live organisation health monitor and structure</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Add Department
        </button>
      </div>

      {/* Add Department Form */}
      {showForm && (
        <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Add New Department</p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <input placeholder="Department Name" value={newDept.name}
              onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Department Head" value={newDept.head}
              onChange={(e) => setNewDept({ ...newDept, head: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Employee Count" type="number" value={newDept.employees}
              onChange={(e) => setNewDept({ ...newDept, employees: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Budget (e.g. ₹1.2Cr)" value={newDept.budget}
              onChange={(e) => setNewDept({ ...newDept, budget: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddDepartment}
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
          { label: 'Total Departments', value: departments.length.toString(), change: 'Registered' },
          { label: 'Total Employees', value: totalEmployees.toString(), change: 'Across departments' },
          { label: 'Avg Health Score', value: `${avgHealth}%`, change: avgHealth > 85 ? 'Above target' : 'Needs review' },
          { label: 'Critical Depts', value: criticalCount.toString(), change: 'Needs attention', alert: criticalCount > 0 },
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
          {loading ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>Loading...</p>
          ) : departments.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No departments yet. Click "+ Add Department"!</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #F2E9E4' }}>
                  {['ID', 'Department', 'Head', 'Employees', 'Budget', 'Health', 'Status', 'Action'].map((h) => (
                    <th key={h} className="text-left pb-3 text-xs font-medium uppercase tracking-widest"
                      style={{ color: '#9A8C98' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.docId} style={{ borderBottom: '1px solid #F2E9E4' }}>
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
                      <span className="text-xs px-2 py-0.5 rounded-full" style={healthStyle[dept.status] || healthStyle.Healthy}>
                        {dept.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button onClick={() => handleDeleteDepartment(dept.docId)}
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
      )}

      {/* Org Chart Tab — Now fully data-driven */}
      {activeTab === 'Org Chart' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#9A8C98' }}>
            Organisation Hierarchy
          </p>

           <div className="flex flex-col items-center mb-6">
  <div className="p-4 rounded-xl border text-center w-48 relative"
    style={{ backgroundColor: '#22223B', borderColor: '#22223B' }}>
    <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium"
      style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}>
      {ceo.name.split(' ').map(n => n[0]).join('')}
    </div>
    <p className="text-sm font-medium" style={{ color: '#F2E9E4' }}>{ceo.name}</p>
    <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{ceo.title}</p>
    <button onClick={() => { setEditCeo(true); setNewCeo({ name: ceo.name, title: ceo.title }); }}
      className="text-xs mt-2 px-2 py-0.5 rounded-lg"
      style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}>
      ✏️ Edit
    </button>
  </div>

  {/* Edit CEO Form */}
  {editCeo && (
    <div className="mt-3 p-3 rounded-xl border w-72"
      style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9A8C98' }}>Edit CEO</p>
      <input placeholder="CEO Name" value={newCeo.name}
        onChange={(e) => setNewCeo({ ...newCeo, name: e.target.value })}
        className="w-full text-xs p-2 rounded-lg border outline-none mb-2"
        style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
      <input placeholder="Title" value={newCeo.title}
        onChange={(e) => setNewCeo({ ...newCeo, title: e.target.value })}
        className="w-full text-xs p-2 rounded-lg border outline-none mb-2"
        style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
      <div className="flex gap-2">
        <button onClick={handleUpdateCeo}
          className="text-xs px-3 py-1.5 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          Save
        </button>
        <button onClick={() => setEditCeo(false)}
          className="text-xs px-3 py-1.5 rounded-lg border"
          style={{ borderColor: '#C9ADA7', color: '#4A4E69' }}>
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

          <div className="flex justify-center mb-4">
            <div className="w-px h-8" style={{ backgroundColor: '#C9ADA7' }}></div>
          </div>

          {departments.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>
              Add departments to build your org chart!
            </p>
          ) : (
            <>
              {/* Department Heads — pulled from real Firebase data */}
              <div className="flex justify-center gap-4 mb-4 flex-wrap">
                {departments.map((dept) => (
                  <div key={dept.docId} className="p-3 rounded-xl border text-center w-36"
                    style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
                    <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-medium"
                      style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                      {(dept.head || '').split(' ').map(n => n[0]).join('') || '—'}
                    </div>
                    <p className="text-xs font-medium" style={{ color: '#22223B' }}>{dept.head}</p>
                    <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Head of {dept.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-4">
                <div className="w-px h-8" style={{ backgroundColor: '#C9ADA7' }}></div>
              </div>

              {/* Departments below */}
              <div className="flex justify-center gap-4 flex-wrap">
                {departments.map((dept) => (
                  <div key={dept.docId + '-card'} className="p-3 rounded-xl border text-center w-36"
                    style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
                    <p className="text-xs font-medium" style={{ color: '#22223B' }}>{dept.name}</p>
                    <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{dept.employees} employees</p>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-2 inline-block"
                      style={healthStyle[dept.status] || healthStyle.Healthy}>
                      {dept.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Health Monitor Tab */}
      {activeTab === 'Health Monitor' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Live Department Health Monitor
          </p>
          {departments.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No departments yet!</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div key={dept.docId} className="p-4 rounded-xl border"
                  style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-medium" style={{ color: '#22223B' }}>{dept.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={healthStyle[dept.status] || healthStyle.Healthy}>
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
          )}
        </div>
      )}
    </div>
  );
}

export default Organisation;