
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DocumentType =
  | 'Passport'
  | 'National ID'
  | 'Driving Licence'
  | 'Other';

export default function VerificationScreen() {
  const router = useRouter();

  const [documentType, setDocumentType] =
    useState<DocumentType>('National ID');

  const [frontSelected, setFrontSelected] = useState(false);
  const [backSelected, setBackSelected] = useState(false);
  const [documentSelected, setDocumentSelected] = useState(false);

  const requiresFrontBack =
    documentType === 'National ID' ||
    documentType === 'Driving Licence';

  const handleDocumentSelection = () => {
    if (documentType === 'Other') {
      setDocumentSelected(true);
      return;
    }

    setFrontSelected(true);

    if (requiresFrontBack) {
      setBackSelected(true);
    }
  };

  const handleSubmit = () => {
    const ready =
      documentType === 'Other'
        ? documentSelected
        : requiresFrontBack
          ? frontSelected && backSelected
          : frontSelected;

    if (!ready) {
      Alert.alert(
        'Documents required',
        'Please provide the required document before continuing.'
      );
      return;
    }

    Alert.alert(
      'Verification submitted',
      'Your identity verification has been submitted. We will review your documents before activating your account.',
      [
        {
          text: 'Continue',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View style={styles.brand}>
            <Text style={styles.brandSmall}>GODSPEED</Text>
            <Text style={styles.brandMain}>MOBILITY</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>STEP 2 OF 2</Text>
          </View>

          <Text style={styles.title}>
            Verify your identity
          </Text>

          <Text style={styles.titleFrench}>
            Vérifiez votre identité
          </Text>

          <Text style={styles.subtitle}>
            To keep GodSpeed Mobility safe for everyone, we need
            to verify your identity before you start travelling.
          </Text>
        </View>

        {/* SECURITY MESSAGE */}
        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Text style={styles.securityEmoji}>🔐</Text>
          </View>

          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>
              Your documents are protected
            </Text>

            <Text style={styles.securityDescription}>
              Your identity information is used for verification
              and account protection.
            </Text>
          </View>
        </View>

        {/* DOCUMENT TYPE */}
        <Text style={styles.sectionTitle}>
          Choose a document
        </Text>

        <Text style={styles.sectionFrench}>
          Choisissez un document
        </Text>

        <View style={styles.documentGrid}>
          <DocumentOption
            icon="🪪"
            title="National ID"
            selected={documentType === 'National ID'}
            onPress={() => {
              setDocumentType('National ID');
              setFrontSelected(false);
              setBackSelected(false);
              setDocumentSelected(false);
            }}
          />

          <DocumentOption
            icon="🌍"
            title="Passport"
            selected={documentType === 'Passport'}
            onPress={() => {
              setDocumentType('Passport');
              setFrontSelected(false);
              setBackSelected(false);
              setDocumentSelected(false);
            }}
          />

          <DocumentOption
            icon="🚘"
            title="Driving Licence"
            selected={documentType === 'Driving Licence'}
            onPress={() => {
              setDocumentType('Driving Licence');
              setFrontSelected(false);
              setBackSelected(false);
              setDocumentSelected(false);
            }}
          />

          <DocumentOption
            icon="📄"
            title="Other"
            selected={documentType === 'Other'}
            onPress={() => {
              setDocumentType('Other');
              setFrontSelected(false);
              setBackSelected(false);
              setDocumentSelected(false);
            }}
          />
        </View>

        {/* UPLOAD AREA */}
        <Text style={styles.sectionTitle}>
          Document upload
        </Text>

        <Text style={styles.sectionFrench}>
          Téléchargement du document
        </Text>

        <View style={styles.uploadCard}>

          {documentType === 'Other' ? (
            <UploadRow
              title="Identity document"
              subtitle="Upload your accepted document"
              selected={documentSelected}
              onPress={handleDocumentSelection}
            />
          ) : (
            <>
              <UploadRow
                title="Front side"
                subtitle="Clear photo of the front"
                selected={frontSelected}
                onPress={handleDocumentSelection}
              />

              {requiresFrontBack && (
                <UploadRow
                  title="Back side"
                  subtitle="Clear photo of the back"
                  selected={backSelected}
                  onPress={handleDocumentSelection}
                />
              )}
            </>
          )}

          <Text style={styles.uploadHint}>
            Use a clear, readable document. Avoid glare,
            blur, or cropped information.
          </Text>

          <Text style={styles.uploadHintFrench}>
            Utilisez un document clair et lisible.
          </Text>
        </View>

        {/* SUBMIT */}
        <Pressable
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            Submit for Verification
          </Text>

          <Text style={styles.submitFrench}>
            Envoyer pour vérification
          </Text>
        </Pressable>

        <Text style={styles.bottomNote}>
          You can complete your verification before booking
          your first journey.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* DOCUMENT OPTION */

function DocumentOption({
  icon,
  title,
  selected,
  onPress,
}: {
  icon: string;
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.documentOption,
        selected && styles.documentOptionSelected,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.documentIcon,
          selected && styles.documentIconSelected,
        ]}
      >
        <Text style={styles.documentEmoji}>{icon}</Text>
      </View>

      <Text
        style={[
          styles.documentTitle,
          selected && styles.documentTitleSelected,
        ]}
      >
        {title}
      </Text>

      {selected && (
        <Text style={styles.selectedCheck}>✓</Text>
      )}
    </Pressable>
  );
}

/* UPLOAD ROW */

function UploadRow({
  title,
  subtitle,
  selected,
  onPress,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.uploadRow} onPress={onPress}>
      <View
        style={[
          styles.uploadIcon,
          selected && styles.uploadIconSelected,
        ]}
      >
        <Text style={styles.uploadEmoji}>
          {selected ? '✓' : '↑'}
        </Text>
      </View>

      <View style={styles.uploadInfo}>
        <Text style={styles.uploadTitle}>{title}</Text>
        <Text style={styles.uploadSubtitle}>{subtitle}</Text>
      </View>

      <Text
        style={[
          styles.uploadAction,
          selected && styles.uploadActionSelected,
        ]}
      >
        {selected ? 'Ready' : 'Upload'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    paddingHorizontal: 22,
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
    borderRadius: 21,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#0B1F3A',
    fontSize: 30,
    lineHeight: 32,
    marginTop: -3,
  },

  brand: {
    alignItems: 'center',
  },

  brandSmall: {
    color: '#1976D2',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 3,
  },

  brandMain: {
    color: '#0B1F3A',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  headerSpacer: {
    width: 42,
  },

  titleSection: {
    marginTop: 24,
    marginBottom: 22,
  },

  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F1FB',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginBottom: 12,
  },

  stepText: {
    color: '#1976D2',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },

  title: {
    color: '#0B1F3A',
    fontSize: 27,
    fontWeight: '900',
  },

  titleFrench: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  subtitle: {
    color: '#718096',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 11,
  },

  securityCard: {
    flexDirection: 'row',
    backgroundColor: '#EAF3FC',
    borderRadius: 18,
    padding: 14,
    marginBottom: 25,
  },

  securityIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  securityEmoji: {
    fontSize: 19,
  },

  securityText: {
    flex: 1,
  },

  securityTitle: {
    color: '#0B1F3A',
    fontSize: 12,
    fontWeight: '800',
  },

  securityDescription: {
    color: '#718096',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },

  sectionTitle: {
    color: '#0B1F3A',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },

  sectionFrench: {
    color: '#8A96A6',
    fontSize: 9,
    marginBottom: 11,
  },

  documentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  documentOption: {
    width: '48.5%',
    minHeight: 91,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E1E7EE',
    padding: 11,
    marginBottom: 9,
    position: 'relative',
  },

  documentOptionSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#EAF3FC',
  },

  documentIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  documentIconSelected: {
    backgroundColor: '#FFFFFF',
  },

  documentEmoji: {
    fontSize: 17,
  },

  documentTitle: {
    color: '#526274',
    fontSize: 11,
    fontWeight: '700',
  },

  documentTitleSelected: {
    color: '#1976D2',
  },

  selectedCheck: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '900',
  },

  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E1E7EE',
    padding: 12,
    marginTop: 2,
  },

  uploadRow: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },

  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadIconSelected: {
    backgroundColor: '#DDF3E5',
  },

  uploadEmoji: {
    color: '#1976D2',
    fontSize: 18,
    fontWeight: '900',
  },

  uploadInfo: {
    flex: 1,
    marginLeft: 11,
  },

  uploadTitle: {
    color: '#172B4D',
    fontSize: 12,
    fontWeight: '800',
  },

  uploadSubtitle: {
    color: '#8A96A6',
    fontSize: 9,
    marginTop: 3,
  },

  uploadAction: {
    color: '#1976D2',
    fontSize: 10,
    fontWeight: '800',
  },

  uploadActionSelected: {
    color: '#29944F',
  },

  uploadHint: {
    color: '#7B899A',
    fontSize: 9,
    lineHeight: 14,
    marginTop: 13,
  },

  uploadHintFrench: {
    color: '#A0AAB6',
    fontSize: 8,
    marginTop: 3,
  },

  submitButton: {
    height: 58,
    borderRadius: 17,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  submitFrench: {
    color: '#D9ECFF',
    fontSize: 9,
    marginTop: 2,
  },

  bottomNote: {
    color: '#8A96A6',
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 13,
  },
});

