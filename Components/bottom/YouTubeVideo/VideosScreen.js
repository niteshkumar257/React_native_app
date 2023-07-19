import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native'

import React, { useState, useEffect ,useContext} from 'react'
import { COLORS } from '../../Utils/Colors/Colors'

import { Dimensions } from 'react-native';
import { GW_URL } from '../../config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import DataContext from '../../Context/DataContext';
import Loader from '../../Loader';
import NoData from '../../NoData';


const renderSubjectImage = (subjectName) => {
  switch (subjectName) {
    case 'Physics':
      return <Image source={require('../../../assets/Physics.png')} />;
    case 'Chemistry':
      return <Image source={require('../../../assets/chemistry.png')} />;
    case 'Mathematics':
      return <Image source={require('../../../assets/Math.png')} />;
    case 'Biology':
      return <Image source={require('../../../assets/Biology.png')} />;
  
    default:
      return null;
  }
};

const Video = ({ navigation }) => {
  const {id}=useContext(DataContext);
  const [childId,setChildId]=useState(id);
  const [startPlay, setStartPlay] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [videoList, setVideoList] = useState(null);
  const [showActivity, setShowActitvity] = useState(false);

  const [row,setRows]=useState();
  
  const [url, setUrl] = useState("");

  const {data:ClassIdAndSchoolId,isLoading:IdsLoading,isError:IdsError,error:Idserror}=useQuery({
    queryKey:["fetch-class_id-school_id",childId],
    queryFn:()=>
    {
    return  axios.get(`${GW_URL}/students/${childId}`)
    }
  })
  
  const class_id=ClassIdAndSchoolId?.data?.studentDetails[0].class_id;
  const school_id=ClassIdAndSchoolId?.data?.studentDetails[0].school_id;

 
  
  const {data:StudentSubjectList,isLoading:StudentSubjectLoading,isError:StudentSubjectError}=useQuery({
    queryKey:['fetch-student-sujectlist',class_id,school_id],
    queryFn:()=>
    {
      return   axios.get(`${GW_URL}/schools/${school_id}/${class_id}/getClassSubjects`)
    }, enabled:!! class_id && !!school_id
   } )

 useEffect(()=>
 {
     if(!StudentSubjectLoading)
     {
      
      console.log("sujectlist",StudentSubjectList?.data);
     }
 },[])
  



  const renderVideoList=(subject_id,subject_name)=>
  {
    console.log(subject_id,subject_name);
     axios.get(`${GW_URL}/videos/${class_id}/${subject_id}/getVideos`).
     then((res)=>
     {
      
     console.log(res.data);
      if(res.data.data[0]!=undefined)
      {
        navigation.navigate('subject', {
          subject_name: subject_name,
          video_url: res.data.data[0].video_url
        });
      }
      else 
      {
         navigation.navigate('noVideos')
      }
    

     }).catch((err)=>
     {
      console.log(err);
     })
  }
 
 


  return (
    <ScrollView >
      <View style={styles.videoContainer} removeClippedSubviews={true}>

        <View style={styles.subjectContainer}>

       

{
   StudentSubjectLoading ? <Loader isLoading={StudentSubjectLoading}/>: (
     StudentSubjectList?.data?.subjects?.length>0 ? (
      StudentSubjectList?.data?.subjects?.map((item,index)=>(
        <View key={item.subject_id} style={styles.imageContainer} onStartShouldSetResponder={()=>renderVideoList(item.subject_id,item.subject_name)}>
       {renderSubjectImage(item.subject_name)}
        <Text style={styles.subejctText}>{item.subject_name}</Text>
      </View>
      ))
     ) :<NoData message={"No Subjects"}/>
   )
}



         
         

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
