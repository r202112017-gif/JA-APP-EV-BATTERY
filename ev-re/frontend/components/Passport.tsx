import React from 'react';
import { Card } from './ui/Card';
import { BATTERY_HEALTH_HISTORY, CARBON_STATS } from '../constants';
import { Fingerprint, Activity, Leaf, Zap } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

export const Passport: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon to-cyan-400 inline-flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-neon" />
            Digital Passport
          </h2>
          <p className="text-slate-400">Immutable lifecycle tracking & environmental impact.</p>
        </div>
        <div className="bg-slate-900/80 border border-neon/30 rounded-lg px-4 py-2 flex items-center gap-3 shadow-[0_0_10px_rgba(0,255,136,0.1)]">
          <div className="w-2 h-2 rounded-full bg-neon animate-pulse"></div>
          <span className="text-sm font-mono text-neon">ID: EVB-8842-X9</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-neon/10 rounded-lg border border-neon/20">
            <Activity className="w-6 h-6 text-neon" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Current SOH</p>
            <p className="text-2xl font-bold text-white">82.0%</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Total Cycles</p>
            <p className="text-2xl font-bold text-white">1,240</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Leaf className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">CO2 Offset</p>
            <p className="text-2xl font-bold text-white">2.59t</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-neon" />
            State of Health (SOH) Degradation
          </h3>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BATTERY_HEALTH_HISTORY} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis domain={['dataMin - 2', 100]} stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00ff88', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#00ff88' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="soh" 
                  stroke="#00ff88" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0f172a', stroke: '#00ff88', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#00ff88', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-neon" />
            Carbon Reduction Impact (kg CO2)
          </h3>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CARBON_STATS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00ff88', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="saved" radius={[0, 4, 4, 0]} barSize={30}>
                  {CARBON_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#00ff88' : '#00ff8880'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};