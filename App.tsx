import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './Components/AppNavigator'
import { AuthProvider } from './Components/Context/Context'


 


const App = () => {
 
  return (
    <AuthProvider>
          <AppNavigator/>
    </AuthProvider>
    // <View>
    //   <Text>sddgblbj</Text>
    // </View>
  
  )
}

export default App