# Sky-Route ✈️

Sky-Route is a **Modern Front-End Flight Booking Management System** built with React, TypeScript, Vite, and Tailwind CSS.

The Web-Application provides a complete flight-booking workflow, allowing users to select a flight date and route, browse and filter available flights, enter passenger information, review their booking, complete a simulated payment process, and receive a booking confirmation with a digital e-ticket.

## Features ✨

* Flight schedule and interactive date selection
* Origin and destination selection
* Flight search and results
* Flight filtering and sorting
* Passenger details form
* Booking review
* Simulated payment process
* Booking confirmation and PNR
* Digital e-ticket / boarding pass
* Print itinerary functionality
* Responsive design for desktop and mobile
* Backpack-inspired UI components

## Tech Stack 🛠️

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Lucide React**
* **Motion**
* **Node.js / npm**

## Getting Started

### 1. Install dependencies 🚀

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 3. Build for production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure 📁

```text
Sky-Route/
├── src/
│   ├── components/
│   │   ├── FlightSchedulePage.tsx
│   │   ├── FlightResultsPage.tsx
│   │   ├── PassengerDetailsPage.tsx
│   │   ├── ReviewBookingPage.tsx
│   │   ├── PaymentPage.tsx
│   │   ├── BookingConfirmationPage.tsx
│   │   ├── BackpackCalendar.tsx
│   │   └── BackpackHeader.tsx
│   │
│   ├── data/
│   │   └── sampleFlights.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## Booking Workflow ✈️

Flight Schedule
       ↓
Select Flight Date
       ↓
Flight Results
       ↓
Select Flight
       ↓
Passenger Details
       ↓
Review Booking
       ↓
Payment
       ↓
Booking Confirmation
Notes

## Notes 📝

Sky-Route is a **Front-End Demonstration Project**. Flight information is currently provided through sample data, and the payment process is simulated for demonstration purposes.

