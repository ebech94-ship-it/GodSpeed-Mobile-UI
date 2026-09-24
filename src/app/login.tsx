
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from '@/firebase/config';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.'
      );
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace('/');
    } catch (error: any) {
      let message = 'Unable to log in. Please try again.';

      if (
        error?.code === 'auth/invalid-credential' ||
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/user-not-found'
      ) {
        message = 'The email or password is incorrect.';
      } else if (error?.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }

      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>‹</Text>
            </Pressable>

            <View style={styles.brand}>
              <Text style={styles.brandSmall}>GODSPEED</Text>
              <Text style={styles.brandMain}>MOBILITY</Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.titleFrench}>
              Bon retour
            </Text>

            <Text style={styles.subtitle}>
              Log in to continue your journey with GodSpeed.
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>

            <View style={styles.field}>
              <Text style={styles.label}>EMAIL</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#8797A8"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>PASSWORD</Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                placeholderTextColor="#8797A8"
                style={styles.input}
                secureTextEntry
              />
            </View>

            <Pressable
              style={styles.forgotButton}
              onPress={() =>
                Alert.alert(
                  'Password reset',
                  'Password reset will be connected next.'
                )
              }
            >
              <Text style={styles.forgotText}>
                Forgot password?
              </Text>
            </Pressable>

          </View>

          {/* LOGIN BUTTON */}
          <Pressable
            style={[
              styles.loginButton,
              loading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>
                  Log In
                </Text>

                <Text style={styles.loginButtonFrench}>
                  Se connecter
                </Text>
              </>
            )}
          </Pressable>

          {/* CREATE ACCOUNT */}
          <View style={styles.createRow}>
            <Text style={styles.createText}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() => router.replace('/create-account')}
            >
              <Text style={styles.createLink}>
                Create Account
              </Text>
            </Pressable>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Safe journeys. Better connections.
            </Text>

            <Text style={styles.footerBrand}>
              GODSPEED TECHNOLOGIES
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 22,
    paddingBottom: 30,
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
    borderRadius: 21,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#0B1F3A',
    fontSize: 30,
    lineHeight: 32,
    marginTop: -3,
  },

  brand: {
    alignItems: 'center',
  },

  brandSmall: {
    color: '#1976D2',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 3,
  },

  brandMain: {
    color: '#0B1F3A',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  headerSpacer: {
    width: 42,
  },

  titleSection: {
    marginTop: 35,
    marginBottom: 30,
  },

  title: {
    color: '#0B1F3A',
    fontSize: 30,
    fontWeight: '900',
  },

  titleFrench: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  subtitle: {
    color: '#718096',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },

  form: {
    gap: 18,
  },

  field: {
    width: '100%',
  },

  label: {
    color: '#526274',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 7,
  },

  input: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E7EE',
    paddingHorizontal: 15,
    color: '#172B4D',
    fontSize: 14,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -5,
  },

  forgotText: {
    color: '#1976D2',
    fontSize: 11,
    fontWeight: '700',
  },

  loginButton: {
    height: 58,
    borderRadius: 17,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },

  loginButtonDisabled: {
    opacity: 0.65,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  loginButtonFrench: {
    color: '#D9ECFF',
    fontSize: 9,
    marginTop: 2,
  },

  createRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  createText: {
    color: '#718096',
    fontSize: 11,
  },

  createLink: {
    color: '#1976D2',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 4,
  },

  footer: {
    alignItems: 'center',
    marginTop: 38,
  },

  footerText: {
    color: '#8A96A6',
    fontSize: 9,
  },

  footerBrand: {
    color: '#A4AFBC',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: 5,
  },
});

