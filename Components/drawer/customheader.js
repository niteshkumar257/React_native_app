import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {COLORS} from '../Utils/Colors/Colors';
import {FONTS} from '../Utils/Colors/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StudentDetailsContext} from '../Context/StudentDetailsContext';
import {useQuery} from '@tanstack/react-query';
import {AuthContext} from '../Context/Context';
import axios from 'axios';
import {GW_URL} from '../config';


function createAbbreviatedName(fullName) {
  const words = fullName.split(' ');
   const abbreviation=words[0]+" "+"School";

  return abbreviation;
}
const customHeader = ({navigation, title, photo_url, data,isLoading}) => {

  const dummYImage=require("../../assets/WhiteBack.jpg");

  return (
    <View style={styles.headerContainer}>
      <View style={styles.LeftContainer}>
        <TouchableOpacity
          style={styles.buttonClass}
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu-open" color={'black'} size={35} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.header}>{title}</Text>
        </View>
      </View>
      {/* <TouchableOpacity onPress={()=> navigation.navigate("schoolDetails",schoolData)} style={styles.container}> */}
      <View style={styles.rightContainer}>
      {!isLoading && 
          <View style={{
            display:"flex",
            flexDirection:"row",
            columnGap:10,
            justifyContent:"center",
            alignItems:"center",
           
          }}>
             <Image
         style={{ width:20, height:20,borderRadius:50,resizeMode:"contain" }}
         source={{
           uri:data?.schoolDetail?.photo_url
             ? data?.schoolDetail?.photo_url
             : dummYImage,
         }}
       />
        <Text style={{fontSize:15,fontWeight:500,color:'black'}}>{createAbbreviatedName(data?.schoolDetail?.school_name)}</Text>
          </View>
        
}
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: width,
    backgroundColor: 'white',
    elevation: 4,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
  LeftContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    columnGap: 10,
    justifyContent: 'flex-start',
  },
  rightContainer: {},
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: FONTS.TextTitle,
    fontWeight: FONTS.TextTitleWeight,
    color: 'black',
  },
});
export default customHeader;
