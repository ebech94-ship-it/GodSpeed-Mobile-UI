import { useAuth } from '@/auth/AuthContext';
import { db } from '@/firebase/config';
import { useRouter } from 'expo-router';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const DEFAULT_SUPPORT = {
  phone: '+237673864413',
  email: 'ebech@republic.beauty',
  whatsapp: '+237673864413',
};

type RequestCategory =
  | 'Refund request'
  | 'Booking problem'
  | 'Parcel problem'
  | 'Lost item'
  | 'Change/correction request'
  | 'General help';

type SupportRequest = {
  id: string;
  category: string;
  description: string;
  status: string;
  createdAt?: any;
};

const FAQS = [
  {
    question: 'How do I book a trip?',
    answer:
      'Choose your departure and destination on the Home screen, select a trip, choose your seat and continue through the booking process.',
  },
  {
    question: 'How do I request a refund?',
    answer:
      'Open Support & Requests, choose Refund request, provide your booking details and submit the request. Our team will review it.',
  },
  {
    question: 'What if my payment succeeds but I do not receive a ticket?',
    answer:
      'Do not make another payment immediately. Submit a Payment or Booking problem through Support & Requests with your transaction details.',
  },
  {
    question: 'How do I send a parcel?',
    answer:
      'Open Parcel from the Home screen, select your trip and enter the parcel information before completing the parcel process.',
  },
  {
    question: 'How do I report a lost item?',
    answer:
      'Choose Lost item under Support & Requests and provide as much information as possible about the item and your journey.',
  },
  {
    question: 'Can I change my booking?',
    answer:
      'Submit a Change/correction request with your booking reference and explain the change you need.',
  },
];

export default function SupportScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();

  const [support, setSupport] = useState(DEFAULT_SUPPORT);
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  const [showRequestForm, setShowRequestForm] = useState(false);

const [requestStep, setRequestStep] = useState<
  'category' | 'details' | 'preview'
>('category');

const [selectedCategory, setSelectedCategory] =
  useState<RequestCategory | null>(null);

  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [preferredContact, setPreferredContact] =
    useState<'WhatsApp' | 'Email' | 'Phone'>('WhatsApp');

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // GODSPEED SUPPORT CONTACT
  useEffect(() => {
    const supportRef = doc(db, 'appSettings', 'support');

    const unsubscribe = onSnapshot(
      supportRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          setSupport({
            phone: data.phone || DEFAULT_SUPPORT.phone,
            email: data.email || DEFAULT_SUPPORT.email,
            whatsapp: data.whatsapp || DEFAULT_SUPPORT.whatsapp,
          });
        }
      },
      (error) => {
        console.log('Support settings error:', error);
      },
    );

    return unsubscribe;
  }, []);

  // PASSENGER'S REQUESTS
  useEffect(() => {
    if (!user) return;

    const requestsRef = collection(db, 'supportRequests');

    const unsubscribe = onSnapshot(
      requestsRef,
      (snapshot) => {
        const userRequests: SupportRequest[] = [];

        snapshot.forEach((item) => {
          const data = item.data();

          if (data.userId === user.uid) {
            userRequests.push({
              id: item.id,
              category: data.category || 'General help',
              description: data.description || '',
              status: data.status || 'pending',
              createdAt: data.createdAt,
            });
          }
        });

        userRequests.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        setRequests(userRequests);
      },
      (error) => {
        console.log('Support requests error:', error);
      },
    );

    return unsubscribe;
  }, [user]);

  const submitRequest = async () => {
    if (!user) {
      Alert.alert(
        'Sign in required',
        'Please sign in before submitting a support request.',
      );
      return;
    }

    if (!selectedCategory) {
      Alert.alert(
        'Choose a request type',
        'Please select what you need help with.',
      );
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        'Describe the problem',
        'Please tell us what happened or what you need help with.',
      );
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, 'supportRequests'), {
        userId: user.uid,

        // Passenger identity
        passengerName:
          profile?.fullName || user.displayName || 'Passenger',
        passengerPhone:
          profile?.phone || user.phoneNumber || '',
        passengerEmail:
          profile?.email || user.email || '',

        // Request
        category: selectedCategory,
        description: description.trim(),
        reference: reference.trim(),

        // Preferred response
        preferredContact,

        // Status
        status: 'pending',

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setDescription('');
      setReference('');
      setSelectedCategory(null);
      setPreferredContact('WhatsApp');
      setRequestStep('category');
      setShowRequestForm(false);

      Alert.alert(
        'Request submitted',
        'Your request has been received. Our team will review it and respond through your selected contact method.',
      );
    } catch (error) {
      console.error('Support request error:', error);

      Alert.alert(
        'Could not submit',
        'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openPhone = () => {
    Linking.openURL(`tel:${support.phone}`);
  };

  const openEmail = () => {
    const subject = encodeURIComponent(
      'GodSpeed Mobility Support',
    );

    const body = encodeURIComponent(
      `Hello GodSpeed Support,

Passenger: ${profile?.fullName || user?.displayName || ''}
Phone: ${profile?.phone || user?.phoneNumber || ''}
Email: ${profile?.email || user?.email || ''}

Please assist me with my request.`,
    );

    Linking.openURL(
      `mailto:${support.email}?subject=${subject}&body=${body}`,
    );
  };

 const openWhatsApp = () => {
  const number = support.whatsapp.replace(/\D/g, '');

  const message = encodeURIComponent(
    `Hello GodSpeed Support,

Passenger: ${profile?.fullName || user?.displayName || ''}
Phone: ${profile?.phone || user?.phoneNumber || ''}
Email: ${profile?.email || user?.email || ''}

I need assistance with GodSpeed Mobility.`
  );

  Linking.openURL(
    `whatsapp://send?phone=${number}&text=${message}`
  ).catch(() => {
    Linking.openURL(
      `https://wa.me/${number}?text=${message}`
    );
  });
};

  const categories: RequestCategory[] = [
    'Refund request',
    'Booking problem',
    'Parcel problem',
    'Lost item',
    'Change/correction request',
    'General help',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.headerTitle}>
              Support & Requests
            </Text>

            <View style={styles.headerSpacer} />
          </View>

          {/* HERO */}

          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>🛟</Text>
            </View>

            <Text style={styles.heroTitle}>
              How can we help?
            </Text>

            <Text style={styles.heroText}>
              Get help with bookings, payments, parcels,
              travel and other GodSpeed Mobility services.
            </Text>
          </View>

          {/* MY REQUESTS */}

          <Text style={styles.sectionTitle}>
            My Requests
          </Text>

          {requests.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>🎫</Text>

              <Text style={styles.emptyTitle}>
                No requests yet
              </Text>

              <Text style={styles.emptyText}>
                Your submitted support requests will appear
                here.
              </Text>
            </View>
          ) : (
            <View style={styles.requestCard}>
              {requests.map((request, index) => (
                <View key={request.id}>
                  <View style={styles.requestRow}>
                    <View style={styles.requestIcon}>
                      <Text>🎫</Text>
                    </View>

                    <View style={styles.requestInfo}>
                      <Text style={styles.requestTitle}>
                        {request.category}
                      </Text>

                      <Text
                        style={styles.requestDescription}
                        numberOfLines={2}
                      >
                        {request.description}
                      </Text>

                      <Text style={styles.requestId}>
                        #{request.id.slice(-8)}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        request.status === 'resolved'
                          ? styles.statusResolved
                          : styles.statusPending,
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {request.status === 'resolved'
                          ? 'Resolved'
                          : 'Pending'}
                      </Text>
                    </View>
                  </View>

                  {index < requests.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          )}

          {/* CREATE REQUEST */}

          <Pressable
            style={styles.createButton}
           onPress={() => {
  setRequestStep('category');
  setSelectedCategory(null);
  setDescription('');
  setReference('');
  setPreferredContact('WhatsApp');
  setShowRequestForm(true);
}}
          >
            <Text style={styles.createButtonText}>
              + Create a Support Request
            </Text>
          </Pressable>

        {/* REQUEST FORM */}

{showRequestForm && (
  <View style={styles.formCard}>
    <View style={styles.formHeader}>
      <View>
        <Text style={styles.formTitle}>
          Create Request
        </Text>

        <Text style={styles.stepText}>
          {requestStep === 'category'
            ? 'Step 1 of 3 · Choose issue'
            : requestStep === 'details'
              ? 'Step 2 of 3 · Give details'
              : 'Step 3 of 3 · Review request'}
        </Text>
      </View>

      <Pressable
        onPress={() => setShowRequestForm(false)}
      >
        <Text style={styles.formClose}>×</Text>
      </Pressable>
    </View>

    {/* STEP 1 — CATEGORY */}

    {requestStep === 'category' && (
      <>
        <Text style={styles.inputLabel}>
          What do you need help with?
        </Text>

        <View style={styles.categoryGrid}>
          {categories.map((category) => {
            const icon =
              category === 'Refund request'
                ? '💰'
                : category === 'Booking problem'
                  ? '🚌'
                  : category === 'Parcel problem'
                    ? '📦'
                    : category === 'Lost item'
                      ? '🎒'
                      : category ===
                          'Change/correction request'
                        ? '🔄'
                        : '❓';

            return (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setRequestStep('details');
                }}
              >
                <Text style={styles.categoryEmoji}>
                  {icon}
                </Text>

                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>

                <Text style={styles.categoryArrow}>
                  ›
                </Text>
              </Pressable>
            );
          })}
        </View>
      </>
    )}

    {/* STEP 2 — DETAILS */}

    {requestStep === 'details' && selectedCategory && (
      <>
        <View style={styles.selectedIssue}>
          <Text style={styles.selectedIssueLabel}>
            YOUR REQUEST
          </Text>

          <Text style={styles.selectedIssueText}>
            ✓ {selectedCategory}
          </Text>
        </View>

        <Text style={styles.inputLabel}>
          Booking / Parcel reference
        </Text>

        <TextInput
          value={reference}
          onChangeText={setReference}
          placeholder="Optional reference"
          placeholderTextColor="#9AA6B5"
          style={styles.input}
          autoCapitalize="characters"
        />

        <Text style={styles.inputLabel}>
          Tell us what happened
        </Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your problem or request..."
          placeholderTextColor="#9AA6B5"
          multiline
          textAlignVertical="top"
          style={[
            styles.input,
            styles.descriptionInput,
          ]}
        />

        <Text style={styles.inputLabel}>
          Preferred response
        </Text>

        <View style={styles.contactChoices}>
          {(['WhatsApp', 'Phone', 'Email'] as const).map(
            (method) => (
              <Pressable
                key={method}
                style={[
                  styles.contactChoice,
                  preferredContact === method &&
                    styles.contactChoiceSelected,
                ]}
                onPress={() =>
                  setPreferredContact(method)
                }
              >
                <Text
                  style={[
                    styles.contactChoiceText,
                    preferredContact === method &&
                      styles.contactChoiceTextSelected,
                  ]}
                >
                  {method}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <View style={styles.passengerInfo}>
          <Text style={styles.passengerInfoTitle}>
            Your details
          </Text>

          <Text style={styles.passengerInfoText}>
            {profile?.fullName ||
              user?.displayName ||
              'Passenger'}
          </Text>

          <Text style={styles.passengerInfoText}>
            {profile?.phone ||
              user?.phoneNumber ||
              'Phone not available'}
          </Text>

          <Text style={styles.passengerInfoText}>
            {profile?.email ||
              user?.email ||
              'Email not available'}
          </Text>

          <Text style={styles.autoText}>
            These details will be attached automatically.
          </Text>
        </View>

        <Pressable
          style={styles.submitButton}
          onPress={() => {
            if (!description.trim()) {
              Alert.alert(
                'Describe the problem',
                'Please tell us what happened or what you need help with.',
              );
              return;
            }

            setRequestStep('preview');
          }}
        >
          <Text style={styles.submitButtonText}>
            Preview Request
          </Text>
        </Pressable>

        <Pressable
          style={styles.backStepButton}
          onPress={() => setRequestStep('category')}
        >
          <Text style={styles.backStepText}>
            ← Change problem
          </Text>
        </Pressable>
      </>
    )}

    {/* STEP 3 — PREVIEW */}

    {requestStep === 'preview' && selectedCategory && (
      <>
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>
            REQUEST TYPE
          </Text>

          <Text style={styles.previewValue}>
            {selectedCategory}
          </Text>

          <View style={styles.previewDivider} />

          <Text style={styles.previewLabel}>
            REFERENCE
          </Text>

          <Text style={styles.previewValue}>
            {reference.trim() || 'Not provided'}
          </Text>

          <View style={styles.previewDivider} />

          <Text style={styles.previewLabel}>
            DESCRIPTION
          </Text>

          <Text style={styles.previewValue}>
            {description.trim()}
          </Text>

          <View style={styles.previewDivider} />

          <Text style={styles.previewLabel}>
            RESPONSE METHOD
          </Text>

          <Text style={styles.previewValue}>
            {preferredContact}
          </Text>
        </View>

        <Text style={styles.previewNotice}>
          Please review your request before sending.
        </Text>

        <Pressable
          style={[
            styles.submitButton,
            submitting && styles.submitDisabled,
          ]}
          disabled={submitting}
          onPress={() => {
            Alert.alert(
              'Confirm Request',
              'Are you sure you want to submit this support request?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK, Send',
                  onPress: submitRequest,
                },
              ],
            );
          }}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>
              OK, Confirm & Send
            </Text>
          )}
        </Pressable>

        <Pressable
          style={styles.backStepButton}
          onPress={() => setRequestStep('details')}
        >
          <Text style={styles.backStepText}>
            ← Edit Request
          </Text>
        </Pressable>
      </>
    )}
  </View>
)}

          {/* FAQ */}

          <Text style={styles.sectionTitle}>
            Frequently Asked Questions
          </Text>

          <View style={styles.faqCard}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <View key={faq.question}>
                  <Pressable
                    style={styles.faqRow}
                    onPress={() =>
                      setOpenFaq(
                        isOpen ? null : index,
                      )
                    }
                  >
                    <View style={styles.faqInfo}>
                      <Text style={styles.faqQuestion}>
                        {faq.question}
                      </Text>

                      {isOpen && (
                        <Text style={styles.faqAnswer}>
                          {faq.answer}
                        </Text>
                      )}
                    </View>

                    <Text style={styles.faqArrow}>
                      {isOpen ? '⌃' : '⌄'}
                    </Text>
                  </Pressable>

                  {index < FAQS.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              );
            })}
          </View>

          {/* CONTACT GODSPEED */}

          <Text style={styles.sectionTitle}>
            Contact GodSpeed
          </Text>

          <View style={styles.contactCard}>
            <SupportAction
              icon="📞"
              title="Call GodSpeed"
              subtitle={support.phone}
              onPress={openPhone}
            />

            <View style={styles.divider} />

            <SupportAction
              icon="💬"
              title="WhatsApp"
              subtitle="Chat with GodSpeed Support"
              onPress={openWhatsApp}
            />

            <View style={styles.divider} />

            <SupportAction
              icon="✉️"
              title="Email"
              subtitle={support.email}
              onPress={openEmail}
            />
          </View>

          <Text style={styles.footer}>
            GODSPEED MOBILITY · WE'RE HERE FOR YOU
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SupportAction({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.supportRow}
      onPress={onPress}
    >
      <View style={styles.supportIcon}>
        <Text style={styles.supportIconText}>
          {icon}
        </Text>
      </View>

      <View style={styles.supportInfo}>
        <Text style={styles.supportTitle}>
          {title}
        </Text>

        <Text style={styles.supportSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
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

  hero: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 18,
  },

  heroIcon: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: '#E9EEF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  heroEmoji: {
    fontSize: 35,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  heroText: {
    maxWidth: 310,
    marginTop: 7,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 17,
    color: '#8491A1',
  },

  sectionTitle: {
    marginTop: 17,
    marginBottom: 9,
    marginLeft: 3,
    fontSize: 11,
    fontWeight: '900',
    color: '#68778A',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 25,
    alignItems: 'center',
  },

  emptyEmoji: {
    fontSize: 28,
  },

  emptyTitle: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '900',
    color: '#182B43',
  },

  emptyText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    color: '#8995A4',
  },

  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  requestRow: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
  },

  requestIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  requestInfo: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  requestTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  requestDescription: {
    marginTop: 4,
    fontSize: 9,
    color: '#8995A4',
  },

  requestId: {
    marginTop: 4,
    fontSize: 8,
    color: '#1976D2',
    fontWeight: '800',
  },

  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  statusPending: {
    backgroundColor: '#FFF4D8',
  },

  statusResolved: {
    backgroundColor: '#E3F6E8',
  },

  statusText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#536170',
  },

  createButton: {
    marginTop: 12,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  formCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 15,
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  formTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  formClose: {
    fontSize: 27,
    color: '#68778A',
  },

  inputLabel: {
    marginTop: 12,
    marginBottom: 7,
    fontSize: 10,
    fontWeight: '900',
    color: '#526174',
  },

  categoryGrid: {
    gap: 8,
  },

  categoryButton: {
    minHeight: 48,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E7ED',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryButtonSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#EAF3FF',
  },

  categoryEmoji: {
    fontSize: 18,
    marginRight: 10,
  },

  categoryText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '800',
    color: '#526174',
  },

  categoryTextSelected: {
    color: '#1976D2',
  },

  input: {
    minHeight: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E1E6EC',
    backgroundColor: '#FAFBFC',
    paddingHorizontal: 13,
    fontSize: 13,
    color: '#182B43',
  },

  descriptionInput: {
    minHeight: 120,
    paddingTop: 13,
  },

  contactChoices: {
    flexDirection: 'row',
    gap: 8,
  },

  contactChoice: {
    flex: 1,
    minHeight: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E6EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactChoiceSelected: {
    backgroundColor: '#EAF3FF',
    borderColor: '#1976D2',
  },

  contactChoiceText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#68778A',
  },

  contactChoiceTextSelected: {
    color: '#1976D2',
  },

  passengerInfo: {
    marginTop: 15,
    padding: 12,
    borderRadius: 13,
    backgroundColor: '#F5F7FA',
  },

  passengerInfoTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#182B43',
    marginBottom: 6,
  },

  passengerInfoText: {
    fontSize: 9,
    color: '#68778A',
    marginTop: 2,
  },

  autoText: {
    marginTop: 7,
    fontSize: 8,
    color: '#1976D2',
  },

  submitButton: {
    marginTop: 15,
    minHeight: 52,
    borderRadius: 15,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  faqRow: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  faqInfo: {
    flex: 1,
  },

  faqQuestion: {
    fontSize: 11,
    fontWeight: '900',
    color: '#182B43',
  },

  faqAnswer: {
    marginTop: 7,
    fontSize: 10,
    lineHeight: 16,
    color: '#8995A4',
  },

  faqArrow: {
    fontSize: 18,
    color: '#8A96A5',
    marginLeft: 10,
  },

  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    paddingHorizontal: 15,
  },

  supportRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },

  supportIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  supportIconText: {
    fontSize: 17,
  },

  supportInfo: {
    flex: 1,
    marginLeft: 12,
  },

  supportTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  supportSubtitle: {
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

  footer: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 8,
    color: '#A4AEBA',
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  stepText: {
  marginTop: 4,
  fontSize: 9,
  color: '#1976D2',
  fontWeight: '800',
},

categoryArrow: {
  fontSize: 20,
  color: '#9AA6B5',
},

selectedIssue: {
  padding: 12,
  borderRadius: 13,
  backgroundColor: '#EAF3FF',
  borderWidth: 1,
  borderColor: '#1976D2',
  marginBottom: 4,
},

selectedIssueLabel: {
  fontSize: 8,
  fontWeight: '900',
  color: '#1976D2',
  letterSpacing: 0.7,
},

selectedIssueText: {
  marginTop: 4,
  fontSize: 12,
  fontWeight: '900',
  color: '#0B1F3A',
},

backStepButton: {
  marginTop: 10,
  minHeight: 44,
  alignItems: 'center',
  justifyContent: 'center',
},

backStepText: {
  fontSize: 10,
  fontWeight: '900',
  color: '#1976D2',
},

previewCard: {
  borderRadius: 15,
  backgroundColor: '#F5F7FA',
  padding: 14,
  borderWidth: 1,
  borderColor: '#E2E7ED',
},

previewLabel: {
  fontSize: 8,
  fontWeight: '900',
  color: '#8995A4',
  letterSpacing: 0.7,
},

previewValue: {
  marginTop: 4,
  fontSize: 11,
  lineHeight: 17,
  fontWeight: '800',
  color: '#182B43',
},

previewDivider: {
  height: 1,
  backgroundColor: '#E1E6EC',
  marginVertical: 11,
},

previewNotice: {
  marginTop: 10,
  textAlign: 'center',
  fontSize: 9,
  color: '#68778A',
},
});