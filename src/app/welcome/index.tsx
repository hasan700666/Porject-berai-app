// 1. Import Pressable or TouchableOpacity from react-native
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 2. Swap <Button> for <Pressable> which accepts any React nodes as children */}
      <Pressable
        onPress={() => console.log("Button pressed!")}
        style={styles.button}
      >
        <MaterialCommunityIcons name="arrow-up-bold" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginTop: 10,
  },
});
