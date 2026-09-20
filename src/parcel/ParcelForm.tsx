import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
export type ParcelType = 'Document' | 'Package' | 'Other';

export type ParcelTrip = {
  from: string; to: string; date: string; departure: string; arrival: string;
};
export type ParcelOperator = { displayName?: string | null } | null;
export type ParcelVehicle = { id?: string | null; name?: string | null } | null;

type Props = {
  trip: ParcelTrip; operator: ParcelOperator; vehicle: ParcelVehicle;
  from: string;

setParcelFee: (value: number) => void;
  demoSender: { name: string; phone: string };
  demoTripContact: { role: string; phone: string };
  receiverName: string; receiverPhone: string; destination: string;
  parcelType: ParcelType; contents: string; parcelFee: number; canPreview: boolean;
  setReceiverName: (value: string) => void; setReceiverPhone: (value: string) => void;
 setParcelType: (value: ParcelType) => void;
  setContents: (value: string) => void; onCallTripContact: () => void; onReview: () => void;
};
export default function ParcelForm({
  trip,
  operator,
  vehicle,
  from,

  demoSender,
  demoTripContact,
  receiverName,
  receiverPhone,
  destination,
  parcelType,
  contents,  parcelFee,
  canPreview,
  
  setReceiverName,
  setReceiverPhone,

  setParcelType,
  setContents,
  setParcelFee,
  onCallTripContact,
  onReview,
}: Props) {
   
   const calculateParcelFee = (origin: string, destination: string) => {
    if (origin === destination) return;

    if (
      (origin === 'Kumba' && destination === 'Yaoundé') ||
      (origin === 'Yaoundé' && destination === 'Kumba')
    ) {
      setParcelFee(3000);
    } else {
      setParcelFee(2500);
    }
  };
  
  
  
  
  
  return (
    <>
              <View style={styles.hero}>
                <View style={styles.heroIcon}>
                  <Text style={styles.heroEmoji}>📦</Text>
                </View>

                <Text style={styles.heroTitle}>
                  Send it with confidence
                </Text>

                <Text style={styles.heroText}>
                  Send your parcel safely through a scheduled
                  GodSpeed journey.
                </Text>
              </View>

             {/* JOURNEY */}
<Text style={styles.sectionTitle}>
  Journey
</Text>

<View style={styles.journeyCard}>

  <View style={styles.routeSide}>
    <Text style={styles.smallLabel}>
      FROM
    </Text>

    <Pressable
      style={styles.routeSelector}
     onPress={() => {}}
    >
      <Text style={styles.cityText}>
        {from}
      </Text>
    </Pressable>

    <Text style={styles.timeText}>
      {trip.departure}
    </Text>
  </View>

  <View style={styles.journeyMiddle}>
    <Text style={styles.journeyArrow}>
      →
    </Text>

    <Text style={styles.directText}>
      Direct
    </Text>
  </View>

  <View style={styles.destinationSide}>
    <Text style={styles.smallLabel}>
      TO
    </Text>

    <Pressable
      style={styles.routeSelector}
      onPress={() => {}}
    >
      <Text style={styles.cityText}>
        {destination || trip.to}
      </Text>
    </Pressable>

    <Text style={styles.timeText}>
      {trip.arrival}
    </Text>
  </View>
<View style={styles.journeyFee}>
  <Text style={styles.journeyFeeLabel}>
    ESTIMATED FEE
  </Text>

  <Text style={styles.journeyFeeAmount}>
    {parcelFee.toLocaleString()} FCFA
  </Text>
</View>
</View>

              {/* TRANSPORT */}
             {/* TRANSPORT */}
<View style={styles.transportCard}>
  <View style={styles.transportTop}>
    <Image
      source={require('../../assets/images/bus.png')}
      style={styles.busImage}
      resizeMode="contain"
    />

    <View style={styles.transportMain}>
      <Text style={styles.transportOperator}>
        {operator?.displayName || 'GodSpeed Voyage'}
      </Text>

      <Text style={styles.transportVehicle}>
        Vehicle ID: {vehicle?.id || '—'}
      </Text>
    </View>
  </View>

  <View style={styles.transportDivider} />

  <View style={styles.contactRow}>
    <View>
      <Text style={styles.smallLabel}>
        TRIP CONTACT
      </Text>

      <Text style={styles.contactValue}>
        {demoTripContact.phone ||
          'Driver / attendant assigned later'}
      </Text>
    </View>

    <Pressable
      style={styles.callButton}
      onPress={onCallTripContact}
    >
      <Text style={styles.callText}>
        CALL
      </Text>
    </Pressable>
  </View>
</View>

              {/* RECEIVER */}
              <Text style={styles.sectionTitle}>
                Receiver
              </Text>

              <View style={styles.formCard}>
                <InputField
                  label="Receiver's name"
                  placeholder="Enter receiver's full name"
                  value={receiverName}
                  onChangeText={setReceiverName}
                />

                <InputField
                  label="Receiver's phone number"
                  placeholder="e.g. 6XXXXXXXX"
                  value={receiverPhone}
                  onChangeText={setReceiverPhone}
                  keyboardType="phone-pad"
                />

                
              </View>

              {/* PARCEL */}
              <Text style={styles.sectionTitle}>
                Parcel
              </Text>

              <View style={styles.formCard}>
                <Text style={styles.inputLabel}>
                  Parcel type
                </Text>

                <View style={styles.typeRow}>
                  <TypeOption
                    icon="📄"
                    label="Document"
                    selected={parcelType === 'Document'}
                    onPress={() => setParcelType('Document')}
                  />

                  <TypeOption
                    icon="📦"
                    label="Package"
                    selected={parcelType === 'Package'}
                    onPress={() => setParcelType('Package')}
                  />

                  <TypeOption
                    icon="🎁"
                    label="Other"
                    selected={parcelType === 'Other'}
                    onPress={() => setParcelType('Other')}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Contents / description
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      styles.descriptionInput,
                    ]}
                    placeholder={
                      parcelType === 'Document'
                        ? 'e.g. School documents'
                        : parcelType === 'Package'
                          ? 'e.g. Clothes, shoes, electronics'
                          : 'Describe what you are sending'
                    }
                    placeholderTextColor="#9AA5B3"
                    value={contents}
                    onChangeText={setContents}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* SENDER */}
              <Text style={styles.sectionTitle}>
                Sender
              </Text>

              <View style={styles.senderCard}>
                <View style={styles.senderAvatar}>
                  <Text style={styles.senderAvatarText}>
                    ME
                  </Text>
                </View>

                <View style={styles.senderInfo}>
                  <Text style={styles.senderName}>
                    {demoSender.name}
                  </Text>

                  <Text style={styles.senderPhone}>
                    {demoSender.phone ||
                      'Phone number from your account'}
                  </Text>

                  <Text style={styles.senderHint}>
                    Sender information comes from your account.
                  </Text>
                </View>
              </View>

              {/* FEE */}
              <View style={styles.feeCard}>
                <View>
                  <Text style={styles.feeLabel}>
                    ESTIMATED PARCEL FEE
                  </Text>

                  <Text style={styles.feeHint}>
                    {parcelType} • {from} → {destination}
                  </Text>
                </View>

                <Text style={styles.feeAmount}>
                  {parcelFee.toLocaleString()} FCFA
                </Text>
              </View>

              <Pressable
                style={[
                  styles.continueButton,
                  !canPreview &&
                    styles.continueButtonDisabled,
                ]}
                disabled={!canPreview}
                onPress={() => onReview()}
              >
                <Text style={styles.continueText}>
                  REVIEW PARCEL
                </Text>

                <Text style={styles.continueArrow}>
                  →
                </Text>
              </Pressable>
                  
    </>
  );
}

function InputField({ label, placeholder, value, onChangeText, keyboardType = 'default' }: {
  label: string; placeholder: string; value: string; onChangeText: (value: string) => void; keyboardType?: 'default' | 'phone-pad';
}) {
  return <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="#9AA5B3" value={value} onChangeText={onChangeText} keyboardType={keyboardType} />
  </View>;
}

function TypeOption({ icon, label, selected, onPress }: { icon: string; label: string; selected: boolean; onPress: () => void }) {
  return <Pressable style={[styles.typeOption, selected && styles.typeOptionSelected]} onPress={onPress}>
    <Text style={styles.typeIcon}>{icon}</Text>
    <Text style={[styles.typeLabel, selected && styles.typeLabelSelected]}>{label}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 18,
  },

  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#E9EEF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  heroEmoji: {
    fontSize: 35,
  },

  heroTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  heroText: {
    maxWidth: 300,
    textAlign: 'center',
    marginTop: 7,
    color: '#8290A1',
    fontSize: 11,
    lineHeight: 17,
  },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 9,
    marginLeft: 3,
    fontSize: 11,
    fontWeight: '900',
    color: '#68778A',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  journeyCard: {
  backgroundColor: '#0B1F3A',
  borderRadius: 22,
  padding: 18,
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
},
journeyFee: {
  width: '100%',
  marginTop: 14,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#29415E',
},

journeyFeeLabel: {
  fontSize: 9,
  fontWeight: '900',
  color: '#7DBBFF',
},

journeyFeeAmount: {
  marginTop: 3,
  fontSize: 20,
  fontWeight: '900',
  color: '#FFFFFF',
},
  smallLabel: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: '#7DBBFF',
  },

  cityText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  timeText: {
    marginTop: 3,
    fontSize: 10,
    color: '#B8C8DA',
  },

  journeyMiddle: {
    flex: 1,
    alignItems: 'center',
  },

  journeyArrow: {
    fontSize: 23,
    color: '#7DBBFF',
  },

  directText: {
    marginTop: 2,
    fontSize: 8,
    color: '#8EA4BC',
  },

  destinationSide: {
    alignItems: 'flex-end',
  },
routeSide: {
  flex: 1,
},

routeSelector: {
  marginTop: 2,
},
  transportCard: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  transportTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

 busImage: {
  width: 64,
  height: 44,
  borderRadius: 12,
},

  transportMain: {
    flex: 1,
    marginLeft: 11,
  },

  transportOperator: {
    fontSize: 13,
    fontWeight: '900',
    color: '#182B43',
  },

  transportVehicle: {
    marginTop: 3,
    fontSize: 9,
    color: '#8290A1',
  },

  transportDivider: {
    height: 1,
    backgroundColor: '#EDF0F4',
    marginVertical: 13,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  contactValue: {
    marginTop: 4,
    fontSize: 10,
    color: '#526276',
  },

  callButton: {
    minWidth: 62,
    height: 34,
    paddingHorizontal: 13,
    borderRadius: 10,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  callText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1976D2',
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 16,
  },

  inputGroup: {
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#7D8A9B',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  input: {
    height: 48,
    borderRadius: 13,
    backgroundColor: '#F6F8FA',
    borderWidth: 1,
    borderColor: '#E9EDF2',
    paddingHorizontal: 13,
    fontSize: 12,
    color: '#182B43',
  },

  descriptionInput: {
    height: 82,
    paddingTop: 12,
  },

  typeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  typeOption: {
    flex: 1,
    minHeight: 72,
    borderRadius: 15,
    backgroundColor: '#F6F8FA',
    borderWidth: 1,
    borderColor: '#E9EDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeOptionSelected: {
    backgroundColor: '#E8F1FB',
    borderColor: '#1976D2',
  },

  typeIcon: {
    fontSize: 20,
    marginBottom: 5,
  },

  typeLabel: {
    fontSize: 9,
    color: '#5F6E81',
    fontWeight: '800',
  },

  typeLabelSelected: {
    color: '#1976D2',
  },

  senderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBF0',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  senderAvatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  senderAvatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  senderInfo: {
    flex: 1,
    marginLeft: 12,
  },

  senderName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#182B43',
  },

  senderPhone: {
    marginTop: 3,
    fontSize: 10,
    color: '#1976D2',
    fontWeight: '700',
  },

  senderHint: {
    marginTop: 3,
    fontSize: 9,
    lineHeight: 14,
    color: '#8A96A5',
  },

  feeCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  feeLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  feeHint: {
    marginTop: 4,
    fontSize: 8,
    color: '#8A96A5',
  },

  feeAmount: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1976D2',
  },

  continueButton: {
    height: 54,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: '#0B1F3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueButtonDisabled: {
    backgroundColor: '#B8C2CE',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  continueArrow: {
    color: '#7DBBFF',
    fontSize: 20,
    marginLeft: 10,
  },  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },

  locationModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0B1F3A',
    marginBottom: 12,
  },

  locationOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F4',
  },

  locationOptionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#182B43',
  },

  modalCancel: {
    marginTop: 14,
    alignItems: 'center',
    paddingVertical: 12,
  },

  modalCancelText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#1976D2',
  },
});