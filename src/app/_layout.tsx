import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

function RootLayoutContent() {
  const { session, isLoading } = useAuth(); // AuthContext থেকে নিন

  useEffect(() => {
    if (isLoading) return; // সেশন লোড না হওয়া পর্যন্ত অপেক্ষা করুন

    if (!session) {
      // সেশন না থাকলে সাইনআপে পাঠান
      router.replace("/welcome");
    } else {
      // সেশন থাকলে মেইন অ্যাপে পাঠান
      router.replace("/main");
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