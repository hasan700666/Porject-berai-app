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
    StyleSheet,
    Text,
    View
} from "react-native";

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
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.titleText}>Welcome to BERAI</Text>
            <Text style={styles.subText}>Start exploring your favorite places</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    titleText: {
        fontFamily: "Inter_700Bold",
        fontSize: 24,
        color: "#1E293B",
        marginBottom: 8,
        textAlign: "center",
    },
    subText: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
    },
});
