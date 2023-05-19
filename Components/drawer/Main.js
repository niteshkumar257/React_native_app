import {View, Text} from 'react-native';
import React from 'react';
import BottomNavigator from '../bottom/BottomNavigator';

const Main = ({route}) => {
  const {child_id}=route.params;
  console.log(child_id);
  return (
    <View style={{flex: 1}}>
      <BottomNavigator    id={child_id}/> 
    </View>
  );
};

export default Main;
