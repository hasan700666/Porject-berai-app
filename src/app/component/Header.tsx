import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerContent}>
        {/* Brand/Logo */}
        <Text style={styles.logoText}>BERAI</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  logoText: {
    fontFamily: 'Chango_400Regular',
    fontSize: 22,
    color: '#1E293B',
    letterSpacing: 1,
  },
})
