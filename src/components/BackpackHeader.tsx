import React from 'react';
import { Plane, Calendar as CalendarIcon, Globe, ShieldCheck } from 'lucide-react';
import { Airport } from '../types.ts';

interface BackpackHeaderProps {
  origin: Airport;
  destination: Airport;
  selectedDate: Date;
  onNavigateHome: () => void;
}

export const BackpackHeader: React.FC<BackpackHeaderProps> = ({
  origin,
  destination,
  selectedDate,
  onNavigateHome,
}) => {
  const formattedDate = selectedDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <header className="bg-[#05203d] text-white border-b border-[#14365d] sticky top-0 z-40 shadow-sm">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0062e3] rounded-md px-1 py-0.5"
              aria-label="Backpack Skyscanner Flights Home"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0062e3] flex items-center justify-center shadow-md group-hover:bg-[#004ebd] transition-colors">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  Sky-Route <span className="text-[#0062e3] font-extrabold text-xs px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-wider"></span>
                </span>
                <span className="text-[11px] text-[#9298a0] -mt-1 font-medium">Flight Booking Management System</span>
              </div>
            </button>

            {/* Route summary badge */}
            <div className="hidden md:flex items-center gap-2 text-xs bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors border border-white/10 text-[#dce0e4]">
              <span className="font-bold text-white">{origin.code}</span>
              <span className="text-[#0062e3] font-bold">→</span>
              <span className="font-bold text-white">{destination.code}</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1 text-white/90">
                <CalendarIcon className="w-3 h-3 text-[#0062e3]" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Right utilities */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="hidden sm:flex items-center gap-1.5 text-[#dce0e4] hover:text-white px-2.5 py-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-[#0062e3]" />
              <span>EN • GBP (£)</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-[#0fa1a9] bg-[#0fa1a9]/10 px-2.5 py-1.5 rounded-full border border-[#0fa1a9]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Best Price Guarantee</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="bg-[#0062e3] hover:bg-[#004ebd] active:bg-[#003b8e] text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm text-xs"
            >
              Flight Schedule
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
