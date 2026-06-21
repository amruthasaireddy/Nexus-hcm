import React, { useState, useEffect } from 'react';

const plans = [
  { name: 'Basic Plan', price: '₹2,400/mo', employees: 342, coverage: 'Health only', color: '#F2E9E4' },
  { name: 'Standard Plan', price: '₹4,800/mo', employees: 624, coverage: 'Health + Dental + Life', color: '#eef0f8' },
  { name: 'Premium Plan', price: '₹8,400/mo', employees: 318, coverage: 'Full Coverage', color: '#22223B' },
];

const statusStyle = {
  Enrolled: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Partial: { backgroundColor: '#fefce8', color: '#ca8a04', border: '1px solid #fde047' },
  Pending: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
};

const planStyle = {
  Premium: { backgroundColor: '#22223B', color: '#F2E9E4' },
  Standard: { backgroundColor: '#eef0f8', color: '#4A4E69' },
  Basic: { backgroundColor: '#F2E9E4', color: '#9A8C98' },
};

function BenefitsAdmin() {
  const API = 'http://127.0.0.1:8000';
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', dept: '', plan: 'Standard' });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const res = await fetch(`${API}/benefits`);
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching benefits', err);
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.dept) return;
    try {
      const res = await fetch(`${API}/benefits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      const data = await res.json();
      setEmployees([...employees, data]);
      setNewEmployee({ name: '', dept: '', plan: 'Standard' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding employee benefit', err);
    }
  };

  const handleDeleteEmployee = async (docId) => {
    try {
      await fetch(`${API}/benefits/${docId}`, { method: 'DELETE' });
      setEmployees(employees.filter(e => e.docId !== docId));
    } catch (err) {
      console.error('Error deleting employee benefit', err);
    }
  };

  const filtered = employees.filter(e =>
    (e.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (e.dept || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Benefits Administration</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Manage employee benefits and enrollment</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Add Benefit
        </button>
      </div>

      {/* Add Employee Form */}
      {showForm && (
        <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Enroll Employee in Benefits</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <input placeholder="Full Name" value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Department" value={newEmployee.dept}
              onChange={(e) => setNewEmployee({ ...newEmployee, dept: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <select value={newEmployee.plan}
              onChange={(e) => setNewEmployee({ ...newEmployee, plan: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}>
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
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
          { label: 'Total Enrolled', value: employees.length.toString(), change: 'Employees enrolled' },
          { label: 'Pending Enrollment', value: employees.filter(e => e.status === 'Pending').length.toString(), change: 'Action required', alert: true },
          { label: 'Monthly Cost', value: '₹48L', change: 'Total benefits spend' },
          { label: 'AI Savings', value: '₹4.2L', change: 'Identified this quarter' },
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
        {['Overview', 'Enrollment', 'AI Insights'].map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-3 gap-4">

          <div className="col-span-2 p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>Benefit Plans</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {plans.map((plan) => (
                <div key={plan.name} className="p-4 rounded-xl"
                  style={{ backgroundColor: plan.color, border: `1px solid #C9ADA7` }}>
                  <p className="text-sm font-medium mb-1"
                    style={{ color: plan.color === '#22223B' ? '#F2E9E4' : '#22223B' }}>
                    {plan.name}
                  </p>
                  <p className="text-lg font-medium mb-1"
                    style={{ color: plan.color === '#22223B' ? '#C9ADA7' : '#4A4E69' }}>
                    {plan.price}
                  </p>
                  <p className="text-xs mb-2"
                    style={{ color: plan.color === '#22223B' ? '#9A8C98' : '#9A8C98' }}>
                    {plan.coverage}
                  </p>
                  <p className="text-xs font-medium"
                    style={{ color: plan.color === '#22223B' ? '#F2E9E4' : '#22223B' }}>
                    {plan.employees} employees
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
              Coverage Breakdown
            </p>
            {[
              { name: 'Health Insurance', enrolled: 1102, percent: 86 },
              { name: 'Dental Coverage', enrolled: 842, percent: 66 },
              { name: 'Vision Coverage', enrolled: 624, percent: 49 },
              { name: 'Life Insurance', enrolled: 968, percent: 75 },
            ].map((item) => (
              <div key={item.name} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#4A4E69' }}>{item.name}</span>
                  <span style={{ color: '#22223B' }}>{item.enrolled} ({item.percent}%)</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: '#F2E9E4' }}>
                  <div className="h-1.5 rounded-full"
                    style={{ width: `${item.percent}%`, background: 'linear-gradient(90deg, #9A8C98, #22223B)' }}>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22223B' }}></div>
                <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Recommendations</p>
              </div>
              <div className="space-y-2">
                {[
                  { title: '182 employees not enrolled', desc: 'Send enrollment reminder to pending employees immediately.', priority: 'High' },
                  { title: 'Vision coverage underutilized', desc: 'Only 49% enrolled. Consider promoting vision benefits.', priority: 'Medium' },
                  { title: 'Cost optimization opportunity', desc: 'Switch 124 Basic plan users to group plan to save ₹4.2L.', priority: 'Low' },
                ].map((rec, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: '#fff' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: '#22223B' }}>{rec.title}</p>
                    <p className="text-xs" style={{ color: '#9A8C98' }}>{rec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Quick Stats</p>
              {[
                { label: 'Avg Benefits/Employee', value: '₹4,200' },
                { label: 'Most Popular Plan', value: 'Standard' },
                { label: 'Renewal Date', value: '01 Apr 2027' },
                { label: 'Insurance Provider', value: 'Star Health' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b"
                  style={{ borderColor: '#F2E9E4' }}>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{item.label}</p>
                  <p className="text-xs font-medium" style={{ color: '#22223B' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Tab */}
      {activeTab === 'Enrollment' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#9A8C98' }}>Employee Enrollment</p>
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', color: '#22223B', backgroundColor: '#F2E9E4' }}
            />
          </div>

          {loading ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No employees enrolled yet. Click "+ Add Benefit"!</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #F2E9E4' }}>
                  {['Employee', 'Department', 'Plan', 'Health', 'Dental', 'Vision', 'Life', 'Status', 'Action'].map((h) => (
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
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                          {(emp.name || '').split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-medium" style={{ color: '#22223B' }}>{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{emp.dept}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={planStyle[emp.plan] || planStyle.Standard}>
                        {emp.plan}
                      </span>
                    </td>
                    <td className="py-3 text-center text-sm">{emp.health ? '✅' : '❌'}</td>
                    <td className="py-3 text-center text-sm">{emp.dental ? '✅' : '❌'}</td>
                    <td className="py-3 text-center text-sm">{emp.vision ? '✅' : '❌'}</td>
                    <td className="py-3 text-center text-sm">{emp.life ? '✅' : '❌'}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle[emp.status] || statusStyle.Enrolled}>
                        {emp.status}
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
      )}

      {/* AI Insights Tab */}
      {activeTab === 'AI Insights' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
              Benefits Utilization
            </p>
            {[
              { dept: 'Engineering', utilization: 94 },
              { dept: 'HR', utilization: 98 },
              { dept: 'Product', utilization: 82 },
              { dept: 'Analytics', utilization: 88 },
              { dept: 'Design', utilization: 76 },
              { dept: 'Sales', utilization: 71 },
            ].map((item) => (
              <div key={item.dept} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#4A4E69' }}>{item.dept}</span>
                  <span style={{ color: '#22223B' }}>{item.utilization}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: '#F2E9E4' }}>
                  <div className="h-1.5 rounded-full"
                    style={{
                      width: `${item.utilization}%`,
                      background: item.utilization > 90
                        ? 'linear-gradient(90deg, #9A8C98, #22223B)'
                        : item.utilization > 80
                        ? 'linear-gradient(90deg, #ca8a04, #fde047)'
                        : 'linear-gradient(90deg, #dc2626, #fca5a5)'
                    }}>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22223B' }}></div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Cost Analysis</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Potential Savings', value: '₹4.2L/quarter', desc: 'By optimizing plan allocation across departments' },
                { title: 'Underutilized Benefits', value: 'Vision - 49%', desc: 'Low enrollment in vision coverage across all departments' },
                { title: 'High Claims Dept', value: 'Engineering', desc: 'Highest claims ratio — consider wellness programs' },
                { title: 'Renewal Negotiation', value: '₹8.4L savings', desc: 'AI recommends renegotiating with Star Health in Q4' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-medium" style={{ color: '#22223B' }}>{item.title}</p>
                    <p className="text-xs font-medium" style={{ color: '#4A4E69' }}>{item.value}</p>
                  </div>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BenefitsAdmin;