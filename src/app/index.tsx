import { Stack } from "expo-router";
import { Image, View } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require("./assets/images/Untitled-2-01.jpg")} />
    </View>
  );
};

export default index;
