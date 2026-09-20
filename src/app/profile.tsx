import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ProfileData = {
  name: string;
  userId: string;
  phone: string;
  email: string;
  trips: number;
  tickets: number;
};

const PROFILE: ProfileData = {
  name: 'Echie Bechem',
  userId: 'GST-000184',
  phone: '+237 6XX XXX XXX',
  email: 'Not added',
  trips: 12,
  tickets: 14,
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>My Profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {PROFILE.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{PROFILE.name}</Text>

          <View style={styles.idPill}>
            <Text style={styles.idText}>{PROFILE.userId}</Text>
          </View>
        </View>

        {/* Travel Stats */}
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{PROFILE.trips}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statValue}>{PROFILE.tickets}</Text>
            <Text style={styles.statLabel}>Tickets</Text>
          </View>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal information</Text>

        <View style={styles.infoCard}>
          <InfoRow
            label="Phone number"
            value={PROFILE.phone}
          />

          <View style={styles.rowDivider} />

          <InfoRow
            label="Email address"
            value={PROFILE.email}
          />
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.menuCard}>
          <ProfileAction
            icon="✎"
            title="Edit profile"
            onPress={() => {}}
          />

          <View style={styles.rowDivider} />

          <ProfileAction
            icon="⚙"
            title="Account settings"
            onPress={() => router.push('/settings')}
          />
        </View>

        <Text style={styles.footer}>
          GODSPEED MOBILITY
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function ProfileAction({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.actionRow}
      onPress={onPress}
    >
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>

      <Text style={styles.actionTitle}>{title}</Text>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8ECF1',
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

  profileHero: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 22,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 1,
  },

  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0B1F3A',
    textAlign: 'center',
  },

  idPill: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#E9EEF5',
  },

  idText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#607086',
    letterSpacing: 0.5,
  },

  statsCard: {
    height: 86,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7EBF0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  stat: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  statLabel: {
    marginTop: 3,
    fontSize: 10,
    color: '#8290A2',
    fontWeight: '700',
  },

  statDivider: {
    width: 1,
    height: 34,
    backgroundColor: '#E6EAF0',
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#66758A',
    marginTop: 25,
    marginBottom: 9,
    marginLeft: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 17,
  },

  infoRow: {
    minHeight: 67,
    justifyContent: 'center',
  },

  infoLabel: {
    fontSize: 10,
    color: '#8995A5',
    fontWeight: '700',
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 14,
    color: '#182B43',
    fontWeight: '800',
  },

  rowDivider: {
    height: 1,
    backgroundColor: '#EEF1F4',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  actionRow: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  actionIconText: {
    fontSize: 16,
    color: '#0B1F3A',
    fontWeight: '800',
  },

  actionTitle: {
    flex: 1,
    fontSize: 13,
    color: '#182B43',
    fontWeight: '800',
  },

  chevron: {
    fontSize: 23,
    color: '#9AA6B5',
  },

  footer: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 9,
    color: '#A4AEBA',
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});