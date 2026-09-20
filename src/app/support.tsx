import { useRouter } from 'expo-router';
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SUPPORT = {
  phone: '+237 600 000 000',
  email: 'support@godspeed.tech',
  whatsapp: '+237 600 000 000',
};

export default function SupportScreen() {
  const router = useRouter();

  const openPhone = () => {
    Linking.openURL(`tel:${SUPPORT.phone}`);
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${SUPPORT.email}`);
  };

  const openWhatsApp = () => {
    Linking.openURL(
      `https://wa.me/${SUPPORT.whatsapp.replace(/\D/g, '')}`,
    );
  };

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

          <Text style={styles.headerTitle}>Support</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>💬</Text>
          </View>

          <Text style={styles.heroTitle}>
            How can we help?
          </Text>

          <Text style={styles.heroText}>
            Our support team is here to help with bookings,
            payments and journeys.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Contact us
        </Text>

        <View style={styles.contactCard}>
          <SupportAction
            icon="◉"
            title="Call support"
            subtitle={SUPPORT.phone}
            onPress={openPhone}
          />

          <View style={styles.divider} />

          <SupportAction
            icon="◌"
            title="WhatsApp"
            subtitle="Chat with support"
            onPress={openWhatsApp}
          />

          <View style={styles.divider} />

          <SupportAction
            icon="✉"
            title="Email support"
            subtitle={SUPPORT.email}
            onPress={openEmail}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Help
        </Text>

        <View style={styles.helpCard}>
          <HelpRow
            title="Booking & tickets"
            subtitle="Questions about your journey"
          />

          <View style={styles.divider} />

          <HelpRow
            title="Payments"
            subtitle="Payment or transaction issues"
          />

          <View style={styles.divider} />

          <HelpRow
            title="Lost luggage"
            subtitle="Report or track your luggage"
          />
        </View>

        <Text style={styles.footer}>
          GODSPEED MOBILITY · WE'RE HERE FOR YOU
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SupportAction({
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
      style={styles.supportRow}
      onPress={onPress}
    >
      <View style={styles.supportIcon}>
        <Text style={styles.supportIconText}>{icon}</Text>
      </View>

      <View style={styles.supportInfo}>
        <Text style={styles.supportTitle}>{title}</Text>
        <Text style={styles.supportSubtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function HelpRow({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable style={styles.helpRow}>
      <View style={styles.helpInfo}>
        <Text style={styles.helpTitle}>{title}</Text>
        <Text style={styles.helpSubtitle}>{subtitle}</Text>
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

  hero: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 22,
  },

  heroIcon: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: '#E9EEF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  heroEmoji: {
    fontSize: 35,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  heroText: {
    maxWidth: 290,
    marginTop: 7,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 17,
    color: '#8491A1',
  },

  sectionTitle: {
    marginTop: 17,
    marginBottom: 9,
    marginLeft: 3,
    fontSize: 11,
    fontWeight: '900',
    color: '#68778A',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  supportRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },

  supportIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  supportIconText: {
    fontSize: 17,
    color: '#0B1F3A',
    fontWeight: '900',
  },

  supportInfo: {
    flex: 1,
    marginLeft: 12,
  },

  supportTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  supportSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: '#8995A4',
  },

  chevron: {
    fontSize: 23,
    color: '#9AA6B5',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F4',
  },

  helpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  helpRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },

  helpInfo: {
    flex: 1,
  },

  helpTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  helpSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: '#8995A4',
  },

  footer: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 8,
    color: '#A4AEBA',
    fontWeight: '900',
    letterSpacing: 1.2,
  },
});