
import { TRIPS, getOperator, getVehicle } from '@/data/transportData';
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


export default function TripsScreen() {
  const router = useRouter();

  const { from, to, passengers } =
    useLocalSearchParams<{
      from?: string;
      to?: string;
      passengers?: string;
    }>();

  const departureCity = from || 'Kumba';
  const destinationCity = to || 'Yaoundé';
  const passengerCount = passengers || '1';

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

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              Available Trips
            </Text>

            <Text style={styles.headerFrench}>
              Voyages disponibles
            </Text>
          </View>
        </View>

        {/* ROUTE SUMMARY */}
        <View style={styles.routeCard}>
          <View style={styles.routeCityBlock}>
            <Text style={styles.routeLabel}>FROM</Text>
            <Text style={styles.routeCity}>
              {departureCity}
            </Text>
          </View>

          <View style={styles.routeArrowContainer}>
            <View style={styles.routeArrowLine} />
            <Text style={styles.routeArrow}>→</Text>
          </View>

          <View style={styles.routeCityBlock}>
            <Text style={styles.routeLabel}>TO</Text>
            <Text style={styles.routeCity}>
              {destinationCity}
            </Text>
          </View>

          <View style={styles.passengerBadge}>
            <Text style={styles.passengerIcon}>●</Text>
            <Text style={styles.passengerBadgeText}>
              {passengerCount}
            </Text>
          </View>
        </View>

        {/* TRIPS */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.resultsHeader}>
            <View>
              <Text style={styles.resultsTitle}>
                Choose your trip
              </Text>

              <Text style={styles.resultsFrench}>
                Choisissez votre voyage
              </Text>
            </View>

            <View style={styles.tripCountBadge}>
              <Text style={styles.tripCountText}>
                {TRIPS.length} trips
              </Text>
            </View>
          </View>

          {TRIPS.map((trip) => (
            <Pressable
              key={trip.id}
              style={({ pressed }) => [
                styles.tripCard,
                pressed && styles.tripCardPressed,
              ]}
              onPress={() =>
                router.push({
                  pathname: '/booking',
                  params: {
                    tripId: trip.id,
                    from: trip.from,
to: trip.to,
                    passengers: passengerCount,
                    
                  },
                })
              }
            >

              {/* BUS IMAGE */}
              <View style={styles.imageContainer}>
                <Image
                  source={getVehicle(trip.vehicleId)?.image}
                  style={styles.busImage}
                  resizeMode="contain"
                />

                <View style={styles.imageOverlay} />

                <View style={styles.availableBadge}>
                  <View style={styles.availableDot} />
                  <Text style={styles.availableText}>
                    AVAILABLE
                  </Text>
                </View>

                <View style={styles.brandOverlay}>
                  <Text style={styles.brandText}>
                    GODSPEED
                  </Text>
                  <Text style={styles.brandSubText}>
                    MOBILITY
                  </Text>
                </View>
              </View>

              {/* CARD CONTENT */}
              <View style={styles.cardContent}>

                {/* COMPANY + PRICE */}
                <View style={styles.tripTop}>
                  <View style={styles.companyBlock}>
                    <Text style={styles.companyName}>
                      {getOperator(trip.operatorId)?.displayName || 'GodSpeed Mobility'}
                    </Text>

                    <Text style={styles.tripId}>
                      GODSPEED • {trip.id.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.priceBox}>
                    <Text style={styles.price}>
                      {trip.price.toLocaleString()} FCFA
                    </Text>

                    <Text style={styles.priceLabel}>
                      per passenger
                    </Text>
                  </View>
                </View>

                {/* ROUTE / TIME */}
                <View style={styles.timeRow}>

                  <View style={styles.timeBlock}>
                    <Text style={styles.time}>
                      {trip.departure}
                    </Text>

                    <Text style={styles.timeCity}>
                      {departureCity}
                    </Text>
                  </View>

                  <View style={styles.durationContainer}>
                    <View style={styles.routeLineRow}>
                      <View style={styles.routeDot} />
                      <View style={styles.line} />
                      <Text style={styles.busIcon}>●</Text>
                      <View style={styles.line} />
                      <View style={styles.routeDot} />
                    </View>

                    <Text style={styles.duration}>
                      {trip.duration}
                    </Text>
                  </View>

                  <View style={styles.arrivalContainer}>
                    <Text style={styles.time}>
                      {trip.arrival}
                    </Text>

                    <Text style={styles.timeCity}>
                      {destinationCity}
                    </Text>
                  </View>

                </View>

                {/* BOTTOM */}
                <View style={styles.tripBottom}>

                  <View style={styles.seatInfo}>
                    <View style={styles.seatIconBox}>
                      <Text style={styles.seatIcon}>●</Text>
                    </View>

                    <View>
                      <Text style={styles.seats}>
                        {(() => {
  const vehicle = getVehicle(trip.vehicleId);
  return vehicle ? vehicle.capacity - trip.occupiedSeats.length : 0;
})()} seats available
                      </Text>

                      <Text style={styles.seatsFrench}>
                        Places disponibles
                      </Text>
                    </View>
                  </View>

                  <View style={styles.selectButton}>
                    <Text style={styles.selectText}>
                      SELECT
                    </Text>
                    <Text style={styles.selectArrow}>
                      →
                    </Text>
                  </View>

                </View>
              </View>
            </Pressable>
          ))}

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
    height: 70,
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
  },

  backText: {
    fontSize: 30,
    color: '#0B1F3A',
    lineHeight: 32,
    marginTop: -2,
  },

  headerTitleContainer: {
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  headerFrench: {
    fontSize: 9,
    color: '#7B899A',
    marginTop: 2,
  },

  /* ROUTE SUMMARY */

  routeCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#0B1F3A',
    borderRadius: 19,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeCityBlock: {
    flexShrink: 1,
  },

  routeLabel: {
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#7DBBFF',
  },

  routeCity: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 3,
  },

  routeArrowContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },

  routeArrowLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#35506E',
    position: 'absolute',
    top: 11,
  },

  routeArrow: {
    fontSize: 18,
    color: '#7DBBFF',
    backgroundColor: '#0B1F3A',
    paddingHorizontal: 5,
  },

  passengerBadge: {
    marginLeft: 8,
    minWidth: 45,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  passengerIcon: {
    fontSize: 7,
    color: '#1976D2',
    marginRight: 5,
  },

  passengerBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  /* CONTENT */

  content: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 30,
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  resultsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  resultsFrench: {
    fontSize: 9,
    color: '#7B899A',
    marginTop: 2,
  },

  tripCountBadge: {
    backgroundColor: '#EAF2FB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  tripCountText: {
    color: '#1976D2',
    fontSize: 8,
    fontWeight: '900',
  },

  /* TRIP CARD */

  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E9F0',
    shadowColor: '#0B1F3A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },

  tripCardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },

  /* IMAGE */

  imageContainer: {
    height: 142,
    backgroundColor: '#0B1F3A',
    position: 'relative',
    overflow: 'hidden',
  },

  busImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: -5,
    bottom: -2,
  },

  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(11,31,58,0.12)',
  },

  brandOverlay: {
    position: 'absolute',
    left: 15,
    bottom: 13,
  },

  brandText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 2,
  },

  brandSubText: {
    color: '#7DBBFF',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 1,
  },

  availableBadge: {
    position: 'absolute',
    top: 13,
    right: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#20A05A',
    marginRight: 5,
  },

  availableText: {
    color: '#16834A',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  /* CARD CONTENT */

  cardContent: {
    padding: 15,
  },

  tripTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  companyBlock: {
    flex: 1,
    paddingRight: 8,
  },

  companyName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  tripId: {
    fontSize: 7,
    color: '#8A96A6',
    marginTop: 4,
    letterSpacing: 0.5,
  },

  priceBox: {
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1976D2',
  },

  priceLabel: {
    fontSize: 7,
    color: '#8A96A6',
    marginTop: 2,
  },

  /* TIMES */

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  timeBlock: {
    width: 62,
  },

  time: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  timeCity: {
    fontSize: 8,
    color: '#7B899A',
    marginTop: 3,
  },

  durationContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 9,
  },

  routeLineRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1976D2',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D7E0E9',
  },

  busIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EAF2FB',
    color: '#1976D2',
    fontSize: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 5,
  },

  duration: {
    fontSize: 8,
    color: '#8A96A6',
    fontWeight: '700',
    marginTop: 6,
  },

  arrivalContainer: {
    width: 62,
    alignItems: 'flex-end',
  },

  /* BOTTOM */

  tripBottom: {
    marginTop: 18,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  seatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  seatIconBox: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: '#EEF5FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  seatIcon: {
    color: '#1976D2',
    fontSize: 7,
  },

  seats: {
    fontSize: 9,
    color: '#44566B',
    fontWeight: '800',
  },

  seatsFrench: {
    fontSize: 7,
    color: '#9AA5B2',
    marginTop: 2,
  },

  selectButton: {
    height: 39,
    borderRadius: 12,
    backgroundColor: '#0B1F3A',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  selectArrow: {
    color: '#7DBBFF',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 6,
  },

  bottomSpace: {
    height: 20,
  },
});

