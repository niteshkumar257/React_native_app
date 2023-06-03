import {View, Text} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Stack/Login';
import Parent from './Stack/Home';
import ChangePassword from  "./Stack/ChangePassword";
import Children from './Stack/Children';
import Parentsprofile from './Stack/Parentsprofile';
import Notification from './Stack/Notification';
import Notfound from './Stack/Notfound';
import Student from "./Stack/Student"
import Logo from "./Stack/Logo";
import Success from './Stack/Success';
import {COLORS} from "./Utils/Colors/Colors"
  
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer
    >
      <Stack.Navigator
       screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor:COLORS.mainColor3 },
       
      }}
      >
     
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
          options={{headerShown: true,title:"",
            headerStyle: {
              backgroundColor:COLORS.backgGroundColor, 
              borderBottomWidth: 0,
              elevation: 0,
            
  shadowOpacity: 0,
            
              // Change this to your desired color
            },
            headerTintColor: 'black',
            headerShadowVisible: false,
          }}
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
         <Stack.Screen
          name="success"
          component={Success}
          options={{ title: '' ,headerShown:true,
          headerStyle: {
            backgroundColor: COLORS.backgGroundColor, // Change this to your desired color
          },
          headerTintColor:"black",
          headerShadowVisible:false,
        }}
         
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
