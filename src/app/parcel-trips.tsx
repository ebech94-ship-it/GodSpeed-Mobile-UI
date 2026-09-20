import { TRIPS, getOperator, getVehicle } from '@/data/transportData';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const LOCATIONS = ['Kumba', 'Yaoundé', 'Buea', 'Douala'];

type PickerType = 'from' | 'to' | null;

export default function ParcelTripsScreen() {
  const router = useRouter();

  const [from, setFrom] = useState('Kumba');
  const [to, setTo] = useState('Yaoundé');
  const [picker, setPicker] = useState<PickerType>(null);

  const availableTrips = useMemo(() => {
    return TRIPS.filter(
      (trip) => trip.from === from && trip.to === to
    );
  }, [from, to]);

  const selectCity = (city: string) => {
    if (picker === 'from') {
      if (city === to) return;
      setFrom(city);
    }

    if (picker === 'to') {
      if (city === from) return;
      setTo(city);
    }

    setPicker(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>GODSPEED MOBILITY</Text>

          <Text style={styles.title}>Send a Parcel</Text>

          <Text style={styles.subtitle}>
            Choose where your parcel is going, then select the trip.
          </Text>
        </View>

        {/* ROUTE CARD */}
        <View style={styles.routeCard}>
          <Text style={styles.cardTitle}>Parcel journey</Text>

          <View style={styles.routeLine}>
            {/* FROM */}
            <View style={styles.cityBlock}>
              <Text style={styles.label}>FROM</Text>

              <Pressable
                style={styles.cityButton}
                onPress={() => setPicker('from')}
              >
                <View>
                  <Text style={styles.city}>{from}</Text>
                  <Text style={styles.tapText}>Change city</Text>
                </View>

                <Text style={styles.chevron}>⌄</Text>
              </Pressable>
            </View>

            <View style={styles.routeArrowCircle}>
              <Text style={styles.routeArrow}>→</Text>
            </View>

            {/* TO */}
            <View style={styles.cityBlock}>
              <Text style={styles.label}>TO</Text>

              <Pressable
                style={styles.cityButton}
                onPress={() => setPicker('to')}
              >
                <View>
                  <Text style={styles.city}>{to}</Text>
                  <Text style={styles.tapText}>Change city</Text>
                </View>

                <Text style={styles.chevron}>⌄</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* TRIPS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Available trips</Text>

            <Text style={styles.sectionSubtitle}>
              {from} → {to}
            </Text>
          </View>

          <View style={styles.tripCount}>
            <Text style={styles.tripCountText}>
              {availableTrips.length}
            </Text>
          </View>
        </View>

        {availableTrips.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>○</Text>

            <Text style={styles.emptyTitle}>
              No scheduled trips
            </Text>

            <Text style={styles.emptyText}>
              We don't have a parcel trip available for this route yet.
            </Text>
          </View>
        ) : (
         availableTrips.map((trip, index) => {
  const operator = getOperator(trip.operatorId);
  const vehicle = getVehicle(trip.vehicleId);

  return (
    <View
      key={trip.id}
      style={[
        styles.tripCard,
        index === availableTrips.length - 1 &&
          styles.lastTripCard,
      ]}
    >
      {/* ROUTE HEADER */}
      <View style={styles.routeHeader}>
        <View>
          <Text style={styles.routeHeaderLabel}>
            PARCEL ROUTE
          </Text>

          <Text style={styles.routeHeaderText}>
            {trip.from} → {trip.to}
          </Text>
        </View>

        <View style={styles.availableBadge}>
          <View style={styles.availableDot} />
          <Text style={styles.availableText}>
            AVAILABLE
          </Text>
        </View>
      </View>

      {/* BUS + OPERATOR */}
      <View style={styles.operatorRow}>
        <View style={styles.busImageBox}>
          <Image
            source={require('../../assets/images/bus.png')}
            style={styles.busImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.operatorInfo}>
          <Text style={styles.operatorName}>
            {operator?.displayName || 'GodSpeed Voyage'}
          </Text>

          <Text style={styles.vehicleName}>
            {vehicle?.name || 'GodSpeed Vehicle'}
          </Text>
        </View>
      </View>

      {/* TIME */}
      <View style={styles.timeRow}>
        <View>
          <Text style={styles.timeLabel}>DEPARTS</Text>

          <Text style={styles.time}>
            {trip.departure}
          </Text>

          <Text style={styles.citySmall}>
            {trip.from}
          </Text>
        </View>

        <View style={styles.durationBox}>
          <View style={styles.durationLine} />

          <Text style={styles.duration}>
            {trip.duration}
          </Text>

          <View style={styles.durationLine} />
        </View>

        <View style={styles.arrivalBlock}>
          <Text style={styles.timeLabel}>ARRIVES</Text>

          <Text style={styles.time}>
            {trip.arrival}
          </Text>

          <Text style={styles.citySmall}>
            {trip.to}
          </Text>
        </View>
      </View>

      {/* ACTION */}
      <Pressable
        style={styles.selectButton}
        onPress={() =>
          router.push({
            pathname: '/parcel',
            params: {
              tripId: trip.id,
            },
          })
        }
      >
        <Text style={styles.selectText}>
          SELECT THIS TRIP
        </Text>

        <Text style={styles.selectArrow}>→</Text>
      </Pressable>
    </View>
  );
})
        )}
      </ScrollView>

      {/* CITY PICKER */}
      <Modal
        visible={picker !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setPicker(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.cityModal}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {picker === 'from'
                    ? 'Where is the parcel coming from?'
                    : 'Where is the parcel going?'}
                </Text>

                <Text style={styles.modalSubtitle}>
                  Select a city
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setPicker(null)}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <View style={styles.cityList}>
              {LOCATIONS.map((city) => {
                const disabled =
                  city === (picker === 'from' ? to : from);

                const selected =
                  city === (picker === 'from' ? from : to);

                return (
                  <Pressable
                    key={city}
                    disabled={disabled}
                    style={[
                      styles.cityOption,
                      selected && styles.selectedCityOption,
                      disabled && styles.disabledCityOption,
                    ]}
                    onPress={() => selectCity(city)}
                  >
                    <View
                      style={[
                        styles.cityDot,
                        selected && styles.selectedCityDot,
                      ]}
                    />

                    <Text
                      style={[
                        styles.cityOptionText,
                        selected && styles.selectedCityText,
                        disabled && styles.disabledCityText,
                      ]}
                    >
                      {city}
                    </Text>

                    {selected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setPicker(null)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 22,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#1976D2',
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#071A33',
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    color: '#313740ff',
    maxWidth: 330,
  },

  routeCard: {
    backgroundColor: '#0B1F3A',
    borderRadius: 24,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#E6ECF3',
    shadowColor: '#0B1F3A',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
  },

  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cityBlock: {
    flex: 1,
  },

  label: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#C7D2FE',
    marginBottom: 7,
  },

  cityButton: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#E3EAF2',
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  city: {
    fontSize: 16,
    fontWeight: '900',
    color: '#071A33',
  },

  tapText: {
    marginTop: 2,
    fontSize: 9,
    color: '#8A98A8',
  },

  chevron: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1976D2',
  },

  routeArrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 16,
  },

  routeArrow: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1976D2',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#071A33',
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: '#718096',
  },

  tripCount: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EAF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tripCountText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1976D2',
  },

  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E6ECF3',
    shadowColor: '#0B1F3A',
    shadowOpacity: 0.055,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  lastTripCard: {
    marginBottom: 4,
  },

  
  operatorLogo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  operatorLogoText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  

  operatorName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#071A33',
  },

  vehicleName: {
    marginTop: 3,
    fontSize: 11,
    color: '#718096',
  },

  directBadge: {
    backgroundColor: '#EDF9F3',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  directText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#17824B',
  },

  timeRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeLabel: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: '#8A98A8',
  },

  time: {
    marginTop: 4,
    fontSize: 21,
    fontWeight: '900',
    color: '#071A33',
  },

  citySmall: {
    marginTop: 2,
    fontSize: 11,
    color: '#718096',
  },

  durationBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
  },

  durationLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#D8E1EA',
  },

  duration: {
    marginVertical: 5,
    fontSize: 9,
    color: '#8A98A8',
  },

  arrivalBlock: {
    alignItems: 'flex-end',
  },

  selectButton: {
    marginTop: 18,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  selectArrow: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6ECF3',
  },

  emptyIcon: {
    fontSize: 30,
    color: '#A8B5C4',
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '900',
    color: '#071A33',
  },

  emptyText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#718096',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(5, 18, 35, 0.55)',
  },

  cityModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },

  modalHandle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D8E1EA',
    marginBottom: 18,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  modalTitle: {
    maxWidth: 290,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '900',
    color: '#071A33',
  },

  modalSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#718096',
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    fontSize: 22,
    lineHeight: 22,
    color: '#526273',
  },

  cityList: {
    gap: 8,
  },

  cityOption: {
    minHeight: 58,
    borderRadius: 15,
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#E5EBF2',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectedCityOption: {
    backgroundColor: '#EAF3FF',
    borderColor: '#1976D2',
  },

  disabledCityOption: {
    opacity: 0.35,
  },

  cityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B7C3CF',
    marginRight: 13,
  },

  selectedCityDot: {
    backgroundColor: '#1976D2',
  },

  cityOptionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#25364A',
  },

  selectedCityText: {
    fontWeight: '900',
    color: '#0B1F3A',
  },

  disabledCityText: {
    color: '#718096',
  },

  checkmark: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1976D2',
  },

  cancelButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#526273',
  },
  routeHeader: {
  backgroundColor: '#4F46E5',
  borderRadius: 18,
  padding: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

routeHeaderLabel: {
  fontSize: 8,
  fontWeight: '900',
  letterSpacing: 1,
  color: '#C7D2FE',
},

routeHeaderText: {
  marginTop: 4,
  fontSize: 17,
  fontWeight: '900',
  color: '#FFFFFF',
},

availableBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.16)',
  borderRadius: 10,
  paddingHorizontal: 9,
  paddingVertical: 7,
},

availableDot: {
  width: 7,
  height: 7,
  borderRadius: 4,
  backgroundColor: '#6EE7B7',
  marginRight: 5,
},

availableText: {
  fontSize: 8,
  fontWeight: '900',
  color: '#FFFFFF',
},

busImageBox: {
  width: 72,
  height: 54,
  borderRadius: 15,
  backgroundColor: '#EEF4FA',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
},

busImage: {
  width: 68,
  height: 48,
},

operatorRow: {
  marginTop: 16,
  flexDirection: 'row',
  alignItems: 'center',
},

operatorInfo: {
  flex: 1,
  marginLeft: 12,
},
});