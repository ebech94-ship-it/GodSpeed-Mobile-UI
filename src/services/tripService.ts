import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { TransportTrip } from '@/data/transportData';

export async function getTrips(): Promise<TransportTrip[]> {
  const snapshot = await getDocs(collection(db, 'trips'));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TransportTrip[];
}