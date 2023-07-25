import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import CustomDrawer from './CustomDrawer';
import Children from '../Stack/Children';
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({child_name,child_id,photo_url}) => {
    console.log("drawer"+child_name,child_id);

  return (
    <Drawer.Navigator
  
     drawerContent={props => <CustomDrawer {...props} child_name={child_name} child_id={child_id} photo_url={photo_url}/>}
     screenOptions={
      {
        swipeEnabled: false,
      }
     }
    >
      <Drawer.Screen
        name={child_name}
        component={Main}
        initialParams={{child_id}}
        options={{headerShown:true,headerStyle: {
          backgroundColor: '#006DFF',
           
        },
        headerTintColor: 'white',}}
      />
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
