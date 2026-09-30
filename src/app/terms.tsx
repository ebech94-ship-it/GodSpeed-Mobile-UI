import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TermsScreen() {
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
            Terms & Conditions
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>
            GodSpeed Mobility Terms
          </Text>

          <Text style={styles.updated}>
            General passenger terms
          </Text>
        </View>

        <TermsSection title="1. Using GodSpeed Mobility">
          <Text style={styles.body}>
            GodSpeed Mobility provides digital tools for discovering,
            booking and managing mobility services. By using the app,
            you agree to use the service lawfully and responsibly.
          </Text>
        </TermsSection>

        <TermsSection title="2. Passenger information">
          <Text style={styles.body}>
            Passengers are responsible for providing accurate
            information when creating and managing an account.
          </Text>

          <Text style={styles.body}>
            You should keep your account credentials secure and
            notify GodSpeed Mobility if you believe your account has
            been accessed without authorization.
          </Text>
        </TermsSection>

        <TermsSection title="3. Bookings and tickets">
          <Text style={styles.body}>
            Trip availability, departure times, fares and other
            journey details may depend on the transport operator
            providing the service.
          </Text>

          <Text style={styles.body}>
            A booking is subject to the applicable booking,
            cancellation and refund conditions shown during the
            transaction.
          </Text>
        </TermsSection>

        <TermsSection title="4. Payments">
          <Text style={styles.body}>
            Where digital payments or wallet services are available,
            transactions may be subject to applicable payment-provider
            rules, verification requirements and transaction limits.
          </Text>
        </TermsSection>

        <TermsSection title="5. Changes to the service">
          <Text style={styles.body}>
            GodSpeed Mobility may improve, modify or introduce new
            features as the platform develops. Important changes to
            applicable terms may be communicated through the app or
            other appropriate channels.
          </Text>
        </TermsSection>

        <TermsSection title="6. Contact">
          <Text style={styles.body}>
            If you have questions about these terms or your use of
            GodSpeed Mobility, please contact the GodSpeed Mobility
            support team through the support section of the app.
          </Text>
        </TermsSection>

        <Text style={styles.footer}>
          GODSPEED MOBILITY
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function TermsSection({
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
    fontSize: 17,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  headerSpacer: {
    width: 42,
  },

  intro: {
    paddingTop: 25,
    paddingBottom: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  updated: {
    fontSize: 10,
    color: '#8995A5',
    marginTop: 5,
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
    marginBottom: 8,
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