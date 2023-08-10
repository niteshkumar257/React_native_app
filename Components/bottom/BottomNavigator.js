import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CurriculumPage from './Curriculum/Curriculum';
import FeePage from './Fee/FeeScreen';
import PerfomancePage from './Perfomance/PerfomanceScreen';
import MentorRequestPage from './Mentor/MentorScreen';

import VideoStackNavigator from './YouTubeVideo/VideoStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import DataContext from '../Context/DataContext';

const Bottom = createBottomTabNavigator();
const BottomNavigator = ({id}) => {
  const Tab = createBottomTabNavigator();
  return (
    <DataContext.Provider value={{id}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarLabel: 'nitesh',
          headerShown: false,
          tabBarInactiveTintColor: '#333333',
          tabBarActiveBackgroundColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarActiveTintColor: 'white',
          tabBarStyle: {
            borderTopWidth: 0.552,
            borderTopColor: '#333333',
            height: 40,
          },

          tabBarHeaderStyle: {},

          tabBarIconStyle: {},
          tabBarLabelStyle: {
            fontSize: 20,
            color: 'red',
          },
          tabBarOptions: {
            activeTintColor: '#cd077d',
          },

          tabBarIcon: ({color, size = 30, focused}) => {
            let iconName;

            if (route.name === 'Curriculum') {
              iconName = focused ? 'school-sharp' : 'school-outline';
            } else if (route.name === 'Fees') {
              iconName = focused ? 'wallet-sharp' : 'wallet-outline';
            } else if (route.name === 'Peformance') {
              iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
            } else if (route.name === 'Mentor') {
              iconName = focused ? 'people-sharp' : 'people-outline';
            } else if (route.name === 'Subjects') {
              iconName = focused ? 'videocam-sharp' : 'videocam-outline';
            }

            return (
              <Icon name={iconName} size={28} color={'#333333'} style={{}} />
            );
          },
        })}>
        <Tab.Screen name="Curriculum" component={CurriculumPage} />
        <Tab.Screen name="Fees" component={FeePage} />
        <Tab.Screen name="Peformance" component={PerfomancePage} />
        <Tab.Screen
          name="Mentor"
          component={MentorRequestPage}
          options={{
            headerTintColor: 'black',
          }}
        />
        <Tab.Screen
          name="Subjects"
          component={VideoStackNavigator}
          options={{
            title: 'All Subjects',
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </DataContext.Provider>
  );
};

export default BottomNavigator;
