
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getOperator,
  getTrip,
  getVehicle,
} from '@/data/transportData';

type TrackingType = 'bus' | 'parcel';

type LiveStatus =
  | 'boarding'
  | 'on_route'
  | 'completed'
  | 'cancelled';

type LiveTrackingData = {
  currentLocation: string;
  nextStop: string;
  estimatedArrival: string;
  status: LiveStatus;
  latitude?: number;
  longitude?: number;
  updatedAt?: string;
};

export default function TrackingScreen() {
  const router = useRouter();

  const {
    type,
    tripId,
    reference,
  } = useLocalSearchParams<{
    type?: TrackingType;
    tripId?: string;
    reference?: string;
  }>();

  const trackingType: TrackingType = type === 'parcel'
    ? 'parcel'
    : 'bus';

  const isParcel = trackingType === 'parcel';

  /*
   * The trip is now identified by tripId.
   *
   * This is important because the trip already contains:
   * trip.id
   * trip.operatorId
   * trip.vehicleId
   */
  const trip = tripId ? getTrip(tripId) : undefined;

  const operator = trip
    ? getOperator(trip.operatorId)
    : undefined;

  const vehicle = trip
    ? getVehicle(trip.vehicleId)
    : undefined;

  /*
   * Temporary live-state placeholder.
   *
   * IMPORTANT:
   * This is the single place where the real Firebase/live GPS
   * data will eventually enter this screen.
   *
   * We are NOT pretending these coordinates are real GPS.
   */
  const live: LiveTrackingData | null = trip
    ? {
        currentLocation: 'Live location unavailable',
        nextStop: 'Updating...',
        estimatedArrival: trip.arrival,
        status:
          trip.status === 'boarding'
            ? 'boarding'
            : trip.status === 'completed'
              ? 'completed'
              : trip.status === 'cancelled'
                ? 'cancelled'
                : 'on_route',
      }
    : null;

  const statusLabel = getStatusLabel(live?.status);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.headerTitle}>
              {isParcel ? 'Track My Parcel' : 'Track My Bus'}
            </Text>

            <View style={styles.headerSpacer} />
          </View>

          {!trip ? (
            <EmptyTracking
              isParcel={isParcel}
              onBack={() => router.back()}
            />
          ) : (
            <>
              {/* Identity */}
              <View style={styles.statusCard}>
                <View style={styles.statusTop}>
                  <View style={styles.liveDot} />

                  <Text style={styles.liveText}>
                    {live?.status === 'completed'
                      ? 'COMPLETED'
                      : 'LIVE'}
                  </Text>

                  <Text style={styles.reference}>
                    {reference ||
                      (isParcel
                        ? 'Parcel tracking'
                        : 'Trip tracking')}
                  </Text>
                </View>

                <Text style={styles.route}>
                  {trip.from} → {trip.to}
                </Text>

                <Text style={styles.operator}>
                  {operator?.displayName || operator?.name || 'Operator'}
                  {' · '}
                  {vehicle?.name || 'Vehicle'}
                </Text>
              </View>

              {/* Live transport identity */}
              <View style={styles.identityCard}>
                <View style={styles.identityRow}>
                  <View style={styles.identityBlock}>
                    <Text style={styles.identityLabel}>
                      OPERATOR
                    </Text>

                    <Text style={styles.identityValue}>
                      {operator?.displayName ||
                        operator?.name ||
                        '—'}
                    </Text>
                  </View>

                  <View style={styles.identityDivider} />

                  <View style={styles.identityBlock}>
                    <Text style={styles.identityLabel}>
                      VEHICLE
                    </Text>

                    <Text style={styles.identityValue}>
                      {vehicle?.name || '—'}
                    </Text>
                  </View>
                </View>

                <View style={styles.tripIdentity}>
                  <Text style={styles.identityLabel}>
                    TRIP ID
                  </Text>

                  <Text style={styles.tripId}>
                    {trip.id}
                  </Text>
                </View>

                {isParcel && (
                  <View style={styles.tripIdentity}>
                    <Text style={styles.identityLabel}>
                      PARCEL REFERENCE
                    </Text>

                    <Text style={styles.tripId}>
                      {reference || '—'}
                    </Text>
                  </View>
                )}
              </View>

              {/* Route / live map */}
              <View style={styles.mapCard}>
                <View style={styles.mapGrid}>
                  <View style={styles.mapLineOne} />
                  <View style={styles.mapLineTwo} />
                  <View style={styles.mapLineThree} />

                  <View style={styles.routeLine}>
                    <View style={styles.startPoint} />

                    <View style={styles.busPoint}>
                      <Text style={styles.busIcon}>
                        {isParcel ? '📦' : '🚌'}
                      </Text>
                    </View>

                    <View style={styles.endPoint} />
                  </View>

                  <View style={styles.routeLabels}>
                    <Text style={styles.routeLabel}>
                      {trip.from}
                    </Text>

                    <Text style={styles.routeLabel}>
                      {trip.to}
                    </Text>
                  </View>
                </View>

                <View style={styles.locationBadge}>
                  <View style={styles.locationDot} />

                  <Text style={styles.locationText}>
                    {live?.currentLocation ||
                      'Waiting for live location'}
                  </Text>
                </View>
              </View>

              {/* Live status */}
              <View style={styles.infoCard}>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>
                    CURRENT LOCATION
                  </Text>

                  <Text style={styles.infoValue}>
                    {live?.currentLocation || '—'}
                  </Text>
                </View>

                <View style={styles.verticalDivider} />

                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>
                    NEXT STOP
                  </Text>

                  <Text style={styles.infoValue}>
                    {live?.nextStop || '—'}
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
                    {live?.estimatedArrival || trip.arrival}
                  </Text>
                </View>

                <View style={styles.arrivingPill}>
                  <Text style={styles.arrivingText}>
                    {statusLabel}
                  </Text>
                </View>
              </View>

              {/* Journey */}
              <View style={styles.journeyCard}>
                <Text style={styles.sectionTitle}>
                  Journey
                </Text>

                <View style={styles.journeyRow}>
                  <View style={styles.journeyPoint}>
                    <View style={styles.journeyDot} />

                    <View style={styles.journeyLine} />
                  </View>

                  <View style={styles.journeyContent}>
                    <Text style={styles.journeyCity}>
                      {trip.from}
                    </Text>

                    <Text style={styles.journeyTime}>
                      Departure {trip.departure}
                    </Text>
                  </View>
                </View>

                <View style={styles.journeyRow}>
                  <View style={styles.journeyPoint}>
                    <View style={styles.journeyEndDot} />
                  </View>

                  <View style={styles.journeyContent}>
                    <Text style={styles.journeyCity}>
                      {trip.to}
                    </Text>

                    <Text style={styles.journeyTime}>
                      Arrival {trip.arrival}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.updated}>
                Live location will update automatically when the
                vehicle's GPS feed is connected.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusLabel(
  status?: LiveStatus
) {
  switch (status) {
    case 'boarding':
      return 'Boarding';

    case 'completed':
      return 'Completed';

    case 'cancelled':
      return 'Cancelled';

    case 'on_route':
      return 'On route';

    default:
      return 'Waiting';
  }
}

function EmptyTracking({
  isParcel,
  onBack,
}: {
  isParcel: boolean;
  onBack: () => void;
}) {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Text style={styles.emptyBus}>
          {isParcel ? '📦' : '🚌'}
        </Text>
      </View>

      <Text style={styles.emptyTitle}>
        {isParcel
          ? 'Parcel not found'
          : 'Trip not found'}
      </Text>

      <Text style={styles.emptyText}>
        {isParcel
          ? 'We could not find the trip attached to this parcel.'
          : 'We could not find the trip attached to this tracking request.'}
      </Text>

      <Pressable
        style={styles.emptyButton}
        onPress={onBack}
      >
        <Text style={styles.emptyButtonText}>
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  scrollContent: {
    paddingBottom: 30,
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

  reference: {
    marginLeft: 'auto',
    color: '#AEBACC',
    fontSize: 9,
    fontWeight: '700',
    maxWidth: 150,
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

  identityCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 16,
  },

  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  identityBlock: {
    flex: 1,
  },

  identityDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E8ECF0',
    marginHorizontal: 12,
  },

  identityLabel: {
    fontSize: 8,
    color: '#8B97A6',
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  identityValue: {
    marginTop: 5,
    fontSize: 13,
    color: '#182B43',
    fontWeight: '900',
  },

  tripIdentity: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F4',
  },

  tripId: {
    marginTop: 4,
    fontSize: 11,
    color: '#516176',
    fontWeight: '800',
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

  routeLabels: {
    position: 'absolute',
    left: 28,
    right: 28,
    top: 142,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  routeLabel: {
    fontSize: 9,
    color: '#516176',
    fontWeight: '900',
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

  journeyCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 17,
  },

  sectionTitle: {
    fontSize: 14,
    color: '#0B1F3A',
    fontWeight: '900',
    marginBottom: 15,
  },

  journeyRow: {
    flexDirection: 'row',
    minHeight: 48,
  },

  journeyPoint: {
    width: 18,
    alignItems: 'center',
  },

  journeyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0B1F3A',
  },

  journeyEndDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#0B1F3A',
  },

  journeyLine: {
    flex: 1,
    width: 1,
    backgroundColor: '#D7DEE6',
    marginTop: 4,
    marginBottom: -4,
  },

  journeyContent: {
    marginLeft: 10,
    paddingBottom: 12,
  },

  journeyCity: {
    fontSize: 13,
    color: '#182B43',
    fontWeight: '900',
  },

  journeyTime: {
    marginTop: 3,
    fontSize: 9,
    color: '#8491A2',
    fontWeight: '700',
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
    paddingTop: 100,
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

  emptyButton: {
    marginTop: 20,
    backgroundColor: '#0B1F3A',
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
});

