import { View, Text,StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const Loader = ({show,x}) => {
  return (
    <View style={[styles.loaderContainer,{height:height-x}]}>
        <ActivityIndicator animating={show} size={40} color="black"/>
      <Text>Loading</Text>
    </View>
  )
}

export default Loader;
const styles=StyleSheet.create({
    loaderContainer:{
      width:width,
    
      display:"flex",
      justifyContent:"center",
      alignItems:'center'
    }
})