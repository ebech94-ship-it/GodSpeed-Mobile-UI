import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth, db, storage } from '@/firebase/config';

type DocumentType =
  | 'Passport'
  | 'National ID'
  | 'Driving Licence'
  | 'Other';

type DocumentSide = 'front' | 'back' | 'document';

type SelectedImage = {
  uri: string;
  fileName?: string;
};

export default function VerificationScreen() {
  const router = useRouter();

  const [documentType, setDocumentType] =
    useState<DocumentType>('National ID');

  const [frontImage, setFrontImage] =
    useState<SelectedImage | null>(null);

  const [backImage, setBackImage] =
    useState<SelectedImage | null>(null);

  const [documentImage, setDocumentImage] =
    useState<SelectedImage | null>(null);

  const [activeSide, setActiveSide] =
    useState<DocumentSide | null>(null);

  const [showSourceModal, setShowSourceModal] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);

  const requiresFrontBack =
    documentType === 'National ID' ||
    documentType === 'Driving Licence';

  const getCurrentImage = () => {
    if (activeSide === 'front') return frontImage;
    if (activeSide === 'back') return backImage;
    return documentImage;
  };

  const setCurrentImage = (image: SelectedImage | null) => {
    if (activeSide === 'front') {
      setFrontImage(image);
    } else if (activeSide === 'back') {
      setBackImage(image);
    } else if (activeSide === 'document') {
      setDocumentImage(image);
    }
  };

  const openUploadOptions = (side: DocumentSide) => {
    setActiveSide(side);
    setShowSourceModal(true);
  };

  const chooseFromGallery = async () => {
    setShowSourceModal(false);

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Photo access needed',
        'Please allow photo access so you can select your document.'
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.9,
        aspect: [4, 3],
      });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    const asset = result.assets[0];

    setCurrentImage({
      uri: asset.uri,
      fileName: asset.fileName ?? undefined,
    });
  };

  const takePhoto = async () => {
    setShowSourceModal(false);

    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Camera access needed',
        'Please allow camera access so you can take a document photo.'
      );
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.9,
        aspect: [4, 3],
      });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    const asset = result.assets[0];

    setCurrentImage({
      uri: asset.uri,
      fileName: asset.fileName ?? undefined,
    });
  };

  const removeCurrentImage = () => {
    setCurrentImage(null);
  };

  const resetDocumentSelection = (
    type: DocumentType
  ) => {
    setDocumentType(type);
    setFrontImage(null);
    setBackImage(null);
    setDocumentImage(null);
  };

  const uploadImage = async (
    image: SelectedImage,
    side: DocumentSide
  ) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user found.');
    }

    const response = await fetch(image.uri);
    const blob = await response.blob();

    const extension =
      image.fileName?.split('.').pop() || 'jpg';

    const storagePath =
      `verification/${user.uid}/${side}-${Date.now()}.${extension}`;

    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });

    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    const ready =
      documentType === 'Other'
        ? !!documentImage
        : requiresFrontBack
          ? !!frontImage && !!backImage
          : !!frontImage;

    if (!ready) {
      Alert.alert(
        'Documents required',
        requiresFrontBack
          ? 'Please provide both the front and back of your document.'
          : 'Please provide your document before continuing.'
      );
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        'Session expired',
        'Please log in again before submitting your verification.'
      );
      router.replace('/auth');
      return;
    }

    try {
      setSubmitting(true);

      let frontUrl: string | null = null;
      let backUrl: string | null = null;
      let documentUrl: string | null = null;

      if (documentType === 'Other') {
        documentUrl = await uploadImage(
          documentImage!,
          'document'
        );
      } else {
        frontUrl = await uploadImage(
          frontImage!,
          'front'
        );

        if (requiresFrontBack) {
          backUrl = await uploadImage(
            backImage!,
            'back'
          );
        }
      }

      await updateDoc(
        doc(db, 'users', user.uid),
        {
          verification: {
            status: 'verified',
            documentType,
            frontUrl,
            backUrl,
            documentUrl,
            submittedAt: serverTimestamp(),
          },
          accountStatus: 'active',
identity: {
  verified: true,
  verifiedAt: serverTimestamp(),
},
updatedAt: serverTimestamp(),
        }
      );

      Alert.alert(
        'Verification complete',
        'Your identity verification is complete. Your GodSpeed Mobility account is now active.',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error) {
      console.error('Verification upload error:', error);

      Alert.alert(
        'Upload failed',
        'We could not upload your documents. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderUploadRow = (
    side: DocumentSide,
    title: string,
    subtitle: string,
    image: SelectedImage | null
  ) => {
    return (
      <View style={styles.uploadItem}>
        <Pressable
          style={styles.uploadRow}
          onPress={() => openUploadOptions(side)}
          disabled={submitting}
        >
          <View
            style={[
              styles.uploadIcon,
              image && styles.uploadIconSelected,
            ]}
          >
            {image ? (
              <Text style={styles.checkIcon}>✓</Text>
            ) : (
              <Text style={styles.uploadEmoji}>↑</Text>
            )}
          </View>

          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>
              {title}
            </Text>

            <Text style={styles.uploadSubtitle}>
              {image
                ? 'Document selected'
                : subtitle}
            </Text>
          </View>

          <Text
            style={[
              styles.uploadAction,
              image && styles.uploadActionSelected,
            ]}
          >
            {image ? 'Change' : 'Add'}
          </Text>
        </Pressable>

        {image && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: image.uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />

            <View style={styles.previewOverlay}>
              <Text style={styles.previewText}>
                Preview
              </Text>

              <Pressable
                style={styles.removeButton}
                onPress={removeCurrentImage}
                disabled={submitting}
                onPressIn={() => setActiveSide(side)}
              >
                <Text style={styles.removeText}>
                  Remove
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
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
            disabled={submitting}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View style={styles.brand}>
            <Text style={styles.brandSmall}>
              GODSPEED
            </Text>

            <Text style={styles.brandMain}>
              MOBILITY
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>
              STEP 2 OF 2
            </Text>
          </View>

          <Text style={styles.title}>
            Verify your identity
          </Text>

          <Text style={styles.titleFrench}>
            Vérifiez votre identité
          </Text>

          <Text style={styles.subtitle}>
            Upload a clear identity document to help keep
            GodSpeed Mobility safe and trusted.
          </Text>
        </View>

        {/* SECURITY */}
        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Text style={styles.securityEmoji}>
              🔐
            </Text>
          </View>

          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>
              Your documents are protected
            </Text>

            <Text style={styles.securityDescription}>
              Your documents are securely stored for
              verification and account protection.
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
            onPress={() =>
              resetDocumentSelection('National ID')
            }
          />

          <DocumentOption
            icon="🌍"
            title="Passport"
            selected={documentType === 'Passport'}
            onPress={() =>
              resetDocumentSelection('Passport')
            }
          />

          <DocumentOption
            icon="🚘"
            title="Driving Licence"
            selected={
              documentType === 'Driving Licence'
            }
            onPress={() =>
              resetDocumentSelection('Driving Licence')
            }
          />

          <DocumentOption
            icon="📄"
            title="Other"
            selected={documentType === 'Other'}
            onPress={() =>
              resetDocumentSelection('Other')
            }
          />
        </View>

        {/* UPLOAD */}
        <Text style={styles.sectionTitle}>
          Document upload
        </Text>

        <Text style={styles.sectionFrench}>
          Téléchargement du document
        </Text>

        <View style={styles.uploadCard}>
          {documentType === 'Other' ? (
            renderUploadRow(
              'document',
              'Identity document',
              'Upload your accepted document',
              documentImage
            )
          ) : (
            <>
              {renderUploadRow(
                'front',
                'Front side',
                'Clear photo of the front',
                frontImage
              )}

              {requiresFrontBack &&
                renderUploadRow(
                  'back',
                  'Back side',
                  'Clear photo of the back',
                  backImage
                )}
            </>
          )}

          <View style={styles.uploadHintBox}>
            <Text style={styles.uploadHint}>
              Use a clear, readable document. Avoid glare,
              blur, or cropped information.
            </Text>

            <Text style={styles.uploadHintFrench}>
              Utilisez un document clair et lisible.
            </Text>
          </View>
        </View>

        {/* SIMPLE PRIVACY NOTE */}
        <View style={styles.privacyRow}>
          <Text style={styles.privacyIcon}>✓</Text>

          <Text style={styles.privacyText}>
            No selfie or face verification is required.
          </Text>
        </View>

        {/* SUBMIT */}
        <Pressable
          style={[
            styles.submitButton,
            submitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <ActivityIndicator
                color="#FFFFFF"
                size="small"
              />

              <Text style={styles.submitLoadingText}>
                Uploading securely...
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.submitText}>
                Submit for Verification
              </Text>

              <Text style={styles.submitFrench}>
                Envoyer pour vérification
              </Text>
            </>
          )}
        </Pressable>

        <Text style={styles.bottomNote}>
          Your verification will be reviewed before your
          account is fully activated.
        </Text>
      </ScrollView>

      {/* PHOTO SOURCE MODAL */}
      <Modal
        visible={showSourceModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowSourceModal(false)
        }
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowSourceModal(false)}
        >
          <Pressable
            style={styles.sourceCard}
            onPress={() => {}}
          >
            <View style={styles.modalHandle} />

            <Text style={styles.sourceTitle}>
              Add document photo
            </Text>

            <Text style={styles.sourceSubtitle}>
              Choose how you want to provide this document.
            </Text>

            <Pressable
              style={styles.sourceOption}
              onPress={chooseFromGallery}
            >
              <View style={styles.sourceIcon}>
                <Text>🖼️</Text>
              </View>

              <View style={styles.sourceInfo}>
                <Text style={styles.sourceOptionTitle}>
                  Choose from phone
                </Text>

                <Text style={styles.sourceOptionText}>
                  Select an existing document photo
                </Text>
              </View>

              <Text style={styles.sourceArrow}>
                ›
              </Text>
            </Pressable>

            <Pressable
              style={styles.sourceOption}
              onPress={takePhoto}
            >
              <View style={styles.sourceIcon}>
                <Text>📷</Text>
              </View>

              <View style={styles.sourceInfo}>
                <Text style={styles.sourceOptionTitle}>
                  Take a photo
                </Text>

                <Text style={styles.sourceOptionText}>
                  Use your phone camera
                </Text>
              </View>

              <Text style={styles.sourceArrow}>
                ›
              </Text>
            </Pressable>

            <Text style={styles.cropNote}>
              You can crop the photo before confirming it.
            </Text>

            <Pressable
              style={styles.cancelButton}
              onPress={() =>
                setShowSourceModal(false)
              }
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
        selected &&
          styles.documentOptionSelected,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.documentIcon,
          selected &&
            styles.documentIconSelected,
        ]}
      >
        <Text style={styles.documentEmoji}>
          {icon}
        </Text>
      </View>

      <Text
        style={[
          styles.documentTitle,
          selected &&
            styles.documentTitleSelected,
        ]}
      >
        {title}
      </Text>

      {selected && (
        <Text style={styles.selectedCheck}>
          ✓
        </Text>
      )}
    </Pressable>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    paddingHorizontal: 22,
    paddingBottom: 40,
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

  uploadItem: {
    marginBottom: 8,
  },

  uploadRow: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
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

  checkIcon: {
    color: '#29944F',
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

  previewContainer: {
    height: 145,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#EEF2F6',
    marginBottom: 7,
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  previewOverlay: {
    position: 'absolute',
    left: 9,
    right: 9,
    bottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  previewText: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(11,31,58,0.78)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 9,
    fontWeight: '800',
  },

  removeButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  removeText: {
    color: '#D64545',
    fontSize: 9,
    fontWeight: '800',
  },

  uploadHintBox: {
    borderTopWidth: 1,
    borderTopColor: '#EEF1F5',
    paddingTop: 12,
    marginTop: 4,
  },

  uploadHint: {
    color: '#7B899A',
    fontSize: 9,
    lineHeight: 14,
  },

  uploadHintFrench: {
    color: '#A0AAB6',
    fontSize: 8,
    marginTop: 3,
  },

  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 4,
  },

  privacyIcon: {
    color: '#29944F',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 7,
  },

  privacyText: {
    color: '#718096',
    fontSize: 10,
  },

  submitButton: {
    minHeight: 58,
    borderRadius: 17,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  submitButtonDisabled: {
    opacity: 0.75,
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

  submitLoadingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 5,
  },

  bottomNote: {
    color: '#8A96A6',
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 13,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(11,31,58,0.45)',
    justifyContent: 'flex-end',
  },

  sourceCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 30,
  },

  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D6DDE5',
    alignSelf: 'center',
    marginBottom: 20,
  },

  sourceTitle: {
    color: '#0B1F3A',
    fontSize: 19,
    fontWeight: '900',
  },

  sourceSubtitle: {
    color: '#7B899A',
    fontSize: 10,
    marginTop: 5,
    marginBottom: 18,
  },

  sourceOption: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E7EE',
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  sourceIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EAF3FC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sourceInfo: {
    flex: 1,
    marginLeft: 11,
  },

  sourceOptionTitle: {
    color: '#172B4D',
    fontSize: 12,
    fontWeight: '800',
  },

  sourceOptionText: {
    color: '#8A96A6',
    fontSize: 9,
    marginTop: 3,
  },

  sourceArrow: {
    color: '#1976D2',
    fontSize: 25,
    fontWeight: '300',
  },

  cropNote: {
    color: '#8A96A6',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 15,
  },

  cancelButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#526274',
    fontSize: 12,
    fontWeight: '800',
  },
});