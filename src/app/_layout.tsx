import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import * as Sentry from "@sentry/react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

Sentry.init({
  dsn: "https://10da902e3ecbf49534b8e4c9faa66cc0@o4511369366077440.ingest.us.sentry.io/4511369379053568",
  sendDefaultPii: true,
  // Enable Logs
  enableLogs: true,
  integrations: [Sentry.feedbackIntegration()],
});

export default Sentry.wrap(function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
});
