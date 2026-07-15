import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

function RootLayoutContent() {
  const { session, isLoading } = useAuth(); // AuthContext থেকে নিন

  useEffect(() => {
  if (isLoading) return;

  // সেশন থাকলে এবং সেশনটি যদি ভ্যালিড হয়, তবেই /main-এ পাঠান
  if (session) {
    router.replace("/main");
  } else {
    // সেশন না থাকলে /welcome-এ পাঠান
    router.replace("/welcome");
  }
}, [session, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}