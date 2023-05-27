import { View, Text ,StyleSheet,ScrollView,FlatList,Image} from 'react-native'
import React ,{useEffect,useState,useContext} from 'react'
import DataContext from '../../Context/DataContext'
import axios from 'axios'
import {COLORS} from "../../Utils/Colors/Colors";

const Screen1 = () => {
   
  const {id}=useContext(DataContext);
  const [childId,setChildId]=useState(id);
 const Curriculum=(require("../../../assets/data1.png"));
 const  [schoolId,setSchoolId]=useState();
 const [classId,setClassId]=useState();
 const [url,setUrl]=useState(null);
console.log(url);
 const getSchoolIdAndClassId=()=>
 {
    axios.get(`https://school-management-api.azurewebsites.net/students/${childId}`)
    .then((res)=>
    {
     
      setClassId(res.data.studentDetails[0].class_id);
      setSchoolId(res.data.studentDetails[0].school_id);
     console.log(23,res.data.studentDetails[0].class_id);
      getCurriculum(res.data.studentDetails[0].class_id,res.data.studentDetails[0].school_id);
    }).catch(err=>
      {
        console.log(err);
      })
 }
 const getCurriculum=(class_id,school_id)=>
 {
  console.log(32,class_id,school_id);
  axios.get(`https://school-management-api.azurewebsites.net/viewCurriculum`, {
    params: {
      school_id: school_id,
      class_id: class_id
      }
   }).then(res=>
    {
      // console.log(40,res.data);
      setUrl(res.data.url);
      console.log(42,res.data.url);
      // console.log(res.data.url);
    }).catch((err)=>
    {
      console.log(err);
    })
 }
 useEffect(()=>
 {
  getSchoolIdAndClassId();
 

 },[])
  return (
    <ScrollView style={styles.ViewContainer}>
      <View style={styles.container}> 
  
   {
    url!=null ? <Image style={styles.Image} source={ { uri: url }}/> :
    <Text style={{
      fontSize:20,
      fontWeight:600,
      color:"black"
    }}>No curriculum is assigned</Text> 
    }
   
 
 
</View>
    </ScrollView>
    
  )
}
const styles=StyleSheet.create(
  {
    ViewContainer:{
      height:900,
      width:"100%",
      padding:5,
      backgroundColor:COLORS.backgGroundColor
    
},
    container:{
      height:700,
      width:"100%",
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
     
       padding:20,
       gap:30,
    },
    text:{
      fontSize:20,
      color:"black",
      fontWeight:600,
     
    },
    contentBox:{
      height:200,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
       
      borderWidth:1,
      borderColor:"black",
    
    



    },
    title:{
      height:40,
      width:"100%",
      padding:20,
      margin:10,
      backgroundColor:"grey"
      

    },
    body:{
      minHeight:100,
      width:"100%",
      padding:20,
      margin:10,
      backgroundColor:"lightgrey"

    },
    Image:

    {
      height:300,
      width:"100%",
      padding:10
    }

  }
)
export default Screen1