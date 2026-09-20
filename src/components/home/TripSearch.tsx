
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TripSearchProps = {
  from: string;
  to: string;
  passengers: number;
  onFromPress: () => void;
  onToPress: () => void;
  onSwap: () => void;
  onDecreasePassengers: () => void;
  onIncreasePassengers: () => void;
  onSearch: () => void;
  travelDate: string;
onDatePress: () => void;
};
function formatTravelDate(dateString: string) {
const date = new Date(`${dateString}T00:00:00`);

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

if (date.getTime() === today.getTime()) {
return 'Today';
}

if (date.getTime() === tomorrow.getTime()) {
return 'Tomorrow';
}

return date.toLocaleDateString('en-US', {
weekday: 'short',
month: 'short',
day: 'numeric',
});
}


export default function TripSearch({
  from,
  to,
  passengers,
  onFromPress,
  onToPress,
  onSwap,
  onDecreasePassengers,
  onIncreasePassengers,
  onSearch,
   travelDate,
  onDatePress,
}: TripSearchProps) {
  return (
    <View style={styles.searchSection}>
      <Text style={styles.sectionHeading}>
        Where are you going?
      </Text>

      <Text style={styles.sectionFrench}>
        Où allez-vous ?
      </Text>

      {/* LOCATIONS */}
      <View style={styles.locationsRow}>
        <Pressable
          style={styles.locationCard}
          onPress={onFromPress}
        >
          <View style={styles.locationIconBlue}>
            <Text style={styles.locationPin}>●</Text>
          </View>

          <Text style={styles.fieldLabel}>FROM</Text>

          <Text style={styles.cityText}>
            {from}
          </Text>

          <Text style={styles.changeText}>
            Change ›
          </Text>
        </Pressable>

        <Pressable
          style={styles.swapButton}
          onPress={onSwap}
        >
          <Text style={styles.swapText}>⇄</Text>
        </Pressable>

        <Pressable
          style={styles.locationCard}
          onPress={onToPress}
        >
          <View style={styles.locationIconDark}>
            <Text style={styles.locationPin}>●</Text>
          </View>

          <Text style={styles.fieldLabel}>TO</Text>

          <Text style={styles.cityText}>
            {to}
          </Text>

          <Text style={styles.changeText}>
            Change ›
          </Text>
        </Pressable>
      </View>

      {/* DATE + PASSENGERS */}
      <View style={styles.optionsRow}>
        <Pressable
  style={styles.optionCard}
  onPress={onDatePress}
>

          <View style={styles.optionIcon}>
            <Text>📅</Text>
          </View>

          <View>
            <Text style={styles.fieldLabel}>DATE</Text>

            <Text style={styles.optionValue}>
              {formatTravelDate(travelDate)}
            </Text>
          </View>
        </Pressable>

        <View style={styles.optionCard}>
          <View style={styles.optionIcon}>
            <Text>👤</Text>
          </View>

          <View style={styles.passengerInfo}>
            <Text style={styles.fieldLabel}>
              PASSENGERS
            </Text>

            <View style={styles.passengerRow}>
              <Pressable
                style={styles.counterButton}
                onPress={onDecreasePassengers}
              >
                <Text style={styles.counterText}>
                  −
                </Text>
              </Pressable>

              <Text style={styles.passengerNumber}>
                {passengers}
              </Text>

              <Pressable
                style={styles.counterButton}
                onPress={onIncreasePassengers}
              >
                <Text style={styles.counterText}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* SEARCH BUTTON */}
      <Pressable
        style={styles.searchButton}
        onPress={onSearch}
      >
        <Text style={styles.searchButtonText}>
          SEARCH TRIPS
        </Text>

        <Text style={styles.searchArrow}>
          →
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    marginTop: 26,
  },

  sectionHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  sectionFrench: {
    color: '#7B899A',
    fontSize: 11,
    marginTop: 2,
  },

  locationsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  locationCard: {
    flex: 1,
    minHeight: 120,
    backgroundColor: '#a6f106ff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  locationIconBlue: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  locationIconDark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8EDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  locationPin: {
    fontSize: 10,
    color: '#1976D2',
  },

  fieldLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#100885ff',
  },

  cityText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#172B4D',
    marginTop: 4,
  },

  changeText: {
    fontSize: 10,
    color: '#000000ff',
    fontWeight: '600',
    marginTop: 7,
  },

  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -7,
    zIndex: 5,
    elevation: 4,
  },

  swapText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },

  optionCard: {
    flex: 1,
    minHeight: 70,
    backgroundColor: '#ebd7d7ff',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  optionValue: {
    color: '#172B4D',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },

  passengerInfo: {
    flex: 1,
  },

  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  counterButton: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#02203eff',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },

  passengerNumber: {
    minWidth: 25,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800',
    color: '#172B4D',
  },

  searchButton: {
    height: 56,
    backgroundColor: '#0B1F3A',
    borderRadius: 17,
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  searchArrow: {
    color: '#7DBBFF',
    fontSize: 22,
    marginLeft: 10,
  },
});

