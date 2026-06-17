import React from 'react';

const navItems = [
  { section: 'Core', items: ['Dashboard', 'Identity & Access', 'Organisation'] },
  { section: 'Operations', items: ['Onboarding', 'Offboarding', 'IT Assets'] },
  { section: 'AI Tools', items: ['Policy KB', 'Benefits Admin'] },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="w-52 h-screen overflow-y-auto flex-shrink-0 border-r"
      style={{ backgroundColor: '#fff', borderColor: '#C9ADA7' }}>

      {/* Logo */}
      <div className="p-4 border-b" style={{ borderColor: '#C9ADA7' }}>
        <div className="text-base font-medium" style={{ color: '#22223B' }}>NexusHCM</div>
        <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: '#9A8C98' }}>AI Native Platform</div>
      </div>

      {/* Nav */}
      {navItems.map((group) => (
        <div key={group.section}>
          <div className="px-4 pt-4 pb-1 text-xs tracking-widest uppercase"
            style={{ color: '#C9ADA7' }}>
            {group.section}
          </div>
          {group.items.map((item) => (
            <div key={item}
              onClick={() => setActivePage(item)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer text-sm border-l-2"
              style={{
                color: activePage === item ? '#22223B' : '#9A8C98',
                backgroundColor: activePage === item ? '#F2E9E4' : 'transparent',
                borderLeftColor: activePage === item ? '#22223B' : 'transparent',
                fontWeight: activePage === item ? 500 : 400,
              }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: activePage === item ? '#22223B' : '#C9ADA7' }}>
              </div>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;