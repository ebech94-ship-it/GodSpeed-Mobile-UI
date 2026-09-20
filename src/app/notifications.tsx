import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type NotificationItem = {
  id: string;
  type: 'trip' | 'payment' | 'ticket' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const NOTIFICATIONS: NotificationItem[] = [];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Notifications</Text>

          <View style={styles.headerSpacer} />
        </View>

        {NOTIFICATIONS.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>🔔</Text>
            </View>

            <Text style={styles.emptyTitle}>
              You're all caught up
            </Text>

            <Text style={styles.emptyText}>
              Trip updates, ticket confirmations and important
              account notifications will appear here.
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          >
            {NOTIFICATIONS.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

function NotificationCard({
  notification,
}: {
  notification: NotificationItem;
}) {
  const icon =
    notification.type === 'trip'
      ? '🚌'
      : notification.type === 'payment'
        ? '₣'
        : notification.type === 'ticket'
          ? '🎟'
          : '•';

  return (
    <Pressable
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadCard,
      ]}
    >
      <View style={styles.notificationIcon}>
        <Text style={styles.notificationEmoji}>{icon}</Text>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationTitleRow}>
          <Text style={styles.notificationTitle}>
            {notification.title}
          </Text>

          {!notification.read && (
            <View style={styles.unreadDot} />
          )}
        </View>

        <Text style={styles.notificationMessage}>
          {notification.message}
        </Text>

        <Text style={styles.notificationTime}>
          {notification.time}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
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

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 60,
  },

  emptyIcon: {
    width: 82,
    height: 82,
    borderRadius: 27,
    backgroundColor: '#E9EEF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  emptyEmoji: {
    fontSize: 34,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  emptyText: {
    maxWidth: 300,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 11,
    lineHeight: 17,
    color: '#8491A1',
  },

  list: {
    paddingTop: 16,
    paddingBottom: 30,
  },

  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },

  unreadCard: {
    borderColor: '#DCE3EB',
  },

  notificationIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationEmoji: {
    fontSize: 20,
    color: '#0B1F3A',
  },

  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },

  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#0B1F3A',
    marginLeft: 8,
  },

  notificationMessage: {
    marginTop: 5,
    fontSize: 10,
    lineHeight: 15,
    color: '#7F8C9C',
  },

  notificationTime: {
    marginTop: 7,
    fontSize: 8,
    color: '#A0A9B4',
    fontWeight: '700',
  },
});