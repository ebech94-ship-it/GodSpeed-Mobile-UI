
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';

export default function WalletSendScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const numericAmount = Number(amount.replace(/[^0-9]/g, ''));

  const handleSend = async () => {
    if (!user) {
      Alert.alert('Login required', 'Please log in again.');
      return;
    }

    if (phone.trim().length < 8) {
      Alert.alert('Invalid recipient', 'Enter the recipient phone number.');
      return;
    }

    if (numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Enter a valid amount.');
      return;
    }

    try {
      setLoading(true);

      const reference = `GST-SEND-${Date.now()}`;

      await addDoc(collection(db, 'walletTransactions'), {
        userId: user.uid,
        type: 'send',
        amount: numericAmount,
        currency: 'XAF',
        recipientPhone: phone.trim(),
        note: note.trim(),
        status: 'pending',
        reference,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        'Transfer request created',
        `Reference: ${reference}\n\nThe transfer will be completed only after the secure wallet system verifies your balance and the recipient.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/payments'),
          },
        ]
      );
    } catch (error) {
      console.error('Send error:', error);
      Alert.alert('Transfer failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>

      <Text style={styles.title}>Send Money</Text>
      <Text style={styles.subtitle}>
        Send money to another GodSpeed user.
      </Text>

      <Text style={styles.label}>Recipient phone number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="6XXXXXXXX"
        placeholderTextColor="#9AA4B2"
        style={styles.input}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Amount in XAF"
        placeholderTextColor="#9AA4B2"
        style={styles.input}
      />

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="What is this for?"
        placeholderTextColor="#9AA4B2"
        style={[styles.input, styles.note]}
        multiline
      />

      <Text style={styles.info}>
        GodSpeed will verify your available wallet balance before completing
        the transfer.
      </Text>

      <Pressable
        style={styles.button}
        onPress={handleSend}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Send Money'}
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
    fontWeight: '700',
    fontSize: 16,
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
    color: '#0B1F3A',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
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
  note: {
    height: 90,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  info: {
    color: '#667085',
    lineHeight: 20,
    marginTop: 20,
  },
  button: {
    height: 56,
    backgroundColor: '#1976D2',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

