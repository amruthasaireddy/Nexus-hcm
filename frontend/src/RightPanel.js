 import React, { useState } from 'react';

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
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('http://127.0.0.1:8000/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question,
          context: 'NexusHCM enterprise HR platform with 1284 employees'
        })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('AI unavailable. Check backend.');
    }
    setLoading(false);
    setQuestion('');
  };

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
              style={{
                width: `${item.percent}%`,
                background: 'linear-gradient(90deg, #9A8C98, #22223B)'
              }}>
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
        <div key={i} className="flex gap-2 pb-3 mb-3 border-b"
          style={{ borderColor: '#F2E9E4' }}>
          <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: '#C9ADA7' }}></div>
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

      {/* AI Assistant */}
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9A8C98' }}>
        AI Assistant
      </p>

      {/* Answer */}
      {loading && (
        <div className="p-2 rounded-lg mb-2" style={{ backgroundColor: '#F2E9E4' }}>
          <p className="text-xs" style={{ color: '#9A8C98' }}>AI thinking...</p>
        </div>
      )}
      {answer && (
        <div className="p-2 rounded-lg mb-2" style={{ backgroundColor: '#F2E9E4' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#4A4E69' }}>{answer}</p>
        </div>
      )}

      {/* Quick Questions */}
      <div className="space-y-1 mb-3">
        {[
          'How many employees onboarding?',
          'Any security alerts?',
          'Benefits enrollment status?',
        ].map((q) => (
          <button key={q}
            onClick={() => { setQuestion(q); }}
            className="w-full text-left text-xs p-2 rounded-lg border"
            style={{ backgroundColor: '#F2E9E4', borderColor: '#C9ADA7', color: '#4A4E69' }}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex flex-col gap-2">
        <input
          className="w-full p-2 rounded-lg text-xs border outline-none"
          style={{ borderColor: '#C9ADA7', color: '#22223B', backgroundColor: '#F2E9E4' }}
          placeholder="Ask AI anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button onClick={handleAsk}
          className="w-full py-2 rounded-lg text-xs font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          Ask AI
        </button>
      </div>
    </div>
  );
}

export default RightPanel;