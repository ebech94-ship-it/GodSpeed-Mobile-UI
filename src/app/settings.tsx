import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type SettingsState = {
  notifications: boolean;
  location: boolean;
};

const SETTINGS: SettingsState = {
  notifications: true,
  location: true,
};

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Settings</Text>

          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.sectionTitle}>
          Preferences
        </Text>

        <View style={styles.card}>
          <SettingRow
            icon="🔔"
            title="Notifications"
            subtitle="Trip and booking updates"
            enabled={SETTINGS.notifications}
          />

          <View style={styles.divider} />

          <SettingRow
            icon="📍"
            title="Location"
            subtitle="Used for journey tracking"
            enabled={SETTINGS.location}
          />
        </View>

        <Text style={styles.sectionTitle}>
          App
        </Text>

        <View style={styles.card}>
          <SimpleRow
            icon="ℹ"
            title="About GodSpeed Mobility"
          />

          <View style={styles.divider} />

          <SimpleRow
            icon="▣"
            title="Terms & conditions"
          />

          <View style={styles.divider} />

          <SimpleRow
            icon="⌕"
            title="Privacy policy"
          />
        </View>

        <View style={styles.versionBlock}>
          <Text style={styles.versionLabel}>
            GODSPEED MOBILITY
          </Text>

          <Text style={styles.version}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  enabled,
}: {
  icon: string;
  title: string;
  subtitle: string;
  enabled: boolean;
}) {
  return (
    <Pressable style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Text style={styles.settingEmoji}>{icon}</Text>
      </View>

      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>

      <View
        style={[
          styles.toggle,
          enabled && styles.toggleEnabled,
        ]}
      >
        <View
          style={[
            styles.toggleKnob,
            enabled && styles.toggleKnobEnabled,
          ]}
        />
      </View>
    </Pressable>
  );
}

function SimpleRow({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <Pressable style={styles.simpleRow}>
      <View style={styles.simpleIcon}>
        <Text style={styles.simpleIconText}>{icon}</Text>
      </View>

      <Text style={styles.simpleTitle}>{title}</Text>

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

  sectionTitle: {
    marginTop: 23,
    marginBottom: 9,
    marginLeft: 3,
    fontSize: 11,
    fontWeight: '900',
    color: '#68778A',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  settingRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingEmoji: {
    fontSize: 18,
  },

  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },

  settingTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  settingSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: '#8995A4',
  },

  toggle: {
    width: 43,
    height: 25,
    borderRadius: 14,
    backgroundColor: '#DCE2E8',
    padding: 3,
    justifyContent: 'center',
  },

  toggleEnabled: {
    backgroundColor: '#0B1F3A',
  },

  toggleKnob: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  toggleKnobEnabled: {
    alignSelf: 'flex-end',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F4',
  },

  simpleRow: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },

  simpleIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  simpleIconText: {
    fontSize: 15,
    color: '#0B1F3A',
    fontWeight: '900',
  },

  simpleTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    fontWeight: '800',
    color: '#182B43',
  },

  chevron: {
    fontSize: 23,
    color: '#9AA6B5',
  },

  versionBlock: {
    alignItems: 'center',
    marginTop: 30,
  },

  versionLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#A4AEBA',
    letterSpacing: 1.3,
  },

  version: {
    marginTop: 5,
    fontSize: 9,
    color: '#A4AEBA',
  },
});