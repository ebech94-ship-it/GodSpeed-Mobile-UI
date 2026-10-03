import { useAuth } from '@/auth/AuthContext';
import * as Contacts from 'expo-contacts';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';

import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const ROUTES = ['Kumba', 'Yaoundé'];

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [from, setFrom] = useState('Kumba');
  const [to, setTo] = useState('Yaoundé');
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState('2026-09-14');
  const [showDate, setShowDate] = useState(false);

const [callMode, setCallMode] = useState<'main' | 'family'>('main');
const [phoneNumber, setPhoneNumber] = useState('');
const [contacts, setContacts] = useState<any[]>([]);


  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/auth" />;
  }

  const swapLocations = () => {
    const oldFrom = from;
    setFrom(to);
    setTo(oldFrom);
  };


const openPhoneContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Contacts Permission',
      'Please allow contact access to choose a family member or loved one.'
    );
    return;
  }

  const result = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.PhoneNumbers],
  });

  setContacts(result.data);
};

  const handleSearch = () => {
    router.push({
      pathname: '/trips',
      params: {
        from,
        to,
        date: travelDate,
        passengers: String(passengers),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>GODSPEED</Text>
              <Text style={styles.brandSub}>MOBILITY</Text>
            </View>

            <Pressable
              style={styles.profileButton}
              onPress={() => router.push('/profile')}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </Pressable>
          </View>

          {/* HERO */}
          <View style={styles.heroCard}>
            <Image
              source={require('../../assets/images/bus.png')}
              style={styles.busImage}
              resizeMode="cover"
            />

            <View style={styles.heroOverlay} />

            <View style={styles.heroText}>
              <Text style={styles.heroSmall}>GODSPEED TECH</Text>
              <Text style={styles.heroTitle}>MOBILITY</Text>
              <Text style={styles.heroFrench}>
                Voyagez simplement. Voyagez mieux.
              </Text>
            </View>

            <View style={styles.heroBottom}>
              <Text style={styles.heroTagline}>
                Comfortable • Safe • On Time
              </Text>
              <Text style={styles.heroFrenchTagline}>
                Confortable • Sûr • À l'heure
              </Text>
            </View>
          </View>

          {/* SEARCH */}
          <View style={styles.searchSection}>
            <Text style={styles.sectionHeading}>Where are you going?</Text>
            <Text style={styles.sectionFrench}>
              Où souhaitez-vous aller ?
            </Text>

            {/* LOCATIONS */}
            <View style={styles.locationsRow}>
              <Pressable
                style={styles.locationCard}
                onPress={() => setShowFrom(true)}
              >
                <View style={styles.locationIconBlue}>
                  <Text style={styles.locationPin}>●</Text>
                </View>

                <Text style={styles.fieldLabel}>FROM / DE</Text>
                <Text style={styles.cityText}>{from}</Text>
                <Text style={styles.changeText}>Change</Text>
              </Pressable>

              <Pressable
                style={styles.swapButton}
                onPress={swapLocations}
              >
                <Text style={styles.swapText}>⇄</Text>
              </Pressable>

              <Pressable
                style={styles.locationCard}
                onPress={() => setShowTo(true)}
              >
                <View style={styles.locationIconDark}>
                  <Text style={styles.locationPin}>●</Text>
                </View>

                <Text style={styles.fieldLabel}>TO / À</Text>
                <Text style={styles.cityText}>{to}</Text>
                <Text style={styles.changeText}>Change</Text>
              </Pressable>
            </View>

            {/* DATE + PASSENGERS */}
            <View style={styles.optionsRow}>
              <Pressable
                style={styles.optionCard}
                onPress={() => setShowDate(true)}
              >
                <View style={styles.optionIcon}>
                  <Text>📅</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>DATE</Text>
                  <Text style={styles.optionValue}>
                    {travelDate}
                  </Text>
                </View>
              </Pressable>

              <View style={styles.optionCard}>
                <View style={styles.optionIcon}>
                  <Text>👥</Text>
                </View>

                <View style={styles.passengerInfo}>
                  <Text style={styles.fieldLabel}>PASSENGERS</Text>

                  <View style={styles.passengerRow}>
                    <Pressable
                      style={styles.counterButton}
                      onPress={() =>
                        setPassengers((value) =>
                          Math.max(1, value - 1)
                        )
                      }
                    >
                      <Text style={styles.counterText}>−</Text>
                    </Pressable>

                    <Text style={styles.passengerNumber}>
                      {passengers}
                    </Text>

                    <Pressable
                      style={styles.counterButton}
                      onPress={() =>
                        setPassengers((value) =>
                          Math.min(10, value + 1)
                        )
                      }
                    >
                      <Text style={styles.counterText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            {/* SEARCH BUTTON */}
            <Pressable
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>
                SEARCH TRIPS
              </Text>
              <Text style={styles.searchArrow}>→</Text>
            </Pressable>
          </View>

          {/* SERVICES */}
          <View style={styles.servicesHeader}>
            <Text style={styles.sectionHeading}>Our Services</Text>
            <Text style={styles.sectionFrench}>
              Nos services
            </Text>
          </View>

          <View style={styles.servicesGrid}>
            <ServiceCard
              icon="🎫"
              title="My Tickets"
              subtitle="My bookings"
              onPress={() => router.push('/tickets')}
            />

            <ServiceCard
              icon="📍"
              title="Track Bus"
              subtitle="Track your journey"
              onPress={() => router.push({
  pathname: '/tracking',
  params: { type: 'bus' },
})}
            />

            <ServiceCard
  icon="🧳"
  title="Parcel"
  subtitle="Send a parcel"
  onPress={() => router.push('/parcel')}
/>

            <ServiceCard
  icon="🧳"
  title="Track Parcel"
  subtitle="Track your parcel"
  onPress={() =>
    router.push({
      pathname: '/tracking',
      params: { type: 'parcel' },
    })
  }
/>
          </View>

          {/* SUPPORT */}
          <Pressable
            style={styles.supportCard}
            onPress={() => router.push('/support')}
          >
            <View style={styles.supportIcon}>
              <Text style={styles.supportEmoji}>💬</Text>
            </View>

            <View style={styles.supportTextContainer}>
              <Text style={styles.supportTitle}>
                Need help?
              </Text>

              <Text style={styles.supportFrench}>
                Besoin d'aide ?
              </Text>

              <Text style={styles.supportDescription}>
                Our support team is here for you.
              </Text>
            </View>

            <Text style={styles.supportArrow}>›</Text>
          </Pressable>

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* BOTTOM NAV */}
        <View style={styles.bottomNav}>
          <NavItem
            icon="⌂"
            label="Home"
            active
            onPress={() => router.replace('/')}
          />
<NavItem
  icon="📞"
  label="Call"
  onPress={() => setShowCall(true)}
/>


          <NavItem
  icon="👤"
  label="Profile"
  onPress={() => router.push('/profile')}
/>

          

          <NavItem
            icon="☰"
            label="More"
            onPress={() => setShowMore(true)}
          />
        </View>

        {/* FROM LOCATION MODAL */}
        <LocationModal
          visible={showFrom}
          title="Departure"
          french="Point de départ"
          selected={from}
          onClose={() => setShowFrom(false)}
          onSelect={(city) => {
            setFrom(city);
            setShowFrom(false);
          }}
        />

        {/* TO LOCATION MODAL */}
        <LocationModal
          visible={showTo}
          title="Destination"
          french="Destination"
          selected={to}
          onClose={() => setShowTo(false)}
          onSelect={(city) => {
            setTo(city);
            setShowTo(false);
          }}
        />

        {/* DATE MODAL */}
        <DateModal
          visible={showDate}
          selected={travelDate}
          onClose={() => setShowDate(false)}
          onSelect={(date) => {
            setTravelDate(date);
            setShowDate(false);
          }}
        />

        {/* MORE MODAL */}
        <Modal
          visible={showMore}
          transparent
          animationType="slide"
          onRequestClose={() => setShowMore(false)}
        >
          <View style={styles.moreOverlay}>
            <Pressable
              style={styles.moreBackdrop}
              onPress={() => setShowMore(false)}
            />

            <View style={styles.moreSheet}>
              <View style={styles.sheetHandle} />

              <View style={styles.moreHeader}>
                <View>
                  <Text style={styles.moreTitle}>More</Text>
                  <Text style={styles.moreFrench}>
                    Plus de services
                  </Text>
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setShowMore(false)}
                >
                  <Text style={styles.closeText}>×</Text>
                </Pressable>
              </View>

              <View style={styles.moreGrid}>
                

                <MoreItem
                  icon="💳"
                  title="Payments"
                  onPress={() => {
                    setShowMore(false);
                    router.push('/payments');
                  }}
                />

                <MoreItem
                  icon="🔔"
                  title="Notifications"
                  onPress={() => {
                    setShowMore(false);
                    router.push('/notifications');
                  }}
                />

                <MoreItem
                  icon="⚙️"
                  title="Settings"
                  onPress={() => {
                    setShowMore(false);
                    router.push('/settings');
                  }}
                />

                <MoreItem
                  icon="💬"
                  title="Support & Requests"
                  onPress={() => {
                    setShowMore(false);
                    router.push('/support');
                  }}
                />

                
              </View>

              <View style={styles.moreFooter}>
                <Text style={styles.moreFooterBrand}>
                  GODSPEED MOBILITY
                </Text>

                <Text style={styles.moreFooterText}>
                  Comfortable • Safe • On Time
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        
        {/* CALL MODAL */}
<Modal
  visible={showCall}
  transparent
  animationType="slide"
  onRequestClose={() => {
    setShowCall(false);
    setCallMode('main');
  }}
>
  <View style={styles.moreOverlay}>
    <Pressable
      style={styles.moreBackdrop}
      onPress={() => {
        setShowCall(false);
        setCallMode('main');
      }}
    />

    <View style={styles.moreSheet}>
      <View style={styles.sheetHandle} />

      <View style={styles.moreHeader}>
        <View>
          <Text style={styles.moreTitle}>
            Make a Call
          </Text>

          <Text style={styles.moreFrench}>
            {callMode === 'main'
              ? 'Qui souhaitez-vous contacter ?'
              : 'Family / Loved One'}
          </Text>
        </View>

        <Pressable
          style={styles.closeButton}
          onPress={() => {
            setShowCall(false);
            setCallMode('main');
          }}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>

      {callMode === 'main' ? (
        <View style={styles.moreGrid}>

          <MoreItem
            icon="❤️"
            title="Family / Loved One"
            onPress={() => setCallMode('family')}
          />

          <MoreItem
            icon="🚌"
            title="My Operator"
            onPress={() => {
              Alert.alert(
                'My Operator',
                'Your booked operator contact will appear here automatically once your booking is confirmed.'
              );
            }}
          />

          <MoreItem
            icon="🛟"
            title="GodSpeed Support"
            onPress={() => {
              Alert.alert(
                'GodSpeed Support',
                'GodSpeed support contact will be loaded from the company settings.'
              );
            }}
          />

        </View>
      ) : (
        <View>

          <Text style={styles.chooseText}>
            Enter a phone number
          </Text>

          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="e.g. 677123456"
            keyboardType="phone-pad"
            style={{
              backgroundColor: '#F5F7FA',
              borderRadius: 12,
              paddingHorizontal: 15,
              paddingVertical: 14,
              fontSize: 16,
              marginBottom: 12,
            }}
          />

          <Pressable
            style={styles.moreItem}
            onPress={openPhoneContacts}
          >
            <View style={styles.moreItemIcon}>
              <Text style={styles.moreItemEmoji}>👥</Text>
            </View>

            <Text style={styles.moreItemTitle}>
              Choose from Contacts
            </Text>
          </Pressable>

          {contacts.length > 0 && (
            <ScrollView
              style={{ maxHeight: 180 }}
              showsVerticalScrollIndicator={false}
            >
              {contacts
                .filter((contact: any) =>
            contact.phoneNumbers?.some(
          (phone: any) => phone.number
                  )
                )
                .map((contact: any) => {
                  const number =
                    contact.phoneNumbers?.[0]?.number || '';

                  return (
                    <Pressable
                      key={contact.id}
                      style={styles.cityOption}
                      onPress={() => {
                        setPhoneNumber(number);
                        setContacts([]);
                      }}
                    >
                      <View style={styles.cityOptionIcon}>
                        <Text>👤</Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={styles.cityOptionText}>
                          {contact.name}
                        </Text>

                        <Text style={styles.moreFrench}>
                          {number}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
            </ScrollView>
          )}

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 15,
            }}
          >
            <Pressable
              style={[
                styles.moreItem,
                { flex: 1 },
              ]}
              onPress={() => {
                if (!phoneNumber.trim()) {
                  Alert.alert(
                    'Phone Number',
                    'Please enter or select a phone number.'
                  );
                  return;
                }

                Linking.openURL(`tel:${phoneNumber}`);
              }}
            >
              <Text style={styles.moreItemEmoji}>📞</Text>
              <Text style={styles.moreItemTitle}>
                Call
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.moreItem,
                { flex: 1 },
              ]}
              onPress={() => {
                if (!phoneNumber.trim()) {
                  Alert.alert(
                    'Phone Number',
                    'Please enter or select a phone number.'
                  );
                  return;
                }

                const cleanNumber =
                  phoneNumber.replace(/[^\d+]/g, '');

                Linking.openURL(
                  `whatsapp://send?phone=${cleanNumber}`
                );
              }}
            >
              <Text style={styles.moreItemEmoji}>💬</Text>
              <Text style={styles.moreItemTitle}>
                WhatsApp
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => setCallMode('main')}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
              }}
            >
              ← Back
            </Text>
          </Pressable>

        </View>
      )}

      <View style={styles.moreFooter}>
        <Text style={styles.moreFooterBrand}>
          GODSPEED MOBILITY
        </Text>

        <Text style={styles.moreFooterText}>
          Stay connected while you travel
        </Text>
      </View>
    </View>
  </View>
</Modal>

      </View>
    </SafeAreaView>
  );
}

/* SERVICE CARD */

function ServiceCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.serviceCard} onPress={onPress}>
      <View style={styles.serviceIcon}>
        <Text style={styles.serviceEmoji}>{icon}</Text>
      </View>

      <Text style={styles.serviceTitle}>{title}</Text>

      <Text style={styles.serviceSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

/* BOTTOM NAV ITEM */

function NavItem({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.navItem} onPress={onPress}>
      <View
        style={[
          styles.navIconBox,
          active && styles.navIconBoxActive,
        ]}
      >
        <Text
          style={[
            styles.navIcon,
            active && styles.navIconActive,
          ]}
        >
          {icon}
        </Text>
      </View>

      <Text
        style={[
          styles.navLabel,
          active && styles.navLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* LOCATION MODAL */

function LocationModal({
  visible,
  title,
  french,
  selected,
  onClose,
  onSelect,
}: {
  visible: boolean;
  title: string;
  french: string;
  selected: string;
  onClose: () => void;
  onSelect: (city: string) => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.locationModalOverlay}>
        <View style={styles.locationSheet}>
          <View style={styles.sheetHandle} />

          <View style={styles.locationModalHeader}>
            <View>
              <Text style={styles.moreTitle}>{title}</Text>
              <Text style={styles.moreFrench}>{french}</Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <Text style={styles.chooseText}>
            Choose a city
          </Text>

          {ROUTES.map((city) => (
            <Pressable
              key={city}
              style={[
                styles.cityOption,
                selected === city &&
                  styles.cityOptionSelected,
              ]}
              onPress={() => onSelect(city)}
            >
              <View style={styles.cityOptionIcon}>
                <Text>📍</Text>
              </View>

              <Text
                style={[
                  styles.cityOptionText,
                  selected === city &&
                    styles.cityOptionTextSelected,
                ]}
              >
                {city}
              </Text>

              {selected === city && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </Pressable>
          ))}

          <Text style={styles.futureRoutes}>
            More GodSpeed destinations coming soon.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

/* DATE MODAL */

function DateModal({
  visible,
  selected,
  onClose,
  onSelect,
}: {
  visible: boolean;
  selected: string;
  onClose: () => void;
  onSelect: (date: string) => void;
}) {

  const dates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);

  const value = date.toISOString().split('T')[0];

  const labels = [
    'Today',
    'Tomorrow',
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }),
  ];

  const frenchLabels = [
    "Aujourd'hui",
    'Demain',
    date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    }),
  ];

  return {
    value,
    label: index < 2 ? labels[index] : labels[2],
    french: index < 2 ? frenchLabels[index] : frenchLabels[2],
  };
});

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.locationModalOverlay}>
        <View style={styles.locationSheet}>
          <View style={styles.sheetHandle} />

          <View style={styles.locationModalHeader}>
            <View>
              <Text style={styles.moreTitle}>
                Travel Date
              </Text>

              <Text style={styles.moreFrench}>
                Date de voyage
              </Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <Text style={styles.chooseText}>
            Choose your travel date
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          >
            {dates.map((date) => (
              <Pressable
                key={date.value}
                style={[
                  styles.cityOption,
                  selected === date.value &&
                    styles.cityOptionSelected,
                ]}
                onPress={() => onSelect(date.value)}
              >
                <View style={styles.cityOptionIcon}>
                  <Text>📅</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.cityOptionText,
                      selected === date.value &&
                        styles.cityOptionTextSelected,
                    ]}
                  >
                    {date.label}
                  </Text>

                  <Text style={styles.moreFrench}>
                    {date.french}
                  </Text>
                </View>

                {selected === date.value && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

/* MORE ITEM */

function MoreItem({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.moreItem} onPress={onPress}>
      <View style={styles.moreItemIcon}>
        <Text style={styles.moreItemEmoji}>{icon}</Text>
      </View>

      <Text style={styles.moreItemTitle}>{title}</Text>
    </Pressable>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  screen: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  brand: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: '#0B1F3A',
    includeFontPadding: false,
  },

  brandSub: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#1976D2',
    marginTop: 1,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileIcon: {
    fontSize: 18,
  },

  /* HERO */

  heroCard: {
    height: 245,
    backgroundColor: '#0B1F3A',
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 31, 58, 0.28)',
    zIndex: 2,
  },

  heroText: {
    position: 'absolute',
    top: 19,
    left: 20,
    right: 20,
    zIndex: 3,
  },

  heroSmall: {
    color: '#7DBBFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 1,
  },

  heroFrench: {
    color: '#B8C8DA',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  busImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },

  heroBottom: {
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
    zIndex: 3,
  },

  heroTagline: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    bottom: 25,
  },

  heroFrenchTagline: {
    color: '#AFC2D8',
    fontSize: 20,
    marginTop: 3,
    bottom: 15,
  },

  /* SEARCH */

  searchSection: {
    marginTop: 26,
  },

  sectionHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  sectionFrench: {
    color: '#7B899A',
    fontSize: 11,
    marginTop: 2,
  },

  /* LOCATIONS */

  locationsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  locationCard: {
    flex: 1,
    minHeight: 120,
    backgroundColor: '#a6f106ff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  locationIconBlue: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  locationIconDark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8EDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  locationPin: {
    fontSize: 10,
    color: '#1976D2',
  },

  fieldLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#100885ff',
  },

  cityText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#172B4D',
    marginTop: 4,
  },

  changeText: {
    fontSize: 10,
    color: '#000000ff',
    fontWeight: '600',
    marginTop: 7,
  },

  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -7,
    zIndex: 5,
    elevation: 4,
  },

  swapText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  /* OPTIONS */

  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },

  optionCard: {
    flex: 1,
    minHeight: 70,
    backgroundColor: '#ebd7d7ff',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDF3',
  },

  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  optionValue: {
    color: '#172B4D',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },

  passengerInfo: {
    flex: 1,
  },

  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  counterButton: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#02203eff',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },

  passengerNumber: {
    minWidth: 25,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800',
    color: '#172B4D',
  },

  /* SEARCH BUTTON */

  searchButton: {
    height: 56,
    backgroundColor: '#0B1F3A',
    borderRadius: 17,
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  searchArrow: {
    color: '#7DBBFF',
    fontSize: 22,
    marginLeft: 10,
  },

  /* SERVICES */

  servicesHeader: {
    marginTop: 28,
    marginBottom: 14,
  },

  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  serviceCard: {
    width: '48.5%',
    backgroundColor: '#efe3e3ff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDF0F4',
  },

  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  serviceEmoji: {
    fontSize: 21,
  },

  serviceTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#172B4D',
  },

  serviceSubtitle: {
    fontSize: 9,
    color: '#0b2445ff',
    marginTop: 3,
  },

  /* SUPPORT */

  supportCard: {
    backgroundColor: '#308af1ff',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  supportIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  supportEmoji: {
    fontSize: 20,
  },

  supportTextContainer: {
    flex: 1,
  },

  supportTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B1F3A',
  },

  supportFrench: {
    fontSize: 9,
    color: '#171a1dff',
    marginTop: 2,
  },

  supportDescription: {
    fontSize: 10,
    color: '#171a1dff',
    marginTop: 3,
  },

  supportArrow: {
    fontSize: 28,
    color: '#1976D2',
  },

  bottomSpace: {
    height: 15,
  },

  /* BOTTOM NAV */

  bottomNav: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 8,
    height: 68,
    backgroundColor: '#000000ff',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#EEF1F5',
  },

  navItem: {
    flex: 1,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIconBox: {
    width: 34,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIconBoxActive: {
    backgroundColor: '#E8F1FB',
  },

  navIcon: {
    fontSize: 20,
    color: '#7C8998',
  },

  navIconActive: {
    color: '#1976D2',
  },

  navLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#7C8998',
    marginTop: 2,
  },

  navLabelActive: {
    color: '#1976D2',
  },

  /* MORE MENU */

  moreOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  moreBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 18, 35, 0.48)',
  },

  moreSheet: {
    backgroundColor: '#F5F7FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  sheetHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD3DD',
    alignSelf: 'center',
    marginBottom: 18,
  },

  moreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  moreTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  moreFrench: {
    color: '#7B899A',
    fontSize: 10,
    marginTop: 2,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E7ECF2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    fontSize: 25,
    color: '#526274',
    lineHeight: 28,
  },

  moreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  moreItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  moreItemIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  moreItemEmoji: {
    fontSize: 18,
  },

  moreItemTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#172B4D',
    flex: 1,
  },

  moreFooter: {
    alignItems: 'center',
    paddingTop: 12,
  },

  moreFooterBrand: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#1976D2',
  },

  moreFooterText: {
    fontSize: 9,
    color: '#8A96A6',
    marginTop: 4,
  },

  /* LOCATION MODAL */

  locationModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(5, 18, 35, 0.42)',
  },

  locationSheet: {
    backgroundColor: '#F5F7FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  locationModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  chooseText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#62748A',
    marginTop: 8,
    marginBottom: 12,
  },

  cityOption: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    marginBottom: 9,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF0F4',
  },

  cityOptionSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#E8F1FB',
  },

  cityOptionIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cityOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172B4D',
  },

  cityOptionTextSelected: {
    color: '#1976D2',
  },

  checkMark: {
    marginLeft: 'auto',
    color: '#1976D2',
    fontSize: 20,
    fontWeight: '900',
  },

  futureRoutes: {
    textAlign: 'center',
    color: '#8A96A6',
    fontSize: 10,
    marginTop: 8,
  },
});