import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#1976D2" />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return null;
  }

  const email = profile?.email || user.email || '';

  const handleSave = async () => {
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      Alert.alert('Missing name', 'Please enter your full name.');
      return;
    }

    if (!cleanPhone) {
      Alert.alert('Missing phone number', 'Please enter your phone number.');
      return;
    }

    try {
      setSaving(true);

      await updateDoc(doc(db, 'users', user.uid), {
        fullName: cleanName,
        phone: cleanPhone,
        updatedAt: serverTimestamp(),
      });

      Alert.alert(
        'Profile updated',
        'Your profile information has been saved.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('🔥 PROFILE UPDATE ERROR:', error);

      Alert.alert(
        'Update failed',
        'We could not save your profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>Your information</Text>
          <Text style={styles.subtitle}>
            Keep your GodSpeed passenger information up to date.
          </Text>
        </View>

        {/* Full Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>FULL NAME</Text>

          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="#9AA6B5"
            style={styles.input}
            autoCapitalize="words"
            editable={!saving}
          />
        </View>

        {/* Phone */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>PHONE NUMBER</Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+237 6XX XXX XXX"
            placeholderTextColor="#9AA6B5"
            style={styles.input}
            keyboardType="phone-pad"
            editable={!saving}
          />
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>

          <View style={styles.disabledInput}>
            <Text style={styles.disabledText}>
              {email || 'Not added'}
            </Text>
          </View>

          <Text style={styles.helperText}>
            Email changes require account verification and will be handled
            separately for security.
          </Text>
        </View>

        {/* Save */}
        <Pressable
          style={[
            styles.saveButton,
            saving && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              SAVE CHANGES
            </Text>
          )}
        </Pressable>

        <Text style={styles.footer}>
          GODSPEED MOBILITY
        </Text>
      </ScrollView>
    </SafeAreaView>
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

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  intro: {
    marginTop: 24,
    marginBottom: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  subtitle: {
    fontSize: 11,
    color: '#7B899A',
    marginTop: 5,
    lineHeight: 17,
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 10,
    fontWeight: '900',
    color: '#66758A',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 3,
  },

  input: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E2E7ED',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#182B43',
    fontWeight: '700',
  },

  disabledInput: {
    height: 56,
    backgroundColor: '#EEF1F4',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E2E7ED',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  disabledText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '700',
  },

  helperText: {
    fontSize: 9,
    color: '#8995A5',
    marginTop: 6,
    marginLeft: 3,
    lineHeight: 14,
  },

  saveButton: {
    height: 56,
    borderRadius: 17,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  footer: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 9,
    color: '#A4AEBA',
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});