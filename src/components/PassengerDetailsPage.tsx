import React, { useState } from 'react';
import { Flight, Passenger } from '../types.ts';
import { ArrowLeft, ArrowRight, User, Shield, Luggage, Utensils, AlertCircle } from 'lucide-react';

interface PassengerDetailsPageProps {
  flight: Flight;
  initialPassenger: Passenger;
  onSavePassengerAndContinue: (passenger: Passenger) => void;
  onBackToResults: () => void;
}

export const PassengerDetailsPage: React.FC<PassengerDetailsPageProps> = ({
  flight,
  initialPassenger,
  onSavePassengerAndContinue,
  onBackToResults,
}) => {
  const [passenger, setPassenger] = useState<Passenger>(initialPassenger);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!passenger.firstName.trim()) errs.firstName = 'First name is required';
    if (!passenger.lastName.trim()) errs.lastName = 'Last name is required';
    if (!passenger.email.trim() || !passenger.email.includes('@')) errs.email = 'Valid email is required';
    if (!passenger.phone.trim()) errs.phone = 'Phone number is required for flight notifications';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSavePassengerAndContinue(passenger);
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-[#e6e9eb]">
        <button
          type="button"
          onClick={onBackToResults}
          className="flex items-center gap-1.5 text-xs font-bold text-[#0062e3] hover:underline mb-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Flight Results
        </button>
        <h2 className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight">
          Passenger & Baggage Details
        </h2>
        <p className="text-xs sm:text-sm text-[#6e747e] font-medium mt-1">
          Flight {flight.flightNumber} • {flight.origin.code} to {flight.destination.code} • Please enter traveler details matching your official travel ID.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Traveler Info Card */}
        <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#f2f4f5]">
            <div className="w-8 h-8 rounded-lg bg-[#e3f0ff] text-[#0062e3] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#161616]">Lead Traveler (Adult 1)</h3>
              <span className="text-xs text-[#6e747e]">Primary contact for tickets and e-boarding passes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-[#161616] mb-1">Title</label>
              <select
                value={passenger.title}
                onChange={(e) => setPassenger({ ...passenger, title: e.target.value as any })}
                className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
              >
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-[#161616] mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={passenger.firstName}
                onChange={(e) => {
                  setPassenger({ ...passenger, firstName: e.target.value });
                  if (errors.firstName) setErrors({ ...errors, firstName: '' });
                }}
                placeholder="e.g. John"
                className={`w-full p-2.5 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0062e3] ${
                  errors.firstName ? 'border-red-500 bg-red-50/50' : 'border-[#e6e9eb] bg-white'
                }`}
              />
              {errors.firstName && <span className="text-[11px] text-red-500 mt-1 block">{errors.firstName}</span>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#161616] mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={passenger.lastName}
                onChange={(e) => {
                  setPassenger({ ...passenger, lastName: e.target.value });
                  if (errors.lastName) setErrors({ ...errors, lastName: '' });
                }}
                placeholder="e.g. Smith"
                className={`w-full p-2.5 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0062e3] ${
                  errors.lastName ? 'border-red-500 bg-red-50/50' : 'border-[#e6e9eb] bg-white'
                }`}
              />
              {errors.lastName && <span className="text-[11px] text-red-500 mt-1 block">{errors.lastName}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#161616] mb-1">
                Email Address (for e-ticket) <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={passenger.email}
                onChange={(e) => {
                  setPassenger({ ...passenger, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="john.smith@example.com"
                className={`w-full p-2.5 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0062e3] ${
                  errors.email ? 'border-red-500 bg-red-50/50' : 'border-[#e6e9eb] bg-white'
                }`}
              />
              {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#161616] mb-1">
                Mobile Number (SMS updates) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={passenger.phone}
                onChange={(e) => {
                  setPassenger({ ...passenger, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="+44 7700 900077"
                className={`w-full p-2.5 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0062e3] ${
                  errors.phone ? 'border-red-500 bg-red-50/50' : 'border-[#e6e9eb] bg-white'
                }`}
              />
              {errors.phone && <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>}
            </div>
          </div>
        </div>

        {/* Baggage Selection Card */}
        <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-[#f2f4f5]">
            <div className="w-8 h-8 rounded-lg bg-[#ebfff0] text-[#118850] flex items-center justify-center">
              <Luggage className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#161616]">Baggage Options</h3>
              <span className="text-xs text-[#6e747e]">Choose your luggage allowance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                !passenger.extraBaggage
                  ? 'border-[#0062e3] bg-[#e3f0ff]/30'
                  : 'border-[#e6e9eb] hover:border-[#b2d5ff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="baggageOption"
                  checked={!passenger.extraBaggage}
                  onChange={() => setPassenger({ ...passenger, extraBaggage: false })}
                  className="w-4 h-4 text-[#0062e3] focus:ring-[#0062e3]"
                />
                <div>
                  <span className="text-sm font-extrabold text-[#161616] block">Cabin Bag Only</span>
                  <span className="text-xs text-[#6e747e]">{flight.baggageIncluded}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0fa1a9] bg-[#0fa1a9]/10 px-2 py-0.5 rounded-md">
                Included
              </span>
            </label>

            <label
              className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                passenger.extraBaggage
                  ? 'border-[#0062e3] bg-[#e3f0ff]/30'
                  : 'border-[#e6e9eb] hover:border-[#b2d5ff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="baggageOption"
                  checked={passenger.extraBaggage}
                  onChange={() => setPassenger({ ...passenger, extraBaggage: true })}
                  className="w-4 h-4 text-[#0062e3] focus:ring-[#0062e3]"
                />
                <div>
                  <span className="text-sm font-extrabold text-[#161616] block">Add 23kg Checked Bag</span>
                  <span className="text-xs text-[#6e747e]">Hold luggage + Cabin bag</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#0062e3]">
                +£22
              </span>
            </label>
          </div>
        </div>

        {/* Seat Preference & Meal Card */}
        <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#f2f4f5]">
            <div className="w-8 h-8 rounded-lg bg-[#FFF7CF] text-[#ba4e00] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#161616]">Travel Preferences</h3>
              <span className="text-xs text-[#6e747e]">Seat location and complimentary refreshment options</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#161616] mb-1">Seating Preference</label>
              <select
                value={passenger.seatPreference}
                onChange={(e) => setPassenger({ ...passenger, seatPreference: e.target.value })}
                className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
              >
                <option value="Aisle">Aisle Seat (Easy access)</option>
                <option value="Window">Window Seat (Sky view)</option>
                <option value="Front">Forward Cabin Seat</option>
                <option value="ExtraLegroom">Extra Legroom (+£12)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#161616] mb-1">Complimentary Meal / Snack</label>
              <select
                value={passenger.specialMeal || 'Standard'}
                onChange={(e) => setPassenger({ ...passenger, specialMeal: e.target.value })}
                className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
              >
                <option value="Standard">Standard In-Flight Snack</option>
                <option value="Vegetarian">Vegetarian (Lacto-Ovo)</option>
                <option value="Vegan">Vegan (Strictly plant-based)</option>
                <option value="GlutenFree">Gluten-Free meal</option>
                <option value="Halal">Halal certified</option>
                <option value="Kosher">Kosher certified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onBackToResults}
            className="w-full sm:w-auto px-6 py-3 border border-[#e6e9eb] text-[#313f4d] hover:bg-[#f2f4f5] rounded-xl text-sm font-bold transition-colors cursor-pointer"
          >
            Back to Flight Results
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#0062e3] hover:bg-[#004ebd] active:bg-[#003b8e] text-white font-extrabold text-base py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Review</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
