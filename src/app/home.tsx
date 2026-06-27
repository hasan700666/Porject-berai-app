import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// 1. Import useFonts and the specific Chango weight variant
import { Chango_400Regular, useFonts } from "@expo-google-fonts/chango";
import { Stack } from "expo-router";

export default function home() {
  // 2. Load the font asynchronously
  let [fontsLoaded] = useFonts({
    Chango_400Regular,
  });

  // 3. Show a loading indicator until the font is ready
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // 4. Apply the font to the text styling
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.changoText}>Whereas recogni</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  changoText: {
    fontFamily: "Chango_400Regular", // 👈 This must match the name imported above
    fontSize: 32,
  },
});
