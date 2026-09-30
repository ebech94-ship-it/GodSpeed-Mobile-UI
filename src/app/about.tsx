import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AboutScreen() {
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

          <Text style={styles.headerTitle}>About</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.hero}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>GS</Text>
          </View>

          <Text style={styles.brand}>GODSPEED MOBILITY</Text>

          <Text style={styles.tagline}>
            Comfortable • Safe • On Time
          </Text>

          <Text style={styles.frenchTagline}>
            Confortable • Sûr • À l'heure
          </Text>
        </View>

        <InfoSection title="Our mission">
          <Text style={styles.body}>
            GodSpeed Mobility is a passenger mobility platform designed
            to make road travel simpler, more convenient and more
            connected.
          </Text>

          <Text style={styles.body}>
            We are building tools that connect passengers, transport
            operators and mobility services through one simple digital
            experience.
          </Text>
        </InfoSection>

        <InfoSection title="What we provide">
          <Bullet text="Bus trip discovery and booking" />
          <Bullet text="Digital passenger tickets" />
          <Bullet text="Journey and bus tracking" />
          <Bullet text="Parcel and luggage services" />
          <Bullet text="Digital passenger payments" />
        </InfoSection>

        <InfoSection title="Our vision">
          <Text style={styles.body}>
            Our long-term vision is to build a connected mobility
            network that makes transportation across Cameroon easier
            to discover, book and manage.
          </Text>
        </InfoSection>

        <View style={styles.footerCard}>
          <Text style={styles.footerBrand}>
            GODSPEED TECHNOLOGIES
          </Text>
          <Text style={styles.footerText}>
            GodSpeed Mobility
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoSection({
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

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bullet} />
      <Text style={styles.bulletText}>{text}</Text>
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

  hero: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 28,
  },

  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  brand: {
    color: '#0B1F3A',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },

  tagline: {
    color: '#1976D2',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 7,
  },

  frenchTagline: {
    color: '#8995A5',
    fontSize: 9,
    marginTop: 3,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#66758A',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 9,
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
    lineHeight: 19,
    marginBottom: 12,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  bullet: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1976D2',
    marginRight: 10,
  },

  bulletText: {
    flex: 1,
    fontSize: 12,
    color: '#526274',
    fontWeight: '600',
  },

  footerCard: {
    alignItems: 'center',
    paddingVertical: 22,
  },

  footerBrand: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#1976D2',
  },

  footerText: {
    fontSize: 9,
    color: '#9AA6B5',
    marginTop: 4,
  },
});