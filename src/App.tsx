/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookingState, BookingStep, Flight, Passenger, Airport } from './types.ts';
import { POPULAR_AIRPORTS, SAMPLE_FLIGHTS } from './data/sampleFlights.ts';
import { BackpackHeader } from './components/BackpackHeader.tsx';
import { BookingProgress } from './components/BookingProgress.tsx';
import { FlightSchedulePage } from './components/FlightSchedulePage.tsx';
import { FlightResultsPage } from './components/FlightResultsPage.tsx';
import { PassengerDetailsPage } from './components/PassengerDetailsPage.tsx';
import { ReviewBookingPage } from './components/ReviewBookingPage.tsx';
import { PaymentPage } from './components/PaymentPage.tsx';
import { BookingConfirmationPage } from './components/BookingConfirmationPage.tsx';

export default function App() {
  // Current active step in the booking flow
  const [currentStep, setCurrentStep] = useState<BookingStep>('schedule');

  // PRD Requirement: Selected date must be managed using React state: const [selectedDate, setSelectedDate] = useState(...)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // Initialize with a convenient upcoming flight date
    const d = new Date(2026, 8, 24); // Sept 24, 2026
    return d;
  });

  // Trip and passenger configuration
  const [origin, setOrigin] = useState<Airport>(POPULAR_AIRPORTS[0]); // London Heathrow (LHR)
  const [destination, setDestination] = useState<Airport>(POPULAR_AIRPORTS[1]); // Edinburgh (EDI)
  const [passengersCount, setPassengersCount] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business' | 'First'>('Economy');

  // Flight selected in results stage
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(SAMPLE_FLIGHTS[0]);

  // Traveler details
  const [passengerDetails, setPassengerDetails] = useState<Passenger>({
    title: 'Mr',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+44 7700 900142',
    dateOfBirth: '1992-06-15',
    seatPreference: 'Window',
    specialMeal: 'Standard',
    extraBaggage: false,
  });

  // Payment & confirmation metadata
  const [bookingRef, setBookingRef] = useState<string>('SK-942851');
  const [paymentMethod, setPaymentMethod] = useState<string>('Visa •••• 8892');
  const [totalPaid, setTotalPaid] = useState<number>(80);

  // Completed booking consolidated state
  const bookingState: BookingState = {
    selectedDate,
    origin,
    destination,
    passengersCount,
    cabinClass,
    selectedFlight,
    passengerDetails,
    bookingReference: bookingRef,
    paymentMethod,
    totalPaid,
  };

  // Step progression eligibility
  const canNavigateTo = (step: BookingStep): boolean => {
    if (step === 'schedule') return true;
    if (step === 'results') return true;
    if (step === 'passengers') return selectedFlight !== null;
    if (step === 'review') return selectedFlight !== null && Boolean(passengerDetails.firstName);
    if (step === 'payment') return selectedFlight !== null && Boolean(passengerDetails.firstName);
    if (step === 'confirmation') return Boolean(bookingRef);
    return false;
  };

  // Handlers for stage progression
  const handleContinueFromSchedule = () => {
    // Validates date selection and proceeds to Flight Search Results (Phase 2 & 3)
    setCurrentStep('results');
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep('passengers');
  };

  const handleSavePassengerAndContinue = (updatedPassenger: Passenger) => {
    setPassengerDetails(updatedPassenger);
    setCurrentStep('review');
  };

  const handleProceedToPayment = (total: number) => {
    setTotalPaid(total);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = (method: string) => {
    setPaymentMethod(method);
    const newRef = `SK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(newRef);
    setCurrentStep('confirmation');
  };

  const handleResetToSchedule = () => {
    setCurrentStep('schedule');
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans text-[#161616]">
      {/* Skyscanner Backpack Header */}
      <BackpackHeader
        origin={origin}
        destination={destination}
        selectedDate={selectedDate}
        onNavigateHome={() => setCurrentStep('schedule')}
      />

      {/* Booking Flow Step Progress Bar */}
      <BookingProgress
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
        canNavigateTo={canNavigateTo}
      />

      {/* Main Content Area based on currentStep */}
      <div className="flex-1 flex flex-col">
        {currentStep === 'schedule' && (
          <FlightSchedulePage
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onContinue={handleContinueFromSchedule}
            origin={origin}
            destination={destination}
            onOriginChange={setOrigin}
            onDestinationChange={setDestination}
            passengersCount={passengersCount}
            onPassengersCountChange={setPassengersCount}
            cabinClass={cabinClass}
            onCabinClassChange={setCabinClass}
          />
        )}

        {currentStep === 'results' && (
          <FlightResultsPage
            selectedDate={selectedDate}
            origin={origin}
            destination={destination}
            cabinClass={cabinClass}
            passengersCount={passengersCount}
            onSelectFlight={handleSelectFlight}
            onBackToSchedule={() => setCurrentStep('schedule')}
          />
        )}

        {currentStep === 'passengers' && selectedFlight && (
          <PassengerDetailsPage
            flight={selectedFlight}
            initialPassenger={passengerDetails}
            onSavePassengerAndContinue={handleSavePassengerAndContinue}
            onBackToResults={() => setCurrentStep('results')}
          />
        )}

        {currentStep === 'review' && selectedFlight && (
          <ReviewBookingPage
            flight={selectedFlight}
            passenger={passengerDetails}
            selectedDate={selectedDate}
            origin={origin}
            destination={destination}
            onProceedToPayment={handleProceedToPayment}
            onBackToPassengers={() => setCurrentStep('passengers')}
          />
        )}

        {currentStep === 'payment' && (
          <PaymentPage
            totalAmount={totalPaid}
            passengerName={`${passengerDetails.firstName} ${passengerDetails.lastName}`}
            onPaymentSuccess={handlePaymentSuccess}
            onBackToReview={() => setCurrentStep('review')}
          />
        )}

        {currentStep === 'confirmation' && (
          <BookingConfirmationPage
            booking={bookingState}
            onResetToSchedule={handleResetToSchedule}
          />
        )}
      </div>

      {/* Official Skyscanner Backpack Footer */}
      <footer className="bg-white border-t border-[#e6e9eb] py-6 px-4 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#6e747e]">
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <span className="text-[#0fa1a9]">Built with React 13.1</span>
            <span>•</span>
            <span className="text-[#0062e3]">By - Jediah D'souza</span>
            <span>•</span>
            <span>Flight Booking Management System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
