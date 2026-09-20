import {
  getOperator,
  getTrip,
  getVehicle,
} from '@/data/transportData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function BookingScreen() {
  const router = useRouter();

 const {
  tripId,
  passengers,
} = useLocalSearchParams<{
  tripId?: string;
  passengers?: string;
}>();

const trip = tripId ? getTrip(tripId) : undefined;

const vehicle = trip ? getVehicle(trip.vehicleId) : undefined;

const operator = trip ? getOperator(trip.operatorId) : undefined;

const passengerCount = Number(passengers || 1);
const tripPrice = trip?.price ?? 0;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seat: string) => {
    if (trip?.occupiedSeats.includes(seat)) {
      return;
    }

    setSelectedSeats((current) => {
      if (current.includes(seat)) {
        return current.filter((item) => item !== seat);
      }

      if (current.length >= passengerCount) {
        return current;
      }

      return [...current, seat];
    });
  };

  const totalPrice = selectedSeats.length * tripPrice;

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
              Select Your Seats
            </Text>

            <Text style={styles.headerFrench}>
              Choisissez vos sièges
            </Text>
          </View>
        </View>

        <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={[
    styles.content,
    { paddingBottom: 120 },
  ]}
>
          {/* TRIP SUMMARY */}
          <View style={styles.tripSummary}>
            <View>
              <Text style={styles.summaryLabel}>
                DEPARTURE
              </Text>

              <Text style={styles.summaryTime}>
                {trip?.departure || '--:--'}
              </Text>

              <Text style={styles.summaryCity}>
              {trip?.from || '---'}
              </Text>
            </View>

            <View style={styles.summaryMiddle}>
              <Text style={styles.summaryArrow}>
                →
              </Text>

              <Text style={styles.summaryDuration}>
                Direct trip
              </Text>
            </View>

            <View style={styles.summaryRight}>
              <Text style={styles.summaryLabel}>
                ARRIVAL
              </Text>

              <Text style={styles.summaryTime}>
                {trip?.arrival || '--:--'}
              </Text>

              <Text style={styles.summaryCity}>
                {trip?.to || '---'}
              </Text>
            </View>
          </View>

          {/* PASSENGER INFO */}
          <View style={styles.infoCard}>
            <View>
              <Text style={styles.infoLabel}>
                PASSENGERS
              </Text>

              <Text style={styles.infoValue}>
                {passengerCount}
              </Text>
            </View>

            <View style={styles.infoDivider} />

            <View>
              <Text style={styles.infoLabel}>
                PRICE / PERSON
              </Text>

              <Text style={styles.infoValue}>
                {tripPrice.toLocaleString()} FCFA
              </Text>
            </View>
          </View>

          {/* SEAT SECTION */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Choose your seats
              </Text>

              <Text style={styles.sectionFrench}>
                Sélectionnez vos sièges
              </Text>
            </View>

            <Text style={styles.selectedCount}>
              {selectedSeats.length}/{passengerCount}
            </Text>
          </View>

          {/* LEGEND */}
          <View style={styles.legend}>
            <LegendItem
              styleType="available"
              label="Available"
            />

            <LegendItem
              styleType="selected"
              label="Selected"
            />

            <LegendItem
              styleType="occupied"
              label="Occupied"
            />
          </View>

          {/* BUS */}
          <View style={styles.bus}>
            <View style={styles.driverArea}>
              <Text style={styles.driverText}>
                DRIVER
              </Text>
            </View>
<View style={styles.seatGrid}>
  {vehicle?.seatLayout.map((seat) => {
    const selected = selectedSeats.includes(seat.id);
    const occupied =
      trip?.occupiedSeats.includes(seat.id) ?? false;

    return (
      <Pressable
        key={seat.id}
        disabled={occupied}
        onPress={() => toggleSeat(seat.id)}
        style={[
          styles.seat,
          selected && styles.seatSelected,
          occupied && styles.seatOccupied,
        ]}
      >
        <Text
          style={[
            styles.seatText,
            selected && styles.seatTextSelected,
            occupied && styles.seatTextOccupied,
          ]}
        >
          {seat.id}
        </Text>
      </Pressable>
    );
  })}
</View> 
</View>

          {/* TOTAL */}
          <View style={styles.totalCard}>
            <View>
              <Text style={styles.totalLabel}>
                TOTAL
              </Text>

              <Text style={styles.totalSubtext}>
                {selectedSeats.length} seat
                {selectedSeats.length === 1 ? '' : 's'}
              </Text>
            </View>

            <Text style={styles.totalPrice}>
              {totalPrice.toLocaleString()} FCFA
            </Text>
          </View>

        

          <View style={styles.bottomSpace} />
        </ScrollView>
          {/* CONTINUE */}
          <Pressable
  style={[
    styles.continueButton,
    selectedSeats.length !== passengerCount &&
      styles.continueButtonDisabled,
  ]}
  disabled={selectedSeats.length !== passengerCount}
  onPress={() => {
    router.push({
      pathname: '/passenger',
      params: {
        tripId: tripId || '',
        from: trip?.from || 'Kumba',
        to: trip?.to || 'Yaoundé',
        passengers: passengerCount.toString(),
        departure: trip?.departure || '06:30',
        arrival: trip?.arrival || '13:00',
        price: tripPrice.toString(),
        seats: selectedSeats.join(','),
        total: totalPrice.toString(),
      },
    });
  }}
>
  <Text style={styles.continueText}>
    {selectedSeats.length === passengerCount
      ? 'CONTINUE TO PASSENGER DETAILS'
      : `SELECT ${passengerCount - selectedSeats.length} MORE SEAT`}
  </Text>

  <Text style={styles.continueArrow}>
    →
  </Text>
</Pressable>
      </View>
    </SafeAreaView>
  );
}

function LegendItem({
  styleType,
  label,
}: {
  styleType: 'available' | 'selected' | 'occupied';
  label: string;
}) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendBox,
          styleType === 'selected' && styles.legendSelected,
          styleType === 'occupied' && styles.legendOccupied,
        ]}
      />

      <Text style={styles.legendText}>
        {label}
      </Text>
    </View>
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

  tripSummary: {
    backgroundColor: '#0B1F3A',
    borderRadius: 22,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#7DBBFF',
  },

  summaryTime: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 3,
  },

  summaryCity: {
    fontSize: 9,
    color: '#B8C8DA',
    marginTop: 2,
  },

  summaryMiddle: {
    flex: 1,
    alignItems: 'center',
  },

  summaryArrow: {
    fontSize: 22,
    color: '#7DBBFF',
  },

  summaryDuration: {
    fontSize: 8,
    color: '#8EA4BC',
    marginTop: 3,
  },

  summaryRight: {
    alignItems: 'flex-end',
  },

  infoCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  infoLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#8A96A6',
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#172B4D',
    marginTop: 4,
  },

  infoDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#E8EDF3',
  },

  sectionHeader: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },

  selectedCount: {
    backgroundColor: '#E8F1FB',
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '900',
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  legend: {
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14,
    gap: 14,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendBox: {
    width: 13,
    height: 13,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    marginRight: 5,
  },

  legendSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },

  legendOccupied: {
    backgroundColor: '#CBD3DD',
    borderColor: '#CBD3DD',
  },

  legendText: {
    fontSize: 8,
    color: '#62748A',
  },

  bus: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  driverArea: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  driverText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#8A96A6',
  },

  seatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  seat: {
    width: '21%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#D9E1E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seatSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },

  seatOccupied: {
    backgroundColor: '#CBD3DD',
    borderColor: '#CBD3DD',
  },

  seatText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#172B4D',
  },

  seatTextSelected: {
    color: '#FFFFFF',
  },

  seatTextOccupied: {
    color: '#7B899A',
  },

  totalCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  totalLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#0B1F3A',
  },

  totalSubtext: {
    fontSize: 9,
    color: '#8A96A6',
    marginTop: 3,
  },

  totalPrice: {
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

  continueButtonDisabled: {
    backgroundColor: '#B8C2CE',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  continueArrow: {
    color: '#7DBBFF',
    fontSize: 22,
    marginLeft: 10,
  },

  bottomSpace: {
    height: 20,
  },
});
