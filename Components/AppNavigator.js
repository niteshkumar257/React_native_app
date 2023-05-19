import {View, Text} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './normal/Login';
import Parent from './normal/Home';
import ChangePassword from  "./normal/ChangePassword";
import Children from './normal/Children';
import Parentsprofile from './normal/Parentsprofile';
import Notification from './normal/Notification';
import Notfound from './normal/Notfound';
import Student from './normal/Student';
import Logo from "./normal/Logo";
  
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer
    >
      <Stack.Navigator
       screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#318CE7' },
      }}
      >
      <Stack.Screen
          name="logo"
          component={Logo}
          options={{ title: 'Student' ,headerShown:false}}
        />
        <Stack.Screen
          name="login"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={Parent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="children"
          component={Children}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="parentProfile"
          component={Parentsprofile}
          options={{ title: 'Profile' }}
        />
         <Stack.Screen
          name="notification"
          component={Notification}
          options={{ title: 'Notifications' }}
        />
          <Stack.Screen
          name="notfound"
          component={Notfound}
          options={{title:'Notfound',headerShown:false}}
          
          />
         <Stack.Screen
          name="student"
          component={Student}
          options={{ title: 'Student' ,headerShown:false}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
