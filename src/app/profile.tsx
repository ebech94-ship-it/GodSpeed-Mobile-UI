
import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type WalletData = {
  balance?: number;
  currency?: string;
  status?: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, verificationStatus, loading } = useAuth();

  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [walletLoading, setWalletLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWallet(null);
      setWalletLoading(false);
      return;
    }

    const walletRef = doc(db, 'wallets', user.uid);

    const unsubscribe = onSnapshot(
      walletRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setWallet(snapshot.data() as WalletData);
        } else {
          setWallet({
            balance: 0,
            currency: 'XAF',
            status: 'active',
          });
        }

        setWalletLoading(false);
      },
      (error) => {
        console.error('🔥 WALLET LISTENER ERROR:', error);
        setWallet({
          balance: 0,
          currency: 'XAF',
          status: 'active',
        });
        setWalletLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#1976D2" />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return null;
  }

  const fullName =
    profile?.fullName ||
    user.displayName ||
    'GodSpeed Passenger';

  const phone = profile?.phone || 'Not added';
  const email = profile?.email || user.email || 'Not added';

  const passengerId = `GST-${user.uid
    .slice(0, 6)
    .toUpperCase()}`;

  const trips = Number(profile?.trips || 0);
  const tickets = Number(profile?.tickets || 0);

  const balance = Number(wallet?.balance || 0);
  const currency = wallet?.currency || 'XAF';

  const formattedBalance = balance.toLocaleString();

  const verificationLabel =
    verificationStatus === 'verified'
      ? 'Verified'
      : verificationStatus === 'pending'
      ? 'Verification pending'
      : 'Not verified';

  const verificationColor =
    verificationStatus === 'verified'
      ? '#16803C'
      : verificationStatus === 'pending'
      ? '#B7791F'
      : '#B42318';

  const verificationBackground =
    verificationStatus === 'verified'
      ? '#E8F7EE'
      : verificationStatus === 'pending'
      ? '#FFF7E6'
      : '#FDECEC';

  const initials = fullName
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <Text style={styles.name}>{fullName}</Text>

          <View style={styles.idPill}>
            <Text style={styles.idText}>{passengerId}</Text>
          </View>

          {/* Verification Badge */}
          <View
            style={[
              styles.verificationBadge,
              {
                backgroundColor: verificationBackground,
              },
            ]}
          >
            <View
              style={[
                styles.verificationDot,
                {
                  backgroundColor: verificationColor,
                },
              ]}
            />

            <Text
              style={[
                styles.verificationText,
                {
                  color: verificationColor,
                },
              ]}
            >
              {verificationLabel}
            </Text>
          </View>
        </View>

        {/* Wallet */}
        <View style={styles.walletCard}>
          <View style={styles.walletTop}>
            <View>
              <Text style={styles.walletLabel}>GODSPEED WALLET</Text>
              <Text style={styles.walletFrench}>
                Portefeuille GodSpeed
              </Text>
            </View>

            <View style={styles.walletIcon}>
              <Text style={styles.walletIconText}>₣</Text>
            </View>
          </View>

          <View style={styles.walletBalanceArea}>
            <Text style={styles.walletBalanceLabel}>
              Available balance
            </Text>

            {walletLoading ? (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
                style={styles.walletLoader}
              />
            ) : (
              <Text style={styles.walletBalance}>
                {formattedBalance} {currency}
              </Text>
            )}
          </View>

          <View style={styles.walletActions}>
            <Pressable
              style={styles.walletActionPrimary}
              onPress={() => router.push('/payments')}
            >
              <Text style={styles.walletActionPrimaryText}>
                + Deposit
              </Text>
            </Pressable>

            <Pressable
              style={styles.walletActionSecondary}
              onPress={() => router.push('/payments')}
            >
              <Text style={styles.walletActionSecondaryText}>
                Withdraw
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Travel Stats */}
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{trips}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statValue}>{tickets}</Text>
            <Text style={styles.statLabel}>Tickets</Text>
          </View>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>
          Personal information
        </Text>

        <View style={styles.infoCard}>
          <InfoRow
            label="Full name"
            value={fullName}
          />

          <View style={styles.rowDivider} />

          <InfoRow
            label="Phone number"
            value={phone}
          />

          <View style={styles.rowDivider} />

          <InfoRow
            label="Email address"
            value={email}
          />
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.menuCard}>
          <ProfileAction
            icon="✎"
            title="Edit profile"
            subtitle="Update your personal information"
            onPress={() => router.push('/edit-profile')}
          />

          <View style={styles.rowDivider} />

          <ProfileAction
            icon="⚙"
            title="Account settings"
            subtitle="Notifications, location and preferences"
            onPress={() => router.push('/settings')}
          />
        </View>

        {/* GodSpeed Information */}
        <Text style={styles.sectionTitle}>
          GodSpeed Mobility
        </Text>

        <View style={styles.menuCard}>
          <ProfileAction
            icon="ⓘ"
            title="About GodSpeed Mobility"
            subtitle="Learn about our mobility service"
            onPress={() => router.push('/about')}
          />

          <View style={styles.rowDivider} />

          <ProfileAction
            icon="▤"
            title="Terms & Conditions"
            subtitle="Our terms of service"
            onPress={() => router.push('/terms')}
          />

          <View style={styles.rowDivider} />

          <ProfileAction
            icon="🔒"
            title="Privacy Policy"
            subtitle="How we protect your information"
            onPress={() => router.push('/privacy')}
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
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ProfileAction({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
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

      <View style={styles.actionTextContainer}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

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

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  verificationBadge: {
    marginTop: 9,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  verificationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  verificationText: {
    fontSize: 10,
    fontWeight: '800',
  },

  walletCard: {
    backgroundColor: '#0B1F3A',
    borderRadius: 24,
    padding: 18,
    marginBottom: 13,
  },

  walletTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  walletLabel: {
    color: '#7DBBFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  walletFrench: {
    color: '#AABBCD',
    fontSize: 9,
    marginTop: 3,
  },

  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#173A63',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletIconText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },

  walletBalanceArea: {
    marginTop: 21,
  },

  walletBalanceLabel: {
    color: '#AABBCD',
    fontSize: 10,
    fontWeight: '600',
  },

  walletBalance: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 4,
  },

  walletLoader: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },

  walletActions: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 18,
  },

  walletActionPrimary: {
    flex: 1,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletActionPrimaryText: {
    color: '#0B1F3A',
    fontSize: 12,
    fontWeight: '900',
  },

  walletActionSecondary: {
    flex: 1,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#173A63',
    borderWidth: 1,
    borderColor: '#416184',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletActionSecondaryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
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
    minHeight: 68,
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

  actionTextContainer: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 13,
    color: '#182B43',
    fontWeight: '800',
  },

  actionSubtitle: {
    fontSize: 9,
    color: '#8995A5',
    marginTop: 3,
  },

  chevron: {
    fontSize: 23,
    color: '#9AA6B5',
    marginLeft: 8,
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
