
import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';
import { collection, doc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type WalletData = {
  balance?: number;
  currency?: string;
  status?: string;
};

type WalletTransaction = {
  id: string;
  type?: string;
  amount?: number;
  status?: string;
  reference?: string;
  createdAt?: any;
};

export default function PaymentsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWallet(null);
      setTransactions([]);
      setLoading(false);
      return;
    }

    const walletRef = doc(db, 'wallets', user.uid);

    const unsubscribeWallet = onSnapshot(
      walletRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setWallet(snapshot.data() as WalletData);
        } else {
          setWallet({
            balance: 0,
            currency: 'XAF',
            status: 'active',
          });
        }

        setLoading(false);
      },
      (error) => {
        console.error('WALLET ERROR:', error);

        setWallet({
          balance: 0,
          currency: 'XAF',
          status: 'active',
        });

        setLoading(false);
      }
    );

    const transactionsRef = query(
      collection(db, 'walletTransactions'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribeTransactions = onSnapshot(
      transactionsRef,
      (snapshot) => {
        const items: WalletTransaction[] = [];

        snapshot.forEach((item) => {
          const data = item.data();

          // Only show transactions belonging to this passenger.
          if (data.userId === user.uid) {
            items.push({
              id: item.id,
              ...data,
            } as WalletTransaction);
          }
        });

        setTransactions(items);
      },
      (error) => {
        console.error('TRANSACTION ERROR:', error);
        setTransactions([]);
      }
    );

    return () => {
      unsubscribeWallet();
      unsubscribeTransactions();
    };
  }, [user]);

  if (!user) {
    return null;
  }

  const balance = Number(wallet?.balance || 0);
  const currency = wallet?.currency || 'XAF';

  const formattedBalance = balance.toLocaleString();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View>
            <Text style={styles.headerTitle}>GodSpeed Wallet</Text>
            <Text style={styles.headerFrench}>
              Portefeuille GodSpeed
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* BALANCE */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>
                AVAILABLE BALANCE
              </Text>

              <Text style={styles.balanceFrench}>
                Solde disponible
              </Text>
            </View>

            <View style={styles.walletIcon}>
              <Text style={styles.walletIconText}>₣</Text>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator
              color="#FFFFFF"
              size="small"
              style={styles.loader}
            />
          ) : (
            <Text style={styles.balanceAmount}>
              {formattedBalance} {currency}
            </Text>
          )}

          <Text style={styles.balanceNote}>
            Use your GodSpeed wallet to pay for trips and other
            supported services.
          </Text>
        </View>

        {/* MONEY ACTIONS */}
        <Text style={styles.sectionTitle}>Manage your money</Text>

        <View style={styles.actionsGrid}>
          <Pressable
            style={styles.actionCard}
            onPress={() => router.push('/wallet-deposit')}
          >
            <View style={styles.depositIcon}>
              <Text style={styles.actionIconText}>+</Text>
            </View>

            <Text style={styles.actionTitle}>Deposit</Text>

            <Text style={styles.actionSubtitle}>
              Add money
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => router.push('/wallet-withdraw')}
          >
            <View style={styles.withdrawIcon}>
              <Text style={styles.actionIconText}>↗</Text>
            </View>

            <Text style={styles.actionTitle}>Withdraw</Text>

            <Text style={styles.actionSubtitle}>
              Cash out
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => router.push('/wallet-send')}
          >
            <View style={styles.sendIcon}>
              <Text style={styles.actionIconText}>↑</Text>
            </View>

            <Text style={styles.actionTitle}>Send</Text>

            <Text style={styles.actionSubtitle}>
              Send money
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => router.push('/wallet-receive')}
          >
            <View style={styles.receiveIcon}>
              <Text style={styles.actionIconText}>↓</Text>
            </View>

            <Text style={styles.actionTitle}>Receive</Text>

            <Text style={styles.actionSubtitle}>
              Receive money
            </Text>
          </Pressable>
        </View>

        {/* PAYMENT METHODS */}
        <Text style={styles.sectionTitle}>Available methods</Text>

        <View style={styles.methodsCard}>
          <View style={styles.methodRow}>
            <View style={styles.mtnLogo}>
              <Text style={styles.mtnText}>MTN</Text>
            </View>

            <View style={styles.methodText}>
              <Text style={styles.methodTitle}>
                MTN Mobile Money
              </Text>

              <Text style={styles.methodSubtitle}>
                Available
              </Text>
            </View>

            <View style={styles.availableBadge}>
              <Text style={styles.availableText}>
                LIVE
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.methodRow}>
            <View style={styles.orangeLogo}>
              <Text style={styles.orangeText}>OR</Text>
            </View>

            <View style={styles.methodText}>
              <Text style={styles.methodTitle}>
                Orange Money
              </Text>

              <Text style={styles.methodSubtitle}>
                Available
              </Text>
            </View>

            <View style={styles.availableBadge}>
              <Text style={styles.availableText}>
                LIVE
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.methodRow}>
            <View style={styles.cardLogo}>
              <Text style={styles.cardText}>CARD</Text>
            </View>

            <View style={styles.methodText}>
              <Text style={styles.methodTitle}>
                Bank Card
              </Text>

              <Text style={styles.methodSubtitle}>
                Visa / Mastercard
              </Text>
            </View>

            <View style={styles.comingBadge}>
              <Text style={styles.comingText}>
                SOON
              </Text>
            </View>
          </View>
        </View>

        {/* TRANSACTIONS */}
        <View style={styles.transactionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Recent transactions
            </Text>
          </View>

          {transactions.length > 0 && (
            <Pressable
              onPress={() => router.push('/wallet-transactions')}
            >
              <Text style={styles.viewAll}>
                View all
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.transactionsCard}>
          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>₣</Text>

              <Text style={styles.emptyTitle}>
                No transactions yet
              </Text>

              <Text style={styles.emptyText}>
                Your wallet activity will appear here.
              </Text>
            </View>
          ) : (
            transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </View>

        <Text style={styles.footer}>
          GODSPEED MOBILITY • SECURE WALLET
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function TransactionRow({
  transaction,
}: {
  transaction: WalletTransaction;
}) {
  const amount = Number(transaction.amount || 0);
  const isIncoming =
    transaction.type === 'deposit' ||
    transaction.type === 'receive' ||
    transaction.type === 'refund';

  const title =
    transaction.type === 'deposit'
      ? 'Wallet deposit'
      : transaction.type === 'withdrawal'
      ? 'Withdrawal'
      : transaction.type === 'payment'
      ? 'Trip payment'
      : transaction.type === 'send'
      ? 'Money sent'
      : transaction.type === 'receive'
      ? 'Money received'
      : transaction.type === 'refund'
      ? 'Refund'
      : 'Wallet transaction';

  const sign = isIncoming ? '+' : '-';

  return (
    <View style={styles.transactionRow}>
      <View
        style={[
          styles.transactionIcon,
          isIncoming
            ? styles.incomingIcon
            : styles.outgoingIcon,
        ]}
      >
        <Text
          style={[
            styles.transactionIconText,
            isIncoming
              ? styles.incomingText
              : styles.outgoingText,
          ]}
        >
          {isIncoming ? '+' : '−'}
        </Text>
      </View>

      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>
          {title}
        </Text>

        <Text style={styles.transactionStatus}>
          {transaction.status || 'pending'}
        </Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          isIncoming
            ? styles.incomingText
            : styles.outgoingText,
        ]}
      >
        {sign}
        {amount.toLocaleString()} XAF
      </Text>
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
    height: 68,
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

  backText: {
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

  headerFrench: {
    fontSize: 10,
    color: '#8995A5',
    marginTop: 2,
    textAlign: 'center',
  },

  headerSpacer: {
    width: 42,
  },

  balanceCard: {
    backgroundColor: '#0B1F3A',
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
  },

  balanceTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  balanceLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#7DBBFF',
  },

  balanceFrench: {
    fontSize: 9,
    color: '#AABBCD',
    marginTop: 3,
  },

  walletIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#173A63',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  balanceAmount: {
    fontSize: 29,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 22,
  },

  loader: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },

  balanceNote: {
    fontSize: 10,
    lineHeight: 15,
    color: '#AABBCD',
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B1F3A',
    marginBottom: 10,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 23,
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  depositIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E8F7EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },

  withdrawIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF3E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },

  sendIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },

  receiveIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F0EAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },

  actionIconText: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  actionSubtitle: {
    fontSize: 10,
    color: '#8995A5',
    marginTop: 3,
  },

  methodsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingHorizontal: 15,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  methodRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },

  mtnLogo: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFD100',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mtnText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '900',
  },

  orangeLogo: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FF7900',
    alignItems: 'center',
    justifyContent: 'center',
  },

  orangeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  cardLogo: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardText: {
    color: '#1976D2',
    fontSize: 8,
    fontWeight: '900',
  },

  methodText: {
    flex: 1,
    marginLeft: 12,
  },

  methodTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  methodSubtitle: {
    fontSize: 10,
    color: '#8995A5',
    marginTop: 3,
  },

  availableBadge: {
    backgroundColor: '#E8F7EE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  availableText: {
    color: '#16803C',
    fontSize: 8,
    fontWeight: '900',
  },

  comingBadge: {
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  comingText: {
    color: '#7B8795',
    fontSize: 8,
    fontWeight: '900',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F4',
  },

  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  viewAll: {
    color: '#1976D2',
    fontSize: 11,
    fontWeight: '800',
  },

  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    overflow: 'hidden',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  emptyIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F0F3F7',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 46,
    fontSize: 20,
    fontWeight: '900',
    color: '#7D8A9B',
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  emptyText: {
    fontSize: 10,
    color: '#8995A5',
    marginTop: 4,
    textAlign: 'center',
  },

  transactionRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F4',
  },

  transactionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  incomingIcon: {
    backgroundColor: '#E8F7EE',
  },

  outgoingIcon: {
    backgroundColor: '#FDECEC',
  },

  transactionIconText: {
    fontSize: 18,
    fontWeight: '900',
  },

  incomingText: {
    color: '#16803C',
  },

  outgoingText: {
    color: '#B42318',
  },

  transactionInfo: {
    flex: 1,
    marginLeft: 11,
  },

  transactionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  transactionStatus: {
    fontSize: 9,
    color: '#8995A5',
    marginTop: 3,
    textTransform: 'capitalize',
  },

  transactionAmount: {
    fontSize: 11,
    fontWeight: '900',
  },

  footer: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 9,
    fontWeight: '900',
    color: '#A4AEBA',
    letterSpacing: 1,
  },
});

