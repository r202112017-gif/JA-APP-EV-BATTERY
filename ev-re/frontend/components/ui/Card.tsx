import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false }) => {
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-lg 
        border border-white/10 
        rounded-2xl p-6 
        ${glow ? 'shadow-[0_0_20px_rgba(0,255,136,0.15)] border-neon/30' : 'shadow-xl'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};