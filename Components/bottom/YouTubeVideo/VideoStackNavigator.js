import { View, Text } from 'react-native'
import React from 'react'
import Video from './VideosScreen'
import Biology from '../Biology';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoVideos from './NoVideos';

const VideoStackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{
        headerTintColor: 'black',
        headerShown:false,
        animation: 'slide_from_right',
        headerStyle: { backgroundColor: 'white' },
      }}
    >
        <Stack.Screen 
          name="video"
          component={Video}
          options={{ title: 'All Subjects'}}
        />
         <Stack.Screen 
          name="subject"
          component={Biology}
          options={{ title: 'Subject wise'}}
        />
         <Stack.Screen 
          name="noVideos"
          component={NoVideos}
          options={{ title: 'No Videos'}}
        />
    </Stack.Navigator>
  )
}

export default VideoStackNavigator