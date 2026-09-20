import { TRIPS, getOperator, getVehicle } from '@/data/transportData';
import ParcelForm, { type ParcelType } from '@/parcel/ParcelForm';
import ParcelStages from '@/parcel/ParcelStages';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Stage = 'form' | 'preview' | 'payment' | 'receipt';
type PaymentMethod = 'MTN Mobile Money' | 'Orange Money' | 'Card';

const LOCATIONS = [
  'Kumba',
  'Buea',
  'Douala',
  'Yaoundé',
];

const DEMO_SENDER = {
  name: 'Your account',
  phone: '',
};

const DEMO_TRIP_CONTACT = {
  role: 'Driver / Attendant',
  phone: '',
};

export default function ParcelScreen() {
  const router = useRouter();
const { tripId } = useLocalSearchParams<{ tripId?: string }>();

  const [stage, setStage] = useState<Stage>('form');
const trip = TRIPS.find(
  (item) => item.id === tripId
);

if (!trip) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={{ padding: 20 }}>
          Trip not found.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const from = trip.from;
const destination = trip.to;

  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');

  const [parcelType, setParcelType] =
    useState<ParcelType>('Package');

  const [contents, setContents] = useState('');

  const [parcelFee, setParcelFee] = useState(3000);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('MTN Mobile Money');

  const [paid, setPaid] = useState(false);

  // Find a trip matching the selected route.


  const operator = getOperator(trip.operatorId)!;
  const vehicle = getVehicle(trip.vehicleId)!;

  const reference = useMemo(
    () => `GSP-${Date.now()}`,
    []
  );

  const canPreview =
    receiverName.trim().length > 1 &&
    receiverPhone.trim().length >= 6 &&
    destination.trim().length > 1 &&
    contents.trim().length > 1;

  const handlePayment = () => {
    setPaid(true);
    setStage('receipt');
  };

  const handleShare = async () => {
    await Share.share({
      message: `GODSPEED MOBILITY

Parcel Receipt
Reference: ${reference}

From: ${from}
To: ${destination}
Operator: ${operator?.displayName || 'GodSpeed Voyage'}
Vehicle: ${vehicle?.name || '—'}
Parcel: ${parcelType}
Contents: ${contents}
Receiver: ${receiverName}
Receiver phone: ${receiverPhone}
Amount paid: ${parcelFee.toLocaleString()} FCFA
Payment: ${paymentMethod}

Status: PAID`,
    });
  };

  const handleCallTripContact = () => {
    if (!DEMO_TRIP_CONTACT.phone) {
      Alert.alert(
        'Trip contact',
        'The driver/attendant contact will appear here once the trip is assigned.'
      );
      return;
    }

    Linking.openURL(
      `tel:${DEMO_TRIP_CONTACT.phone}`
    );
  };

  const goBack = () => {
    if (stage === 'form') {
      router.back();
      return;
    }

    if (stage === 'preview') {
      setStage('form');
      return;
    }

    if (stage === 'payment') {
      setStage('preview');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>

        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={goBack}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>
              Send a Parcel
            </Text>

            <Text style={styles.headerFrench}>
              Envoyez votre colis
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >

          {stage === 'form' ? (
            <ParcelForm
              trip={trip}
              operator={operator}
              vehicle={vehicle}

              from={from}
              destination={destination}
              

              demoSender={DEMO_SENDER}
              demoTripContact={DEMO_TRIP_CONTACT}

              receiverName={receiverName}
              receiverPhone={receiverPhone}

              parcelType={parcelType}
              contents={contents}
              parcelFee={parcelFee}
              canPreview={canPreview}
            
              setReceiverName={setReceiverName}
              setReceiverPhone={setReceiverPhone}

              setParcelType={setParcelType}
              setContents={setContents}
              setParcelFee={setParcelFee}

              onCallTripContact={handleCallTripContact}

              onReview={() =>
                setStage('preview')
              }
            />
          ) : (
            <ParcelStages
              stage={stage}
              paid={paid}

              trip={trip}
              operator={operator}
              vehicle={vehicle}

              demoSender={DEMO_SENDER}
              demoTripContact={DEMO_TRIP_CONTACT}

              destination={destination}
              parcelType={parcelType}
              contents={contents}

              receiverName={receiverName}
              receiverPhone={receiverPhone}

              parcelFee={parcelFee}
              paymentMethod={paymentMethod}

              setPaymentMethod={setPaymentMethod}

              reference={reference}

              onContinueToPayment={() =>
                setStage('payment')
              }

              onEdit={() =>
                setStage('form')
              }

              onPayment={handlePayment}

              onShare={handleShare}

              onCallTripContact={
                handleCallTripContact
              }
            />
          )}

          <View style={styles.bottomSpace} />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  headerCenter: {
    alignItems: 'center',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8ECF1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 30,
    lineHeight: 32,
    color: '#0B1F3A',
    marginTop: -3,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  headerFrench: {
    fontSize: 9,
    color: '#8794A5',
    marginTop: 2,
  },

  headerSpacer: {
    width: 42,
  },

  bottomSpace: {
    height: 30,
  },
});