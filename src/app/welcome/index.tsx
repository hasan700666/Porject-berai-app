import { Chango_400Regular } from "@expo-google-fonts/chango";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts
} from "@expo-google-fonts/inter";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Welcome() {
  const router = useRouter();

  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Chango_400Regular,
  });

  // Animated values for entrance animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#46BCEE" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>WELCOME</Text>
        </View>

        {/* Central Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/welcome_img/welcome.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Buttons (CTA) */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              console.log("Login pressed");
              router.push("/login");
            }}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: "#46BCEE",
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>LOGIN</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              console.log("Signup pressed");
              router.push("/signup");
            }}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: "#BCEB07",
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text style={[styles.buttonText, { color: "#1E293B" }]}>SIGNUP</Text>
          </Pressable>
        </View>
      </Animated.View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  title: {
    fontFamily: "Chango_400Regular",
    fontSize: 25,
    color: "#1E293B",
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: 1000,
    height: "100%",
    maxHeight: 550,
  },
  buttonContainer: {
    width: "100%",
    gap: 14,
    marginBottom: 20,
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
  buttonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    letterSpacing: 0.8,
  },
});
