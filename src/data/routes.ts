
export type City = 'Kumba' | 'Yaoundé';

export type Route = {
  id: string;
  from: City;
  to: City;
};

export const CITIES: City[] = [
  'Kumba',
  'Yaoundé',
];

export const ROUTES: Route[] = [
  {
    id: 'kumba-yaounde',
    from: 'Kumba',
    to: 'Yaoundé',
  },
  {
    id: 'yaounde-kumba',
    from: 'Yaoundé',
    to: 'Kumba',
  },
];

