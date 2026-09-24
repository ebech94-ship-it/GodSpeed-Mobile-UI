
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* BRAND */}
        <View style={styles.brand}>
          <Text style={styles.brandSmall}>GODSPEED</Text>
          <Text style={styles.brandMain}>MOBILITY</Text>

          <View style={styles.brandLine} />

          <Text style={styles.title}>Welcome to GodSpeed</Text>
          <Text style={styles.titleFrench}>
            Bienvenue chez GodSpeed
          </Text>
        </View>

        {/* BUS */}
        <View style={styles.busArea}>
          <View style={styles.glow} />

          <Image
            source={require('../../assets/images/bus.png')}
            style={styles.bus}
            resizeMode="contain"
          />
        </View>

        {/* MESSAGE */}
        <View style={styles.message}>
          <Text style={styles.heading}>
            Your journey starts here.
          </Text>

          <Text style={styles.description}>
            Book trips, manage your tickets, send parcels,
            and stay connected with your journey.
          </Text>

          <Text style={styles.descriptionFrench}>
            Réservez vos voyages, gérez vos billets et
            restez connecté à votre trajet.
          </Text>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/create-account')}
          >
            <Text style={styles.primaryText}>
              Create Account
            </Text>

            <Text style={styles.primaryFrench}>
              Créer un compte
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryText}>
              Log In
            </Text>

            <Text style={styles.secondaryFrench}>
              Se connecter
            </Text>
          </Pressable>

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Safe journeys. Better connections.
          </Text>

          <Text style={styles.footerBrand}>
            POWERED BY GODSPEED TECHNOLOGIES
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#06152B',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  brand: {
    alignItems: 'center',
    marginTop: 28,
  },

  brandSmall: {
    color: '#8FBCE8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
  },

  brandMain: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 2,
  },

  brandLine: {
    width: 45,
    height: 2,
    backgroundColor: '#1976D2',
    marginVertical: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },

  titleFrench: {
    color: '#8FA5BC',
    fontSize: 11,
    marginTop: 4,
  },

  busArea: {
    width: '100%',
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  glow: {
    position: 'absolute',
    width: '80%',
    height: 190,
    borderRadius: 100,
    backgroundColor: '#749deaff',
    opacity: 0.12,
  },

 bus: {
  width: '100%',
  height: 180,
  borderRadius: 30,
},

  message: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 2,
  },

  heading: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },

  description: {
    color: '#B7C7D8',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 9,
  },

  descriptionFrench: {
    color: '#70879F',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 5,
  },

  actions: {
    width: '100%',
    marginTop: 25,
    gap: 11,
  },

  primaryButton: {
    height: 57,
    borderRadius: 17,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  primaryFrench: {
    color: '#D9ECFF',
    fontSize: 9,
    marginTop: 2,
  },

  secondaryButton: {
    height: 57,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#31516F',
    backgroundColor: '#0B2039',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  secondaryFrench: {
    color: '#8197AD',
    fontSize: 9,
    marginTop: 2,
  },

  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 18,
  },

  footerText: {
    color: '#617991',
    fontSize: 9,
  },

  footerBrand: {
    color: '#4D6680',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 5,
  },
});
