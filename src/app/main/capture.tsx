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
import { Camera, MapPin, Sparkles } from 'lucide-react-native';
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function CaptureScreen() {
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

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#46BCEE" />
      </View>
    );
  }

  const handlePublish = () => {
    if (!caption.trim() || !location.trim()) {
      alert("Please fill in both the caption and location!");
      return;
    }
    
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert("Voyage published successfully! 🚀");
      // Go back to the main feed
      router.replace("/main");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>CAPTURE VOYAGE</Text>
          <Text style={styles.pageSubtitle}>Share your latest adventure with the world</Text>
        </View>

        {/* Upload Container */}
        <Pressable onPress={() => alert("Photo library / Camera option coming soon!")} style={styles.uploadCard}>
          <View style={styles.uploadContent}>
            <View style={styles.iconCircle}>
              <Camera size={32} color="#46BCEE" />
            </View>
            <Text style={styles.uploadTitle}>Snap or Upload Photo</Text>
            <Text style={styles.uploadSubtitle}>Supports JPEG, PNG up to 10MB</Text>
          </View>
        </Pressable>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Caption Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Sparkles size={16} color="#64748B" />
              <Text style={styles.inputLabel}>Caption</Text>
            </View>
            <TextInput
              style={styles.textInputMultiline}
              placeholder="What makes this place magical?"
              placeholderTextColor="#94A3B8"
              value={caption}
              onChangeText={setCaption}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Location Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <MapPin size={16} color="#000000" />
              <Text style={styles.inputLabel}>Location</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Kyoto, Japan"
              placeholderTextColor="#94A3B8"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Publish Button */}
          <Pressable
            onPress={handlePublish}
            disabled={isPublishing}
            style={({ pressed }) => [
              styles.publishButton,
              pressed && styles.publishButtonPressed,
              isPublishing && styles.publishButtonDisabled
            ]}
          >
            {isPublishing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.publishButtonText}>PUBLISH VOYAGE</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerSection: {
    marginBottom: 24,
    alignItems: "flex-start",
  },
  pageTitle: {
    fontFamily: "Chango_400Regular",
    fontSize: 22,
    color: "#0F172A",
    marginBottom: 6,
  },
  pageSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#64748B",
  },
  uploadCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  uploadContent: {
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#0F172A",
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#94A3B8",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  inputLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#334155",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  textInputMultiline: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
    height: 100,
    textAlignVertical: "top",
  },
  publishButton: {
    backgroundColor: "#46BCEE",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#46BCEE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  publishButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  publishButtonDisabled: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0,
    elevation: 0,
  },
  publishButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
});
