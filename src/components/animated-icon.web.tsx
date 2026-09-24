import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SPLASH_DURATION = 10000;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: SPLASH_DURATION,
      easing: Easing.linear,
    });

    const timer = setTimeout(async () => {
      setVisible(false);

      // Release Expo's native splash after our GodSpeed splash finishes.
      await SplashScreen.hideAsync();
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(450)}
      style={styles.splash}
    >
      {/* Background glow */}
      <View style={styles.glowLarge} />
      <View style={styles.glowSmall} />

      {/* Brand */}
      <Animated.View
        entering={SlideInUp.duration(800)}
        style={styles.brand}
      >
        <Text style={styles.brandSmall}>GODSPEED</Text>

        <Text style={styles.brandMain}>MOBILITY</Text>

        <View style={styles.brandLine} />

        <Text style={styles.tagline}>
          Travel with GodSpeed
        </Text>

        <Text style={styles.taglineFrench}>
          Voyagez avec GodSpeed
        </Text>
      </Animated.View>

      {/* Bus */}
      <Animated.View
        entering={SlideInDown
          .duration(1000)
          .easing(Easing.out(Easing.cubic))}
        style={styles.busArea}
      >
        <View style={styles.busGlow} />

        <Image
          source={require('@/assets/images/bus.png')}
          contentFit="contain"
          style={styles.bus}
        />

        <View style={styles.groundGlow} />
      </Animated.View>

      {/* Travel promise */}
      <Animated.View
        entering={FadeIn.delay(900).duration(700)}
        style={styles.promise}
      >
        <View style={styles.promiseDot} />

        <Text style={styles.promiseText}>
          SAFE • COMFORTABLE • ON TIME
        </Text>

        <Text style={styles.promiseFrench}>
          SÛR • CONFORTABLE • À L'HEURE
        </Text>
      </Animated.View>

      {/* Loading */}
      <View style={styles.loadingSection}>
        <View style={styles.loadingTrack}>
          <Animated.View
            style={[
              styles.loadingProgress,
              progressStyle,
            ]}
          />
        </View>

        <Text style={styles.loadingText}>
          Preparing your journey...
        </Text>
      </View>

      {/* Powered by */}
      <Animated.View
        entering={FadeIn.delay(1200).duration(900)}
        style={styles.powered}
      >
        <Text style={styles.poweredSmall}>
          POWERED BY
        </Text>

        <Text style={styles.poweredMain}>
          GODSPEED TECHNOLOGIES
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

/**
 * Kept for compatibility with the existing Expo project.
 */
export function AnimatedIcon() {
  return (
    <View style={styles.compatibilityIcon}>
      <Image
        source={require('@/assets/images/bus.png')}
        contentFit="contain"
        style={styles.compatibilityBus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#06152B',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    overflow: 'hidden',
  },

  glowLarge: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.2,
    height: SCREEN_WIDTH * 1.2,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: '#0B2F5B',
    opacity: 0.32,
    top: '20%',
  },

  glowSmall: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: '#1976D2',
    opacity: 0.08,
    top: '36%',
  },

  brand: {
    alignItems: 'center',
    position: 'absolute',
    top: '10%',
  },

  brandSmall: {
    color: '#8FBCE8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
  },

  brandMain: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 2,
  },

  brandLine: {
    width: 46,
    height: 2,
    backgroundColor: '#1976D2',
    marginVertical: 13,
    borderRadius: 2,
  },

  tagline: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  taglineFrench: {
    color: '#9DB2C9',
    fontSize: 13,
    marginTop: 4,
  },

  busArea: {
    width: SCREEN_WIDTH,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '35%',
  },

  bus: {
    width: SCREEN_WIDTH * 0.88,
    height: 180,
    zIndex: 3,
  },

  busGlow: {
  position: 'absolute',
  width: SCREEN_WIDTH * 0.84,
  height: 185,
  borderRadius: 45,
  backgroundColor: '#1976D2',
  opacity: 0.13,
},

  groundGlow: {
    position: 'absolute',
    bottom: 23,
    width: SCREEN_WIDTH * 0.72,
    height: 2,
    backgroundColor: '#4DA3FF',
    opacity: 0.25,
    shadowColor: '#1976D2',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 100,
    },
  },

  promise: {
    position: 'absolute',
    top: '72%',
    alignItems: 'center',
  },

  promiseDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#4DA3FF',
    marginBottom: 9,
  },

  promiseText: {
    color: '#DCEBFA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.7,
  },

  promiseFrench: {
    color: '#7189A4',
    fontSize: 10,
    marginTop: 5,
    letterSpacing: 0.7,
  },

  loadingSection: {
    position: 'absolute',
    bottom: '13%',
    width: SCREEN_WIDTH * 0.72,
    alignItems: 'center',
  },

  loadingTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#18324F',
    borderRadius: 4,
    overflow: 'hidden',
  },

  loadingProgress: {
    height: '100%',
    backgroundColor: '#4DA3FF',
    borderRadius: 4,
  },

  loadingText: {
    color: '#66809D',
    fontSize: 10,
    marginTop: 9,
  },

  powered: {
    position: 'absolute',
    bottom: '5%',
    alignItems: 'center',
  },

  poweredSmall: {
    color: '#526B85',
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: '600',
  },

  poweredMain: {
    color: '#8299B0',
    fontSize: 9,
    letterSpacing: 1.1,
    marginTop: 3,
    fontWeight: '700',
  },

  compatibilityIcon: {
    width: 128,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
  },

  compatibilityBus: {
    width: 120,
    height: 80,
  },
});