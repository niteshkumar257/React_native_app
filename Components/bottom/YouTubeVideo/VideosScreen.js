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
import BookIcon from "react-native-vector-icons/Ionicons";
import {FONTS }from "../../Utils/Colors/fonts";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Video = ({ navigation }) => {

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
      <View style={styles.videoContainer}>

        <View style={styles.subjectContainer}>

        {/* {StudentSubjectLoading ? (
        <Loader show={StudentSubjectLoading} x={110} />
      ) : StudentSubjectList?.data?.subjects?.length > 0 ? (
        StudentSubjectList?.data?.subjects.map((item, index) => (
          <View key={item.subject_id} style={styles.subject} onStartShouldSetResponder={renderVideoList(item.subject_id,item.subject_name)}>
            <View><Text style={styles.subjectName}>{item.subject_name}</Text></View>
            <BookIcon name="book-outline" size={30} color={"black"} />
          </View>
        ))
      ) : (
        <Text>No subjects</Text>
      )} */}

{
   StudentSubjectLoading ? <Loader show={StudentSubjectLoading} x={110}/>: (
     StudentSubjectList?.data?.subjects?.length>0 ? (
      StudentSubjectList?.data?.subjects?.map((item,index)=>(
        <View key={item.subject_id} style={styles.imageContainer} >
       {renderSubjectImage(item.subject_name)}
        <Text style={styles.subejctText}>{item.subject_name}</Text>
      </View>
      ))
     ) :<Text>No videos</Text>
   )
}
 </View>
      </View>

    </ScrollView>

  )
}

export default Video;
const styles = StyleSheet.create({
  videoContainer: {
     height:height-110,
     width:width,
     padding:10,
  },
 
 
  subjectContainer: {
       display:'flex',
       justifyContent:'center',
       alignContent:'center',
       rowGap:10
  },
  subjectName:{
    fontSize:FONTS.TextTitle,
    color:"black",
    fontWeight:FONTS.TextTitleWeight
  },
  subject:{
    display:'flex',
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding:10,
    borderRadius:9

  }
 
});
  