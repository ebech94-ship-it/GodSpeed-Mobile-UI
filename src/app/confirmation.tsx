
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ConfirmationScreen() {
  const router = useRouter();

  const {
    tripId,
    from,
    to,
    passengers,
    departure,
    arrival,
    seats,
    total,
    fullName,
    phone,
    paymentMethod,
  } = useLocalSearchParams<{
  tripId?: string;
    from?: string;
    to?: string;
    passengers?: string;
    departure?: string;
    arrival?: string;
    seats?: string;
    total?: string;
    fullName?: string;
    phone?: string;
    paymentMethod?: string;
  }>();

 const bookingReference = `GST-${Date.now()}`;
 
  const paymentLabel =
    paymentMethod === 'mtn'
      ? 'MTN Mobile Money'
      : paymentMethod === 'orange'
        ? 'Orange Money'
        : 'Bank Card';

  const passengerCount = Number(passengers || 1);
  const totalAmount = Number(total || 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* SUCCESS ICON */}
        <View style={styles.successCircle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.successTitle}>
          Booking Confirmed
        </Text>

        <Text style={styles.successFrench}>
          Réservation confirmée
        </Text>

        <Text style={styles.successMessage}>
          Your payment was successful and your trip has
          been reserved.
        </Text>

        {/* REFERENCE */}
        <View style={styles.referenceCard}>
          <Text style={styles.referenceLabel}>
            BOOKING REFERENCE
          </Text>

          <Text style={styles.referenceNumber}>
            {bookingReference}
          </Text>

          <Text style={styles.referenceHint}>
            Keep this reference for your trip.
          </Text>
        </View>

        {/* TRIP CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Trip details
          </Text>

          <View style={styles.routeRow}>
            <View style={styles.routePoint}>
              <Text style={styles.label}>FROM</Text>
              <Text style={styles.city}>
                {from || 'Kumba'}
              </Text>
              <Text style={styles.time}>
                {departure || '06:30'}
              </Text>
            </View>

            <View style={styles.routeMiddle}>
              <Text style={styles.arrow}>→</Text>
              <Text style={styles.duration}>
                6h 30m
              </Text>
            </View>

            <View style={styles.routePoint}>
              <Text style={styles.label}>TO</Text>
              <Text style={styles.city}>
                {to || 'Yaoundé'}
              </Text>
              <Text style={styles.time}>
                {arrival || '13:00'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Passenger
            </Text>
            <Text style={styles.infoValue}>
              {fullName || 'Passenger'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Passengers
            </Text>
            <Text style={styles.infoValue}>
              {passengerCount}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Seat(s)
            </Text>
            <Text style={styles.infoValue}>
              {seats || 'Not selected'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Payment
            </Text>
            <Text style={styles.infoValue}>
              {paymentLabel}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Amount paid
            </Text>
            <Text style={styles.totalValue}>
              {totalAmount.toLocaleString()} FCFA
            </Text>
          </View>
        </View>

        {/* PAYMENT STATUS */}
        <View style={styles.paidCard}>
          <View style={styles.paidIcon}>
            <Text style={styles.paidCheck}>✓</Text>
          </View>

          <View style={styles.paidTextContainer}>
            <Text style={styles.paidTitle}>
              Payment successful
            </Text>

            <Text style={styles.paidSubtitle}>
              Your payment has been recorded.
            </Text>
          </View>

          <Text style={styles.paidStatus}>
            PAID
          </Text>
        </View>

        {/* VIEW TICKET */}
        <Pressable
          style={styles.ticketButton}
          onPress={() =>
            router.push({
              pathname: '/ticket',
              params: {
                bookingReference,
                 tripId: tripId || '',
                from: from || 'Kumba',
                to: to || 'Yaoundé',
                passengers: passengerCount.toString(),
                departure: departure || '06:30',
                arrival: arrival || '13:00',
                seats: seats || '',
                total: totalAmount.toString(),
                fullName: fullName || 'Passenger',
                phone: phone || '',
                paymentMethod:
                  paymentMethod || 'card',
              },
            })
          }
        >
          <View>
            <Text style={styles.ticketButtonText}>
              VIEW DIGITAL TICKET
            </Text>
            <Text style={styles.ticketButtonFrench}>
              Voir le billet numérique
            </Text>
          </View>

          <Text style={styles.ticketArrow}>→</Text>
        </Pressable>

        {/* HOME */}
        <Pressable
          style={styles.homeButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.homeButtonText}>
            BACK TO HOME
          </Text>
        </Pressable>

        <Text style={styles.note}>
          Your digital ticket will contain the information
          needed for boarding.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    padding: 20,
    alignItems: 'center',
  },

  successCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E8F7EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  check: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1E9B55',
  },

  successTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#0B1F3A',
    marginTop: 16,
  },

  successFrench: {
    fontSize: 12,
    color: '#8A96A6',
    marginTop: 3,
  },

  successMessage: {
    fontSize: 13,
    color: '#6F7C8C',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 18,
    paddingHorizontal: 20,
  },

  referenceCard: {
    width: '100%',
    backgroundColor: '#0B1F3A',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },

  referenceLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#8EA0B5',
  },

  referenceNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 7,
    letterSpacing: 1,
  },

  referenceHint: {
    fontSize: 10,
    color: '#8EA0B5',
    marginTop: 6,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B1F3A',
    marginBottom: 17,
  },

  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  routePoint: {
    flex: 1,
  },

  label: {
    fontSize: 9,
    fontWeight: '800',
    color: '#8A96A6',
  },

  city: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B1F3A',
    marginTop: 4,
  },

  time: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '700',
    marginTop: 3,
  },

  routeMiddle: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  arrow: {
    fontSize: 23,
    color: '#1976D2',
    fontWeight: '800',
  },

  duration: {
    fontSize: 10,
    color: '#8A96A6',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F4',
    marginVertical: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },

  infoLabel: {
    fontSize: 12,
    color: '#8A96A6',
  },

  infoValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#26364A',
    maxWidth: '60%',
    textAlign: 'right',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F4',
    paddingTop: 14,
    marginTop: 3,
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  totalValue: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1976D2',
  },

  paidCard: {
    width: '100%',
    backgroundColor: '#EAF8F0',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  paidIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E9B55',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  paidCheck: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  paidTextContainer: {
    flex: 1,
  },

  paidTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#166B3D',
  },

  paidSubtitle: {
    fontSize: 10,
    color: '#56836A',
    marginTop: 2,
  },

  paidStatus: {
    fontSize: 10,
    fontWeight: '900',
    color: '#1E9B55',
  },

  ticketButton: {
    width: '100%',
    backgroundColor: '#1976D2',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ticketButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  ticketButtonFrench: {
    color: '#D9EAFB',
    fontSize: 10,
    marginTop: 3,
  },

  ticketArrow: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  homeButton: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D7DEE7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  homeButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  note: {
    fontSize: 10,
    color: '#9AA5B1',
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 13,
    paddingHorizontal: 15,
  },
});
