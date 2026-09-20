import TripSearch from '@/components/home/TripSearch';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ROUTES = ['Kumba', 'Yaoundé'];

export default function HomeScreen() {
const router = useRouter();
  const [from, setFrom] = useState('Kumba');
  const [to, setTo] = useState('Yaoundé');
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [passengers, setPassengers] = useState(1);
const [travelDate, setTravelDate] = useState('2026-09-14');
const [showDate, setShowDate] = useState(false);

  const swapLocations = () => {
    const currentFrom = from;
    setFrom(to);
    setTo(currentFrom);
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

          {/* HERO BUS CARD */}
          <View style={styles.heroCard}>
            <View style={styles.heroOverlay} />

            <View style={styles.heroText}>
              <Text style={styles.heroSmall}>TRAVEL WITH</Text>

              <Text style={styles.heroTitle}>GODSPEED TECH</Text>

              <Text style={styles.heroFrench}>
                VOYAGEZ AVEC GODSPEED TECH
              </Text>
            </View>

            <Image
              source={require('../../assets/images/bus.png')}
              style={styles.busImage}
              resizeMode="contain"
            />

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
         <TripSearch
  from={from}
  to={to}
   travelDate={travelDate}
  onDatePress={() => setShowDate(true)}
  passengers={passengers}
  onFromPress={() => setShowFrom(true)}
  onToPress={() => setShowTo(true)}
  onSwap={swapLocations}
  onDecreasePassengers={() =>
    setPassengers(Math.max(1, passengers - 1))
  }
  onIncreasePassengers={() =>
    setPassengers(passengers + 1)
  }
  onSearch={() => {
  router.push({
    pathname: '/trips',
    params: {
      from,
      to,
         travelDate,
      passengers: passengers.toString(),
    },
  });
}}
/>

          {/* SERVICES */}
          <View style={styles.servicesHeader}>
            <View>
              <Text style={styles.sectionHeading}>Your GodSpeed</Text>
              <Text style={styles.sectionFrench}>
                Votre espace voyage
              </Text>
            </View>
          </View>

          <View style={styles.servicesGrid}>
            <ServiceCard
  icon="🎟️"
  title="My Tickets"
  subtitle="Mes billets"
  onPress={() => router.push('/tickets')}
/>

<ServiceCard
  icon="📍"
  title="Track My Bus"
  subtitle="Suivre mon bus"
  onPress={() => router.push('/tracking')}
/>

<ServiceCard 
  icon="📦" 
  title="Send a Parcel" 
  subtitle="Envoyer un colis" 
  onPress={() => router.push('/parcel-trips')} 
/>

<ServiceCard
  icon="🧳"
  title="My Luggage"
  subtitle="Mes bagages"
  onPress={() => router.push('/luggage')}
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
                Customer Support
              </Text>

              <Text style={styles.supportFrench}>
                Assistance clientèle
              </Text>

              <Text style={styles.supportDescription}>
                We're here to help you.
              </Text>
            </View>

            <Text style={styles.supportArrow}>›</Text>
          </Pressable>

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
         <NavItem
  icon="⌂"
  label="Home"
  active
  onPress={() => router.push('/')}
/>

<NavItem
  icon="🚌"
  label="Trips"
  onPress={() => router.push('/trips')}
/>

<NavItem
  icon="🎟"
  label="Tickets"
  onPress={() => router.push('/tickets')}
/>

          <Pressable
            style={styles.navItem}
            onPress={() => setShowMore(true)}
          >
            <View style={styles.navIconBox}>
              <Text style={styles.navIcon}>☰</Text>
            </View>

            <Text style={styles.navLabel}>More</Text>
          </Pressable>
        </View>
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
      {/* MORE MENU */}
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
    icon="👤"
    title="My Profile"
    onPress={() => {
      setShowMore(false);
      router.push('/profile');
    }}
  />

  <MoreItem
    icon="🧳"
    title="Luggage"
    onPress={() => {
      setShowMore(false);
      router.push('/luggage');
    }}
  />

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
    icon="💬"
    title="Support"
    onPress={() => {
      setShowMore(false);
      router.push('/support');
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
</View>

            <View style={styles.moreFooter}>
              <Text style={styles.moreFooterBrand}>
                GODSPEED MOBILITY
              </Text>

              <Text style={styles.moreFooterText}>
                Safe journeys. Better connections.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
                selected === city && styles.cityOptionSelected,
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
  const dates = [
    { value: '2026-09-14', label: 'Today', french: "Aujourd'hui" },
    { value: '2026-09-15', label: 'Tomorrow', french: 'Demain' },
    { value: '2026-09-16', label: 'Wednesday, Sep 16', french: 'Mercredi 16 sept.' },
    { value: '2026-09-17', label: 'Thursday, Sep 17', french: 'Jeudi 17 sept.' },
    { value: '2026-09-18', label: 'Friday, Sep 18', french: 'Vendredi 18 sept.' },
  ];

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
      <Text style={styles.moreTitle}>Travel Date</Text>
      <Text style={styles.moreFrench}>Date de voyage</Text>
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
    contentContainerStyle={{ paddingBottom: 20 }}
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
brand: { fontSize: 20, fontWeight: '900',
   letterSpacing: 1.2, color: '#0B1F3A', 
   includeFontPadding: false, },

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