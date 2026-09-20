
// src/data/transportData.ts

// ============================================================
// GODSPEED MOBILITY - TRANSPORT DATA
// ============================================================
// This file is the temporary local transport catalog.
//
// Structure:
// Operator → Vehicle → Trip
//
// Later, this same structure can be loaded from Firebase/API
// without having to redesign the booking UI.
// ============================================================

export type Seat = {
  id: string;
  row: number;
  position: 'left' | 'right' | 'rear';
  column: number;
};

export type Vehicle = {
  id: string;
  operatorId: string;
  name: string;
   image: any;
  capacity: number;
  seatLayout: Seat[];
};

export type Operator = {
  id: string;
  name: string;
  displayName: string;
};

export type TransportTrip = {
  id: string;
  operatorId: string;
  vehicleId: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  date: string;

  // Seats already booked/occupied for THIS specific trip.
  occupiedSeats: string[];
};

// ============================================================
// OPERATORS
// ============================================================

export const OPERATORS: Operator[] = [
  {
    id: 'godspeed-tech',
    name: 'GodSpeed Tech',
    displayName: 'GodSpeed Voyage',
  },
];

// ============================================================
// SEAT LAYOUT - GS TECH A
// ============================================================
//
// Physical structure:
//
//                  FRONT
//
//             DRIVER       A1 A2
//             A3 A4 A5     A6 A7
//             A8 A9 A10    A11 A12
//             ...
//
//             LEFT = 3 seats
//             AISLE
//             RIGHT = 2 seats
//
//             REAR = A68 A69 A70
//
// The doors are NOT seats and do NOT create gaps in the
// left-hand 3-seat column.
// ============================================================

const GS_TECH_A_SEATS: Seat[] = [
  // ----------------------------------------------------------
  // FRONT
  // ----------------------------------------------------------

  { id: 'A1', row: 0, position: 'right', column: 0 },
  { id: 'A2', row: 0, position: 'right', column: 1 },

  { id: 'A3', row: 1, position: 'left', column: 0 },
  { id: 'A4', row: 1, position: 'left', column: 1 },
  { id: 'A5', row: 1, position: 'left', column: 2 },

  { id: 'A6', row: 1, position: 'right', column: 0 },
  { id: 'A7', row: 1, position: 'right', column: 1 },

  { id: 'A8', row: 2, position: 'left', column: 0 },
  { id: 'A9', row: 2, position: 'left', column: 1 },
  { id: 'A10', row: 2, position: 'left', column: 2 },

  { id: 'A11', row: 2, position: 'right', column: 0 },
  { id: 'A12', row: 2, position: 'right', column: 1 },

  // ----------------------------------------------------------
  // MAIN CABIN
  // ----------------------------------------------------------

  { id: 'A13', row: 3, position: 'left', column: 0 },
  { id: 'A14', row: 3, position: 'left', column: 1 },
  { id: 'A15', row: 3, position: 'left', column: 2 },

  { id: 'A16', row: 3, position: 'right', column: 0 },
  { id: 'A17', row: 3, position: 'right', column: 1 },

  { id: 'A18', row: 4, position: 'left', column: 0 },
  { id: 'A19', row: 4, position: 'left', column: 1 },
  { id: 'A20', row: 4, position: 'left', column: 2 },

  { id: 'A21', row: 4, position: 'right', column: 0 },
  { id: 'A22', row: 4, position: 'right', column: 1 },

  { id: 'A23', row: 5, position: 'left', column: 0 },
  { id: 'A24', row: 5, position: 'left', column: 1 },
  { id: 'A25', row: 5, position: 'left', column: 2 },

  { id: 'A26', row: 5, position: 'right', column: 0 },
  { id: 'A27', row: 5, position: 'right', column: 1 },

  { id: 'A28', row: 6, position: 'left', column: 0 },
  { id: 'A29', row: 6, position: 'left', column: 1 },
  { id: 'A30', row: 6, position: 'left', column: 2 },

  { id: 'A31', row: 6, position: 'right', column: 0 },
  { id: 'A32', row: 6, position: 'right', column: 1 },

  { id: 'A33', row: 7, position: 'left', column: 0 },
  { id: 'A34', row: 7, position: 'left', column: 1 },
  { id: 'A35', row: 7, position: 'left', column: 2 },

  { id: 'A36', row: 7, position: 'right', column: 0 },
  { id: 'A37', row: 7, position: 'right', column: 1 },

  { id: 'A38', row: 8, position: 'left', column: 0 },
  { id: 'A39', row: 8, position: 'left', column: 1 },
  { id: 'A40', row: 8, position: 'left', column: 2 },

  { id: 'A41', row: 8, position: 'right', column: 0 },
  { id: 'A42', row: 8, position: 'right', column: 1 },

  { id: 'A43', row: 9, position: 'left', column: 0 },
  { id: 'A44', row: 9, position: 'left', column: 1 },
  { id: 'A45', row: 9, position: 'left', column: 2 },

  { id: 'A46', row: 9, position: 'right', column: 0 },
  { id: 'A47', row: 9, position: 'right', column: 1 },

  { id: 'A48', row: 10, position: 'left', column: 0 },
  { id: 'A49', row: 10, position: 'left', column: 1 },
  { id: 'A50', row: 10, position: 'left', column: 2 },

  { id: 'A51', row: 10, position: 'right', column: 0 },
  { id: 'A52', row: 10, position: 'right', column: 1 },

  { id: 'A53', row: 11, position: 'left', column: 0 },
  { id: 'A54', row: 11, position: 'left', column: 1 },
  { id: 'A55', row: 11, position: 'left', column: 2 },

  { id: 'A56', row: 11, position: 'right', column: 0 },
  { id: 'A57', row: 11, position: 'right', column: 1 },

  { id: 'A58', row: 12, position: 'left', column: 0 },
  { id: 'A59', row: 12, position: 'left', column: 1 },
  { id: 'A60', row: 12, position: 'left', column: 2 },

  { id: 'A61', row: 12, position: 'right', column: 0 },
  { id: 'A62', row: 12, position: 'right', column: 1 },

  { id: 'A63', row: 13, position: 'left', column: 0 },
  { id: 'A64', row: 13, position: 'left', column: 1 },
  { id: 'A65', row: 13, position: 'left', column: 2 },

  { id: 'A66', row: 13, position: 'right', column: 0 },
  { id: 'A67', row: 13, position: 'right', column: 1 },

  // ----------------------------------------------------------
  // REAR BENCH
  // ----------------------------------------------------------

  { id: 'A68', row: 14, position: 'rear', column: 0 },
  { id: 'A69', row: 14, position: 'rear', column: 1 },
  { id: 'A70', row: 14, position: 'rear', column: 2 },
];

// ============================================================
// VEHICLES
// ============================================================

export const VEHICLES: Vehicle[] = [
  {
    id: 'gs-tech-a',
    operatorId: 'godspeed-tech',
    name: 'GS TECH A',
    capacity: 70,
    image: require('../../assets/images/bus.png'),
    seatLayout: GS_TECH_A_SEATS,
  },
];

// ============================================================
// TRIPS
// ============================================================

export const TRIPS: TransportTrip[] = [
  {
    id: 'gst-001',
    operatorId: 'godspeed-tech',
    vehicleId: 'gs-tech-a',
    from: 'Kumba',
    to: 'Yaoundé',
    departure: '06:30',
    arrival: '13:00',
    duration: '6h 30m',
    price: 8000,
    date: '2026-09-18',
    occupiedSeats: ['A6', 'A11', 'A24', 'A37', 'A52'],
  },

  {
    id: 'gst-002',
    operatorId: 'godspeed-tech',
    vehicleId: 'gs-tech-a',
    from: 'Kumba',
    to: 'Yaoundé',
    departure: '09:00',
    arrival: '15:30',
    duration: '6h 30m',
    price: 8000,
    date: '2026-09-18',
    occupiedSeats: ['A3', 'A15', 'A28', 'A41'],
  },

  {
    id: 'gst-003',
    operatorId: 'godspeed-tech',
    vehicleId: 'gs-tech-a',
    from: 'Kumba',
    to: 'Yaoundé',
    departure: '13:30',
    arrival: '20:00',
    duration: '6h 30m',
    price: 8500,
    date: '2026-09-18',
    occupiedSeats: ['A2', 'A10', 'A31', 'A55', 'A69'],
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getOperator(operatorId: string) {
  return OPERATORS.find((operator) => operator.id === operatorId);
}

export function getVehicle(vehicleId: string) {
  return VEHICLES.find((vehicle) => vehicle.id === vehicleId);
}

export function getTrip(tripId: string) {
  return TRIPS.find((trip) => trip.id === tripId);
}
