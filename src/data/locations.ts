
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