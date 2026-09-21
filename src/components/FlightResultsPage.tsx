import React, { useState } from 'react';
import { Flight, Airport } from '../types.ts';
import { SAMPLE_FLIGHTS } from '../data/sampleFlights.ts';
import { Plane, Clock, ArrowRight, ArrowLeft, Leaf, Luggage, Check, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface FlightResultsPageProps {
  selectedDate: Date;
  origin: Airport;
  destination: Airport;
  cabinClass: string;
  passengersCount: number;
  onSelectFlight: (flight: Flight) => void;
  onBackToSchedule: () => void;
}

export const FlightResultsPage: React.FC<FlightResultsPageProps> = ({
  selectedDate,
  origin,
  destination,
  cabinClass,
  passengersCount,
  onSelectFlight,
  onBackToSchedule,
}) => {
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | '1stop'>('all');
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'eco'>('cheapest');
  const [selectedAirline, setSelectedAirline] = useState<string>('all');

  const formattedDate = selectedDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Filter flights
  let filtered = SAMPLE_FLIGHTS.filter((f) => {
    if (filterStops === 'direct' && f.stops !== 0) return false;
    if (filterStops === '1stop' && f.stops !== 1) return false;
    if (selectedAirline !== 'all' && f.airline !== selectedAirline) return false;
    return true;
  });

  // Sort flights
  filtered.sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'fastest') {
      const durA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1] || '0');
      const durB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1] || '0');
      return durA - durB;
    }
    if (sortBy === 'eco') return a.carbonEmissionKg - b.carbonEmissionKg;
    return 0;
  });

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
      {/* Route header with date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e6e9eb]">
        <div>
          <button
            onClick={onBackToSchedule}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0062e3] hover:underline mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Flight Schedule
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight">
              {origin.city} ({origin.code}) to {destination.city} ({destination.code})
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e747e] font-medium mt-1">
            {formattedDate} • {passengersCount} Traveler{passengersCount > 1 ? 's' : ''} • {cabinClass}
          </p>
        </div>

        <div className="bg-[#e3f0ff] border border-[#b2d5ff] rounded-xl px-4 py-2 text-right shrink-0">
          <span className="text-[11px] font-bold text-[#0062e3] uppercase tracking-wider block">Available Flights</span>
          <span className="text-lg font-black text-[#161616]">{filtered.length} Options</span>
        </div>
      </div>

      {/* Control bar: Quick sorts and filters */}
      <div className="bg-white border border-[#e6e9eb] rounded-2xl p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Sort Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#6e747e] flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
          </span>
          <div className="flex items-center gap-1 bg-[#f2f4f5] p-1 rounded-xl">
            <button
              onClick={() => setSortBy('cheapest')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sortBy === 'cheapest' ? 'bg-white text-[#0062e3] shadow-xs' : 'text-[#6e747e]'
              }`}
            >
              Cheapest
            </button>
            <button
              onClick={() => setSortBy('fastest')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sortBy === 'fastest' ? 'bg-white text-[#0062e3] shadow-xs' : 'text-[#6e747e]'
              }`}
            >
              Fastest
            </button>
            <button
              onClick={() => setSortBy('eco')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sortBy === 'eco' ? 'bg-white text-[#0fa1a9] shadow-xs' : 'text-[#6e747e]'
              }`}
            >
              Eco-Choice
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#6e747e] font-semibold">Stops:</span>
            <select
              value={filterStops}
              onChange={(e) => setFilterStops(e.target.value as any)}
              className="bg-[#f2f4f5] px-2.5 py-1 rounded-lg font-bold text-[#161616] focus:outline-none cursor-pointer"
            >
              <option value="all">Any stops</option>
              <option value="direct">Direct flights only</option>
              <option value="1stop">Up to 1 stop</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#6e747e] font-semibold">Airline:</span>
            <select
              value={selectedAirline}
              onChange={(e) => setSelectedAirline(e.target.value)}
              className="bg-[#f2f4f5] px-2.5 py-1 rounded-lg font-bold text-[#161616] focus:outline-none cursor-pointer"
            >
              <option value="all">All Airlines</option>
              <option value="British Airways">British Airways</option>
              <option value="Skyscanner Express">Skyscanner Express</option>
              <option value="easyJet">easyJet</option>
              <option value="KLM Royal Dutch">KLM Royal Dutch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="space-y-4">
        {filtered.map((flight) => (
          <div
            key={flight.id}
            className="bg-white border border-[#e6e9eb] hover:border-[#0062e3] rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 group"
          >
            {/* Flight Timing & Airline details */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: flight.airlineLogoColor }}
                />
                <span className="text-sm font-extrabold text-[#161616]">{flight.airline}</span>
                <span className="text-xs text-[#9298a0]">• {flight.flightNumber}</span>
                <span className="text-xs text-[#9298a0]">• {flight.aircraft}</span>
              </div>

              {/* Times & duration diagram */}
              <div className="flex items-center gap-4 sm:gap-8">
                {/* Departure */}
                <div className="text-left min-w-[70px]">
                  <span className="text-xl sm:text-2xl font-black text-[#161616]">{flight.departureTime}</span>
                  <span className="text-xs font-bold text-[#6e747e] block">{flight.origin.code}</span>
                </div>

                {/* Duration bar */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center gap-1 text-xs text-[#6e747e] font-semibold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{flight.duration}</span>
                  </div>
                  <div className="w-full flex items-center gap-1.5">
                    <div className="h-[2px] flex-1 bg-[#e6e9eb] rounded-full" />
                    <Plane className="w-3.5 h-3.5 text-[#0062e3] transform -rotate-45" />
                    <div className="h-[2px] flex-1 bg-[#e6e9eb] rounded-full" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0fa1a9] mt-1">
                    {flight.stops === 0 ? 'Direct' : flight.stopDetails || `${flight.stops} Stop`}
                  </span>
                </div>

                {/* Arrival */}
                <div className="text-right min-w-[70px]">
                  <span className="text-xl sm:text-2xl font-black text-[#161616]">{flight.arrivalTime}</span>
                  <span className="text-xs font-bold text-[#6e747e] block">{flight.destination.code}</span>
                </div>
              </div>

              {/* Badges: Eco, Baggage, Seats */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {flight.isEcoChoice && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#118850] bg-[#ebfff0] px-2 py-0.5 rounded-full border border-[#87D0D4]">
                    <Leaf className="w-3 h-3" />
                    Greener flight (-18% CO2)
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6e747e] bg-[#f2f4f5] px-2 py-0.5 rounded-md">
                  <Luggage className="w-3 h-3" />
                  {flight.baggageIncluded}
                </span>
                {flight.seatsRemaining <= 5 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ba4e00] bg-[#FFF7CF] px-2 py-0.5 rounded-md">
                    <AlertCircle className="w-3 h-3" />
                    Only {flight.seatsRemaining} seats left
                  </span>
                )}
              </div>
            </div>

            {/* Price & Action */}
            <div className="md:border-l md:border-[#e6e9eb] md:pl-6 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t border-[#e6e9eb] md:border-t-0 shrink-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">Price per passenger</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#161616]">{flight.currency}{flight.price}</span>
                  <span className="text-xs text-[#6e747e]">total</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectFlight(flight)}
                className="bg-[#0062e3] group-hover:bg-[#004ebd] active:bg-[#003b8e] text-white font-extrabold text-sm py-2.5 px-6 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Select</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white border border-[#e6e9eb] rounded-2xl p-12 text-center">
            <Plane className="w-12 h-12 text-[#9298a0] mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-[#161616] mb-1">No flights match your filters</h3>
            <p className="text-sm text-[#6e747e] mb-4">Try clearing filters or choose a different date.</p>
            <button
              onClick={() => {
                setFilterStops('all');
                setSelectedAirline('all');
              }}
              className="px-4 py-2 bg-[#0062e3] text-white rounded-xl text-xs font-bold hover:bg-[#004ebd] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
