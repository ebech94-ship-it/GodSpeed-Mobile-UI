
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

type PaymentMethod = 'mtn' | 'orange' | 'card';

export default function PaymentScreen() {
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
    fullName,
    phone,
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
    fullName?: string;
    phone?: string;
  }>();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('mtn');

  const [paymentPhone, setPaymentPhone] = useState(phone || '');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const passengerCount = Number(passengers || 1);
  const totalAmount = Number(total || 0);

  const canPay =
    paymentMethod === 'card'
      ? cardNumber.trim().length >= 12 &&
        cardName.trim().length >= 3 &&
        expiry.trim().length >= 4 &&
        cvv.trim().length >= 3
      : paymentPhone.trim().length >= 8;

  const handlePayment = () => {
    if (!canPay) return;

    router.push({
      pathname: '/confirmation',
      params: {
       tripId: tripId || '',
        from: from || 'Kumba',
        to: to || 'Yaoundé',
        passengers: passengerCount.toString(),
        departure: departure || '06:30',
        arrival: arrival || '13:00',
        price: price || '8000',
        seats: seats || '',
        total: totalAmount.toString(),
        fullName: fullName || '',
        phone:
          paymentMethod === 'card'
            ? 'Card payment'
            : paymentPhone,
        paymentMethod,
      },
    });
  };

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
            <Text style={styles.headerTitle}>Payment</Text>
            <Text style={styles.headerFrench}>
              Paiement
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* TOTAL */}
          <View style={styles.totalCard}>
            <View>
              <Text style={styles.totalLabel}>
                TOTAL TO PAY
              </Text>
              <Text style={styles.totalFrench}>
                Montant total
              </Text>
            </View>

            <Text style={styles.totalAmount}>
              {totalAmount.toLocaleString()} FCFA
            </Text>
          </View>

          {/* TRIP SUMMARY */}
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>
              Your trip
            </Text>

            <View style={styles.routeRow}>
              <View>
                <Text style={styles.smallLabel}>FROM</Text>
                <Text style={styles.city}>
                  {from || 'Kumba'}
                </Text>
                <Text style={styles.time}>
                  {departure || '06:30'}
                </Text>
              </View>

              <View style={styles.routeMiddle}>
                <Text style={styles.routeArrow}>→</Text>
                <Text style={styles.duration}>
                  6h 30m
                </Text>
              </View>

              <View>
                <Text style={styles.smallLabel}>TO</Text>
                <Text style={styles.city}>
                  {to || 'Yaoundé'}
                </Text>
                <Text style={styles.time}>
                  {arrival || '13:00'}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryBottom}>
              <Text style={styles.summaryText}>
                👤 {passengerCount} passenger
                {passengerCount > 1 ? 's' : ''}
              </Text>

              <Text style={styles.summaryText}>
                💺 {seats || 'Not selected'}
              </Text>
            </View>
          </View>

          {/* PAYMENT METHODS */}
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>
              Choose payment method
            </Text>

            <Text style={styles.sectionFrench}>
              Choisissez votre mode de paiement
            </Text>

            {/* MTN */}
            <Pressable
              style={[
                styles.methodCard,
                paymentMethod === 'mtn' &&
                  styles.methodCardSelected,
              ]}
              onPress={() => setPaymentMethod('mtn')}
            >
              <View style={styles.methodLeft}>
                <View style={styles.mtnLogo}>
                  <Text style={styles.mtnText}>MTN</Text>
                </View>

                <View>
                  <Text style={styles.methodTitle}>
                    MTN Mobile Money
                  </Text>
                  <Text style={styles.methodSubtitle}>
                    Pay with your MTN MoMo account
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.radio,
                  paymentMethod === 'mtn' &&
                    styles.radioSelected,
                ]}
              >
                {paymentMethod === 'mtn' && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </Pressable>

            {/* ORANGE */}
            <Pressable
              style={[
                styles.methodCard,
                paymentMethod === 'orange' &&
                  styles.methodCardSelected,
              ]}
              onPress={() => setPaymentMethod('orange')}
            >
              <View style={styles.methodLeft}>
                <View style={styles.orangeLogo}>
                  <Text style={styles.orangeText}>
                    OR
                  </Text>
                </View>

                <View>
                  <Text style={styles.methodTitle}>
                    Orange Money
                  </Text>
                  <Text style={styles.methodSubtitle}>
                    Pay with your Orange Money account
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.radio,
                  paymentMethod === 'orange' &&
                    styles.radioSelected,
                ]}
              >
                {paymentMethod === 'orange' && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </Pressable>

            {/* CARD */}
            <Pressable
              style={[
                styles.methodCard,
                paymentMethod === 'card' &&
                  styles.methodCardSelected,
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <View style={styles.methodLeft}>
                <View style={styles.cardLogo}>
                  <Text style={styles.cardLogoText}>
                    CARD
                  </Text>
                </View>

                <View>
                  <Text style={styles.methodTitle}>
                    Bank Card
                  </Text>
                  <Text style={styles.methodSubtitle}>
                    Visa or Mastercard
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.radio,
                  paymentMethod === 'card' &&
                    styles.radioSelected,
                ]}
              >
                {paymentMethod === 'card' && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </Pressable>
          </View>

          {/* MOBILE MONEY FORM */}
          {paymentMethod !== 'card' && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                {paymentMethod === 'mtn'
                  ? 'MTN MoMo Number'
                  : 'Orange Money Number'}
              </Text>

              <Text style={styles.formSubtitle}>
                Enter the mobile number linked to your
                payment account.
              </Text>

              <TextInput
                style={styles.input}
                value={paymentPhone}
                onChangeText={setPaymentPhone}
                placeholder="e.g. 677 123 456"
                placeholderTextColor="#9AA5B1"
                keyboardType="phone-pad"
              />

              <View style={styles.securityNote}>
                <Text style={styles.securityIcon}>🔒</Text>
                <Text style={styles.securityText}>
                  Your payment will be securely processed.
                </Text>
              </View>
            </View>
          )}

          {/* CARD FORM */}
          {paymentMethod === 'card' && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                Card details
              </Text>

              <Text style={styles.formSubtitle}>
                Enter your bank card information.
              </Text>

              <Text style={styles.inputLabel}>
                CARD NUMBER
              </Text>

              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#9AA5B1"
                keyboardType="number-pad"
                maxLength={19}
              />

              <Text style={styles.inputLabel}>
                CARDHOLDER NAME
              </Text>

              <TextInput
                style={styles.input}
                value={cardName}
                onChangeText={setCardName}
                placeholder="Name on card"
                placeholderTextColor="#9AA5B1"
                autoCapitalize="words"
              />

              <View style={styles.cardRow}>
                <View style={styles.cardHalf}>
                  <Text style={styles.inputLabel}>
                    EXPIRY
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="MM/YY"
                    placeholderTextColor="#9AA5B1"
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>

                <View style={styles.cardHalf}>
                  <Text style={styles.inputLabel}>
                    CVV
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    placeholderTextColor="#9AA5B1"
                    keyboardType="number-pad"
                    secureTextEntry
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.securityNote}>
                <Text style={styles.securityIcon}>🔒</Text>
                <Text style={styles.securityText}>
                  Card payments will be connected to a
                  secure payment gateway.
                </Text>
              </View>
            </View>
          )}

          {/* PAY BUTTON */}
          <Pressable
            style={[
              styles.payButton,
              !canPay && styles.payButtonDisabled,
            ]}
            onPress={handlePayment}
            disabled={!canPay}
          >
            <Text style={styles.payButtonText}>
              PAY {totalAmount.toLocaleString()} FCFA
            </Text>

            <Text style={styles.payArrow}>→</Text>
          </Pressable>

          <Text style={styles.mockNotice}>
            Demo payment for development. No real money
            will be charged.
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
    backgroundColor: '#F5F7FA',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F1FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 30,
    color: '#0B1F3A',
    lineHeight: 30,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  headerFrench: {
    marginTop: 2,
    fontSize: 12,
    color: '#8A96A6',
  },

  content: {
    padding: 16,
  },

  totalCard: {
    backgroundColor: '#0B1F3A',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  totalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#AAB7C7',
    letterSpacing: 1,
  },

  totalFrench: {
    fontSize: 11,
    color: '#7F90A5',
    marginTop: 4,
  },

  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  sectionFrench: {
    fontSize: 12,
    color: '#8A96A6',
    marginTop: 3,
    marginBottom: 14,
  },

  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallLabel: {
    fontSize: 10,
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
  },

  routeArrow: {
    fontSize: 24,
    color: '#1976D2',
    fontWeight: '700',
  },

  duration: {
    fontSize: 10,
    color: '#8A96A6',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F4',
    marginVertical: 15,
  },

  summaryBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryText: {
    fontSize: 12,
    color: '#5E6B7A',
    fontWeight: '600',
  },

  paymentSection: {
    marginBottom: 6,
  },

  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  methodCardSelected: {
    borderColor: '#1976D2',
    borderWidth: 2,
  },

  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  mtnLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFD100',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  mtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000000',
  },

  orangeLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FF7900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  orangeText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  cardLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F1FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardLogoText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1976D2',
  },

  methodTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  methodSubtitle: {
    fontSize: 11,
    color: '#8A96A6',
    marginTop: 3,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7CFD8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    borderColor: '#1976D2',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1976D2',
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
    marginBottom: 16,
  },

  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  formSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8A96A6',
    marginTop: 4,
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B899A',
    marginBottom: 7,
    marginTop: 5,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DDE3EA',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0B1F3A',
    backgroundColor: '#FAFBFC',
    marginBottom: 13,
  },

  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },

  cardHalf: {
    flex: 1,
  },

  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 11,
    marginTop: 4,
  },

  securityIcon: {
    fontSize: 14,
    marginRight: 8,
  },

  securityText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: '#7B899A',
  },

  payButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  payButtonDisabled: {
    backgroundColor: '#B8C4D1',
  },

  payButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  payArrow: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    marginLeft: 10,
  },

  mockNotice: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    color: '#9AA5B1',
    marginTop: 12,
    paddingHorizontal: 20,
  },

  bottomSpace: {
    height: 30,
  },
});
