
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

type PaymentMethod =
  | 'MTN Mobile Money'
  | 'Orange Money'
  | 'Card';

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

  const { tripId } =
    useLocalSearchParams<{ tripId?: string }>();

  /*
   * ------------------------------------------------
   * ALL HOOKS MUST COME FIRST
   * ------------------------------------------------
   */

  const [stage, setStage] =
    useState<Stage>('form');

  const [receiverName, setReceiverName] =
    useState('');

  const [receiverPhone, setReceiverPhone] =
    useState('');

  const [parcelType, setParcelType] =
    useState<ParcelType>('Package');

  const [contents, setContents] =
    useState('');

  const [parcelFee, setParcelFee] =
    useState(3000);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(
      'MTN Mobile Money'
    );

  const [paid, setPaid] =
    useState(false);

  /*
   * ------------------------------------------------
   * TRIP
   * ------------------------------------------------
   *
   * If tripId exists, we are coming from a selected
   * trip.
   *
   * If tripId does not exist, we show the trip
   * selection screen below.
   */

  const trip = TRIPS.find(
    (item) => item.id === tripId
  );

  /*
   * ------------------------------------------------
   * TRIP SELECTION SCREEN
   * ------------------------------------------------
   */

  if (!trip) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>

          {/* HEADER */}

          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>
                ‹
              </Text>
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

            <View style={styles.introCard}>
              <Text style={styles.introTitle}>
                Select your trip
              </Text>

              <Text style={styles.introFrench}>
                Sélectionnez votre voyage
              </Text>

              <Text style={styles.introDescription}>
                Choose the trip your parcel will travel
                on before entering the parcel details.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              Available trips
            </Text>

            <Text style={styles.sectionFrench}>
              Voyages disponibles
            </Text>

            {TRIPS.map((item) => {
              const operator =
                getOperator(item.operatorId);

              const vehicle =
                getVehicle(item.vehicleId);

              return (
                <Pressable
                  key={item.id}
                  style={styles.tripCard}
                  onPress={() =>
                    router.push({
                      pathname: '/parcel',
                      params: {
                        tripId: item.id,
                      },
                    })
                  }
                >
                  <View style={styles.tripTopRow}>

                    <View>
                      <Text style={styles.tripRoute}>
                        {item.from} → {item.to}
                      </Text>

                      <Text style={styles.tripOperator}>
                        {operator?.displayName ||
                          'GodSpeed Voyage'}
                      </Text>
                    </View>

                    <View style={styles.tripArrow}>
                      <Text style={styles.tripArrowText}>
                        ›
                      </Text>
                    </View>

                  </View>

                  <View style={styles.tripDetailsRow}>

                    <View style={styles.tripDetail}>
                      <Text style={styles.tripDetailLabel}>
                        DEPARTURE
                      </Text>

                      <Text style={styles.tripDetailValue}>
                        {item.departure}
                      </Text>
                    </View>

                    <View style={styles.tripDetail}>
                      <Text style={styles.tripDetailLabel}>
                        ARRIVAL
                      </Text>

                      <Text style={styles.tripDetailValue}>
                        {item.arrival}
                      </Text>
                    </View>

                    <View style={styles.tripDetail}>
                      <Text style={styles.tripDetailLabel}>
                        VEHICLE
                      </Text>

                      <Text
                        style={styles.tripDetailValue}
                        numberOfLines={1}
                      >
                        {vehicle?.name || '—'}
                      </Text>
                    </View>

                  </View>

                  <View style={styles.selectTripButton}>
                    <Text style={styles.selectTripText}>
                      SELECT THIS TRIP
                    </Text>

                    <Text style={styles.selectTripArrow}>
                      →
                    </Text>
                  </View>

                </Pressable>
              );
            })}

            <View style={styles.bottomSpace} />

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * ------------------------------------------------
   * SELECTED TRIP DATA
   * ------------------------------------------------
   */

  const from = trip.from;
  const destination = trip.to;

  const operator =
    getOperator(trip.operatorId)!;

  const vehicle =
    getVehicle(trip.vehicleId)!;

  const reference = useMemo(
    () => `GSP-${Date.now()}`,
    []
  );

  const canPreview =
    receiverName.trim().length > 1 &&
    receiverPhone.trim().length >= 6 &&
    destination.trim().length > 1 &&
    contents.trim().length > 1;

  /*
   * ------------------------------------------------
   * PAYMENT
   * ------------------------------------------------
   */

  const handlePayment = () => {
    setPaid(true);
    setStage('receipt');
  };

  /*
   * ------------------------------------------------
   * SHARE RECEIPT
   * ------------------------------------------------
   */

  const handleShare = async () => {
    await Share.share({
      message: `GODSPEED MOBILITY

Parcel Receipt
Reference: ${reference}

From: ${from}
To: ${destination}
Operator: ${
        operator?.displayName ||
        'GodSpeed Voyage'
      }
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

  /*
   * ------------------------------------------------
   * CALL DRIVER / ATTENDANT
   * ------------------------------------------------
   */

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

  /*
   * ------------------------------------------------
   * BACK BUTTON
   * ------------------------------------------------
   */

  const goBack = () => {
    if (stage === 'form') {
      /*
       * Going back from the form returns to
       * trip selection, not Home.
       */
      router.replace('/parcel');
      return;
    }

    if (stage === 'preview') {
      setStage('form');
      return;
    }

    if (stage === 'payment') {
      setStage('preview');
      return;
    }
  };

  /*
   * ------------------------------------------------
   * PARCEL FORM / STAGES
   * ------------------------------------------------
   */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>

        <View style={styles.header}>

          <Pressable
            style={styles.backButton}
            onPress={goBack}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>
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

              onCallTripContact={
                handleCallTripContact
              }

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

              setPaymentMethod={
                setPaymentMethod
              }

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

  /*
   * TRIP SELECTION
   */

  introCard: {
    backgroundColor: '#E8F1FB',
    borderRadius: 22,
    padding: 18,
    marginTop: 12,
    marginBottom: 24,
  },

  introTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  introFrench: {
    fontSize: 10,
    color: '#1976D2',
    fontWeight: '700',
    marginTop: 2,
  },

  introDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#526274',
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  sectionFrench: {
    fontSize: 10,
    color: '#8794A5',
    marginTop: 2,
    marginBottom: 14,
  },

  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8ECF1',
  },

  tripTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tripRoute: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  tripOperator: {
    fontSize: 10,
    color: '#7B899A',
    marginTop: 4,
  },

  tripArrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tripArrowText: {
    fontSize: 25,
    color: '#1976D2',
    marginTop: -2,
  },

  tripDetailsRow: {
    flexDirection: 'row',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F5',
  },

  tripDetail: {
    flex: 1,
  },

  tripDetailLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.7,
    color: '#8794A5',
  },

  tripDetailValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#172B4D',
    marginTop: 4,
  },

  selectTripButton: {
    height: 44,
    borderRadius: 14,
    backgroundColor: '#0B1F3A',
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectTripText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  selectTripArrow: {
    color: '#7DBBFF',
    fontSize: 19,
    marginLeft: 8,
  },

  bottomSpace: {
    height: 30,
  },
});
