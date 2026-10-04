
import { useAuth } from '@/auth/AuthContext';
import { useColorScheme } from 'react-native';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ThemeMode = 'system' | 'light' | 'dark';

type SettingsContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const systemScheme = useColorScheme();

  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!profile?.preferences) return;

    setThemeMode(profile.preferences.themeMode ?? 'system');
    setSoundEnabled(profile.preferences.soundEnabled ?? true);
  }, [profile]);

  return (
    <SettingsContext.Provider
      value={{
        themeMode,
        setThemeMode,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }

  return context;
}

