
import { useState } from 'react';
import {
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
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';

type PaymentMethod = 'mtn' | 'orange';

export default function WalletDepositScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [method, setMethod] = useState<PaymentMethod>('mtn');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const numericAmount = Number(amount.replace(/[^0-9]/g, ''));

  const canSubmit =
    !!user &&
    numericAmount > 0 &&
    phone.trim().length >= 8 &&
    !loading;

  const handleDeposit = async () => {
    if (!user) {
      Alert.alert('Login required', 'Please log in again.');
      return;
    }

    if (numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Enter the amount you want to deposit.');
      return;
    }

    if (phone.trim().length < 8) {
      Alert.alert('Invalid phone', 'Enter a valid MTN or Orange Money number.');
      return;
    }

    try {
      setLoading(true);

      const reference = `GST-DEP-${Date.now()}`;

      await addDoc(collection(db, 'walletTransactions'), {
        userId: user.uid,
        type: 'deposit',
        amount: numericAmount,
        currency: 'XAF',
        method,
        phone: phone.trim(),
        status: 'pending',
        reference,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        'Deposit initiated',
        `Your ${method === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'} deposit request has been created.\n\nReference: ${reference}\n\nYour wallet will only be credited after the payment is confirmed.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/payments'),
          },
        ]
      );
    } catch (error) {
      console.error('Deposit error:', error);
      Alert.alert(
        'Deposit failed',
        'We could not create the deposit request. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <Text style={styles.title}>Deposit</Text>
        <Text style={styles.subtitle}>
          Add money to your GodSpeed Wallet.
        </Text>

        <Text style={styles.label}>Amount</Text>

        <View style={styles.amountBox}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9AA4B2"
            style={styles.amountInput}
          />
          <Text style={styles.currency}>XAF</Text>
        </View>

        <Text style={styles.label}>Payment method</Text>

        <View style={styles.methods}>
          <Pressable
            style={[
              styles.method,
              method === 'mtn' && styles.methodActive,
            ]}
            onPress={() => setMethod('mtn')}
          >
            <Text style={styles.methodTitle}>MTN Mobile Money</Text>
            <Text style={styles.methodStatus}>Available</Text>
          </Pressable>

          <Pressable
            style={[
              styles.method,
              method === 'orange' && styles.methodActive,
            ]}
            onPress={() => setMethod('orange')}
          >
            <Text style={styles.methodTitle}>Orange Money</Text>
            <Text style={styles.methodStatus}>Available</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Mobile Money number</Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="6XXXXXXXX"
          placeholderTextColor="#9AA4B2"
          style={styles.input}
        />

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Secure payment</Text>
          <Text style={styles.infoText}>
            Your wallet balance is not changed by this screen. GodSpeed will
            credit your wallet only after the payment provider confirms the
            transaction.
          </Text>
        </View>

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          disabled={!canSubmit}
          onPress={handleDeposit}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Continue Deposit'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  back: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0B1F3A',
  },
  subtitle: {
    color: '#667085',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1F3A',
    marginBottom: 8,
    marginTop: 16,
  },
  amountBox: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E0E7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#0B1F3A',
  },
  currency: {
    fontSize: 15,
    fontWeight: '800',
    color: '#667085',
  },
  methods: {
    gap: 12,
  },
  method: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E0E7',
    padding: 16,
  },
  methodActive: {
    borderColor: '#1976D2',
    borderWidth: 2,
  },
  methodTitle: {
    color: '#0B1F3A',
    fontSize: 16,
    fontWeight: '800',
  },
  methodStatus: {
    color: '#2E7D32',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '700',
  },
  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9E0E7',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0B1F3A',
  },
  info: {
    backgroundColor: '#EAF3FF',
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
  },
  infoTitle: {
    color: '#0B1F3A',
    fontWeight: '800',
    marginBottom: 6,
  },
  infoText: {
    color: '#526173',
    lineHeight: 20,
  },
  button: {
    height: 56,
    backgroundColor: '#1976D2',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
