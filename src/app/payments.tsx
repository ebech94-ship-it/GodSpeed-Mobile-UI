import { useRouter } from 'expo-router';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type PaymentMethod = {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  enabled: boolean;
};

type PaymentTransaction = {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: 'successful' | 'pending' | 'failed';
};

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    subtitle: 'Pay with your MTN number',
    icon: 'M',
    enabled: true,
  },
  {
    id: 'orange',
    name: 'Orange Money',
    subtitle: 'Pay with your Orange number',
    icon: 'O',
    enabled: true,
  },
  {
    id: 'card',
    name: 'Bank Card',
    subtitle: 'Visa or Mastercard',
    icon: '▣',
    enabled: true,
  },
];

const RECENT_PAYMENTS: PaymentTransaction[] = [];

export default function PaymentsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
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

          <Text style={styles.headerTitle}>Payments</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Payment Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.walletIcon}>
              <Text style={styles.walletEmoji}>▣</Text>
            </View>

            <View style={styles.securePill}>
              <View style={styles.secureDot} />
              <Text style={styles.secureText}>SECURE</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>
            Your payments
          </Text>

          <Text style={styles.heroText}>
            Manage your payment methods and view your
            transaction history.
          </Text>
        </View>

        {/* Methods */}
        <Text style={styles.sectionTitle}>
          Payment methods
        </Text>

        <View style={styles.methodsCard}>
          {PAYMENT_METHODS.map((method, index) => (
            <View key={method.id}>
              <PaymentMethodRow method={method} />

              {index < PAYMENT_METHODS.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recent payments
          </Text>

          {RECENT_PAYMENTS.length > 0 && (
            <Pressable>
              <Text style={styles.viewAll}>VIEW ALL</Text>
            </Pressable>
          )}
        </View>

        {RECENT_PAYMENTS.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>₣</Text>
            </View>

            <Text style={styles.emptyTitle}>
              No payments yet
            </Text>

            <Text style={styles.emptyText}>
              Your ticket and other payment transactions
              will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.transactionsCard}>
            {RECENT_PAYMENTS.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </View>
        )}

        <Text style={styles.footer}>
          GODSPEED MOBILITY · SECURE PAYMENTS
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function PaymentMethodRow({
  method,
}: {
  method: PaymentMethod;
}) {
  return (
    <Pressable
      style={styles.methodRow}
      disabled={!method.enabled}
    >
      <View style={styles.methodIcon}>
        <Text style={styles.methodIconText}>
          {method.icon}
        </Text>
      </View>

      <View style={styles.methodInfo}>
        <Text style={styles.methodName}>
          {method.name}
        </Text>

        <Text style={styles.methodSubtitle}>
          {method.subtitle}
        </Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function TransactionRow({
  transaction,
}: {
  transaction: PaymentTransaction;
}) {
  return (
    <View style={styles.transactionRow}>
      <View style={styles.transactionIcon}>
        <Text style={styles.transactionIconText}>₣</Text>
      </View>

      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>
          {transaction.description}
        </Text>

        <Text style={styles.transactionDate}>
          {transaction.date}
        </Text>
      </View>

      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>
          {transaction.amount}
        </Text>

        <Text
          style={[
            styles.transactionStatus,
            transaction.status === 'successful' &&
              styles.successStatus,
          ]}
        >
          {transaction.status}
        </Text>
      </View>
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
    borderWidth: 1,
    borderColor: '#E8ECF1',
    alignItems: 'center',
    justifyContent: 'center',
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

  heroCard: {
    marginTop: 10,
    borderRadius: 23,
    backgroundColor: '#0B1F3A',
    padding: 20,
  },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletEmoji: {
    fontSize: 18,
    color: '#0B1F3A',
  },

  securePill: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#1B304C',
  },

  secureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },

  secureText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  heroTitle: {
    marginTop: 18,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },

  heroText: {
    marginTop: 6,
    maxWidth: 290,
    color: '#AEBACC',
    fontSize: 10,
    lineHeight: 16,
  },

  sectionTitle: {
    marginTop: 23,
    marginBottom: 9,
    marginLeft: 3,
    fontSize: 11,
    fontWeight: '900',
    color: '#68778A',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  methodsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  methodRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },

  methodIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  methodIconText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },

  methodName: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  methodSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: '#8995A4',
  },

  chevron: {
    fontSize: 23,
    color: '#9AA6B5',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1F4',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAll: {
    marginLeft: 'auto',
    marginTop: 16,
    marginBottom: 9,
    fontSize: 8,
    fontWeight: '900',
    color: '#68778A',
    letterSpacing: 0.7,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 25,
    paddingVertical: 28,
    alignItems: 'center',
  },

  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#EEF2F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },

  emptyEmoji: {
    fontSize: 21,
    color: '#0B1F3A',
    fontWeight: '900',
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#182B43',
  },

  emptyText: {
    maxWidth: 270,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 10,
    lineHeight: 15,
    color: '#8A96A5',
  },

  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  transactionRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  transactionIconText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  transactionInfo: {
    flex: 1,
    marginLeft: 11,
  },

  transactionDescription: {
    fontSize: 11,
    fontWeight: '800',
    color: '#182B43',
  },

  transactionDate: {
    marginTop: 4,
    fontSize: 9,
    color: '#8A96A5',
  },

  transactionRight: {
    alignItems: 'flex-end',
  },

  transactionAmount: {
    fontSize: 11,
    fontWeight: '900',
    color: '#182B43',
  },

  transactionStatus: {
    marginTop: 4,
    fontSize: 8,
    fontWeight: '800',
    color: '#8995A4',
    textTransform: 'uppercase',
  },

  successStatus: {
    color: '#516176',
  },

  footer: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 8,
    color: '#A4AEBA',
    fontWeight: '900',
    letterSpacing: 1.2,
  },
});