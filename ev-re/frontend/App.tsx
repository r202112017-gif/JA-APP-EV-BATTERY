import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { Locator } from './components/Locator';
import { Passport } from './components/Passport';
import { Battery, Map, Fingerprint, Zap } from 'lucide-react';

type Tab = 'calculator' | 'locator' | 'passport';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-neon selection:text-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.4)]">
              <Zap className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              EV<span className="text-neon">-RE</span>
            </h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <NavButton 
              active={activeTab === 'calculator'} 
              onClick={() => setActiveTab('calculator')}
              icon={<Battery className="w-4 h-4" />}
              label="Valuation"
            />
            <NavButton 
              active={activeTab === 'locator'} 
              onClick={() => setActiveTab('locator')}
              icon={<Map className="w-4 h-4" />}
              label="Network"
            />
            <NavButton 
              active={activeTab === 'passport'} 
              onClick={() => setActiveTab('passport')}
              icon={<Fingerprint className="w-4 h-4" />}
              label="Passport"
            />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 relative">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {activeTab === 'calculator' && <Calculator />}
          {activeTab === 'locator' && <Locator />}
          {activeTab === 'passport' && <Passport />}
        </div>
      </main>

      {/* Mobile Nav (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-4 z-50">
        <div className="flex justify-around">
          <MobileNavButton 
            active={activeTab === 'calculator'} 
            onClick={() => setActiveTab('calculator')}
            icon={<Battery className="w-6 h-6" />}
            label="Value"
          />
          <MobileNavButton 
            active={activeTab === 'locator'} 
            onClick={() => setActiveTab('locator')}
            icon={<Map className="w-6 h-6" />}
            label="Map"
          />
          <MobileNavButton 
            active={activeTab === 'passport'} 
            onClick={() => setActiveTab('passport')}
            icon={<Fingerprint className="w-6 h-6" />}
            label="Passport"
          />
        </div>
      </div>
    </div>
  );
};

// Helper Components for Navigation
const NavButton: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({active, onClick, icon, label}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
      ${active 
        ? 'bg-neon/10 text-neon shadow-[inset_0_0_10px_rgba(0,255,136,0.2)]' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
      }
    `}
  >
    {icon}
    {label}
  </button>
);

const MobileNavButton: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({active, onClick, icon, label}) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center gap-1 p-2 transition-colors
      ${active ? 'text-neon' : 'text-slate-500'}
    `}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;