
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type VerificationStatus =
  | "verified"
  | "pending"
  | "unverified"
  | "not_started";

type UserProfile = {
  uid?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  role?: string;
  accountStatus?: string;
  trips?: number;
  tickets?: number;
  createdAt?: any;
  updatedAt?: any;

  preferences?: {
     notifications?: boolean; 
    tripUpdates?: boolean;
     promotions?: boolean; 
     location?: boolean; 
     language?: 'English' | 'Français';
     };
  verification?: {
    status?: VerificationStatus;
    documentType?: string;
    frontUrl?: string;
    backUrl?: string;
    documentUrl?: string;
    submittedAt?: any;
  };
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  verificationStatus: VerificationStatus;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  verificationStatus: "not_started",
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("not_started");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // Stop listening to the previous user's profile
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      setUser(currentUser);

      // No logged-in user
      if (!currentUser) {
        setProfile(null);
        setVerificationStatus("not_started");
        setLoading(false);
        return;
      }

      // Logged-in user: now listen to their Firestore profile
      const profileRef = doc(db, "users", currentUser.uid);

      unsubscribeProfile = onSnapshot(
        profileRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as UserProfile;

            setProfile({
              uid: currentUser.uid,
              ...data,
            });

            setVerificationStatus(
              data.verification?.status || "unverified"
            );
          } else {
            // Firebase account exists but profile does not
            setProfile(null);
            setVerificationStatus("unverified");
          }

          setLoading(false);
        },
        (error) => {
          console.error("🔥 PROFILE LISTENER ERROR:", error);

          setProfile(null);
          setVerificationStatus("unverified");
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        verificationStatus,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
