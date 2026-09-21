import React, { useState, useId } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { DAY_FARE_ESTIMATES } from '../data/sampleFlights.ts';

interface BackpackCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  id?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const BackpackCalendar: React.FC<BackpackCalendarProps> = ({
  selectedDate,
  onDateSelect,
  minDate = new Date(),
  id,
}) => {
  const componentId = id || useId();
  // Display month state (defaults to selectedDate's month and year)
  const [viewDate, setViewDate] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  // Normalize minDate to start of day
  const normalizedMin = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());

  // Calculate days in month and starting day of week
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return isSameDay(d, today);
  };

  const isPast = (d: Date) => {
    return d < normalizedMin;
  };

  // Determine if previous month button should be disabled
  const canGoPrev = () => {
    const prevMonthEnd = new Date(currentYear, currentMonth, 0);
    return prevMonthEnd >= normalizedMin;
  };

  // Quick navigation months (next 6 months)
  const quickMonths: Date[] = [];
  const baseMonth = new Date();
  for (let i = 0; i < 5; i++) {
    quickMonths.push(new Date(baseMonth.getFullYear(), baseMonth.getMonth() + i, 1));
  }

  return (
    <div
      id={componentId}
      className="bpk-calendar bg-white rounded-2xl border border-[#e6e9eb] p-4 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] max-w-2xl mx-auto w-full transition-all"
      role="region"
      aria-label="Backpack Flight Schedule Calendar"
    >
      {/* Month quick selection bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-[#f2f4f5] no-scrollbar">
        {quickMonths.map((qm, idx) => {
          const isCurrentView =
            qm.getFullYear() === currentYear && qm.getMonth() === currentMonth;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setViewDate(new Date(qm.getFullYear(), qm.getMonth(), 1))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isCurrentView
                  ? 'bg-[#0062e3] text-white shadow-xs'
                  : 'bg-[#f2f4f5] text-[#313f4d] hover:bg-[#e3f0ff] hover:text-[#0062e3]'
              }`}
            >
              {MONTH_NAMES[qm.getMonth()].slice(0, 3)} {qm.getFullYear()}
            </button>
          );
        })}
      </div>

      {/* Calendar Header with Month/Year and navigation arrows */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-baseline gap-2">
          <h2
            id={`${componentId}-month-heading`}
            className="text-xl sm:text-2xl font-black text-[#161616] tracking-tight"
          >
            {MONTH_NAMES[currentMonth]}
          </h2>
          <span className="text-sm font-bold text-[#6e747e]">{currentYear}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={!canGoPrev()}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#e6e9eb] text-[#161616] hover:bg-[#f2f4f5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#e6e9eb] text-[#161616] hover:bg-[#f2f4f5] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div
        className="grid grid-cols-7 text-center text-xs font-bold text-[#6e747e] mb-2 py-1 bg-[#f9f9fa] rounded-lg"
        role="row"
      >
        {WEEKDAY_NAMES.map((day, idx) => (
          <div key={idx} role="columnheader" aria-label={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div
        className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center"
        role="grid"
        aria-labelledby={`${componentId}-month-heading`}
      >
        {/* Leading empty or prev month days */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => {
          const prevDateNum = daysInPrevMonth - startingDayOfWeek + index + 1;
          return (
            <div
              key={`prev-${index}`}
              className="h-14 sm:h-16 p-1 rounded-xl text-xs text-[#9298a0]/40 flex flex-col items-center justify-center select-none"
              aria-hidden="true"
            >
              <span>{prevDateNum}</span>
            </div>
          );
        })}

        {/* Current month days */}
        {Array.from({ length: daysInCurrentMonth }).map((_, index) => {
          const dayNum = index + 1;
          const thisDate = new Date(currentYear, currentMonth, dayNum);
          const isSelected = isSameDay(thisDate, selectedDate);
          const isCurrentToday = isToday(thisDate);
          const isPastDate = isPast(thisDate);

          // Get fare estimate for day
          const fare = DAY_FARE_ESTIMATES[dayNum] || { price: 54, level: 'low' };

          return (
            <button
              key={`day-${dayNum}`}
              type="button"
              role="gridcell"
              disabled={isPastDate}
              onClick={() => onDateSelect(thisDate)}
              aria-selected={isSelected}
              aria-label={`${MONTH_NAMES[currentMonth]} ${dayNum}, ${currentYear}${
                isPastDate ? ', Past date unavailable' : `, from £${fare.price}`
              }`}
              className={`h-14 sm:h-16 p-1 rounded-xl relative flex flex-col items-center justify-between transition-all group focus:outline-none focus:ring-2 focus:ring-[#0062e3] ${
                isSelected
                  ? 'bg-[#0062e3] text-white shadow-md font-bold scale-[1.03] z-10'
                  : isPastDate
                  ? 'text-[#9298a0]/40 cursor-not-allowed bg-transparent'
                  : 'text-[#161616] hover:bg-[#e3f0ff] hover:text-[#0062e3] cursor-pointer bg-white hover:shadow-xs'
              }`}
            >
              {/* Day number & today marker */}
              <div className="flex items-center justify-center w-full pt-0.5">
                <span className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : ''}`}>
                  {dayNum}
                </span>
                {isCurrentToday && !isSelected && (
                  <span
                    className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#0062e3]"
                    title="Today"
                  />
                )}
              </div>

              {/* Price indicator badge */}
              {!isPastDate && (
                <div className="w-full flex items-center justify-center gap-0.5 pb-0.5">
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold tracking-tight ${
                      isSelected
                        ? 'text-white/95 font-bold'
                        : fare.level === 'low'
                        ? 'text-[#0fa1a9]'
                        : fare.level === 'medium'
                        ? 'text-[#6e747e]'
                        : 'text-[#ba4e00]'
                    }`}
                  >
                    £{fare.price}
                  </span>
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isSelected
                        ? 'bg-white'
                        : fare.level === 'low'
                        ? 'bg-[#0fa1a9]'
                        : fare.level === 'medium'
                        ? 'bg-[#ff7b59]'
                        : 'bg-[#d23031]'
                    }`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Calendar Footer / Legend */}
      <div className="mt-4 pt-3 border-t border-[#f2f4f5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6e747e]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0fa1a9]" />
            <span>Lowest fare</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff7b59]" />
            <span>Typical fare</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d23031]" />
            <span>Peak fare</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#9298a0] text-[11px]">
          <Info className="w-3.5 h-3.5" />
          <span>Fares updated in real-time</span>
        </div>
      </div>
    </div>
  );
};
