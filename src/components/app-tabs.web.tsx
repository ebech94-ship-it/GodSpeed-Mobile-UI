import { Stack } from 'expo-router';

export default function AppTabs() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* MAIN NAVIGATION */}
      <Stack.Screen name="index" />
      <Stack.Screen name="trips" />
      <Stack.Screen name="tickets" />

      {/* BOOKING FLOW */}
      <Stack.Screen name="booking" />
      <Stack.Screen name="passenger" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="ticket" />
      <Stack.Screen name="receipt" />

      {/* MORE */}
      <Stack.Screen name="profile" />
      <Stack.Screen name="tracking" />
      <Stack.Screen name="parcel" />
      <Stack.Screen name="luggage" />
      <Stack.Screen name="payments" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="support" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}