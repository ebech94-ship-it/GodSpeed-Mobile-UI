import { useRouter } from 'expo-router';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function TicketsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Tickets</Text>
            <Text style={styles.subtitle}>Mes billets</Text>
          </View>
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.icon}>🎟️</Text>

          <Text style={styles.emptyTitle}>
            No tickets yet
          </Text>

          <Text style={styles.emptyText}>
            Your booked trips will appear here.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/')}
          >
            <Text style={styles.buttonText}>
              FIND A TRIP
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  subtitle: {
    fontSize: 10,
    color: '#7B899A',
    marginTop: 2,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },

  icon: {
    fontSize: 42,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  emptyText: {
    fontSize: 11,
    color: '#7B899A',
    marginTop: 7,
    textAlign: 'center',
  },

  button: {
    marginTop: 20,
    height: 48,
    paddingHorizontal: 25,
    borderRadius: 14,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});