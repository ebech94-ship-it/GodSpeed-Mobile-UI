import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import type { ParcelOperator, ParcelTrip, ParcelType, ParcelVehicle } from './ParcelForm';

type PaymentMethod = 'MTN Mobile Money' | 'Orange Money' | 'Card';
type Props = {
  stage: 'preview' | 'payment' | 'receipt';
  paid: boolean;
  trip: ParcelTrip;
  operator: ParcelOperator;
  vehicle: ParcelVehicle;
  demoSender: { name: string; phone: string };
  demoTripContact: { role: string; phone: string };
  destination: string;
  parcelType: ParcelType;
  contents: string;
  receiverName: string;
  receiverPhone: string;
  parcelFee: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
  reference: string;
  onContinueToPayment: () => void;
  onEdit: () => void;
  onPayment: () => void;
  onShare: () => void;
  onCallTripContact: () => void;
};

export default function ParcelStages({
  stage, paid, trip, operator, vehicle, demoSender, demoTripContact,
  destination, parcelType, contents, receiverName, receiverPhone, parcelFee,
  paymentMethod, setPaymentMethod, reference, onContinueToPayment, onEdit,
  onPayment, onShare, onCallTripContact,
}: Props) {
  return (
    <>
      {stage === 'preview' && (
        <>
              <View style={styles.previewHero}>
                <View style={styles.previewIcon}>
                  <Text style={styles.previewEmoji}>✓</Text>
                </View>

                <Text style={styles.previewTitle}>
                  Review your parcel
                </Text>

                <Text style={styles.previewText}>
                  Check everything carefully before payment.
                </Text>
              </View>

              <InfoCard title="JOURNEY">
                <Detail label="FROM" value={trip.from} />
                <Detail label="TO" value={destination} />
                <Detail
                  label="DEPARTURE"
                  value={`${trip.date} • ${trip.departure}`}
                />
                <Detail
                  label="ARRIVAL"
                  value={trip.arrival}
                />
              </InfoCard>

              <InfoCard title="TRANSPORT">
                <Detail
                  label="COMPANY"
                  value={
                    operator?.displayName ||
                    'GodSpeed Voyage'
                  }
                />

                <Detail
                  label="VEHICLE ID"
                  value={vehicle?.id || '—'}
                />

                <Detail
                  label="VEHICLE"
                  value={vehicle?.name || '—'}
                />

                <Detail
                  label="TRIP CONTACT"
                  value={
                    demoTripContact.phone ||
                    'Assigned after trip confirmation'
                  }
                />
              </InfoCard>

              <InfoCard title="SENDER">
                <Detail
                  label="NAME"
                  value={demoSender.name}
                />

                <Detail
                  label="PHONE"
                  value={
                    demoSender.phone ||
                    'From your account'
                  }
                />
              </InfoCard>

              <InfoCard title="RECEIVER">
                <Detail
                  label="NAME"
                  value={receiverName}
                />

                <Detail
                  label="PHONE"
                  value={receiverPhone}
                />
              </InfoCard>

              <InfoCard title="PARCEL">
                <Detail
                  label="TYPE"
                  value={parcelType}
                />

                <Detail
                  label="CONTENTS"
                  value={contents}
                />
              </InfoCard>

              <View style={styles.totalCard}>
                <View>
                  <Text style={styles.totalLabel}>
                    TOTAL TO PAY
                  </Text>

                  <Text style={styles.totalHint}>
                    Parcel transport fee
                  </Text>
                </View>

                <Text style={styles.totalAmount}>
                  {parcelFee.toLocaleString()} FCFA
                </Text>
              </View>

              <Pressable
                style={styles.continueButton}
                onPress={onContinueToPayment}
              >
                <Text style={styles.continueText}>
                  CONTINUE TO PAYMENT
                </Text>

                <Text style={styles.continueArrow}>
                  →
                </Text>
              </Pressable>

              <Pressable
                style={styles.secondaryButton}
                onPress={onEdit}
              >
                <Text style={styles.secondaryText}>
                  EDIT DETAILS
                </Text>
              </Pressable>
        </>
      )}

      {stage === 'payment' && (
        <>
              <View style={styles.previewHero}>
                <View style={styles.paymentIcon}>
                  <Text style={styles.previewEmoji}>
                    💳
                  </Text>
                </View>

                <Text style={styles.previewTitle}>
                  Pay for your parcel
                </Text>

                <Text style={styles.previewText}>
                  Choose your preferred payment method.
                </Text>
              </View>

              <View style={styles.paymentSummary}>
                <Text style={styles.paymentSummaryLabel}>
                  AMOUNT
                </Text>

                <Text style={styles.paymentSummaryAmount}>
                  {parcelFee.toLocaleString()} FCFA
                </Text>

                <Text style={styles.paymentReference}>
                  {parcelType} • {trip.from} → {destination}
                </Text>
              </View>

              <Text style={styles.sectionTitle}>
                Payment method
              </Text>

              <PaymentOption
                label="MTN Mobile Money"
                icon="🟡"
                selected={paymentMethod === 'MTN Mobile Money'}
                onPress={() =>
                  setPaymentMethod('MTN Mobile Money')
                }
              />

              <PaymentOption
                label="Orange Money"
                icon="🟠"
                selected={paymentMethod === 'Orange Money'}
                onPress={() =>
                  setPaymentMethod('Orange Money')
                }
              />

              <PaymentOption
                label="Card"
                icon="💳"
                selected={paymentMethod === 'Card'}
                onPress={() =>
                  setPaymentMethod('Card')
                }
              />

              <Pressable
                style={styles.continueButton}
                onPress={onPayment}
              >
                <Text style={styles.continueText}>
                  PAY {parcelFee.toLocaleString()} FCFA
                </Text>

                <Text style={styles.continueArrow}>
                  →
                </Text>
              </Pressable>

              <Text style={styles.paymentNote}>
                Your payment confirmation and parcel receipt
                will appear immediately after successful payment.
              </Text>
        </>
      )}

      {stage === 'receipt' && paid && (
        <>
              <View style={styles.successHero}>
                <View style={styles.successIcon}>
                  <Text style={styles.successCheck}>
                    ✓
                  </Text>
                </View>

                <Text style={styles.successTitle}>
                  Parcel registered
                </Text>

                <Text style={styles.successText}>
                  Payment received successfully.
                </Text>
              </View>

              <View style={styles.receiptCard}>
                <View style={styles.receiptHeader}>
                  <View>
                    <Text style={styles.receiptBrand}>
                      GODSPEED MOBILITY
                    </Text>

                    <Text style={styles.receiptTitle}>
                      Parcel Receipt
                    </Text>
                  </View>

                  <View style={styles.paidBadge}>
                    <Text style={styles.paidText}>
                      PAID
                    </Text>
                  </View>
                </View>

                <View style={styles.receiptDivider} />

                <Detail
                  label="REFERENCE"
                  value={reference}
                />

                <Detail
                  label="COMPANY"
                  value={
                    operator?.displayName ||
                    'GodSpeed Voyage'
                  }
                />

                <Detail
                  label="VEHICLE ID"
                  value={vehicle?.id || '—'}
                />

                <Detail
                  label="ROUTE"
                  value={`${trip.from} → ${destination}`}
                />

                <Detail
                  label="DEPARTURE"
                  value={`${trip.date} • ${trip.departure}`}
                />

                <Detail
                  label="SENDER"
                  value={`${demoSender.name} • ${
                    demoSender.phone || 'Account phone'
                  }`}
                />

                <Detail
                  label="RECEIVER"
                  value={`${receiverName} • ${receiverPhone}`}
                />

                <Detail
                  label="PARCEL"
                  value={`${parcelType} • ${contents}`}
                />

                <Detail
                  label="PAYMENT"
                  value={paymentMethod}
                />

                <View style={styles.receiptTotal}>
                  <Text style={styles.receiptTotalLabel}>
                    TOTAL PAID
                  </Text>

                  <Text style={styles.receiptTotalAmount}>
                    {parcelFee.toLocaleString()} FCFA
                  </Text>
                </View>
              </View>

              <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>
                  Trip contact
                </Text>

                <Text style={styles.contactDescription}>
                  Use this contact to check on your parcel
                  or raise a concern about the journey.
                </Text>

                <View style={styles.contactBottom}>
                  <View>
                    <Text style={styles.contactRole}>
                      {demoTripContact.role}
                    </Text>

                    <Text style={styles.contactPhone}>
                      {demoTripContact.phone ||
                        'Contact assigned with trip'}
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

              <View style={styles.actionRow}>
                <Pressable
                  style={styles.actionButton}
                  onPress={onShare}
                >
                  <Text style={styles.actionIcon}>
                    ↗
                  </Text>

                  <Text style={styles.actionText}>
                    SHARE
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.actionButton}
                  onPress={() =>
                    Alert.alert(
                      'Download receipt',
                      'Receipt download will be connected to PDF generation.',
                    )
                  }
                >
                  <Text style={styles.actionIcon}>
                    ↓
                  </Text>

                  <Text style={styles.actionText}>
                    DOWNLOAD
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.actionButton}
                  onPress={() =>
                    Alert.alert(
                      'Print receipt',
                      'Printing will be connected to the device print service.',
                    )
                  }
                >
                  <Text style={styles.actionIcon}>
                    ⎙
                  </Text>

                  <Text style={styles.actionText}>
                    PRINT
                  </Text>
                </Pressable>
              </View>

              <View style={styles.receiptNote}>
                <Text style={styles.receiptNoteText}>
                  Keep this receipt as proof of payment for
                  your parcel.
                </Text>
              </View>
        </>
      )}
    </>
  );
}

function PaymentOption({ label, icon, selected, onPress }: {
  label: string; icon: string; selected: boolean; onPress: () => void;
}) {
  return (
    <Pressable style={[styles.paymentOption, selected && styles.paymentOptionSelected]} onPress={onPress}>
      <View style={styles.paymentLeft}>
        <Text style={styles.paymentIconSmall}>{icon}</Text>
        <Text style={styles.paymentLabel}>{label}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoCardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

  continueButton: {
    height: 54,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: '#0B1F3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  },

  secondaryButton: {
    height: 48,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE3EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryText: {
    color: '#526276',
    fontSize: 10,
    fontWeight: '900',
  },

  previewHero: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 15,
  },

  previewIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  paymentIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  previewEmoji: {
    fontSize: 28,
  },

  previewTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  previewText: {
    marginTop: 6,
    color: '#8290A1',
    fontSize: 10,
  },

  infoCard: {
    marginTop: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  infoCardTitle: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: '#7D8A9B',
    marginBottom: 10,
  },

  detailRow: {
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },

  detailLabel: {
    fontSize: 7,
    fontWeight: '900',
    color: '#9AA5B3',
    letterSpacing: 0.6,
  },

  detailValue: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '700',
    color: '#182B43',
  },

  totalCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  totalLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  totalHint: {
    marginTop: 3,
    fontSize: 8,
    color: '#8A96A5',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1976D2',
  },

  paymentSummary: {
    backgroundColor: '#0B1F3A',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
  },

  paymentSummaryLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#7DBBFF',
    letterSpacing: 1,
  },

  paymentSummaryAmount: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  paymentReference: {
    marginTop: 6,
    fontSize: 9,
    color: '#B8C8DA',
  },

  paymentOption: {
    height: 62,
    marginTop: 9,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7EBF0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentOptionSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#F7FAFE',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentIconSmall: {
    fontSize: 20,
    marginRight: 11,
  },

  paymentLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#182B43',
  },

  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7D0DA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: '#1976D2',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1976D2',
  },

  paymentNote: {
    marginTop: 13,
    textAlign: 'center',
    fontSize: 9,
    lineHeight: 14,
    color: '#8996A6',
  },

  successHero: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 17,
  },

  successIcon: {
    width: 70,
    height: 70,
    borderRadius: 23,
    backgroundColor: '#E7F6ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  successCheck: {
    fontSize: 34,
    fontWeight: '900',
    color: '#219653',
  },

  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  successText: {
    marginTop: 5,
    fontSize: 10,
    color: '#8290A1',
  },

  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4E9EF',
  },

  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  receiptBrand: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1976D2',
    letterSpacing: 0.7,
  },

  receiptTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  paidBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E7F6ED',
  },

  paidText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#219653',
  },

  receiptDivider: {
    height: 1,
    backgroundColor: '#E9EDF2',
    marginVertical: 13,
  },

  receiptTotal: {
    marginTop: 12,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#E9EDF2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  receiptTotalLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0B1F3A',
  },

  receiptTotalAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1976D2',
  },

  contactCard: {
    marginTop: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7EBF0',
  },

  contactTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#182B43',
  },

  contactDescription: {
    marginTop: 5,
    fontSize: 9,
    lineHeight: 14,
    color: '#8290A1',
  },

  contactBottom: {
    marginTop: 13,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contactRole: {
    fontSize: 9,
    fontWeight: '900',
    color: '#68778A',
  },

  contactPhone: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '800',
    color: '#1976D2',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  actionButton: {
    flex: 1,
    minHeight: 62,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7EBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionIcon: {
    fontSize: 18,
    color: '#1976D2',
    marginBottom: 4,
  },

  actionText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#62748A',
    letterSpacing: 0.5,
  },

  receiptNote: {
    marginTop: 13,
    padding: 12,
    borderRadius: 13,
    backgroundColor: '#EEF4FA',
  },

  receiptNoteText: {
    textAlign: 'center',
    fontSize: 9,
    lineHeight: 14,
    color: '#63748A',
  },
});
