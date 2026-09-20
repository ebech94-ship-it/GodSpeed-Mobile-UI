import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type BusTrip = {
  bookingReference: string;
  operator: string;
  route: string;
  busNumber: string;
  status: 'on_route' | 'boarding' | 'completed';
  currentLocation: string;
  nextStop: string;
  estimatedArrival: string;
};

const ACTIVE_TRIP: BusTrip | null = {
  bookingReference: 'GST-2026-000184',
  operator: 'GodSpeed Tech',
  route: 'Kumba → Yaoundé',
  busNumber: 'GST-001',
  status: 'on_route',
  currentLocation: 'Melong',
  nextStop: 'Nkongsamba',
  estimatedArrival: '13:00',
};

export default function TrackingScreen() {
  const router = useRouter();

  const trip = ACTIVE_TRIP;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Track My Bus</Text>

          <View style={styles.headerSpacer} />
        </View>

        {!trip ? (
          <EmptyTracking />
        ) : (
          <>
            {/* Status */}
            <View style={styles.statusCard}>
              <View style={styles.statusTop}>
                <View style={styles.liveDot} />

                <Text style={styles.liveText}>LIVE</Text>

                <Text style={styles.bookingRef}>
                  {trip.bookingReference}
                </Text>
              </View>

              <Text style={styles.route}>{trip.route}</Text>

              <Text style={styles.operator}>
                {trip.operator} · Bus {trip.busNumber}
              </Text>
            </View>

            {/* Map placeholder */}
            <View style={styles.mapCard}>
              <View style={styles.mapGrid}>
                <View style={styles.mapLineOne} />
                <View style={styles.mapLineTwo} />
                <View style={styles.mapLineThree} />

                <View style={styles.routeLine}>
                  <View style={styles.startPoint} />
                  <View style={styles.busPoint}>
                    <Text style={styles.busIcon}>🚌</Text>
                  </View>
                  <View style={styles.endPoint} />
                </View>
              </View>

              <View style={styles.locationBadge}>
                <View style={styles.locationDot} />
                <Text style={styles.locationText}>
                  {trip.currentLocation}
                </Text>
              </View>
            </View>

            {/* Journey information */}
            <View style={styles.infoCard}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>CURRENT LOCATION</Text>
                <Text style={styles.infoValue}>
                  {trip.currentLocation}
                </Text>
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>NEXT STOP</Text>
                <Text style={styles.infoValue}>
                  {trip.nextStop}
                </Text>
              </View>
            </View>

            {/* ETA */}
            <View style={styles.etaCard}>
              <View>
                <Text style={styles.etaLabel}>
                  ESTIMATED ARRIVAL
                </Text>

                <Text style={styles.etaValue}>
                  {trip.estimatedArrival}
                </Text>
              </View>

              <View style={styles.arrivingPill}>
                <Text style={styles.arrivingText}>
                  On route
                </Text>
              </View>
            </View>

            <Text style={styles.updated}>
              Location updates automatically when live tracking is
              available.
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

function EmptyTracking() {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Text style={styles.emptyBus}>🚌</Text>
      </View>

      <Text style={styles.emptyTitle}>
        No active trip
      </Text>

      <Text style={styles.emptyText}>
        When you have an active journey, your bus location and
        arrival information will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  headerSpacer: {
    width: 42,
  },

  statusCard: {
    backgroundColor: '#0B1F3A',
    borderRadius: 22,
    padding: 20,
    marginTop: 10,
  },

  statusTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },

  liveText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  bookingRef: {
    marginLeft: 'auto',
    color: '#AEBACC',
    fontSize: 9,
    fontWeight: '700',
  },

  route: {
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
  },

  operator: {
    marginTop: 6,
    color: '#AEBACC',
    fontSize: 10,
    fontWeight: '700',
  },

  mapCard: {
    height: 245,
    backgroundColor: '#E8EDF2',
    borderRadius: 24,
    marginTop: 14,
    overflow: 'hidden',
    position: 'relative',
  },

  mapGrid: {
    flex: 1,
    position: 'relative',
  },

  mapLineOne: {
    position: 'absolute',
    width: '140%',
    height: 1,
    backgroundColor: '#D2D9E0',
    top: 55,
    left: -40,
    transform: [{ rotate: '18deg' }],
  },

  mapLineTwo: {
    position: 'absolute',
    width: '140%',
    height: 1,
    backgroundColor: '#D2D9E0',
    top: 135,
    left: -40,
    transform: [{ rotate: '-14deg' }],
  },

  mapLineThree: {
    position: 'absolute',
    width: '120%',
    height: 1,
    backgroundColor: '#D2D9E0',
    top: 190,
    left: -20,
    transform: [{ rotate: '8deg' }],
  },

  routeLine: {
    position: 'absolute',
    left: 35,
    right: 35,
    top: 112,
    height: 4,
    backgroundColor: '#0B1F3A',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  startPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#0B1F3A',
  },

  busPoint: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
  },

  busIcon: {
    fontSize: 23,
  },

  endPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#0B1F3A',
  },

  locationBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#0B1F3A',
    marginRight: 7,
  },

  locationText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#182B43',
  },

  infoCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoBlock: {
    flex: 1,
    paddingHorizontal: 17,
  },

  infoLabel: {
    fontSize: 8,
    color: '#8B97A6',
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  infoValue: {
    marginTop: 5,
    fontSize: 14,
    color: '#182B43',
    fontWeight: '900',
  },

  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E8ECF0',
  },

  etaCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 17,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  etaLabel: {
    fontSize: 8,
    color: '#8B97A6',
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  etaValue: {
    marginTop: 3,
    fontSize: 20,
    color: '#0B1F3A',
    fontWeight: '900',
  },

  arrivingPill: {
    marginLeft: 'auto',
    backgroundColor: '#EEF2F6',
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  arrivingText: {
    fontSize: 9,
    color: '#516176',
    fontWeight: '900',
  },

  updated: {
    textAlign: 'center',
    marginTop: 15,
    color: '#97A2B0',
    fontSize: 9,
    lineHeight: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 78,
    height: 78,
    borderRadius: 25,
    backgroundColor: '#E9EEF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  emptyBus: {
    fontSize: 35,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#8491A2',
    fontSize: 11,
    lineHeight: 17,
  },
});