
import { getOperator, getTrip, getVehicle } from '@/data/transportData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function TicketScreen() {
  const router = useRouter();

  const {
    bookingReference,
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
    bookingReference?: string;
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

  const totalAmount = Number(total || 0);
  const trip = tripId ? getTrip(tripId) : undefined;
const vehicle = trip ? getVehicle(trip.vehicleId) : undefined;
const operator = trip ? getOperator(trip.operatorId) : undefined;

  const paymentLabel =
    paymentMethod === 'mtn'
      ? 'MTN Mobile Money'
      : paymentMethod === 'orange'
        ? 'Orange Money'
        : 'Bank Card';

  const reference = bookingReference || 'GST-2026-000184';
  const passengerName = fullName || 'Passenger';
  const departureCity = trip?.from || from || 'Kumba';
const destinationCity = trip?.to || to || 'Yaoundé';
const departureTime = trip?.departure || departure || '06:30';
const arrivalTime = trip?.arrival || arrival || '13:00';

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

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Your Ticket</Text>
            <Text style={styles.headerFrench}>
              Votre billet de voyage
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* MAIN TICKET */}
          <View style={styles.ticket}>
            {/* GODSPEED HEADER */}
            <View style={styles.ticketHero}>
              <View style={styles.brandBlock}>
                <Text style={styles.brand}>GODSPEED</Text>
                <Text style={styles.brandSub}>MOBILITY</Text>

                <Text style={styles.brandFrench}>
  {operator?.displayName || 'VOYAGEZ AVEC GODSPEED TECH'}
</Text>
              </View>

              <View style={styles.paidBadge}>
                <Text style={styles.paidText}>PAID</Text>
              </View>

              <Image
                source={require('../../assets/images/bus.png')}
                style={styles.busImage}
                resizeMode="contain"
              />
            </View>

            {/* TICKET STRIP */}
            <View style={styles.ticketStrip}>
              <Text style={styles.stripText}>
                GODSPEED TECH • SAFE JOURNEYS • BETTER CONNECTIONS
              </Text>
            </View>

            {/* ROUTE */}
            <View style={styles.routeSection}>
              <View style={styles.cityBlock}>
                <Text style={styles.routeLabel}>FROM</Text>

                <Text style={styles.city}>{departureCity}</Text>

                <Text style={styles.time}>{departureTime}</Text>
              </View>

              <View style={styles.routeMiddle}>
                <View style={styles.routeLineContainer}>
                  <View style={styles.routeDot} />
                  <View style={styles.routeLine} />
                  <Text style={styles.routeBus}>🚌</Text>
                  <View style={styles.routeLine} />
                  <View style={styles.routeDot} />
                </View>

               <Text style={styles.routeLabel}>
  {operator?.displayName || 'GODSPEED'}
</Text>
              </View>

              <View style={[styles.cityBlock, styles.cityBlockRight]}>
                <Text style={styles.routeLabel}>TO</Text>

                <Text style={styles.city}>{destinationCity}</Text>

                <Text style={styles.time}>{arrivalTime}</Text>
              </View>
            </View>

            {/* TRAVEL DATE */}
            <View style={styles.dateBar}>
              <View>
                <Text style={styles.smallLabel}>DEPARTURE</Text>
                <Text style={styles.dateValue}>
  {trip?.date || 'Scheduled Trip'}
</Text>
              </View>

              <View style={styles.dateDivider} />

              <View>
                <Text style={styles.smallLabel}>BOARDING</Text>
                <Text style={styles.dateValue}>
                  Please arrive early
                </Text>
              </View>
            </View>

            {/* PERFORATION */}
            <View style={styles.perforation}>
              <View style={styles.notchLeft} />
              <View style={styles.dashedLine} />
              <View style={styles.notchRight} />
            </View>

            {/* PASSENGER DETAILS */}
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>
                Passenger Details
              </Text>

              <Text style={styles.sectionFrench}>
                Informations du passager
              </Text>

              <View style={styles.detailsGrid}>
                <TicketDetail
                  label="PASSENGER"
                  value={passengerName}
                />
<TicketDetail
  label="VEHICLE"
  value={vehicle?.name || 'GodSpeed Coach'}
  />
  <TicketDetail
  label="OPERATOR"
  value={operator?.displayName || 'GodSpeed Voyage'}
/>
                <TicketDetail
                  label="SEAT"
                  value={seats || 'Assigned at boarding'}
                />

                <TicketDetail
                  label="PASSENGERS"
                  value={passengers || '1'}
                />

                <TicketDetail
                  label="PAYMENT"
                  value={paymentLabel}
                />
              </View>
            </View>

            {/* BOOKING REFERENCE */}
            <View style={styles.referenceCard}>
              <View>
                <Text style={styles.smallLabel}>
                  BOOKING REFERENCE
                </Text>

                <Text style={styles.reference}>
                  {reference}
                </Text>
                <Text style={styles.tripIdText}>
  Trip: {tripId || '—'}
</Text>
              </View>

              <View style={styles.referenceStatus}>
                <Text style={styles.referenceStatusText}>
                  CONFIRMED
                </Text>
              </View>
            </View>

            {/* QR AREA */}
            <View style={styles.qrSection}>
              <View style={styles.qrBox}>
                <View style={styles.qrFake}>
                  <View style={styles.qrFinder}>
                    <View style={styles.qrFinderInner} />
                  </View>

                  <View
                    style={[
                      styles.qrFinder,
                      styles.qrFinderTopRight,
                    ]}
                  >
                    <View style={styles.qrFinderInner} />
                  </View>

                  <View
                    style={[
                      styles.qrFinder,
                      styles.qrFinderBottomLeft,
                    ]}
                  >
                    <View style={styles.qrFinderInner} />
                  </View>

                  <View style={styles.qrPixelOne} />
                  <View style={styles.qrPixelTwo} />
                  <View style={styles.qrPixelThree} />
                  <View style={styles.qrPixelFour} />
                  <View style={styles.qrPixelFive} />
                </View>
              </View>

              <Text style={styles.scanText}>
                Scan to verify this ticket
              </Text>

              <Text style={styles.scanFrench}>
                Scanner pour vérifier le billet
              </Text>
            </View>

            {/* PAYMENT */}
            <View style={styles.amountSection}>
              <View>
                <Text style={styles.smallLabel}>
                  AMOUNT PAID
                </Text>

                <Text style={styles.amountFrench}>
                  Montant payé
                </Text>
              </View>

              <Text style={styles.amount}>
                {totalAmount > 0
                  ? `${totalAmount.toLocaleString()} FCFA`
                  : '— FCFA'}
              </Text>
            </View>

            {/* FOOTER */}
            <View style={styles.ticketFooter}>
              <Text style={styles.footerTitle}>
                GODSPEED MOBILITY
              </Text>

              <Text style={styles.footerText}>
                Please present this ticket and a valid ID
                when boarding.
              </Text>

              <Text style={styles.footerFrench}>
                Présentez ce billet et une pièce d'identité
                valide à l'embarquement.
              </Text>
            </View>
          </View>

          {/* ACTIONS */}
         
<View style={styles.actions}>
  <Pressable
    style={styles.primaryAction}
    onPress={() => {}}
  >
    <Text style={styles.primaryActionText}>
      SAVE TICKET
    </Text>
  </Pressable>

  <Pressable
    style={styles.secondaryAction}
    onPress={() => {}}
  >
    <Text style={styles.secondaryActionText}>
      SHARE TICKET
    </Text>
  </Pressable>

  <Pressable
    style={styles.receiptAction}
    onPress={() =>
      router.push({
        pathname: '/receipt',
        params: {
          bookingReference: reference,
          from: departureCity,
          to: destinationCity,
          passengers: passengers || '1',
          departure: departureTime,
          arrival: arrivalTime,
          seats: seats || '',
          total: totalAmount.toString(),
          fullName: passengerName,
          phone: phone || '',
          paymentMethod: paymentMethod || 'card',
        },
      })
    }
  >
    <Text style={styles.receiptActionText}>
      VIEW PAYMENT RECEIPT
    </Text>
  </Pressable>
</View>



          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* TICKET DETAIL */

function TicketDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  /* HEADER */

  header: {
    height: 72,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF3',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  backText: {
    color: '#0B1F3A',
    fontSize: 30,
    lineHeight: 30,
    marginTop: -2,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    color: '#0B1F3A',
    fontSize: 19,
    fontWeight: '900',
  },

  headerFrench: {
    color: '#8A96A6',
    fontSize: 10,
    marginTop: 2,
  },

  content: {
    padding: 14,
    paddingBottom: 35,
  },

  /* TICKET */

  ticket: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1E7EE',
  },

  ticketHero: {
    height: 170,
    backgroundColor: '#0B1F3A',
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },

  brandBlock: {
    zIndex: 3,
  },

  brand: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 2.2,
  },

  brandSub: {
    color: '#7DBBFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 3.5,
    marginTop: 1,
  },

  brandFrench: {
    color: '#B9C9DB',
    fontSize: 8,
    fontWeight: '600',
    marginTop: 8,
  },

  busImage: {
    position: 'absolute',
    right: -25,
    bottom: -5,
    width: 235,
    height: 135,
    opacity: 0.82,
  },

  paidBadge: {
    position: 'absolute',
    top: 18,
    right: 17,
    backgroundColor: '#20A05A',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 5,
  },

  paidText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  ticketStrip: {
    height: 27,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stripText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
tripIdText: {
  color: '#7A8492',
  fontSize: 8,
  marginTop: 3,
},
  /* ROUTE */

  routeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  cityBlock: {
    flex: 1,
  },

  cityBlockRight: {
    alignItems: 'flex-end',
  },

  routeLabel: {
    color: '#8A96A6',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },

  city: {
    color: '#0B1F3A',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },

  time: {
    color: '#1976D2',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 3,
  },

  routeMiddle: {
    width: 74,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  routeLineContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1976D2',
  },

  routeLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CAD4DF',
  },

  routeBus: {
    fontSize: 17,
    marginHorizontal: 4,
  },

  /* DATE */

  dateBar: {
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 13,
    backgroundColor: '#F5F8FB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#DCE3EA',
    marginHorizontal: 16,
  },

  smallLabel: {
    color: '#8A96A6',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  dateValue: {
    color: '#26364A',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 3,
  },

  /* PERFORATION */

  perforation: {
    height: 25,
    position: 'relative',
    justifyContent: 'center',
    marginTop: 10,
  },

  dashedLine: {
    borderTopWidth: 1,
    borderColor: '#D6DEE7',
    borderStyle: 'dashed',
    marginHorizontal: 14,
  },

  notchLeft: {
    position: 'absolute',
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3F6FA',
    zIndex: 2,
  },

  notchRight: {
    position: 'absolute',
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3F6FA',
    zIndex: 2,
  },

  /* DETAILS */

  detailsSection: {
    paddingHorizontal: 17,
    paddingTop: 4,
  },

  sectionTitle: {
    color: '#0B1F3A',
    fontSize: 14,
    fontWeight: '900',
  },

  sectionFrench: {
    color: '#8A96A6',
    fontSize: 8,
    marginTop: 2,
  },

  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },

  detailItem: {
    width: '50%',
    marginBottom: 15,
    paddingRight: 8,
  },

  detailLabel: {
    color: '#8A96A6',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  detailValue: {
    color: '#26364A',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },

  /* REFERENCE */

  referenceCard: {
    marginHorizontal: 15,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#EEF5FC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  reference: {
    color: '#0B1F3A',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 4,
  },

  referenceStatus: {
    backgroundColor: '#DFF5E8',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },

  referenceStatusText: {
    color: '#16834A',
    fontSize: 7,
    fontWeight: '900',
  },

  /* QR */

  qrSection: {
    alignItems: 'center',
    paddingVertical: 18,
  },

  qrBox: {
    width: 138,
    height: 138,
    borderWidth: 5,
    borderColor: '#0B1F3A',
    padding: 6,
    backgroundColor: '#FFFFFF',
  },

  qrFake: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  qrFinder: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 34,
    height: 34,
    borderWidth: 6,
    borderColor: '#0B1F3A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrFinderTopRight: {
    left: undefined,
    right: 2,
  },

  qrFinderBottomLeft: {
    top: undefined,
    bottom: 2,
  },

  qrFinderInner: {
    width: 11,
    height: 11,
    backgroundColor: '#0B1F3A',
  },

  qrPixelOne: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#0B1F3A',
    top: 50,
    left: 49,
  },

  qrPixelTwo: {
    position: 'absolute',
    width: 17,
    height: 8,
    backgroundColor: '#0B1F3A',
    top: 65,
    left: 65,
  },

  qrPixelThree: {
    position: 'absolute',
    width: 8,
    height: 18,
    backgroundColor: '#0B1F3A',
    top: 80,
    left: 46,
  },

  qrPixelFour: {
    position: 'absolute',
    width: 15,
    height: 9,
    backgroundColor: '#0B1F3A',
    top: 47,
    left: 75,
  },

  qrPixelFive: {
    position: 'absolute',
    width: 9,
    height: 9,
    backgroundColor: '#0B1F3A',
    bottom: 18,
    right: 25,
  },

  scanText: {
    color: '#26364A',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 9,
  },

  scanFrench: {
    color: '#8A96A6',
    fontSize: 8,
    marginTop: 2,
  },

  /* AMOUNT */

  amountSection: {
    borderTopWidth: 1,
    borderTopColor: '#E7ECF1',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  amountFrench: {
    color: '#8A96A6',
    fontSize: 7,
    marginTop: 2,
  },

  amount: {
    color: '#1976D2',
    fontSize: 17,
    fontWeight: '900',
  },

  /* FOOTER */

  ticketFooter: {
    backgroundColor: '#F6F8FA',
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: 'center',
  },

  footerTitle: {
    color: '#1976D2',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  footerText: {
    color: '#68788A',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 12,
  },

  footerFrench: {
    color: '#9AA5B2',
    fontSize: 7,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 11,
  },

  /* ACTIONS */

  actions: {
    marginTop: 13,
  },

  primaryAction: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  secondaryAction: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E0E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
  },

  secondaryActionText: {
    color: '#0B1F3A',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  bottomSpace: {
    height: 20,
  },

receiptAction: {
  marginTop: 12,
  minHeight: 52,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#1976D2',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 18,
  backgroundColor: '#FFFFFF',
},

receiptActionText: {
  color: '#1976D2',
  fontSize: 13,
  fontWeight: '800',
  letterSpacing: 0.5,
},


});

