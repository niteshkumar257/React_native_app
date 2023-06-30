import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { COLORS } from './Utils/Colors/Colors';
import { FONTS } from './Utils/Colors/fonts';

const NoData = ({message}) => {
  return (
    <View  style={[styles.maincontainer,{height:height-100}]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default NoData;
const styles=StyleSheet.create({
    maincontainer:{
    width:width,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.backgGroundColor
    },
    text:{
        fontSize:FONTS.TextTitle,
        color:FONTS.TextColor,
    }
})