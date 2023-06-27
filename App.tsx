import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './Components/AppNavigator'
import { AuthProvider } from './Components/Context/Context'
import { StudentProvider } from './Components/Context/StudentConext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Store from "./Components/Redux/Store";
import { Provider } from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
 


const App = () => {
 
  return (
    <QueryClientProvider client={queryClient}>
   <SafeAreaProvider>

<Provider store={Store}>

<AuthProvider>
  <StudentProvider>
  <AppNavigator/>
  </StudentProvider>
    
</AuthProvider>
</Provider>
</SafeAreaProvider>
  </QueryClientProvider>
   
    // <View>
    //   <Text>sddgblbj</Text>
    // </View>
  
  )
}

export default App