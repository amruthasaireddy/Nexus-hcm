import React, { useState } from 'react';

const policies = [
  { id: 'POL001', title: 'Leave Policy', category: 'HR', lastUpdated: '01 Jun 2026', status: 'Active', views: 842 },
  { id: 'POL002', title: 'Code of Conduct', category: 'General', lastUpdated: '15 May 2026', status: 'Active', views: 1240 },
  { id: 'POL003', title: 'IT Security Policy', category: 'IT', lastUpdated: '10 Jun 2026', status: 'Active', views: 624 },
  { id: 'POL004', title: 'Work From Home Policy', category: 'HR', lastUpdated: '01 Apr 2026', status: 'Active', views: 2180 },
  { id: 'POL005', title: 'Travel & Expense Policy', category: 'Finance', lastUpdated: '20 May 2026', status: 'Active', views: 486 },
  { id: 'POL006', title: 'Data Privacy Policy', category: 'IT', lastUpdated: '05 Jun 2026', status: 'Under Review', views: 312 },
  { id: 'POL007', title: 'Anti Harassment Policy', category: 'General', lastUpdated: '01 Mar 2026', status: 'Active', views: 924 },
  { id: 'POL008', title: 'Recruitment Policy', category: 'HR', lastUpdated: '12 Jun 2026', status: 'Active', views: 368 },
];

const faqs = [
  { q: 'How many leaves can I take per year?', a: 'You are entitled to 24 casual leaves, 12 sick leaves, and 15 earned leaves per year as per the Leave Policy.' },
  { q: 'What is the WFH policy?', a: 'Employees can work from home up to 3 days per week with manager approval. Full remote is available for specific roles.' },
  { q: 'How do I claim travel expenses?', a: 'Submit your travel expense report within 7 days of travel via the Finance portal with receipts and manager approval.' },
];

const categoryStyle = {
  HR: { backgroundColor: '#eef0f8', color: '#4A4E69' },
  IT: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  Finance: { backgroundColor: '#fefce8', color: '#ca8a04' },
  General: { backgroundColor: '#F2E9E4', color: '#22223B' },
};

const statusStyle = {
  Active: { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' },
  'Under Review': { backgroundColor: '#fefce8', color: '#ca8a04', border: '1px solid #fde047' },
};

function PolicyKB() {
  const [search, setSearch] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Policies');

  const filtered = policies.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

   const handleAsk = async (question) => {
    const q = question || aiQuestion;
    if (!q.trim()) return;
    setAiLoading(true);
    setAiAnswer('');
    try {
      const res = await fetch('http://127.0.0.1:8000/ai/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });
      const data = await res.json();
      setAiAnswer(data.answer);
    } catch (err) {
      setAiAnswer('Sorry, AI is not available right now. Please try again.');
    }
    setAiLoading(false);
    setAiQuestion('');
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Policy Knowledge Base</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>AI powered policy search and management</p>
        </div>
        <button className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Add Policy
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Policies', value: '48', change: '8 updated this month' },
          { label: 'AI Resolution', value: '98%', change: 'Queries resolved by AI' },
          { label: 'Monthly Queries', value: '1,284', change: 'Policy questions asked' },
          { label: 'Under Review', value: '3', change: 'Pending approval', alert: true },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border"
            style={{
              backgroundColor: '#fff',
              borderColor: '#C9ADA7',
              borderLeft: stat.alert ? '3px solid #ca8a04' : undefined
            }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9A8C98' }}>{stat.label}</p>
            <p className="text-2xl font-medium" style={{ color: stat.alert ? '#ca8a04' : '#22223B' }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: '#4A4E69' }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">

        {/* Policy List */}
        <div className="col-span-2 p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>

          {/* Tabs */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {['Policies', 'Categories'].map((tab) => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-xs px-3 py-1.5 rounded-lg border"
                  style={{
                    backgroundColor: activeTab === tab ? '#22223B' : '#F2E9E4',
                    color: activeTab === tab ? '#F2E9E4' : '#4A4E69',
                    borderColor: '#C9ADA7'
                  }}>
                  {tab}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search policies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border outline-none"
              style={{ borderColor: '#C9ADA7', color: '#22223B', backgroundColor: '#F2E9E4' }}
            />
          </div>

          {activeTab === 'Policies' && (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #F2E9E4' }}>
                  {['ID', 'Policy', 'Category', 'Last Updated', 'Views', 'Status'].map((h) => (
                    <th key={h} className="text-left pb-3 text-xs font-medium uppercase tracking-widest"
                      style={{ color: '#9A8C98' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((policy) => (
                  <tr key={policy.id} style={{ borderBottom: '1px solid #F2E9E4' }}>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{policy.id}</td>
                    <td className="py-3 text-xs font-medium" style={{ color: '#22223B' }}>{policy.title}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={categoryStyle[policy.category]}>
                        {policy.category}
                      </span>
                    </td>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{policy.lastUpdated}</td>
                    <td className="py-3 text-xs" style={{ color: '#4A4E69' }}>{policy.views}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle[policy.status]}>
                        {policy.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'Categories' && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'HR Policies', count: 18, icon: '👥', color: '#eef0f8' },
                { name: 'IT Policies', count: 12, icon: '💻', color: '#f0fdf4' },
                { name: 'Finance Policies', count: 8, icon: '💰', color: '#fefce8' },
                { name: 'General Policies', count: 10, icon: '📋', color: '#F2E9E4' },
              ].map((cat) => (
                <div key={cat.name} className="p-4 rounded-xl border cursor-pointer"
                  style={{ backgroundColor: cat.color, borderColor: '#C9ADA7' }}>
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <p className="text-sm font-medium" style={{ color: '#22223B' }}>{cat.name}</p>
                  <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>{cat.count} policies</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Assistant */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border flex flex-col" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22223B' }}></div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#4A4E69' }}>AI Policy Assistant</p>
            </div>

            {/* AI Answer */}
            {aiLoading && (
              <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: '#F2E9E4' }}>
                <p className="text-xs" style={{ color: '#9A8C98' }}>AI is searching policies...</p>
              </div>
            )}
            {aiAnswer && (
              <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: '#F2E9E4' }}>
                <p className="text-xs font-medium mb-1" style={{ color: '#22223B' }}>AI Answer:</p>
                <p className="text-xs leading-relaxed" style={{ color: '#4A4E69' }}>{aiAnswer}</p>
              </div>
            )}

            {/* Quick Questions */}
            <p className="text-xs mb-2" style={{ color: '#9A8C98' }}>Quick questions:</p>
            <div className="space-y-2 mb-3">
              {faqs.map((faq, i) => (
                <button key={i}
                  onClick={() => handleAsk(faq.q)}
                  className="w-full text-left text-xs p-2 rounded-lg border"
                  style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7', color: '#4A4E69' }}>
                  {faq.q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-auto">
              <input
                className="flex-1 p-2 rounded-lg text-xs border outline-none"
                style={{ borderColor: '#C9ADA7', color: '#22223B', backgroundColor: '#F2E9E4' }}
                placeholder="Ask any policy question..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              />
              <button onClick={() => handleAsk()}
                className="px-3 py-2 rounded-lg text-xs font-medium"
                style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                Ask
              </button>
            </div>
          </div>

          {/* Most Viewed */}
          <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7' }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>Most Viewed</p>
            {policies.sort((a, b) => b.views - a.views).slice(0, 3).map((p, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b"
                style={{ borderColor: '#C9ADA7' }}>
                <p className="text-xs font-medium" style={{ color: '#22223B' }}>{p.title}</p>
                <p className="text-xs" style={{ color: '#9A8C98' }}>{p.views} views</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyKB;