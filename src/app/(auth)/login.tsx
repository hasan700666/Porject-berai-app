import { Chango_400Regular } from "@expo-google-fonts/chango";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Chango_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A8DBF4" />
      </View>
    );
  }
 
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Login Error", error.message);
        return;
      }

      if (data.session) {
        router.replace("/main");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background Blobs for Design Aesthetics */}
      <View style={styles.topLeftBlob1} pointerEvents="none" />
      <View style={styles.topLeftBlob2} pointerEvents="none" />
      <View style={styles.bottomRightBlob} pointerEvents="none" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>LOGIN</Text>
          </View>

          {/* Illustration */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/welcome_img/login.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: "#E7F18C" },
                emailFocused && styles.inputFocused,
              ]}
            >
              <Ionicons name="person" size={20} color="#1E293B" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Peeely@mail.com"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            {/* Password Field */}
            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: "#A8DBF4" },
                passwordFocused && styles.inputFocused,
              ]}
            >
              <Ionicons name="lock-closed" size={20} color="#1E293B" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#1E293B"
                />
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: "#46BCEE",
                  transform: [{ scale: (pressed || isLoading) ? 0.98 : 1 }],
                  opacity: isLoading ? 0.8 : 1,
                }
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>LOGIN</Text>
              )}
            </Pressable>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an Account ? </Text>
            <Pressable onPress={() => router.push("/signup")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 24,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    zIndex: 10,
  },
  headerText: {
    fontFamily: "Chango_400Regular",
    fontSize: 25,
    color: "#1E293B",
    letterSpacing: 1.2,
  },
  imageContainer: {
    width: "100%",
    height: 330,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    zIndex: 10,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    width: "100%",
    gap: 16,
    zIndex: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    height: 56,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: "#475569",
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#1E293B",
  },
  eyeIcon: {
    padding: 4,
  },
  gradientButton: {
    borderRadius: 30,
    width: "100%",
    height: 56,
    marginTop: 10,
    shadowColor: "#A8DBF4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#1E293B",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    letterSpacing: 1.2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    zIndex: 10,
  },
  footerText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#000000",
  },
  footerLink: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#000000",
    textDecorationLine: "underline",
  },

  // Background Blob styling for premium visual aesthetics
  topLeftBlob1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#A8DBF4",
    opacity: 0.15,
    top: -50,
    left: -50,
  },
  topLeftBlob2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E7F18C",
    opacity: 0.2,
    top: 50,
    left: -40,
  },
  bottomRightBlob: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#A8DBF4",
    opacity: 0.18,
    bottom: -60,
    right: -60,
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
});