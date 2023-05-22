import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './Components/AppNavigator'
import { AuthProvider } from './Components/Context/Context'
import { SafeAreaProvider } from 'react-native-safe-area-context';


 


const App = () => {
 
  return (
    <SafeAreaProvider>

    <AuthProvider>
          <AppNavigator/>
    </AuthProvider>
    </SafeAreaProvider>
    // <View>
    //   <Text>sddgblbj</Text>
    // </View>
  
  )
}

export default App