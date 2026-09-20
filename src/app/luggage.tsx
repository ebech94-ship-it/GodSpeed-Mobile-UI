import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type LuggageItem = {
  tag: string;
  description: string;
  status: 'checked_in' | 'in_transit' | 'delivered';
};

const LUGGAGE: LuggageItem[] = [];

export default function LuggageScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>My Luggage</Text>

          <View style={styles.headerSpacer} />
        </View>

        {LUGGAGE.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>🧳</Text>
            </View>

            <Text style={styles.emptyTitle}>
              No luggage tracked
            </Text>

            <Text style={styles.emptyText}>
              Luggage linked to your journeys will appear here.
            </Text>

            <Pressable
              style={styles.findButton}
              onPress={() => router.push('/trips')}
            >
              <Text style={styles.findButtonText}>
                VIEW MY TRIPS
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.list}>
            {LUGGAGE.map((item) => (
              <LuggageCard
                key={item.tag}
                item={item}
              />
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function LuggageCard({
  item,
}: {
  item: LuggageItem;
}) {
  return (
    <View style={styles.luggageCard}>
      <View style={styles.luggageIcon}>
        <Text style={styles.luggageEmoji}>🧳</Text>
      </View>

      <View style={styles.luggageInfo}>
        <Text style={styles.luggageTag}>{item.tag}</Text>
        <Text style={styles.luggageDescription}>
          {item.description}
        </Text>
      </View>

      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
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

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 50,
  },

  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: '#E9EEF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  emptyEmoji: {
    fontSize: 39,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  emptyText: {
    maxWidth: 300,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 11,
    lineHeight: 17,
    color: '#8491A1',
  },

  findButton: {
    marginTop: 21,
    height: 47,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  findButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  list: {
    paddingTop: 18,
  },

  luggageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  luggageIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  luggageEmoji: {
    fontSize: 23,
  },

  luggageInfo: {
    flex: 1,
    marginLeft: 12,
  },

  luggageTag: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  luggageDescription: {
    marginTop: 4,
    fontSize: 9,
    color: '#8995A4',
  },

  statusPill: {
    backgroundColor: '#EEF2F6',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 8,
    color: '#5D6D81',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});