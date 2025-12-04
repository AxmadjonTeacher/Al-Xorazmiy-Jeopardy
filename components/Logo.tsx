import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Main Text */}
      <h1 className="font-serif-logo text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-wider uppercase leading-none text-center">
        AL-XORAZMIY
      </h1>
      
      {/* Subtext with lines */}
      <div className="flex items-center w-full gap-2 mt-1 px-1">
        <div className="h-[1.5px] flex-1 bg-teal-600 rounded-full"></div>
        <span className="text-teal-600 font-bold text-[8px] md:text-[10px] tracking-[0.25em] uppercase whitespace-nowrap">
          Quiz Game
        </span>
        <div className="h-[1.5px] flex-1 bg-teal-600 rounded-full"></div>
      </div>
    </div>
  );
};