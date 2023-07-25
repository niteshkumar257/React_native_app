import {View, Text} from 'react-native';
import React from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';

const Parent = ({navigation,route}) => {
 
 
  const {child_id,child_name,photo_url}=route.params;
  
  return <DrawerNavigator child_id={child_id} child_name={child_name} photo_url={photo_url} />;
};

export default Parent;
