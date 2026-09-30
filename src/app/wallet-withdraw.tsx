
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

type Method = 'mtn' | 'orange';

export default function WalletWithdrawScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [method, setMethod] = useState<Method>('mtn');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const numericAmount = Number(amount.replace(/[^0-9]/g, ''));

  const handleWithdraw = async () => {
    if (!user) {
      Alert.alert('Login required', 'Please log in again.');
      return;
    }

    if (numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Enter a valid withdrawal amount.');
      return;
    }

    if (phone.trim().length < 8) {
      Alert.alert('Invalid phone', 'Enter a valid Mobile Money number.');
      return;
    }

    try {
      setLoading(true);

      const reference = `GST-WDR-${Date.now()}`;

      await addDoc(collection(db, 'walletTransactions'), {
        userId: user.uid,
        type: 'withdrawal',
        amount: numericAmount,
        currency: 'XAF',
        method,
        phone: phone.trim(),
        status: 'pending',
        reference,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        'Withdrawal requested',
        `Your withdrawal request has been submitted.\n\nReference: ${reference}\n\nIt will be processed after GodSpeed verifies your wallet balance.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/payments'),
          },
        ]
      );
    } catch (error) {
      console.error('Withdrawal error:', error);
      Alert.alert(
        'Withdrawal failed',
        'We could not create your withdrawal request.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>

      <Text style={styles.title}>Withdraw</Text>
      <Text style={styles.subtitle}>
        Withdraw money from your GodSpeed Wallet.
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

      <Text style={styles.label}>Receive through</Text>

      <View style={styles.methods}>
        <Pressable
          style={[styles.method, method === 'mtn' && styles.active]}
          onPress={() => setMethod('mtn')}
        >
          <Text style={styles.methodTitle}>MTN Mobile Money</Text>
          <Text style={styles.available}>Available</Text>
        </Pressable>

        <Pressable
          style={[styles.method, method === 'orange' && styles.active]}
          onPress={() => setMethod('orange')}
        >
          <Text style={styles.methodTitle}>Orange Money</Text>
          <Text style={styles.available}>Available</Text>
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

      <View style={styles.warning}>
        <Text style={styles.warningTitle}>Important</Text>
        <Text style={styles.warningText}>
          Your wallet balance will only be deducted after the withdrawal is
          approved and processed by the secure payment system.
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleWithdraw}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Request Withdrawal'}
        </Text>
      </Pressable>
    </ScrollView>
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
    marginTop: 6,
    marginBottom: 20,
  },
  label: {
    fontWeight: '700',
    color: '#0B1F3A',
    marginTop: 16,
    marginBottom: 8,
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
    fontWeight: '800',
    color: '#667085',
  },
  methods: {
    gap: 12,
  },
  method: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E0E7',
  },
  active: {
    borderColor: '#1976D2',
    borderWidth: 2,
  },
  methodTitle: {
    fontWeight: '800',
    color: '#0B1F3A',
  },
  available: {
    color: '#2E7D32',
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
    color: '#0B1F3A',
  },
  warning: {
    backgroundColor: '#FFF4E5',
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
  },
  warningTitle: {
    fontWeight: '800',
    color: '#8A5200',
    marginBottom: 5,
  },
  warningText: {
    color: '#6B5A3E',
    lineHeight: 20,
  },
  button: {
    height: 56,
    backgroundColor: '#1976D2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});

