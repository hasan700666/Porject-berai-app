import { Chango_400Regular } from "@expo-google-fonts/chango/400Regular";
import { useFonts } from "@expo-google-fonts/chango/useFonts";
import { Stack } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const index = () => {
  let [ChangoFontsLoaded] = useFonts({
    Chango_400Regular,
  });

  if (!ChangoFontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        style={styles.container}
        resizeMode="contain"
        source={require("../../assets/images/splash_screen.jpg")}
      />
      <Text
        style={{
          fontFamily: "Chango_400Regular",
          paddingTop: 600,
          fontSize: 30,
          color: "white",
        }}
      >
        Berai
      </Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  // Untitled-2-01 (ব্যাকগ্রাউন্ড বা মেইন কন্টেইনার)
  container: {
    position: "absolute",
    width: 1000,
    height: 1000,
  },
});
