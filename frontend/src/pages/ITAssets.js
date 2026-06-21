 import React, { useState, useEffect } from 'react';

const maintenance = [
  { asset: 'HP LaserJet', type: 'Service', due: 'Today', priority: 'High' },
  { asset: 'Dell XPS 15', type: 'Repair', due: 'Tomorrow', priority: 'High' },
  { asset: 'Dell Monitor 27"', type: 'Inspection', due: '25 Jun', priority: 'Medium' },
  { asset: 'MacBook Pro 14"', type: 'Software Update', due: '28 Jun', priority: 'Low' },
];

const statusStyle = {
  Assigned: { backgroundColor: '#eef0f8', color: '#4A4E69', border: '1px solid #4A4E69' },
  Available: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  Maintenance: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' },
};

const conditionStyle = {
  New: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Good: { backgroundColor: '#F2E9E4', color: '#22223B' },
  Fair: { backgroundColor: '#fefce8', color: '#ca8a04' },
  Poor: { backgroundColor: '#fef2f2', color: '#dc2626' },
};

const priorityStyle = {
  High: { backgroundColor: '#fef2f2', color: '#dc2626' },
  Medium: { backgroundColor: '#fefce8', color: '#ca8a04' },
  Low: { backgroundColor: '#f0fdf4', color: '#16a34a' },
};

function ITAssets() {
  const API = 'http://127.0.0.1:8000';
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', type: '', assignedTo: 'Unassigned', dept: '', condition: 'New' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Inventory');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch(`${API}/assets`);
      const data = await res.json();
      setAssets(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching assets', err);
      setLoading(false);
    }
  };

  const handleAddAsset = async () => {
    if (!newAsset.name || !newAsset.type) return;
    try {
      const res = await fetch(`${API}/assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset)
      });
      const data = await res.json();
      setAssets([...assets, data]);
      setNewAsset({ name: '', type: '', assignedTo: 'Unassigned', dept: '', condition: 'New' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding asset', err);
    }
  };

  const handleDeleteAsset = async (docId) => {
    try {
      await fetch(`${API}/assets/${docId}`, { method: 'DELETE' });
      setAssets(assets.filter(a => a.docId !== docId));
    } catch (err) {
      console.error('Error deleting asset', err);
    }
  };

  const filtered = assets.filter(asset => {
    const matchSearch = (asset.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (asset.id || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || asset.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>IT Asset Tracking</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Track and manage all IT assets across the organisation</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Add Asset
        </button>
      </div>

      {/* Add Asset Form */}
      {showForm && (
        <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Add New Asset</p>
          <div className="grid grid-cols-5 gap-2 mb-3">
            <input placeholder="Asset Name" value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Type (Laptop, Mobile...)" value={newAsset.type}
              onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Assigned To" value={newAsset.assignedTo}
              onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <input placeholder="Department" value={newAsset.dept}
              onChange={(e) => setNewAsset({ ...newAsset, dept: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }} />
            <select value={newAsset.condition}
              onChange={(e) => setNewAsset({ ...newAsset, condition: e.target.value })}
              className="text-xs p-2 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', backgroundColor: '#F2E9E4', color: '#22223B' }}>
              <option>New</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddAsset}
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
          { label: 'Total Assets', value: assets.length.toString(), change: '+24 this month' },
          { label: 'Assigned', value: assets.filter(a => a.status === 'Assigned').length.toString(), change: 'Currently in use' },
          { label: 'Available', value: assets.filter(a => a.status === 'Available').length.toString(), change: 'Ready to assign' },
          { label: 'Maintenance', value: assets.filter(a => a.status === 'Maintenance').length.toString(), change: 'Need attention', alert: true },
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
        {['Inventory', 'Maintenance', 'AI Health'].map((tab) => (
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

      {/* Inventory Tab */}
      {activeTab === 'Inventory' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#9A8C98' }}>Asset Inventory</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border outline-none"
                style={{ borderColor: '#C9ADA7', color: '#22223B', backgroundColor: '#F2E9E4' }}
              />
              {['All', 'Assigned', 'Available', 'Maintenance'].map((f) => (
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
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>Loading assets...</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: '#9A8C98' }}>No assets yet. Click "+ Add Asset" to get started!</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #F2E9E4' }}>
                  {['ID', 'Asset', 'Type', 'Assigned To', 'Department', 'Condition', 'Status', 'Action'].map((h) => (
                    <th key={h} className="text-left pb-3 text-xs font-medium uppercase tracking-widest"
                      style={{ color: '#9A8C98' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((asset) => (
                  <tr key={asset.docId} style={{ borderBottom: '1px solid #F2E9E4' }}>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{asset.id}</td>
                    <td className="py-3 text-xs font-medium" style={{ color: '#22223B' }}>{asset.name}</td>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{asset.type}</td>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{asset.assignedTo}</td>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{asset.dept}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={conditionStyle[asset.condition] || conditionStyle.Good}>
                        {asset.condition}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle[asset.status] || statusStyle.Available}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button onClick={() => handleDeleteAsset(asset.docId)}
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

      {/* Maintenance Tab */}
      {activeTab === 'Maintenance' && (
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Maintenance Schedule
          </p>
          <div className="space-y-3">
            {maintenance.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border"
                style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: '#fff' }}>
                    📦
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#22223B' }}>{item.asset}</p>
                    <p className="text-xs" style={{ color: '#9A8C98' }}>{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs" style={{ color: '#4A4E69' }}>Due: {item.due}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={priorityStyle[item.priority]}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Health Tab */}
      {activeTab === 'AI Health' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
              Asset Health by Type
            </p>
            {[
              { type: 'Laptops', health: 92, count: 842 },
              { type: 'Mobiles', health: 88, count: 624 },
              { type: 'Monitors', health: 95, count: 1240 },
              { type: 'Tablets', health: 90, count: 312 },
              { type: 'Printers', health: 72, count: 84 },
            ].map((item) => (
              <div key={item.type} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#4A4E69' }}>{item.type} ({item.count})</span>
                  <span className="font-medium" style={{ color: '#22223B' }}>{item.health}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: '#F2E9E4' }}>
                  <div className="h-1.5 rounded-full"
                    style={{
                      width: `${item.health}%`,
                      background: item.health > 90
                        ? 'linear-gradient(90deg, #9A8C98, #22223B)'
                        : item.health > 80
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
              <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Recommendations</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Replace HP LaserJet', desc: 'Printer is in poor condition. Recommend replacement within 30 days.', priority: 'High' },
                { title: 'Schedule Monitor Inspection', desc: '24 monitors due for annual inspection this month.', priority: 'Medium' },
                { title: 'Software Updates Pending', desc: '142 laptops have pending security updates.', priority: 'High' },
                { title: 'Asset Utilization Low', desc: '186 assets unassigned. Consider redistribution.', priority: 'Low' },
              ].map((rec, i) => (
                <div key={i} className="p-3 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-medium" style={{ color: '#22223B' }}>{rec.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={priorityStyle[rec.priority]}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ITAssets;