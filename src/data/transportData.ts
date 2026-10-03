
// src/data/transportData.ts

// ============================================================
// GODSPEED MOBILITY - TRANSPORT DATA
// ============================================================
// This file is the temporary local transport catalog.
//
// Structure:
// Location → Route → Operator → Vehicle → Trip
//
// Later, this same structure can be loaded from Firebase/API
// without having to redesign the booking UI.
// ============================================================

// ============================================================
// MOBILITY LOCATIONS
// ============================================================
//
// These are recognized cities/urban locations in the GodSpeed
// Mobility network.
//
// IMPORTANT:
// A location existing here does NOT mean that a trip currently
// exists there. Trips are created separately below.
//
// This allows operators/agencies to later create routes such as:
// Lagos → Abuja
// Douala → Yaoundé
// Libreville → Port-Gentil
// etc. without changing the app structure.
// ============================================================

export type MobilityLocation = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region?: string;
  active?: boolean;
};

export const LOCATIONS: MobilityLocation[] = [

  // ==========================================================
  // CAMEROON
  // ==========================================================

  { id: 'kumba', name: 'Kumba', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },
  { id: 'buea', name: 'Buea', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },
  { id: 'limbe', name: 'Limbe', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },
  { id: 'tiko', name: 'Tiko', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },
  { id: 'mutengene', name: 'Mutengene', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },
  { id: 'muyuka', name: 'Muyuka', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },
  { id: 'mamfe', name: 'Mamfe', country: 'Cameroon', countryCode: 'CM', region: 'South-West' },

  { id: 'douala', name: 'Douala', country: 'Cameroon', countryCode: 'CM', region: 'Littoral' },
  { id: 'edea', name: 'Edéa', country: 'Cameroon', countryCode: 'CM', region: 'Littoral' },
  { id: 'nkongsamba', name: 'Nkongsamba', country: 'Cameroon', countryCode: 'CM', region: 'Littoral' },
  { id: 'melong', name: 'Melong', country: 'Cameroon', countryCode: 'CM', region: 'Littoral' },
  { id: 'manjo', name: 'Manjo', country: 'Cameroon', countryCode: 'CM', region: 'Littoral' },
  { id: 'loum', name: 'Loum', country: 'Cameroon', countryCode: 'CM', region: 'Littoral' },
  { id: 'kribi', name: 'Kribi', country: 'Cameroon', countryCode: 'CM', region: 'South' },

  { id: 'yaounde', name: 'Yaoundé', country: 'Cameroon', countryCode: 'CM', region: 'Centre' },
  { id: 'mbalmayo', name: 'Mbalmayo', country: 'Cameroon', countryCode: 'CM', region: 'Centre' },
  { id: 'sangmelima', name: 'Sangmélima', country: 'Cameroon', countryCode: 'CM', region: 'South' },
  { id: 'ebolowa', name: 'Ebolowa', country: 'Cameroon', countryCode: 'CM', region: 'South' },

  { id: 'bafoussam', name: 'Bafoussam', country: 'Cameroon', countryCode: 'CM', region: 'West' },
  { id: 'dschang', name: 'Dschang', country: 'Cameroon', countryCode: 'CM', region: 'West' },
  { id: 'bafang', name: 'Bafang', country: 'Cameroon', countryCode: 'CM', region: 'West' },
  { id: 'bangangte', name: 'Bangangté', country: 'Cameroon', countryCode: 'CM', region: 'West' },
  { id: 'foumban', name: 'Foumban', country: 'Cameroon', countryCode: 'CM', region: 'West' },
  { id: 'mbouda', name: 'Mbouda', country: 'Cameroon', countryCode: 'CM', region: 'West' },

  { id: 'bamenda', name: 'Bamenda', country: 'Cameroon', countryCode: 'CM', region: 'North-West' },

  { id: 'bertoua', name: 'Bertoua', country: 'Cameroon', countryCode: 'CM', region: 'East' },
  { id: 'batouri', name: 'Batouri', country: 'Cameroon', countryCode: 'CM', region: 'East' },
  { id: 'abong-mbang', name: 'Abong-Mbang', country: 'Cameroon', countryCode: 'CM', region: 'East' },

  { id: 'ngaoundere', name: 'Ngaoundéré', country: 'Cameroon', countryCode: 'CM', region: 'Adamawa' },
  { id: 'meiganga', name: 'Meïganga', country: 'Cameroon', countryCode: 'CM', region: 'Adamawa' },
  { id: 'garoua', name: 'Garoua', country: 'Cameroon', countryCode: 'CM', region: 'North' },
  { id: 'garoua-boulai', name: 'Garoua-Boulaï', country: 'Cameroon', countryCode: 'CM', region: 'East' },
  { id: 'maroua', name: 'Maroua', country: 'Cameroon', countryCode: 'CM', region: 'Far North' },
  { id: 'kousseri', name: 'Kousséri', country: 'Cameroon', countryCode: 'CM', region: 'Far North' },
  { id: 'mora', name: 'Mora', country: 'Cameroon', countryCode: 'CM', region: 'Far North' },
  { id: 'yagoua', name: 'Yagoua', country: 'Cameroon', countryCode: 'CM', region: 'Far North' },

  // ==========================================================
  // NIGERIA
  // ==========================================================

  { id: 'lagos', name: 'Lagos', country: 'Nigeria', countryCode: 'NG' },
  { id: 'abuja', name: 'Abuja', country: 'Nigeria', countryCode: 'NG' },
  { id: 'calabar', name: 'Calabar', country: 'Nigeria', countryCode: 'NG' },
  { id: 'uyo', name: 'Uyo', country: 'Nigeria', countryCode: 'NG' },
  { id: 'port-harcourt', name: 'Port Harcourt', country: 'Nigeria', countryCode: 'NG' },
  { id: 'aba', name: 'Aba', country: 'Nigeria', countryCode: 'NG' },
  { id: 'umuahia', name: 'Umuahia', country: 'Nigeria', countryCode: 'NG' },
  { id: 'owerri', name: 'Owerri', country: 'Nigeria', countryCode: 'NG' },
  { id: 'enugu', name: 'Enugu', country: 'Nigeria', countryCode: 'NG' },
  { id: 'onitsha', name: 'Onitsha', country: 'Nigeria', countryCode: 'NG' },
  { id: 'benin-city', name: 'Benin City', country: 'Nigeria', countryCode: 'NG' },
  { id: 'ibadan', name: 'Ibadan', country: 'Nigeria', countryCode: 'NG' },
  { id: 'makurdi', name: 'Makurdi', country: 'Nigeria', countryCode: 'NG' },
  { id: 'jos', name: 'Jos', country: 'Nigeria', countryCode: 'NG' },
  { id: 'kaduna', name: 'Kaduna', country: 'Nigeria', countryCode: 'NG' },
  { id: 'kano', name: 'Kano', country: 'Nigeria', countryCode: 'NG' },
  { id: 'yola', name: 'Yola', country: 'Nigeria', countryCode: 'NG' },
  { id: 'maiduguri', name: 'Maiduguri', country: 'Nigeria', countryCode: 'NG' },

  // ==========================================================
  // EQUATORIAL GUINEA
  // ==========================================================

  { id: 'malabo', name: 'Malabo', country: 'Equatorial Guinea', countryCode: 'GQ' },
  { id: 'bata', name: 'Bata', country: 'Equatorial Guinea', countryCode: 'GQ' },
  { id: 'ebebiyin', name: 'Ebebiyín', country: 'Equatorial Guinea', countryCode: 'GQ' },
  { id: 'mongomo', name: 'Mongomo', country: 'Equatorial Guinea', countryCode: 'GQ' },

  // ==========================================================
  // GABON
  // ==========================================================

  { id: 'libreville', name: 'Libreville', country: 'Gabon', countryCode: 'GA' },
  { id: 'port-gentil', name: 'Port-Gentil', country: 'Gabon', countryCode: 'GA' },
  { id: 'franceville', name: 'Franceville', country: 'Gabon', countryCode: 'GA' },
  { id: 'oyem', name: 'Oyem', country: 'Gabon', countryCode: 'GA' },
  { id: 'lambarene', name: 'Lambaréné', country: 'Gabon', countryCode: 'GA' },

  // ==========================================================
  // REPUBLIC OF THE CONGO
  // ==========================================================

  { id: 'brazzaville', name: 'Brazzaville', country: 'Republic of the Congo', countryCode: 'CG' },
  { id: 'pointe-noire', name: 'Pointe-Noire', country: 'Republic of the Congo', countryCode: 'CG' },
  { id: 'dolisie', name: 'Dolisie', country: 'Republic of the Congo', countryCode: 'CG' },
  { id: 'ouesso', name: 'Ouesso', country: 'Republic of the Congo', countryCode: 'CG' },

  // ==========================================================
  // CENTRAL AFRICAN REPUBLIC
  // ==========================================================

  { id: 'bangui', name: 'Bangui', country: 'Central African Republic', countryCode: 'CF' },
  { id: 'berberati', name: 'Berbérati', country: 'Central African Republic', countryCode: 'CF' },
  { id: 'bouar', name: 'Bouar', country: 'Central African Republic', countryCode: 'CF' },
  { id: 'bambari', name: 'Bambari', country: 'Central African Republic', countryCode: 'CF' },

  // ==========================================================
  // CHAD
  // ==========================================================

  { id: 'ndjamena', name: "N'Djamena", country: 'Chad', countryCode: 'TD' },
  { id: 'moundou', name: 'Moundou', country: 'Chad', countryCode: 'TD' },
  { id: 'sarh', name: 'Sarh', country: 'Chad', countryCode: 'TD' },
  { id: 'abéché', name: 'Abéché', country: 'Chad', countryCode: 'TD' },
];
// ============================================================
// ROUTES
// ============================================================
//
// A route connects two recognized mobility locations.
//
// Routes are domestic transport corridors. A country can have
// many cities and many routes without creating cross-border
// journeys.
//
// Example:
//
// Cameroon
//   Kumba → Yaoundé
//   Bamenda → Yaoundé
//
// Nigeria
//   Lagos → Abuja
//   Lagos → Ibadan
//
// The actual operator, departure time, date, vehicle, seats
// and fare belong to the TRIP.
// ============================================================

export type MobilityRoute = {
  id: string;
  countryCode: string;
  fromLocationId: string;
  toLocationId: string;
};

export const ROUTES: MobilityRoute[] = [

  // ==========================================================
  // CAMEROON
  // ==========================================================

  // South-West → Centre / Littoral
  {
    id: 'cm-kumba-yaounde',
    countryCode: 'CM',
    fromLocationId: 'kumba',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-buea-yaounde',
    countryCode: 'CM',
    fromLocationId: 'buea',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-limbe-yaounde',
    countryCode: 'CM',
    fromLocationId: 'limbe',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-kumba-douala',
    countryCode: 'CM',
    fromLocationId: 'kumba',
    toLocationId: 'douala',
  },
  {
    id: 'cm-buea-douala',
    countryCode: 'CM',
    fromLocationId: 'buea',
    toLocationId: 'douala',
  },
  {
    id: 'cm-limbe-douala',
    countryCode: 'CM',
    fromLocationId: 'limbe',
    toLocationId: 'douala',
  },

  // Littoral ↔ Centre
  {
    id: 'cm-douala-yaounde',
    countryCode: 'CM',
    fromLocationId: 'douala',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-yaounde-douala',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'douala',
  },

  // Littoral → West
  {
    id: 'cm-douala-bafoussam',
    countryCode: 'CM',
    fromLocationId: 'douala',
    toLocationId: 'bafoussam',
  },
  {
    id: 'cm-bafoussam-douala',
    countryCode: 'CM',
    fromLocationId: 'bafoussam',
    toLocationId: 'douala',
  },

  // North-West
  {
    id: 'cm-bamenda-yaounde',
    countryCode: 'CM',
    fromLocationId: 'bamenda',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-bamenda-douala',
    countryCode: 'CM',
    fromLocationId: 'bamenda',
    toLocationId: 'douala',
  },
  {
    id: 'cm-bamenda-bafoussam',
    countryCode: 'CM',
    fromLocationId: 'bamenda',
    toLocationId: 'bafoussam',
  },

  // West
  {
    id: 'cm-bafoussam-yaounde',
    countryCode: 'CM',
    fromLocationId: 'bafoussam',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-yaounde-bafoussam',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'bafoussam',
  },

  // South
  {
    id: 'cm-douala-kribi',
    countryCode: 'CM',
    fromLocationId: 'douala',
    toLocationId: 'kribi',
  },
  {
    id: 'cm-yaounde-kribi',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'kribi',
  },
  {
    id: 'cm-yaounde-ebolowa',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'ebolowa',
  },

  // North / Adamawa
  {
    id: 'cm-yaounde-ngaoundere',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'ngaoundere',
  },
  {
    id: 'cm-ngaoundere-yaounde',
    countryCode: 'CM',
    fromLocationId: 'ngaoundere',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-yaounde-garoua',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'garoua',
  },
  {
    id: 'cm-garoua-yaounde',
    countryCode: 'CM',
    fromLocationId: 'garoua',
    toLocationId: 'yaounde',
  },
  {
    id: 'cm-yaounde-maroua',
    countryCode: 'CM',
    fromLocationId: 'yaounde',
    toLocationId: 'maroua',
  },
  {
    id: 'cm-maroua-yaounde',
    countryCode: 'CM',
    fromLocationId: 'maroua',
    toLocationId: 'yaounde',
  },

  // ==========================================================
  // NIGERIA — DOMESTIC
  // ==========================================================

  {
    id: 'ng-lagos-abuja',
    countryCode: 'NG',
    fromLocationId: 'lagos',
    toLocationId: 'abuja',
  },
  {
    id: 'ng-abuja-lagos',
    countryCode: 'NG',
    fromLocationId: 'abuja',
    toLocationId: 'lagos',
  },
  {
    id: 'ng-lagos-ibadan',
    countryCode: 'NG',
    fromLocationId: 'lagos',
    toLocationId: 'ibadan',
  },
  {
    id: 'ng-ibadan-lagos',
    countryCode: 'NG',
    fromLocationId: 'ibadan',
    toLocationId: 'lagos',
  },
  {
    id: 'ng-lagos-benin-city',
    countryCode: 'NG',
    fromLocationId: 'lagos',
    toLocationId: 'benin-city',
  },
  {
    id: 'ng-benin-city-lagos',
    countryCode: 'NG',
    fromLocationId: 'benin-city',
    toLocationId: 'lagos',
  },
  {
    id: 'ng-lagos-port-harcourt',
    countryCode: 'NG',
    fromLocationId: 'lagos',
    toLocationId: 'port-harcourt',
  },
  {
    id: 'ng-port-harcourt-lagos',
    countryCode: 'NG',
    fromLocationId: 'port-harcourt',
    toLocationId: 'lagos',
  },
  {
    id: 'ng-abuja-kaduna',
    countryCode: 'NG',
    fromLocationId: 'abuja',
    toLocationId: 'kaduna',
  },
  {
    id: 'ng-kaduna-abuja',
    countryCode: 'NG',
    fromLocationId: 'kaduna',
    toLocationId: 'abuja',
  },
  {
    id: 'ng-abuja-kano',
    countryCode: 'NG',
    fromLocationId: 'abuja',
    toLocationId: 'kano',
  },
  {
    id: 'ng-kano-abuja',
    countryCode: 'NG',
    fromLocationId: 'kano',
    toLocationId: 'abuja',
  },
  {
    id: 'ng-enugu-abuja',
    countryCode: 'NG',
    fromLocationId: 'enugu',
    toLocationId: 'abuja',
  },
  {
    id: 'ng-abuja-enugu',
    countryCode: 'NG',
    fromLocationId: 'abuja',
    toLocationId: 'enugu',
  },
  {
    id: 'ng-owerri-port-harcourt',
    countryCode: 'NG',
    fromLocationId: 'owerri',
    toLocationId: 'port-harcourt',
  },
  {
    id: 'ng-port-harcourt-owerri',
    countryCode: 'NG',
    fromLocationId: 'port-harcourt',
    toLocationId: 'owerri',
  },

  // ==========================================================
  // GABON — DOMESTIC
  // ==========================================================

  {
    id: 'ga-libreville-port-gentil',
    countryCode: 'GA',
    fromLocationId: 'libreville',
    toLocationId: 'port-gentil',
  },
  {
    id: 'ga-port-gentil-libreville',
    countryCode: 'GA',
    fromLocationId: 'port-gentil',
    toLocationId: 'libreville',
  },
  {
    id: 'ga-libreville-franceville',
    countryCode: 'GA',
    fromLocationId: 'libreville',
    toLocationId: 'franceville',
  },
  {
    id: 'ga-franceville-libreville',
    countryCode: 'GA',
    fromLocationId: 'franceville',
    toLocationId: 'libreville',
  },
  {
    id: 'ga-libreville-oyem',
    countryCode: 'GA',
    fromLocationId: 'libreville',
    toLocationId: 'oyem',
  },
  {
    id: 'ga-oyem-libreville',
    countryCode: 'GA',
    fromLocationId: 'oyem',
    toLocationId: 'libreville',
  },

  // ==========================================================
  // EQUATORIAL GUINEA — DOMESTIC
  // ==========================================================

  {
    id: 'gq-malabo-bata',
    countryCode: 'GQ',
    fromLocationId: 'malabo',
    toLocationId: 'bata',
  },
  {
    id: 'gq-bata-malabo',
    countryCode: 'GQ',
    fromLocationId: 'bata',
    toLocationId: 'malabo',
  },
  {
    id: 'gq-bata-mongomo',
    countryCode: 'GQ',
    fromLocationId: 'bata',
    toLocationId: 'mongomo',
  },

  // ==========================================================
  // REPUBLIC OF THE CONGO — DOMESTIC
  // ==========================================================

  {
    id: 'cg-brazzaville-pointe-noire',
    countryCode: 'CG',
    fromLocationId: 'brazzaville',
    toLocationId: 'pointe-noire',
  },
  {
    id: 'cg-pointe-noire-brazzaville',
    countryCode: 'CG',
    fromLocationId: 'pointe-noire',
    toLocationId: 'brazzaville',
  },
  {
    id: 'cg-brazzaville-dolisie',
    countryCode: 'CG',
    fromLocationId: 'brazzaville',
    toLocationId: 'dolisie',
  },

  // ==========================================================
  // CENTRAL AFRICAN REPUBLIC — DOMESTIC
  // ==========================================================

  {
    id: 'cf-bangui-berberati',
    countryCode: 'CF',
    fromLocationId: 'bangui',
    toLocationId: 'berberati',
  },
  {
    id: 'cf-bangui-bouar',
    countryCode: 'CF',
    fromLocationId: 'bangui',
    toLocationId: 'bouar',
  },
  {
    id: 'cf-bangui-bambari',
    countryCode: 'CF',
    fromLocationId: 'bangui',
    toLocationId: 'bambari',
  },

  // ==========================================================
  // CHAD — DOMESTIC
  // ==========================================================

  {
    id: 'td-ndjamena-moundou',
    countryCode: 'TD',
    fromLocationId: 'ndjamena',
    toLocationId: 'moundou',
  },
  {
    id: 'td-moundou-ndjamena',
    countryCode: 'TD',
    fromLocationId: 'moundou',
    toLocationId: 'ndjamena',
  },
  {
    id: 'td-ndjamena-sarh',
    countryCode: 'TD',
    fromLocationId: 'ndjamena',
    toLocationId: 'sarh',
  },
];

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
  plateNumber?: string;
  vehicleType?: string;
  capacity: number;
  seatLayout: Seat[];
  amenities?: string[];
  active?: boolean;
};

export type Operator = {
  id: string;
  name: string;
  displayName: string;
  logo?: any;
  phone?: string;
  email?: string;
  address?: string;
  countryCode?: string;
  verificationStatus?: 'pending' | 'verified' | 'suspended';
  active?: boolean;
};

export type TransportTrip = {
  id: string;
  operatorId: string;
  vehicleId: string;
  routeId?: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  currency?: string;
  date: string;
  occupiedSeats: string[];
  status?: 'scheduled' | 'boarding' | 'departed' | 'completed' | 'cancelled';
  bookingOpen?: boolean;
};

export type TransportBooking = {
  id: string;
  tripId: string;
  operatorId: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  seatId: string;
  amount: number;
  currency?: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingStatus: 'reserved' | 'confirmed' | 'cancelled' | 'completed';
  ticketNumber?: string;
  qrCode?: string;
  createdAt: string;
};
export type OperatorSettings = {
  operatorId: string;
  platformFee?: number;
  currency?: string;
  acceptedPaymentMethods?: string[];
  cancellationAllowed?: boolean;
  active?: boolean;
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
