import React from 'react';
import { Flight, Passenger, Airport } from '../types.ts';
import { ArrowLeft, ArrowRight, Plane, User, Luggage, ShieldCheck, Clock, Calendar, CheckCircle } from 'lucide-react';

interface ReviewBookingPageProps {
  flight: Flight;
  passenger: Passenger;
  selectedDate: Date;
  origin: Airport;
  destination: Airport;
  onProceedToPayment: (total: number) => void;
  onBackToPassengers: () => void;
}

export const ReviewBookingPage: React.FC<ReviewBookingPageProps> = ({
  flight,
  passenger,
  selectedDate,
  origin,
  destination,
  onProceedToPayment,
  onBackToPassengers,
}) => {
  const formattedDate = selectedDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const baseFare = flight.price;
  const taxesAndFees = Math.round(flight.price * 0.18);
  const baggageFee = passenger.extraBaggage ? 22 : 0;
  const seatFee = passenger.seatPreference === 'ExtraLegroom' ? 12 : 0;
  const total = baseFare + taxesAndFees + baggageFee + seatFee;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-[#e6e9eb]">
        <button
          type="button"
          onClick={onBackToPassengers}
          className="flex items-center gap-1.5 text-xs font-bold text-[#0062e3] hover:underline mb-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Passenger Details
        </button>
        <h2 className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight">
          Review Flight Booking
        </h2>
        <p className="text-xs sm:text-sm text-[#6e747e] font-medium mt-1">
          Please review your flight itinerary, traveler information, and fare breakdown before completing payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Itinerary & Passenger */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flight Card */}
          <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#f2f4f5]">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block"
                  style={{ backgroundColor: flight.airlineLogoColor }}
                />
                <div>
                  <h3 className="text-base font-extrabold text-[#161616]">{flight.airline}</h3>
                  <span className="text-xs text-[#6e747e]">{flight.flightNumber} • {flight.aircraft}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0fa1a9] bg-[#ebfff0] px-2.5 py-1 rounded-full border border-[#87D0D4]">
                Confirmed Schedule
              </span>
            </div>

            {/* Date line */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#0062e3] mb-4 bg-[#e3f0ff] p-2.5 rounded-xl">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>

            {/* Flight Timings */}
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="text-left">
                <span className="text-2xl font-black text-[#161616]">{flight.departureTime}</span>
                <span className="text-xs font-bold text-[#6e747e] block">{origin.city} ({origin.code})</span>
                <span className="text-[11px] text-[#9298a0]">{origin.name}</span>
              </div>

              <div className="flex-1 flex flex-col items-center px-4">
                <span className="text-xs text-[#6e747e] font-bold mb-1">{flight.duration}</span>
                <div className="w-full flex items-center gap-2">
                  <div className="h-[2px] flex-1 bg-[#0062e3] rounded-full" />
                  <Plane className="w-4 h-4 text-[#0062e3]" />
                  <div className="h-[2px] flex-1 bg-[#0062e3] rounded-full" />
                </div>
                <span className="text-[11px] font-bold text-[#0fa1a9] mt-1">Non-stop</span>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-[#161616]">{flight.arrivalTime}</span>
                <span className="text-xs font-bold text-[#6e747e] block">{destination.city} ({destination.code})</span>
                <span className="text-[11px] text-[#9298a0]">{destination.name}</span>
              </div>
            </div>
          </div>

          {/* Passenger & Inclusions Card */}
          <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-6 shadow-xs">
            <h3 className="text-base font-extrabold text-[#161616] mb-4 pb-2 border-b border-[#f2f4f5]">
              Passenger & Travel Services
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#9298a0] font-bold uppercase tracking-wider block mb-0.5">Primary Passenger</span>
                <span className="text-sm font-extrabold text-[#161616]">
                  {passenger.title} {passenger.firstName} {passenger.lastName}
                </span>
                <span className="text-[#6e747e] block">{passenger.email}</span>
                <span className="text-[#6e747e] block">{passenger.phone}</span>
              </div>

              <div>
                <span className="text-[#9298a0] font-bold uppercase tracking-wider block mb-0.5">Seat & Dining</span>
                <span className="text-sm font-extrabold text-[#161616]">
                  {passenger.seatPreference} Seat
                </span>
                <span className="text-[#6e747e] block">Meal: {passenger.specialMeal || 'Standard snack'}</span>
                <span className="text-[#6e747e] block">
                  Luggage: {passenger.extraBaggage ? 'Cabin bag + 23kg Checked bag' : flight.baggageIncluded}
                </span>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="bg-[#ebfff0] border border-[#87D0D4] rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#118850] shrink-0 mt-0.5" />
            <div className="text-xs text-[#118850]">
              <span className="font-extrabold text-sm block">Skyscanner Traveler Guarantee</span>
              <span>All taxes included. Free changes or 100% refund voucher within 24 hours of booking confirmation.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Price Summary & Action */}
        <div className="space-y-6">
          <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-6 shadow-xs sticky top-24">
            <h3 className="text-base font-extrabold text-[#161616] mb-4 pb-2 border-b border-[#f2f4f5]">
              Price Summary
            </h3>

            <div className="space-y-2.5 text-xs pb-4 border-b border-[#f2f4f5]">
              <div className="flex justify-between text-[#6e747e]">
                <span>Flight Ticket (1 Adult)</span>
                <span className="font-bold text-[#161616]">£{baseFare}</span>
              </div>
              <div className="flex justify-between text-[#6e747e]">
                <span>Estimated Airport Taxes & Fees</span>
                <span className="font-bold text-[#161616]">£{taxesAndFees}</span>
              </div>
              {passenger.extraBaggage && (
                <div className="flex justify-between text-[#6e747e]">
                  <span>23kg Checked Bag</span>
                  <span className="font-bold text-[#161616]">£{baggageFee}</span>
                </div>
              )}
              {passenger.seatPreference === 'ExtraLegroom' && (
                <div className="flex justify-between text-[#6e747e]">
                  <span>Extra Legroom Seat</span>
                  <span className="font-bold text-[#161616]">£{seatFee}</span>
                </div>
              )}
            </div>

            <div className="pt-4 mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-extrabold text-[#161616]">Total Due</span>
                <span className="text-2xl font-black text-[#0062e3]">£{total}</span>
              </div>
              <span className="text-[11px] text-[#9298a0] block">Includes VAT and all mandatory air taxes</span>
            </div>

            <button
              type="button"
              onClick={() => onProceedToPayment(total)}
              className="w-full bg-[#0062e3] hover:bg-[#004ebd] active:bg-[#003b8e] text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onBackToPassengers}
              className="w-full mt-3 py-2 text-xs font-bold text-[#6e747e] hover:text-[#161616] transition-colors cursor-pointer text-center"
            >
              Modify Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
