import React, { useState } from 'react';

const onboardingEmployees = [
  {
    id: 'ONB001',
    name: 'Priya Sharma',
    role: 'HR Manager',
    dept: 'Human Resources',
    startDate: '15 Jun 2026',
    progress: 75,
    currentStep: 'IT Setup',
    initials: 'PS',
    steps: [
      { name: 'Document Verification', status: 'Done' },
      { name: 'System Access', status: 'Done' },
      { name: 'IT Setup', status: 'Active' },
      { name: 'Team Introduction', status: 'Pending' },
      { name: 'Training Program', status: 'Pending' },
    ]
  },
  {
    id: 'ONB002',
    name: 'Dev Malhotra',
    role: 'Marketing Lead',
    dept: 'Marketing',
    startDate: '16 Jun 2026',
    progress: 40,
    currentStep: 'System Access',
    initials: 'DM',
    steps: [
      { name: 'Document Verification', status: 'Done' },
      { name: 'System Access', status: 'Active' },
      { name: 'IT Setup', status: 'Pending' },
      { name: 'Team Introduction', status: 'Pending' },
      { name: 'Training Program', status: 'Pending' },
    ]
  },
  {
    id: 'ONB003',
    name: 'Anjali Singh',
    role: 'Data Scientist',
    dept: 'Analytics',
    startDate: '17 Jun 2026',
    progress: 20,
    currentStep: 'Document Verification',
    initials: 'AS',
    steps: [
      { name: 'Document Verification', status: 'Active' },
      { name: 'System Access', status: 'Pending' },
      { name: 'IT Setup', status: 'Pending' },
      { name: 'Team Introduction', status: 'Pending' },
      { name: 'Training Program', status: 'Pending' },
    ]
  },
];

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
  const [selected, setSelected] = useState(onboardingEmployees[0]);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: '#22223B' }}>Onboarding Journey Engine</h1>
          <p className="text-xs mt-1" style={{ color: '#9A8C98' }}>Personalised onboarding journeys powered by AI</p>
        </div>
        <button className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
          + Start Onboarding
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Active Onboarding', value: '24', change: '8 completing today' },
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
          {onboardingEmployees.map((emp) => (
            <div key={emp.id}
              onClick={() => setSelected(emp)}
              className="p-3 rounded-lg mb-2 cursor-pointer border"
              style={{
                backgroundColor: selected.id === emp.id ? '#F2E9E4' : '#fff',
                borderColor: selected.id === emp.id ? '#22223B' : '#C9ADA7'
              }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}>
                  {emp.initials}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: '#22223B' }}>{emp.name}</p>
                  <p className="text-xs" style={{ color: '#9A8C98' }}>{emp.role}</p>
                </div>
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
          ))}
        </div>

        {/* Journey Details */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9A8C98' }}>
            Journey Progress
          </p>

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
            {selected.steps.map((step, i) => (
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
                'Assign Python training for Data role',
                'Add to Analytics Slack channel',
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