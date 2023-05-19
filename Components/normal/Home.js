import {View, Text} from 'react-native';
import React from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';

const Parent = ({navigation,route}) => {
 
 
  const {child_id,child_name}=route.params;
  console.log("home",child_id,child_name);
  return <DrawerNavigator child_id={child_id} child_name={child_name} />;
};

export default Parent;
