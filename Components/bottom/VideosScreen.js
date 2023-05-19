import { View, Text, StyleSheet, ScrollView, ActivityIndicator,Image } from 'react-native'
import VideoCard from './VideoCard'
import VideoPlayer from './VideoPlayer'
import VideoList from './VideoList'
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Video = ({navigation}) => {
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

  

 const subjectList=[
  {id:1,subject:"Physics"},
  {id:2,subject:"Chemistry"},
  {id:3,subject:"Mathematics"},
  {id:4,subject:"Biology"},
  {id:5,subject:"Histroy"},
 ]
 const subjectSelectHandlerBiology=()=>
 {

      navigation.navigate('subject',{
            subject_name:"Biology",
            playList_Id:'PL5ABW4Ea26ZSAWmLQ4aoB3_LI82wOp7Z7'
      });
 }
 const subjectSelectHandlerMath=()=>
 {

      navigation.navigate('subject',{
           
            subject_name:"Math",
            playList_Id:'PL5ABW4Ea26ZSAWmLQ4aoB3_LI82wOp7Z7'
            

      });
 }
 const subjectSelectHandlerPhysics=()=>
 {

      navigation.navigate('subject',{
            subject_name:"Physics",
            playList_Id:"PL5ABW4Ea26ZSoXZTG3LBt6iGCh_tnSA78"
      });
 }
 const subjectSelectHandlerChemistry=()=>
 {

      navigation.navigate('subject',{
            subject_name:"Chemistry",
            playList_Id:'PL5ABW4Ea26ZSzfUq9VGWfv9iJqbOPOO7j'
      });
 }
  return (
    <ScrollView >
      <View style={styles.videoContainer} removeClippedSubviews={true}>
       
         <View style={styles.subjectContainer}>
            <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerBiology}>
         <Image source={require('../../assets/microscope.png')}/>
         <Text style={styles.subejctText}>Biology</Text>
         </View>
            <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerPhysics}>
            <Image source={require('../../assets/pendulum.png')}/>
            <Text style={styles.subejctText}>Physics</Text>
                 </View>
                 <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerMath}>
                 <Image source={require('../../assets/design.png')}/>
                 <Text style={styles.subejctText}>Math</Text>
                 </View>
                 <View style={styles.imageContainer} onStartShouldSetResponder={subjectSelectHandlerChemistry}>
                 <Image size={48} source={require('../../assets/atom.png')}/>
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
      width:"100%",
      height:700,
      flexDirection: "column",
      rowGap: 10,
      borderRadius: 9,
      paddingTop: 20,
      padding: 10,
    
      display: "flex",
      paddingLeft:20,
     
     
      backgroundColor:"#E9F3FD",
   
     


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

    },
    imageContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:150,
         width:150,
        //  backgroundColor:"#e1ffff",
         rowGap:5,
         backgroundColor: 'white',
      elevation: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
         borderRadius:9
         
         

    },
    subjectContainer:{

      height:"100%",
      width:"100%",
      display:"flex",
      flexDirection:"row",
      columnGap:20,
      flexWrap:"wrap",
      rowGap:20,
        height:"auto",
        paddingLeft:15
     
     
    },
    subejctText:{
      fontSize:13,
      color:"black",
      fontWeight:600
    }
   

  }
)
