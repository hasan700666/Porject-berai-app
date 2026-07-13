import { Slot, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Header from '../component/Header';
import Navbar from '../component/Navbar';

const layout = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Header />
            <View style={styles.content}>
                <Slot />
            </View>
            <Navbar />
        </View>
    );
};

export default layout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
});
