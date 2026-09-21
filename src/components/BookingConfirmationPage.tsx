import React, { useState } from 'react';
import { BookingState } from '../types.ts';
import { CheckCircle2, Plane, Calendar, Download, Printer, ArrowRight, Share2, Mail, Check } from 'lucide-react';

interface BookingConfirmationPageProps {
  booking: BookingState;
  onResetToSchedule: () => void;
}

export const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  booking,
  onResetToSchedule,
}) => {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const flight = booking.selectedFlight;
  const pnr = booking.bookingReference || 'SK-784912';

  if (!flight) {
    return null;
  }

  const formattedDate = booking.selectedDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleCopyPNR = () => {
    navigator.clipboard.writeText(pnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Success Hero Card */}
      <div className="bg-[#ebfff0] border border-[#87D0D4] rounded-3xl p-6 sm:p-8 text-center mb-8 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#118850] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="text-xs font-black uppercase text-[#118850] tracking-widest block mb-1">
          Reservation Completed Successfully
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight mb-2">
          You're all set to fly!
        </h2>
        <p className="text-sm text-[#313f4d] font-medium max-w-md mx-auto mb-6">
          A confirmation receipt and digital boarding pass have been sent to{' '}
          <strong className="text-[#161616]">{booking.passengerDetails.email}</strong>.
        </p>

        {/* PNR Code Pill */}
        <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-[#87D0D4] shadow-xs">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#6e747e] tracking-wider block">
              Booking Reference (PNR)
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0062e3]">
              {pnr}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyPNR}
            className="px-3 py-1.5 bg-[#f2f4f5] hover:bg-[#e6e9eb] rounded-lg text-xs font-bold text-[#161616] transition-colors cursor-pointer"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Digital Boarding Pass / E-Ticket */}
      <div className="bg-white border-2 border-[#05203d] rounded-3xl overflow-hidden shadow-xl mb-8 print:shadow-none">
        {/* Ticket Header Banner */}
        <div className="bg-[#05203d] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0062e3] flex items-center justify-center text-white">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold text-[#0062e3] tracking-wider block">
                Skyscanner Backpack E-Ticket
              </span>
              <h3 className="text-xl font-black text-white">{flight.airline} • {flight.flightNumber}</h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#dce0e4] block">Aircraft</span>
            <span className="text-sm font-extrabold text-white">{flight.aircraft}</span>
          </div>
        </div>

        {/* Flight Route Diagram */}
        <div className="p-6 sm:p-8 border-b border-dashed border-[#e6e9eb]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-[#161616]">{flight.origin.code}</span>
              <span className="text-sm font-bold text-[#6e747e] block">{flight.origin.city}</span>
              <span className="text-xl font-extrabold text-[#0062e3] block mt-1">{flight.departureTime}</span>
            </div>

            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-xs font-bold text-[#6e747e] mb-1">{flight.duration} Non-stop</span>
              <div className="w-full flex items-center gap-2">
                <div className="h-[2px] flex-1 bg-[#0062e3] rounded-full" />
                <Plane className="w-5 h-5 text-[#0062e3]" />
                <div className="h-[2px] flex-1 bg-[#0062e3] rounded-full" />
              </div>
              <span className="text-[11px] font-bold text-[#0fa1a9] mt-1">Confirmed Schedule</span>
            </div>

            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-black text-[#161616]">{flight.destination.code}</span>
              <span className="text-sm font-bold text-[#6e747e] block">{flight.destination.city}</span>
              <span className="text-xl font-extrabold text-[#0062e3] block mt-1">{flight.arrivalTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#313f4d] bg-[#f9f9fa] p-3 rounded-xl border border-[#e6e9eb]">
            <Calendar className="w-4 h-4 text-[#0062e3]" />
            <span>Flight Departure Date: {formattedDate}</span>
          </div>
        </div>

        {/* Passenger & Boarding details */}
        <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#fafafb]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">Passenger</span>
            <span className="text-sm font-black text-[#161616]">
              {booking.passengerDetails.firstName} {booking.passengerDetails.lastName}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">Seat</span>
            <span className="text-sm font-black text-[#0062e3]">
              14B ({booking.passengerDetails.seatPreference})
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">Baggage</span>
            <span className="text-sm font-black text-[#161616]">
              {booking.passengerDetails.extraBaggage ? 'Hold Bag (23kg)' : 'Cabin Bag'}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#9298a0] tracking-wider block">Status</span>
            <span className="text-sm font-black text-[#0fa1a9]">Paid & Ticketed</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e6e9eb] hover:bg-[#f2f4f5] text-[#161616] rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#6e747e]" />
            <span>Print Itinerary</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEmailSent(true);
              setTimeout(() => setEmailSent(false), 2500);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e6e9eb] hover:bg-[#f2f4f5] text-[#161616] rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#0062e3]" />
            <span>{emailSent ? 'Email Sent!' : 'Resend Email'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onResetToSchedule}
          className="flex items-center gap-2 px-6 py-3 bg-[#0062e3] hover:bg-[#004ebd] active:bg-[#003b8e] text-white rounded-xl text-sm font-extrabold transition-all shadow-md cursor-pointer"
        >
          <span>Book Another Flight</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
