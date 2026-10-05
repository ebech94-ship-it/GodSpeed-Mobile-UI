
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AuthProvider } from '@/auth/AuthContext';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

function AppTheme() {
  useEffect(() => {
  SplashScreen.hideAsync();
}, []);
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettings();

  const colorScheme =
    themeMode === 'system' ? systemColorScheme : themeMode;

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <SafeAreaProvider>
        <AnimatedSplashOverlay />
        <AppTabs />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppTheme />
      </SettingsProvider>
    </AuthProvider>
  );
}

