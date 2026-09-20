
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function PassengerScreen() {
  const router = useRouter();

  const {
      tripId,
    from,
    to,
    passengers,
    departure,
    arrival,
    price,
    seats,
    total,
  } = useLocalSearchParams<{
  tripId?: string;
    from?: string;
    to?: string;
    passengers?: string;
    departure?: string;
    arrival?: string;
    price?: string;
    seats?: string;
    total?: string;
  }>();

  const passengerCount = Number(passengers || 1);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const canContinue =
    fullName.trim().length >= 3 &&
    phone.trim().length >= 8;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View>
            <Text style={styles.headerTitle}>
              Passenger Details
            </Text>

            <Text style={styles.headerFrench}>
              Informations du passager
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* TRIP SUMMARY */}
          <View style={styles.tripCard}>
            <View style={styles.tripTop}>
              <View>
                <Text style={styles.routeLabel}>
                  YOUR TRIP
                </Text>

                <Text style={styles.routeText}>
                  {from || 'Kumba'} → {to || 'Yaoundé'}
                </Text>
              </View>

              <Text style={styles.totalPrice}>
                {Number(total || 0).toLocaleString()} FCFA
              </Text>
            </View>

            <View style={styles.tripDetails}>
              <Text style={styles.tripDetail}>
                🕐 {departure || '06:30'} – {arrival || '13:00'}
              </Text>

              <Text style={styles.tripDetail}>
                🪑 {seats || 'Not selected'}
              </Text>
            </View>
          </View>

          {/* PASSENGER FORM */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Who is travelling?
            </Text>

            <Text style={styles.sectionFrench}>
              Qui voyage ?
            </Text>

            <Text style={styles.fieldLabel}>
              FULL NAME
            </Text>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter passenger name"
              placeholderTextColor="#9AA6B5"
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>
              PHONE NUMBER
            </Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g. 6XXXXXXXX"
              placeholderTextColor="#9AA6B5"
              keyboardType="phone-pad"
              style={styles.input}
            />

            {/* MOCK NOTE */}
            <View style={styles.noteCard}>
              <Text style={styles.noteIcon}>ℹ</Text>

              <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>
                  Booking information
                </Text>

                <Text style={styles.noteText}>
                  Your phone number will be used to send
                  your booking confirmation and ticket.
                </Text>
              </View>
            </View>
          </View>

          {/* PAYMENT PREVIEW */}
          <View style={styles.paymentCard}>
            <View>
              <Text style={styles.paymentLabel}>
                TOTAL TO PAY
              </Text>

              <Text style={styles.paymentFrench}>
                Montant total
              </Text>
            </View>

            <Text style={styles.paymentAmount}>
              {Number(total || 0).toLocaleString()} FCFA
            </Text>
          </View>

          {/* CONTINUE */}
          <Pressable
            disabled={!canContinue}
            style={[
              styles.continueButton,
              !canContinue && styles.continueDisabled,
            ]}
            onPress={() => {
              router.push({
                pathname: '/payment',
                params: {
                tripId: tripId || '',
                  from: from || 'Kumba',
                  to: to || 'Yaoundé',
                  passengers: passengerCount.toString(),
                  departure: departure || '06:30',
                  arrival: arrival || '13:00',
                  price: price || '8000',
                  seats: seats || '',
                  total: total || '0',
                  fullName,
                  phone,
                },
              });
            }}
          >
            <Text style={styles.continueText}>
              CONTINUE TO PAYMENT
            </Text>

            <Text style={styles.continueArrow}>
              →
            </Text>
          </Pressable>

          <Text style={styles.secureText}>
            🔒 Your information is kept secure.
          </Text>

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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 32,
    color: '#0B1F3A',
    lineHeight: 34,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  headerFrench: {
    fontSize: 10,
    color: '#7B899A',
    marginTop: 2,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  tripCard: {
    backgroundColor: '#0B1F3A',
    borderRadius: 22,
    padding: 17,
  },

  tripTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  routeLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#7DBBFF',
  },

  routeText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },

  totalPrice: {
    fontSize: 15,
    fontWeight: '900',
    color: '#7DBBFF',
  },

  tripDetails: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 18,
  },

  tripDetail: {
    fontSize: 9,
    color: '#B8C8DA',
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  sectionFrench: {
    fontSize: 10,
    color: '#7B899A',
    marginTop: 2,
    marginBottom: 20,
  },

  fieldLabel: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#62748A',
    marginBottom: 7,
  },

  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1E7EE',
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#172B4D',
    marginBottom: 17,
  },

  noteCard: {
    backgroundColor: '#E8F1FB',
    borderRadius: 17,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  noteIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 15,
    fontWeight: '900',
    color: '#1976D2',
    marginRight: 10,
  },

  noteContent: {
    flex: 1,
  },

  noteTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#172B4D',
  },

  noteText: {
    fontSize: 9,
    lineHeight: 14,
    color: '#62748A',
    marginTop: 3,
  },

  paymentCard: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  paymentLabel: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#0B1F3A',
  },

  paymentFrench: {
    fontSize: 9,
    color: '#8A96A6',
    marginTop: 3,
  },

  paymentAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1976D2',
  },

  continueButton: {
    height: 56,
    marginTop: 12,
    borderRadius: 17,
    backgroundColor: '#0B1F3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueDisabled: {
    backgroundColor: '#B8C2CE',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  continueArrow: {
    color: '#7DBBFF',
    fontSize: 22,
    marginLeft: 9,
  },

  secureText: {
    textAlign: 'center',
    fontSize: 9,
    color: '#8A96A6',
    marginTop: 12,
  },

  bottomSpace: {
    height: 20,
  },
});

