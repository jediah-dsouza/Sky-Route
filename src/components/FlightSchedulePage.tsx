import React, { useState } from 'react';
import { BackpackCalendar } from './BackpackCalendar.tsx';
import { Airport } from '../types.ts';
import { POPULAR_AIRPORTS, DAY_FARE_ESTIMATES } from '../data/sampleFlights.ts';
import { Calendar as CalendarIcon, ArrowRight, ArrowRightLeft, Sparkles, MapPin, Users } from 'lucide-react';

interface FlightSchedulePageProps {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
  onContinue: () => void;
  origin: Airport;
  destination: Airport;
  onOriginChange: (airport: Airport) => void;
  onDestinationChange: (airport: Airport) => void;
  passengersCount: number;
  onPassengersCountChange: (count: number) => void;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  onCabinClassChange: (cabin: 'Economy' | 'Premium Economy' | 'Business' | 'First') => void;
}

export const FlightSchedulePage: React.FC<FlightSchedulePageProps> = ({
  selectedDate,
  onDateChange,
  onContinue,
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  passengersCount,
  onPassengersCountChange,
  cabinClass,
  onCabinClassChange,
}) => {
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [routeType, setRouteType] = useState<'oneway' | 'roundtrip'>('oneway');

  // Format chosen date nicely
  const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const dayNumber = selectedDate.getDate();
  const estimatedFare = DAY_FARE_ESTIMATES[dayNumber]?.price || 54;

  const handleSwapAirports = () => {
    const temp = origin;
    onOriginChange(destination);
    onDestinationChange(temp);
  };

  return (
    <main
      id="flight-schedule-main"
      className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center"
    >
      {/* Search Route & Trip Details Overview Banner */}
      <div className="w-full bg-[#f9f9fa] border border-[#e6e9eb] rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#e6e9eb]">
          {/* Trip type toggle */}
          <div className="flex items-center gap-1 bg-[#e6e9eb]/60 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRouteType('oneway')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                routeType === 'oneway' ? 'bg-white text-[#0062e3] shadow-xs' : 'text-[#6e747e]'
              }`}
            >
              One-way
            </button>
            <button
              type="button"
              onClick={() => setRouteType('roundtrip')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                routeType === 'roundtrip' ? 'bg-white text-[#0062e3] shadow-xs' : 'text-[#6e747e]'
              }`}
            >
              Round-trip
            </button>
          </div>

          {/* Cabin & Passenger options */}
          <div className="flex items-center gap-3 text-xs font-semibold text-[#313f4d]">
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#e6e9eb]">
              <Users className="w-3.5 h-3.5 text-[#0062e3]" />
              <select
                aria-label="Number of passengers"
                value={passengersCount}
                onChange={(e) => onPassengersCountChange(Number(e.target.value))}
                className="bg-transparent font-bold text-[#161616] focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Traveler</option>
                <option value={2}>2 Travelers</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4 Travelers</option>
              </select>
            </div>

            <select
              aria-label="Cabin Class"
              value={cabinClass}
              onChange={(e) => onCabinClassChange(e.target.value as any)}
              className="bg-white px-2.5 py-1 rounded-lg border border-[#e6e9eb] font-bold text-[#161616] focus:outline-none cursor-pointer text-xs"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>
        </div>

        {/* Origin to Destination Route Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="flex-1 w-full bg-white p-3 rounded-xl border border-[#e6e9eb] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#e3f0ff] flex items-center justify-center text-[#0062e3]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">From</span>
                <span className="text-sm font-extrabold text-[#161616]">{origin.city} ({origin.code})</span>
              </div>
            </div>
            <span className="text-xs text-[#6e747e] hidden md:inline truncate max-w-[120px]">{origin.name}</span>
          </div>

          <button
            type="button"
            onClick={handleSwapAirports}
            className="w-8 h-8 rounded-full bg-white border border-[#e6e9eb] hover:bg-[#f2f4f5] text-[#0062e3] flex items-center justify-center cursor-pointer shadow-xs transition-transform active:rotate-180"
            title="Swap Origin and Destination"
            aria-label="Swap Origin and Destination"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 w-full bg-white p-3 rounded-xl border border-[#e6e9eb] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0fa1a9]/15 flex items-center justify-center text-[#0fa1a9]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">To</span>
                <span className="text-sm font-extrabold text-[#161616]">{destination.city} ({destination.code})</span>
              </div>
            </div>
            <span className="text-xs text-[#6e747e] hidden md:inline truncate max-w-[120px]">{destination.name}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowRouteModal(true)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-white border border-[#0062e3] text-[#0062e3] hover:bg-[#e3f0ff] rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
          >
            Change Route
          </button>
        </div>
      </div>

      {/* PRD Level 1 Requirement: Standard HTML Heading <h1>Flight Schedule</h1> */}
      <div className="w-full text-center sm:text-left mb-6">
        <h1
          id="flight-schedule-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#161616] tracking-tight mb-2"
        >
          Flight Schedule
        </h1>
        <p className="text-sm sm:text-base text-[#6e747e] font-medium max-w-xl">
          Select your departure date using the Backpack interactive calendar below to view live flight times, seat availability, and low-fare estimates.
        </p>
      </div>

      {/* Selected Date Callout / Live Summary */}
      <div className="w-full max-w-2xl bg-[#e3f0ff] border border-[#b2d5ff] rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0062e3] text-white flex items-center justify-center shrink-0 shadow-sm">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#0062e3] uppercase tracking-wider block">Selected Travel Date</span>
            <span className="text-base sm:text-lg font-black text-[#161616]">{formattedSelectedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#b2d5ff] shrink-0">
          <Sparkles className="w-4 h-4 text-[#0fa1a9]" />
          <div className="text-right">
            <span className="text-[10px] text-[#6e747e] font-bold block">Lowest Fare</span>
            <span className="text-sm font-extrabold text-[#0fa1a9]">from £{estimatedFare}</span>
          </div>
        </div>
      </div>

      {/* PRD Level 2 Requirement: Backpack React Calendar */}
      <div className="w-full max-w-2xl mb-8">
        <BackpackCalendar
          id="backpack-flight-calendar"
          selectedDate={selectedDate}
          onDateSelect={onDateChange}
        />
      </div>

      {/* PRD Level 3 Requirement: Continue Button (Must appear below Calendar) */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        <button
          type="button"
          id="continue-button"
          onClick={onContinue}
          className="w-full sm:w-auto min-w-[280px] bg-[#0062e3] hover:bg-[#004ebd] active:bg-[#003b8e] text-white font-extrabold text-base py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0062e3]/30 tracking-tight"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <span className="text-xs text-[#9298a0] mt-2 font-medium">
          Proceeds to live flight search results for {origin.code} → {destination.code}
        </span>
      </div>

      {/* Route Switcher Modal */}
      {showRouteModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="route-modal-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e6e9eb]">
            <h3 id="route-modal-title" className="text-xl font-black text-[#161616] mb-1">
              Select Flight Route
            </h3>
            <p className="text-xs text-[#6e747e] mb-4">
              Choose from popular Skyscanner European & Worldwide destinations:
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-[#161616] mb-1">Origin City</label>
                <select
                  value={origin.code}
                  onChange={(e) => {
                    const found = POPULAR_AIRPORTS.find((a) => a.code === e.target.value);
                    if (found) onOriginChange(found);
                  }}
                  className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
                >
                  {POPULAR_AIRPORTS.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code}) - {airport.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#161616] mb-1">Destination City</label>
                <select
                  value={destination.code}
                  onChange={(e) => {
                    const found = POPULAR_AIRPORTS.find((a) => a.code === e.target.value);
                    if (found) onDestinationChange(found);
                  }}
                  className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
                >
                  {POPULAR_AIRPORTS.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code}) - {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRouteModal(false)}
                className="px-4 py-2 bg-[#0062e3] text-white rounded-xl text-xs font-bold hover:bg-[#004ebd] transition-colors cursor-pointer"
              >
                Apply Route
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
