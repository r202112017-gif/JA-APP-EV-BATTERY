import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Calculator as CalcIcon, Battery, Gauge, Calendar, DollarSign } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [capacity, setCapacity] = useState<number | ''>(75);
  const [mileage, setMileage] = useState<number | ''>(50000);
  const [year, setYear] = useState<number | ''>(2020);
  const [estimatedValue, setEstimatedValue] = useState<number>(0);

  useEffect(() => {
    calculateValue();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacity, mileage, year]);

  const calculateValue = () => {
    const cap = Number(capacity) || 0;
    const mil = Number(mileage) || 0;
    const yr = Number(year) || new Date().getFullYear();

    const marketPricePerKwh = 450; // HKD
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - yr);
    
    // DepreciationFactor = max(0.1, 1 - (Age * 0.08))
    const depreciationFactor = Math.max(0.1, 1 - (age * 0.08));
    
    // Mileage Factor = max(0.2, 1 - (Mileage/300000))
    const mileageFactor = Math.max(0.2, 1 - (mil / 300000));

    // Formula: (Capacity * MarketPrice) * MileageFactor * DepreciationFactor
    let value = (cap * marketPricePerKwh) * mileageFactor * depreciationFactor;
    
    // Add a premium for newer batteries regardless of mileage
    if (age <= 2) value *= 1.2;

    setEstimatedValue(Math.max(0, Math.round(value)));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon to-cyan-400 inline-flex items-center gap-3">
          <CalcIcon className="w-8 h-8 text-neon" />
          Smart Valuation Engine
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our AI-driven algorithm calculates the real-time recycling value of your EV battery based on current market material prices and degradation metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Battery Specifications</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <Battery className="w-4 h-4 text-neon" />
                Battery Capacity (kWh)
              </label>
              <input 
                type="number" 
                value={capacity}
                onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                placeholder="e.g. 75"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <Gauge className="w-4 h-4 text-neon" />
                Current Mileage (km)
              </label>
              <input 
                type="number" 
                value={mileage}
                onChange={(e) => setMileage(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                placeholder="e.g. 50000"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <Calendar className="w-4 h-4 text-neon" />
                Year of Production
              </label>
              <input 
                type="number" 
                value={year}
                onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                placeholder="e.g. 2020"
              />
            </div>
          </div>
        </Card>

        <Card glow className="flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 w-full">
            <h3 className="text-lg text-slate-400 mb-2 uppercase tracking-wider">Estimated Recovery Value</h3>
            <div className="flex items-center justify-center gap-2 mb-6">
              <DollarSign className="w-8 h-8 text-neon" />
              <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                {estimatedValue.toLocaleString()}
              </span>
              <span className="text-xl text-slate-400 self-end mb-2">HKD</span>
            </div>
            
            <div className="w-full bg-slate-900/50 rounded-lg p-4 border border-white/5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Material Recovery Rate</span>
                <span className="text-neon font-mono">92.4%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-neon h-2 rounded-full" style={{ width: '92.4%' }}></div>
              </div>
            </div>

            <button className="mt-8 w-full bg-neon text-slate-900 font-bold py-4 rounded-lg hover:bg-[#00cc6a] transition-colors shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)]">
              Initiate Recycle Process
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};