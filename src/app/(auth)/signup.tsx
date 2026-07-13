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

const { width } = Dimensions.get("window");

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Chango_400Regular
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E7F18C" />
      </View>
    );
  }

  const handleSignup = () => {
    console.log("Signup pressed:", email, password);
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background Blobs for Design Aesthetics */}
      <View style={styles.topLeftBlob} pointerEvents="none" />
      <View style={styles.bottomLeftBlob} pointerEvents="none" />

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
            <Text style={styles.headerText}>SIGNUP</Text>
          </View>

          {/* Illustration */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/welcome_img/signup.png")}
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
                { backgroundColor: "#A8DBF4" },
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
                { backgroundColor: "#E7F18C" },
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

            {/* Signup Button */}
            <Pressable
              onPress={handleSignup}
              style={({ pressed }) => [
                styles.signupButton,
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text style={styles.signupButtonText}>SIGNUP</Text>
            </Pressable>
          </View>

          {/* Sign In Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an Account ? </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.footerLink}>Sign In</Text>
            </Pressable>
          </View>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Social Login */}
          <Pressable
            onPress={() => console.log("Google Sign In pressed")}
            style={({ pressed }) => [
              styles.googleButton,
              pressed && { backgroundColor: "#F8FAFC" },
            ]}
          >
            <Image source={require("@/assets/images/search.png")} style={{ width: 20, height: 20, marginRight: 12 }} />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </Pressable>
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
  signupButton: {
    borderRadius: 30,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#BCEB07",
    shadowColor: "#BCEB07",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  signupButtonText: {
    color: "#1E293B",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    letterSpacing: 1.2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
    zIndex: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#94A3B8",
    marginHorizontal: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 10,
    zIndex: 10,
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#1E293B",
  },

  // Background blobs for visual premium decoration
  topLeftBlob: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#E7F18C",
    opacity: 0.15,
    top: -50,
    left: -50,
  },
  bottomLeftBlob: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#A8DBF4",
    opacity: 0.18,
    bottom: -40,
    left: -50,
  },
});
