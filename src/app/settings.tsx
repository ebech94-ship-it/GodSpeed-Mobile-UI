
import { useAuth } from '@/auth/AuthContext';
import { useSettings } from '@/context/SettingsContext';
import { auth, db } from '@/firebase/config';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();

  const {
    themeMode,
    setThemeMode,
    soundEnabled,
    setSoundEnabled,
  } = useSettings();

  const [notifications, setNotifications] = useState(true);
  const [tripUpdates, setTripUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);

  const [saving, setSaving] = useState(false);

  // Load saved notification preferences
  useEffect(() => {
    if (!profile?.preferences) return;

    setNotifications(profile.preferences.notifications ?? true);
    setTripUpdates(profile.preferences.tripUpdates ?? true);
    setPromotions(profile.preferences.promotions ?? false);
  }, [profile]);

  const updatePreference = async (
    field:
      | 'notifications'
      | 'tripUpdates'
      | 'promotions'
      | 'themeMode'
      | 'soundEnabled',
    value: boolean | 'system' | 'light' | 'dark'
  ) => {
    if (!user) return;

    try {
      setSaving(true);

      await updateDoc(doc(db, 'users', user.uid), {
        [`preferences.${field}`]: value,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Preference update error:', error);

      Alert.alert(
        'Update failed',
        'We could not save this setting. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleThemeMode = async (
    value: 'system' | 'light' | 'dark'
  ) => {
    setThemeMode(value);
    await updatePreference('themeMode', value);
  };

  const handleSound = async (value: boolean) => {
    setSoundEnabled(value);
    await updatePreference('soundEnabled', value);
  };

  const handleNotifications = async (value: boolean) => {
    setNotifications(value);
    await updatePreference('notifications', value);
  };

  const handleTripUpdates = async (value: boolean) => {
    setTripUpdates(value);
    await updatePreference('tripUpdates', value);
  };

  const handlePromotions = async (value: boolean) => {
    setPromotions(value);
    await updatePreference('promotions', value);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out of your GodSpeed account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/auth');
            } catch (error) {
              console.error('Sign out error:', error);

              Alert.alert(
                'Sign out failed',
                'We could not sign you out. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Account Settings</Text>

          <View style={styles.headerSpacer} />
        </View>

        {saving && (
          <View style={styles.savingBox}>
            <ActivityIndicator size="small" />
            <Text style={styles.savingText}>Saving...</Text>
          </View>
        )}

        {/* APPEARANCE */}
        <Text style={styles.sectionTitle}>Appearance</Text>

        <View style={styles.card}>
          <Text style={styles.rowTitle}>Theme</Text>

          <Text style={styles.rowDescription}>
            Choose how GodSpeed looks on your device.
          </Text>

          <View style={styles.themeRow}>
            {(['system', 'light', 'dark'] as const).map((mode) => (
              <Pressable
                key={mode}
                style={[
                  styles.themeButton,
                  themeMode === mode && styles.themeButtonActive,
                ]}
                onPress={() => handleThemeMode(mode)}
              >
                <Text
                  style={[
                    styles.themeText,
                    themeMode === mode && styles.themeTextActive,
                  ]}
                >
                  {mode === 'system'
                    ? 'System'
                    : mode === 'light'
                    ? 'Light'
                    : 'Dark'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* SOUND */}
        <Text style={styles.sectionTitle}>Sound</Text>

        <View style={styles.card}>
          <SettingRow
            title="App sounds"
            description="Play sounds for important actions and alerts."
            value={soundEnabled}
            onValueChange={handleSound}
          />
        </View>

        {/* NOTIFICATIONS */}
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.card}>
          <SettingRow
            title="Push notifications"
            description="Receive important notifications from GodSpeed."
            value={notifications}
            onValueChange={handleNotifications}
          />

          <View style={styles.divider} />

          <SettingRow
            title="Trip updates"
            description="Get updates about your bookings and trips."
            value={tripUpdates}
            onValueChange={handleTripUpdates}
          />

          <View style={styles.divider} />

          <SettingRow
            title="Offers & promotions"
            description="Receive GodSpeed offers and promotional messages."
            value={promotions}
            onValueChange={handlePromotions}
          />
        </View>

        {/* ACCOUNT */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          <Pressable
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          GodSpeed Mobility
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({
  title,
  description,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingTextContainer}>
        <Text style={styles.rowTitle}>{title}</Text>

        <Text style={styles.rowDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 32,
    color: '#0B1F3A',
    lineHeight: 34,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  headerSpacer: {
    width: 42,
  },

  savingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  savingText: {
    color: '#666',
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0B1F3A',
    marginTop: 18,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  settingRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },

  settingTextContainer: {
    flex: 1,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B1F3A',
  },

  rowDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 17,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  themeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },

  themeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F3F5',
    alignItems: 'center',
  },

  themeButtonActive: {
    backgroundColor: '#1976D2',
  },

  themeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },

  themeTextActive: {
    color: '#FFFFFF',
  },

  signOutButton: {
    minHeight: 54,
    backgroundColor: '#D32F2F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  signOutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  footer: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 30,
  },
});
