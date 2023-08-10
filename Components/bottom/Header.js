import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import {COLORS} from "../Utils/Colors/Colors";
import { FONTS } from '../Utils/Colors/fonts';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const Header = ({navigation,title}) => {
    return (
      <View style={styles.headerContainer}>
  
          <View style={styles.LeftContainer}>
            <TouchableOpacity style={styles.buttonClass} onPress={() => navigation.openDrawer()}>
              <Icon name="menu-open" color={"black"} size={35} />
            </TouchableOpacity>
  
            <View style={styles.titleContainer}>
              <Text style={styles.header}>{title}</Text>
            </View>
          </View>
  
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.buttonClass} onPress={() => navigation.navigate("notification")}>
              <Notification name="notifications-sharp" size={30} color={"black"} />
            </TouchableOpacity>
  
          </View>
        </View>
    )
  }
  
  export default Header;
  const styles=StyleSheet.create({
      headerContainer: {
          height: 60,
          width: width,
          backgroundColor: "white",
          elevation: 4,
          flexDirection: 'row',
          display: "flex",
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 10,
          paddingLeft:10,
        },
        LeftContainer: {
          flexDirection: 'row',
          display: "flex",
          alignItems: 'center',
          columnGap:10,
          justifyContent: 'flex-start'
        },
        rightContainer: {
      
        },
        titleContainer: {
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center'
        },
        header:{
          fontSize:FONTS.TextTitle,
          fontWeight:FONTS.TextTitleWeight,
          color:'black'
        }
      
  
  })
  