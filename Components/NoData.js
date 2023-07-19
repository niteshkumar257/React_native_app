import { View, Text ,StyleSheet} from 'react-native'
import React from 'react';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const NoData = ({message}) => {
  return (
    <View style={[styles.mainContainer,{height:height-110}]}>
      <Text>{message}</Text>
    </View>
  )
}

export default NoData;
const styles=StyleSheet.create({
    mainContainer:{
       
        width:width,
        display:"flex",
        justifyContent:'center',
        alignItems:'center'

    }
})