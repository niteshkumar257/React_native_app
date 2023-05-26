import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native'

import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Utils/Colors/Colors'
import axios from 'axios'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Video = ({ navigation }) => {
  const [startPlay, setStartPlay] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [videoList, setVideoList] = useState(null);
  const [showActivity, setShowActitvity] = useState(false);
  const [url, setUrl] = useState("");
  const subjectVideoList = [
    {
      subjectName: "Physics",
      chapter: [
        "Motions", "Rotation", "Work Energy", "Power", "Current electricity"
      ]
    },
    {
      subjectName: "Mathematics",
      chapter: [
        "Algebara", "Differentitation", "Sequence and Series", "Intergration", "Hyperbola"
      ]
    }
  ]



  const subjectList = [
    { id: 1, subject: "Physics" },
    { id: 2, subject: "Chemistry" },
    { id: 3, subject: "Mathematics" },
    { id: 4, subject: "Biology" },
    { id: 5, subject: "Histroy" },
  ]
  const subjectSelectHandlerBiology = () => {

    navigation.navigate('subject', {
      subject_name: "Biology",
      playList_Id: 'PL5ABW4Ea26ZSAWmLQ4aoB3_LI82wOp7Z7'
    });
  }
  const subjectSelectHandlerMath = () => {

    navigation.navigate('subject', {

      subject_name: "Math",
      playList_Id: 'PL5ABW4Ea26ZSAWmLQ4aoB3_LI82wOp7Z7'


    });
  }
  const subjectSelectHandlerPhysics = () => {

    navigation.navigate('subject', {
      subject_name: "Physics",
      playList_Id: "PL5ABW4Ea26ZSoXZTG3LBt6iGCh_tnSA78"
    });
  }
  const subjectSelectHandlerChemistry = () => {

    navigation.navigate('subject', {
      subject_name: "Chemistry",
      playList_Id: 'PL5ABW4Ea26ZSzfUq9VGWfv9iJqbOPOO7j'
    });
  }
  return (
    <ScrollView >
      <View style={styles.videoContainer} removeClippedSubviews={true}>

        <View style={styles.subjectContainer}>
          <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerBiology}>
            <Image source={require('../../../assets/microscope.png')} />
            <Text style={styles.subejctText}>Biology</Text>
          </View>
          <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerPhysics}>
            <Image source={require('../../../assets/pendulum.png')} />
            <Text style={styles.subejctText}>Physics</Text>
          </View>
          <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerMath}>
            <Image source={require('../../../assets/design.png')} />
            <Text style={styles.subejctText}>Math</Text>
          </View>
          <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerChemistry}>
            <Image size={48} source={require('../../../assets/atom.png')} />
            <Text style={styles.subejctText}>Chemistry</Text>
          </View>

        </View>
      </View>

    </ScrollView>

  )
}

export default Video;
const styles = StyleSheet.create(
  {
    videoContainer: {

      flex: 1,
      width: width,
      height: height,
      flexDirection: "column",
     backgroundColor:"red",
      alignItems:"center",
      rowGap: 10,
      borderRadius: 9,
      paddingTop: 20,
     
      display: "flex",
    
      backgroundColor: COLORS.backgGroundColor,
     
    },
    VideoPlayerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 280,
      backgroundColor: 'black',
      elevation: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: "red"
    },
    imageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 140,
      width: 140,
      //  backgroundColor:"#e1ffff",
      rowGap: 5,
      backgroundColor: 'black',
      elevation: 0,
      shadowColor: '#000',
     
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      borderRadius: 9



    },
    subjectContainer: {

      height: "100%",
      width: width,
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection: "row",
    
      columnGap: 40,
      flexWrap: "wrap",
      rowGap: 20,
      height: "auto",
    
      padding:10,


    },
    subejctText: {
      fontSize: 13,
      color: "white",
      fontWeight: 600
    }


  }
)
