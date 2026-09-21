export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  airlineLogoColor: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  price: number;
  currency: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  seatsRemaining: number;
  carbonEmissionKg: number;
  isEcoChoice?: boolean;
  aircraft: string;
  baggageIncluded: string;
}

export interface Passenger {
  title: 'Mr' | 'Ms' | 'Mrs' | 'Dr';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber?: string;
  seatPreference: string;
  specialMeal?: string;
  extraBaggage: boolean;
}

export interface BookingState {
  selectedDate: Date;
  returnDate?: Date;
  origin: Airport;
  destination: Airport;
  passengersCount: number;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  selectedFlight: Flight | null;
  passengerDetails: Passenger;
  bookingReference?: string;
  paymentMethod?: string;
  totalPaid?: number;
}

export type BookingStep = 
  | 'schedule' 
  | 'results' 
  | 'passengers' 
  | 'review' 
  | 'payment' 
  | 'confirmation';
