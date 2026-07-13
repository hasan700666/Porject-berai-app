import { usePathname, useRouter } from 'expo-router';
import { Aperture, Images, User } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Navbar = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab from current route path
  let activeTab = 'Voyage';
  if (pathname.includes('/capture')) {
    activeTab = 'Capture';
  } else if (pathname.includes('/atlas')) {
    activeTab = 'Atlas';
  }

  const tabs = [
    { id: 'Voyage', Icon: Images, label: 'Voyage', route: '/main/voyage' },
    { id: 'Capture', Icon: Aperture, label: 'Capture', route: '/main/capture' },
    { id: 'Atlas', Icon: User, label: 'Atlas', route: '/main/atlas' },
  ]

  return (
    <View style={[styles.navbarContainer, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.navbarContent}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const IconComponent = tab.Icon
          return (
            <Pressable
              key={tab.id}
              onPress={() => router.replace(tab.route as any )}
              style={({ pressed }) => [
                styles.tabButton,
                pressed && styles.tabPressed,
              ]}
            >
              <IconComponent
                size={22}
                color={isActive ? '#46BCEE' : '#64748B'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 8,
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  tabPressed: {
    opacity: 0.7,
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#46BCEE',
    fontFamily: 'Inter_700Bold',
  },
})
