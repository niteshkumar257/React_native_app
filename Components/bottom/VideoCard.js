import { View, Text ,StyleSheet} from 'react-native'
import React ,{useState} from 'react'
import Icons from "react-native-vector-icons/Ionicons"; 

const VideoCard = ({subjectVideoList,name,setStartPlay,setVideoId,startPlay,playStatus}) => {
  const [dropDownToggle,setDropDownToggle]=useState(true);
  const [playIcon,setPlayIcon]=useState(false);
  const toggleDropDown=()=>
  {
    
    setDropDownToggle(!dropDownToggle);
  }

  const togglePlay=(url)=>
  {
    let videoId = url.match(/v=([a-zA-Z0-9_-]{11})/)[1];
  
   
      
   
       setVideoId(videoId);
  }
  const showVideoPlayer=()=>
  {
     
    setStartPlay(prev =>!prev);
  }
  return (
    <View style={styles.Container}>
       <View style={styles.contentContainer}> 
        <Text style={styles.subjectTitle}>{name}</Text>
        {
          dropDownToggle ?  <Icons onPress={toggleDropDown} name="caret-down-outline" size={25} color={"white"}/>
        : <Icons onPress={toggleDropDown} name="caret-up-outline" size={25} color={"white"}/>
        }
        
        
       </View>
       { !dropDownToggle &&   <View style={styles.subjectListContainer}>
          <View style={styles.ChapterContainer}>
            <View>

            <Text style={styles.subjectText}>Micro Organism</Text>
            </View>
            <View style={styles.toggleContainer}>
           
             <Icons name={!playStatus?"play-outline":"pause-outline"} size={25} color={"black"} onPress={()=>togglePlay('https://www.youtube.com/watch?v=5eGuDvQPW6o')}/>
             <Icons name={!startPlay?"videocam-outline":"close-outline"} size={25} color={"black"} onPress={showVideoPlayer}/>
            </View>
           
          </View>
        
      </View>
       }
      
    </View>
  )
}

export default VideoCard;

const styles=StyleSheet.create(
  {
      Container:{
       display:"flex",
        flexDirection:"column",
        rowGap:10,
     
        height:"auto",
    
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderRadius:9,
        backgroundColor:"#1377c0"

       
      },
      contentContainer:{

        display:"flex",
        flexDirection:"row",
        height:"auto",
        
         justifyContent:"space-between",
         padding:10,
        
         borderRadius:9,
       
        
      }
      ,subjectListContainer:{
        display:"flex",
        justifyContent:"space-between",
         flexDirection:"column",
         rowGap:10,
         padding:10,
      },
      ChapterContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"white",
        borderRadius:9,
        padding:10,
      },
      subjectText:{
        fontWeight:500,
        color:"black"
      },
      subjectTitle:{
        fontSize:20,
         color:"white",
        fontWeight:600,
        
        
      },
      toggleButton:{
        curson:"pointer"
      },
      toggleContainer:{
           flex:1,
           flexDirection:'row',
          columnGap:20,
        
           justifyContent:"flex-end"
      }

  }
)