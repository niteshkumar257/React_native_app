<<<<<<< HEAD
import { View, Text ,StyleSheet} from 'react-native'
import React from 'react';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const NoData = ({message}) => {
  return (
    <View style={[styles.mainContainer,{height:height-110}]}>
      <Text>{message}</Text>
=======
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
>>>>>>> videoIntegration
    </View>
  )
}

export default NoData;
const styles=StyleSheet.create({
<<<<<<< HEAD
    mainContainer:{
       
        width:width,
        display:"flex",
        justifyContent:'center',
        alignItems:'center'

=======
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
>>>>>>> videoIntegration
    }
})