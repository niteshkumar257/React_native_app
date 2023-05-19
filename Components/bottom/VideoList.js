import { StyleSheet, Text, View ,Image,FastImage} from 'react-native'
import React from 'react'
import VideoPlayer from './VideoPlayer';

const VideoList = ({title,image,height,width,videoId}) => {
   
  return (
    <View>
     <View style={styles.videoContainer}>
       <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
           {/* <Image  style={{
            // flex: 1,
            // width: null,
            // height: null,
            // resizeMode: 'contain'
           }}height={height} width={width} source={{uri:image}} /> */}
           <VideoPlayer videoId={videoId}/>
        </View>
       </View>
       <View style={styles.rightContainer}>
        
        <View style={styles.videoTitle}>
        <Text style={styles.text} >{title}</Text>
        </View>
       
       </View>
     </View>
    </View>
  )
}

export default VideoList

const styles = StyleSheet.create({
    videoContainer:{
        width:380,
        height:"auto",
         display:"flex",
         flexDirection:"column",
        rowGap:20,
         justifyContent:"center",
         alignItems:"center",
         backgroundColor: 'white',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      padding:10,
      paddingRight:20,
      borderRadius:9
     

    },
    leftContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: 'white',
        height:200,
        width:340,
        flex:4,
        // elevation: 5,
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 0.1,
        // shadowRadius: 5,

    },
    rightContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: 'white',
        width:340,
        height:"auto",
        flex:1,
        padding:5,
        // elevation: 5,
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 0.1,
        // shadowRadius: 5, 

    },
    imageContainer:{
    //     flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain'
    height:180,
    width:320

    },
    text:{
        fontSize:15,
        fontWeight:500,
        color:"black"

    }

})