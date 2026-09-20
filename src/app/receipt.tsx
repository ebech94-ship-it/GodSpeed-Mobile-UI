
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Alert,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ReceiptScreen() {
  const router = useRouter();

  const {
    bookingReference,
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
    bookingReference?: string;
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

  const reference = bookingReference || 'GST-2026-000184';
  const passengerName = fullName || 'Passenger';
  const departureCity = from || 'Kumba';
  const destinationCity = to || 'Yaoundé';
  const departureTime = departure || '06:30';
  const arrivalTime = arrival || '13:00';
  const passengerCount = passengers || '1';
  const seatNumbers = seats || '—';
  const totalAmount = Number(total || 0);

  const paymentLabel =
    paymentMethod === 'mtn'
      ? 'MTN Mobile Money'
      : paymentMethod === 'orange'
        ? 'Orange Money'
        : 'Bank Card';

  const handleSave = () => {
    Alert.alert(
      'Save Receipt',
      'Receipt saving will be connected to the device file system next.'
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share Receipt',
      'Receipt sharing will be connected to the device share system next.'
    );
  };

  const handlePrint = () => {
    Alert.alert(
      'Print Receipt',
      'Printing will be connected to the device printer service next.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View>
            <Text style={styles.headerTitle}>Payment Receipt</Text>
            <Text style={styles.headerSubtitle}>
              Reçu de paiement
            </Text>
          </View>
        </View>

        {/* RECEIPT */}
        <View style={styles.receiptCard}>
          {/* BRAND */}
       
<View style={styles.brandSection}>
  {/* GODSPEED BRAND */}
  <View style={styles.brandBlock}>
    <Text style={styles.brand}>GODSPEED</Text>
    <Text style={styles.brandSub}>MOBILITY</Text>
  </View>

  {/* BUS IMAGE */}
  <View style={styles.busHeaderContainer}>
    <Image
      source={require('../../assets/images/bus.png')}
      style={styles.busHeaderImage}
      resizeMode="contain"
    />
  </View>

  {/* PAYMENT STATUS */}
  <View style={styles.paidBadge}>
    <Text style={styles.paidText}>PAID</Text>
  </View>
</View>



          <View style={styles.brandDivider} />

          {/* TITLE */}
          <Text style={styles.receiptTitle}>
            PAYMENT RECEIPT
          </Text>

          <Text style={styles.receiptFrench}>
            Reçu de paiement
          </Text>

          {/* AMOUNT */}
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>TOTAL PAID</Text>

            <Text style={styles.amount}>
              {totalAmount.toLocaleString()} FCFA
            </Text>

            <Text style={styles.amountStatus}>
              Payment successful
            </Text>
          </View>

          {/* TRANSACTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              TRANSACTION DETAILS
            </Text>

            <ReceiptRow
              label="Booking reference"
              value={reference}
            />

            <ReceiptRow
              label="Payment method"
              value={paymentLabel}
            />

            <ReceiptRow
              label="Payment status"
              value="PAID"
              valueStyle={styles.successText}
            />
          </View>

          {/* JOURNEY */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              JOURNEY DETAILS
            </Text>

            <ReceiptRow
              label="Route"
              value={`${departureCity} → ${destinationCity}`}
            />

            <ReceiptRow
              label="Departure"
              value={`${departureTime} • ${departureCity}`}
            />

            <ReceiptRow
              label="Arrival"
              value={`${arrivalTime} • ${destinationCity}`}
            />

            <ReceiptRow
              label="Passengers"
              value={passengerCount}
            />

            <ReceiptRow
              label="Seat(s)"
              value={seatNumbers}
            />
          </View>

          {/* PASSENGER */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PASSENGER
            </Text>

            <ReceiptRow
              label="Full name"
              value={passengerName}
            />

            <ReceiptRow
              label="Phone"
              value={phone || '—'}
            />
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>
              GODSPEED TECHNOLOGIES
            </Text>

            <Text style={styles.footerText}>
              Safe journeys • Better connections
            </Text>

            <Text style={styles.footerText}>
              Thank you for travelling with GodSpeed Tech.
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Pressable
            style={styles.primaryAction}
            onPress={handleSave}
          >
            <Text style={styles.primaryActionText}>
              SAVE RECEIPT
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryAction}
            onPress={handleShare}
          >
            <Text style={styles.secondaryActionText}>
              SHARE RECEIPT
            </Text>
          </Pressable>

          <Pressable
            style={styles.printAction}
            onPress={handlePrint}
          >
            <Text style={styles.printActionText}>
              PRINT RECEIPT
            </Text>
          </Pressable>
        </View>

        <Text style={styles.note}>
          Keep this receipt as proof of payment for your journey.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ReceiptRow({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle?: object;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>

      <Text style={[styles.rowValue, valueStyle]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: '#0B1F3A',
    marginTop: -3,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },

  brand: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#0B1F3A',
  },

brandSection: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  minHeight: 92,
},

brandBlock: {
  width: 96,
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'flex-start',
},



brandSub: {
  fontSize: 9,
  fontWeight: '900',
  letterSpacing: 2,
  color: '#1976D2',
  marginTop: 3,
  includeFontPadding: false,
},

busHeaderContainer: {
  flex: 1,
  height: 92,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
},

busHeaderImage: {
  width: 165,
  height: 92,
},

paidBadge: {
  width: 58,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#E8F5E9',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginLeft: 6,
},

paidText: {
  fontSize: 10,
  fontWeight: '900',
  color: '#2E7D32',
  letterSpacing: 0.6,
},



  brandDivider: {
    height: 1,
    backgroundColor: '#E7EBF0',
    marginVertical: 18,
  },

  receiptTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '900',
    color: '#0B1F3A',
    letterSpacing: 1,
  },

  receiptFrench: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7A8492',
    marginTop: 3,
  },

  amountBox: {
    marginTop: 18,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#F3F7FC',
    alignItems: 'center',
  },

  amountLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#6B7280',
  },

  amount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0B1F3A',
    marginTop: 5,
  },

  amountStatus: {
    fontSize: 11,
    color: '#2E7D32',
    marginTop: 4,
    fontWeight: '700',
  },

  section: {
    marginTop: 22,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#1976D2',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },

  rowLabel: {
    flex: 1,
    fontSize: 12,
    color: '#7A8492',
  },

  rowValue: {
    flex: 1.5,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '700',
    color: '#172033',
  },

  successText: {
    color: '#2E7D32',
  },

  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#E7EBF0',
  },

  footerTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#0B1F3A',
  },

  footerText: {
    fontSize: 10,
    color: '#7A8492',
    marginTop: 4,
    textAlign: 'center',
  },

  actions: {
    marginTop: 16,
    gap: 10,
  },

  primaryAction: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  secondaryAction: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DEE8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryActionText: {
    color: '#0B1F3A',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  printAction: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  printActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  note: {
    textAlign: 'center',
    fontSize: 10,
    color: '#8A94A3',
    marginTop: 14,
    lineHeight: 15,
  },
});

