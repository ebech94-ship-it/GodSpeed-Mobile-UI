import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function PrivacyScreen() {
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

          <Text style={styles.headerTitle}>
            Privacy Policy
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.intro}>
          <View style={styles.lockIcon}>
            <Text style={styles.lockText}>🔒</Text>
          </View>

          <Text style={styles.title}>
            Your privacy matters
          </Text>

          <Text style={styles.subtitle}>
            This page explains how GodSpeed Mobility handles
            information associated with your account and use of the
            service.
          </Text>
        </View>

        <PrivacySection title="1. Information we collect">
          <Text style={styles.body}>
            Depending on the services you use, GodSpeed Mobility may
            collect information such as your name, phone number, email
            address, account information, booking information and
            transaction information.
          </Text>
        </PrivacySection>

        <PrivacySection title="2. How information is used">
          <Text style={styles.body}>
            Information may be used to provide and improve the
            GodSpeed Mobility service, manage passenger accounts,
            process bookings, provide support and maintain service
            security.
          </Text>
        </PrivacySection>

        <PrivacySection title="3. Verification information">
          <Text style={styles.body}>
            Where passenger verification is required, information
            submitted for verification may be processed for the
            purpose of confirming account identity and maintaining
            platform security.
          </Text>
        </PrivacySection>

        <PrivacySection title="4. Payments">
          <Text style={styles.body}>
            Payment and wallet transactions may involve third-party
            payment providers. Relevant transaction information may
            be processed to complete, verify and record payments.
          </Text>
        </PrivacySection>

        <PrivacySection title="5. Security">
          <Text style={styles.body}>
            GodSpeed Mobility uses technical and organizational
            measures intended to protect account and service
            information against unauthorized access or misuse.
          </Text>
        </PrivacySection>

        <PrivacySection title="6. Your choices">
          <Text style={styles.body}>
            You can manage available account preferences through the
            Settings section of the app. You can also update
            supported personal information through Edit Profile.
          </Text>
        </PrivacySection>

        <PrivacySection title="7. Contact">
          <Text style={styles.body}>
            For privacy questions or requests, please contact the
            GodSpeed Mobility support team through the support
            section of the app.
          </Text>
        </PrivacySection>

        <Text style={styles.footer}>
          GODSPEED MOBILITY
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function PrivacySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
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
    minHeight: 58,
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

  intro: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 25,
  },

  lockIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  lockText: {
    fontSize: 25,
  },

  title: {
    fontSize: 23,
    fontWeight: '900',
    color: '#0B1F3A',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 11,
    color: '#7B899A',
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 7,
  },

  section: {
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B1F3A',
    marginBottom: 8,
    marginLeft: 3,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 17,
  },

  body: {
    fontSize: 12,
    color: '#526274',
    lineHeight: 20,
  },

  footer: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 9,
    color: '#A4AEBA',
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});