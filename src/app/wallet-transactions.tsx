
import { useRouter } from 'expo-router';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';

type Transaction = {
  id: string;
  type?: string;
  amount?: number;
  currency?: string;
  status?: string;
  reference?: string;
  method?: string;
  createdAt?: any;
};

export default function WalletTransactionsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'walletTransactions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Transaction, 'id'>),
        }));

        setTransactions(data);
        setLoading(false);
      },
      (error) => {
        console.error('Transaction listener error:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const formatAmount = (amount?: number) => {
    return `${Number(amount || 0).toLocaleString()} XAF`;
  };

  const formatType = (type?: string) => {
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'send':
        return 'Money Sent';
      case 'receive':
        return 'Money Received';
      case 'payment':
        return 'Booking Payment';
      case 'refund':
        return 'Refund';
      default:
        return 'Transaction';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return 'Pending date';

    return timestamp.toDate().toLocaleString();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>

      <Text style={styles.title}>Transactions</Text>
      <Text style={styles.subtitle}>
        Your GodSpeed Wallet activity.
      </Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : transactions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptyText}>
            Your wallet transactions will appear here.
          </Text>
        </View>
      ) : (
        transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transaction}>
            <View style={styles.transactionTop}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>
                  {formatType(transaction.type)}
                </Text>

                <Text style={styles.reference}>
                  {transaction.reference || transaction.id}
                </Text>
              </View>

              <Text style={styles.amount}>
                {formatAmount(transaction.amount)}
              </Text>
            </View>

            <View style={styles.bottom}>
              <Text style={styles.date}>
                {formatDate(transaction.createdAt)}
              </Text>

              <Text
                style={[
                  styles.status,
                  transaction.status === 'successful'
                    ? styles.success
                    : transaction.status === 'failed'
                    ? styles.failed
                    : styles.pending,
                ]}
              >
                {transaction.status || 'pending'}
              </Text>
            </View>
          </View>
        ))
      )}
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
    marginBottom: 24,
  },
  center: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#0B1F3A',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#667085',
    marginTop: 8,
    textAlign: 'center',
  },
  transaction: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  transactionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    color: '#0B1F3A',
    fontSize: 16,
    fontWeight: '800',
  },
  reference: {
    color: '#98A2B3',
    fontSize: 12,
    marginTop: 5,
  },
  amount: {
    color: '#0B1F3A',
    fontWeight: '900',
  },
  bottom: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#98A2B3',
    fontSize: 12,
  },
  status: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  success: {
    color: '#2E7D32',
  },
  pending: {
    color: '#B26A00',
  },
  failed: {
    color: '#D32F2F',
  },
});

