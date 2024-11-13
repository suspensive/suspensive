import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import { Slot } from 'expo-router'
import { Providers } from '@/src/providers'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <Providers>
      <Slot />
    </Providers>
  )
}
