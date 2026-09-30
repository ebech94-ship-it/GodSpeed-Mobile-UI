
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/auth/AuthContext';

export default function WalletReceiveScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();

  const passengerId = user
    ? `GST-${user.uid.slice(0, 6).toUpperCase()}`
    : 'GST-PASSENGER';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>

      <Text style={styles.title}>Receive Money</Text>
      <Text style={styles.subtitle}>
        Give another GodSpeed user your details to receive money.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>GodSpeed Passenger ID</Text>
        <Text style={styles.id}>{passengerId}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Registered phone</Text>
        <Text style={styles.value}>
          {profile?.phone || user?.phoneNumber || 'Not available'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          Share your GodSpeed Passenger ID or registered phone number with the
          person sending you money. GodSpeed will match the recipient before
          completing the transfer.
        </Text>
      </View>

      <View style={styles.qrPlaceholder}>
        <Text style={styles.qrTitle}>QR Receive</Text>
        <Text style={styles.qrText}>QR code coming in the next wallet update.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  back: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0B1F3A',
  },
  subtitle: {
    color: '#667085',
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 21,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  cardLabel: {
    color: '#667085',
    fontSize: 13,
    fontWeight: '700',
  },
  id: {
    color: '#0B1F3A',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 8,
    letterSpacing: 1,
  },
  value: {
    color: '#0B1F3A',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  info: {
    backgroundColor: '#EAF3FF',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
  },
  infoTitle: {
    color: '#0B1F3A',
    fontWeight: '800',
    marginBottom: 6,
  },
  infoText: {
    color: '#526173',
    lineHeight: 20,
  },
  qrPlaceholder: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9E0E7',
  },
  qrTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B1F3A',
  },
  qrText: {
    color: '#667085',
    marginTop: 6,
  },
});

