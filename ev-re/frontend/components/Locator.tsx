import React, { useState } from 'react';
import { Card } from './ui/Card';
import { RECYCLING_POINTS } from '../constants';
import { MapPin, ShieldCheck, Navigation } from 'lucide-react';

type District = 'All' | 'NT' | 'Kowloon' | 'HK Island';

export const Locator: React.FC = () => {
  const [filter, setFilter] = useState<District>('All');

  const filteredPoints = RECYCLING_POINTS.filter(
    point => filter === 'All' || point.district === filter
  );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon to-cyan-400 inline-flex items-center gap-3">
          <MapPin className="w-8 h-8 text-neon" />
          Recycling Network
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Locate certified EV battery collection and processing facilities across Hong Kong. Ensure safe and eco-friendly disposal.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All', 'NT', 'Kowloon', 'HK Island'].map((district) => (
          <button
            key={district}
            onClick={() => setFilter(district as District)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              filter === district
                ? 'bg-neon/20 border-neon text-neon shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            {district}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPoints.map((point) => (
          <Card key={point.id} className="group hover:border-neon/50 transition-colors duration-300 relative overflow-hidden">
            {point.name.includes('EcoPark') && (
              <div className="absolute top-0 right-0 bg-neon text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                Primary Hub
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-neon transition-colors">{point.name}</h3>
                <span className="inline-block px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 mb-3">
                  {point.district}
                </span>
              </div>
              {point.certified && (
                <ShieldCheck className="w-6 h-6 text-neon flex-shrink-0" title="Certified Facility" />
              )}
            </div>
            
            <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {point.address}
            </p>

            <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-neon/10 border border-white/10 hover:border-neon/50 text-white py-2 rounded-lg transition-all text-sm">
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
          </Card>
        ))}
      </div>
      
      {filteredPoints.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No facilities found in this district yet.
        </div>
      )}
    </div>
  );
};