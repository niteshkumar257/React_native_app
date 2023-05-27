import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './Components/AppNavigator'
import { AuthProvider } from './Components/Context/Context'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Store from "./Components/Redux/Store";
import { Provider } from 'react-redux';


 


const App = () => {
 
  return (
    <SafeAreaProvider>

    <Provider store={Store}>

    <AuthProvider>
          <AppNavigator/>
    </AuthProvider>
    </Provider>
    </SafeAreaProvider>
    // <View>
    //   <Text>sddgblbj</Text>
    // </View>
  
  )
}

export default App