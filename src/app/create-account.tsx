import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
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

import { auth, db } from '@/firebase/config';

export default function CreateAccountScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    Alert.alert('TEST', 'Create Account button is working!');
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !password
    ) {
      Alert.alert(
        'Missing information',
        'Please complete all required fields.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Password too short',
        'Your password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Passwords do not match',
        'Please make sure both passwords are the same.'
      );
      return;
    }

    try {
      setLoading(true);

      // 1. Create the Firebase Authentication account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      // 2. Create the GodSpeed Mobility user profile
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),

        // This account is created through the passenger app.
        role: 'passenger',

        // Useful for the future Mobility platform.
        accountStatus: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 3. Continue to verification
      router.replace('/verification');

    } catch (error: any) {
      let message =
        'Unable to create your account. Please try again.';

      if (error?.code === 'auth/email-already-in-use') {
        message =
          'An account already exists with this email.';
      } else if (error?.code === 'auth/invalid-email') {
        message =
          'Please enter a valid email address.';
      } else if (error?.code === 'auth/weak-password') {
        message =
          'Please choose a stronger password.';
      } else if (error?.code === 'auth/network-request-failed') {
        message =
          'Please check your internet connection and try again.';
      } else if (error?.code === 'permission-denied') {
        message =
          'Your account was created, but your profile could not be saved. Please contact support.';
      }

      Alert.alert(
        'Account creation failed',
        message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
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
              <Text style={styles.brandSmall}>
                GODSPEED
              </Text>

              <Text style={styles.brandMain}>
                MOBILITY
              </Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* TITLE */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>
              Create your account
            </Text>

            <Text style={styles.titleFrench}>
              Créez votre compte
            </Text>

            <Text style={styles.subtitle}>
              Tell us a little about yourself to get started.
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>

            <View style={styles.field}>
              <Text style={styles.label}>
                FULL NAME
              </Text>

              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your full legal name"
                placeholderTextColor="#8797A8"
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                TELEPHONE
              </Text>

              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Your phone number"
                placeholderTextColor="#8797A8"
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                EMAIL
              </Text>

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
              <Text style={styles.label}>
                PASSWORD
              </Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor="#8797A8"
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                CONFIRM PASSWORD
              </Text>

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repeat your password"
                placeholderTextColor="#8797A8"
                style={styles.input}
                secureTextEntry
              />
            </View>

          </View>

          {/* CREATE BUTTON */}
          <Pressable
            style={[
              styles.createButton,
              loading &&
                styles.createButtonDisabled,
            ]}
            onPress={handleCreateAccount}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.createButtonText}>
                  Create Account
                </Text>

                <Text style={styles.createButtonFrench}>
                  Créer un compte
                </Text>
              </>
            )}
          </Pressable>

          {/* LOGIN */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Pressable
              onPress={() =>
                router.replace('/login')
              }
            >
              <Text style={styles.loginLink}>
                {' '}Log In
              </Text>
            </Pressable>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your information is protected by GodSpeed.
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
    marginTop: 25,
    marginBottom: 25,
  },

  title: {
    color: '#0B1F3A',
    fontSize: 28,
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
    gap: 16,
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
    height: 54,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E7EE',
    paddingHorizontal: 15,
    color: '#172B4D',
    fontSize: 14,
  },

  createButton: {
    height: 58,
    borderRadius: 17,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  createButtonDisabled: {
    opacity: 0.65,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  createButtonFrench: {
    color: '#D9ECFF',
    fontSize: 9,
    marginTop: 2,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#718096',
    fontSize: 11,
  },

  loginLink: {
    color: '#1976D2',
    fontSize: 11,
    fontWeight: '800',
  },

  footer: {
    alignItems: 'center',
    marginTop: 30,
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