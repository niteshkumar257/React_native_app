import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { COLORS } from '../../Utils/Colors/Colors';
import {FONTS} from "../../Utils/Colors/fonts";

const NoVideos = () => {
  return (
    <View  style={[styles.maincontainer]}>
      <Text style={styles.text}>NoVideos</Text>
    </View>
  )
}

export default NoVideos;
const styles=StyleSheet.create({
    maincontainer:{
    width:width,
    height:height-100,
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