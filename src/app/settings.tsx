
import { useAuth } from '@/auth/AuthContext';
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

  const [notifications, setNotifications] = useState(true);
  const [tripUpdates, setTripUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [location, setLocation] = useState(true);
  const [language, setLanguage] = useState<'English' | 'Français'>('English');

  const [saving, setSaving] = useState(false);

  // Load saved preferences from the user's profile
  useEffect(() => {
    if (!profile?.preferences) return;

    setNotifications(profile.preferences.notifications ?? true);
    setTripUpdates(profile.preferences.tripUpdates ?? true);
    setPromotions(profile.preferences.promotions ?? false);
    setLocation(profile.preferences.location ?? true);
    setLanguage(profile.preferences.language ?? 'English');
  }, [profile]);

  const updatePreference = async (
    field:
      | 'notifications'
      | 'tripUpdates'
      | 'promotions'
      | 'location'
      | 'language',
    value: boolean | 'English' | 'Français'
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

  const handleLocation = async (value: boolean) => {
    setLocation(value);
    await updatePreference('location', value);
  };

  const handleLanguage = async (value: 'English' | 'Français') => {
    setLanguage(value);
    await updatePreference('language', value);
  };

  const handleSecurity = () => {
    Alert.alert(
      'Password & Security',
      'Password changes and account security controls will be available here.'
    );
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

        {/* LOCATION */}
        <Text style={styles.sectionTitle}>Location</Text>

        <View style={styles.card}>
          <SettingRow
            title="Location services"
            description="Allow GodSpeed features to use your location preference."
            value={location}
            onValueChange={handleLocation}
          />
        </View>

        {/* LANGUAGE */}
        <Text style={styles.sectionTitle}>Language</Text>

        <View style={styles.card}>
          <Text style={styles.rowTitle}>App language</Text>
          <Text style={styles.rowDescription}>
            Choose the language used by the application.
          </Text>

          <View style={styles.languageRow}>
            <Pressable
              style={[
                styles.languageButton,
                language === 'English' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguage('English')}
            >
              <Text
                style={[
                  styles.languageText,
                  language === 'English' && styles.languageTextActive,
                ]}
              >
                English
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.languageButton,
                language === 'Français' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguage('Français')}
            >
              <Text
                style={[
                  styles.languageText,
                  language === 'Français' && styles.languageTextActive,
                ]}
              >
                Français
              </Text>
            </Pressable>
          </View>
        </View>

        {/* SECURITY */}
        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.card}>
          <Pressable style={styles.actionRow} onPress={handleSecurity}>
            <View style={styles.actionTextContainer}>
              <Text style={styles.rowTitle}>Password & Security</Text>
              <Text style={styles.rowDescription}>
                Manage your password and account security.
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        {/* ACCOUNT */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
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
        <Text style={styles.rowDescription}>{description}</Text>
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

  languageRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    marginBottom: 12,
  },

  languageButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F3F5',
    alignItems: 'center',
  },

  languageButtonActive: {
    backgroundColor: '#1976D2',
  },

  languageText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
  },

  languageTextActive: {
    color: '#FFFFFF',
  },

  actionRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionTextContainer: {
    flex: 1,
  },

  chevron: {
    fontSize: 28,
    color: '#9CA3AF',
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

