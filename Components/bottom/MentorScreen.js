import { View, Text ,StyleSheet,SafeAreaView,ScrollView} from 'react-native'
import React ,{useEffect,useState,useContext} from 'react'
import Mentor from './Mentor';
import axios from "axios";
import AcitvityHandler from './AcitvityHandler';
import { AuthContext } from '../Context/Context';
import jwtDecode from 'jwt-decode';
import { COLORS } from '../Utils/Colors/Colors'


const Screen4 = ({navigation}) => {
  const [MentorDetails,setMentorDetails]=useState([]);
  const [parentMentor,setParentMentor]=useState(false);
  const [isLoding,setIsLoding]=useState(true);
  const [status,setStatus]=useState(false);
  


  // user informatoion
  const {userToken}=useContext(AuthContext);
  let userInfo=jwtDecode(userToken);
  let parentId=(userInfo.result.parent_id);
  
 
  const getMentorsDetails=()=>
  {

    setIsLoding(true);
     axios.get("https://school-management-api.azurewebsites.net/mentors")
     .then((res)=>{
    
      let mentor=res.data.mentors; 
      let isSchecule = false;
      mentor.forEach(element => {
           element.check=false;  
           element.check2 = false;
      });
      axios.get(`https://school-management-api.azurewebsites.net/parents/${parentId}/getSchedule`).then((res)=>
    { 
      let schduledMentorId = res.data.schedules[0]?.mentor_id[res.data.schedules[0]?.mentor_id.length - 1]; 
       mentor.forEach(element => {         
            if(schduledMentorId == element.mentor_id)
            {
              element.check=true; 
              isSchecule = true;
            } 
                  
       setMentorDetails(mentor);
          setParentMentor(true);
        setIsLoding(false);
      });   

      mentor.forEach(element => {         
        if(isSchecule == true){
          element.check2 = true;
        } 
      });   
    
    }).catch((err)=>
    {
      console.log(err);
      setIsLoding(false);
    })
     
    }).catch((err)=>
     {
      navigation.navigate("notfound");
      console.log(err)
      setIsLoding(false);
     })
 }
   useEffect(()=>
  {
 getMentorsDetails();
   
      
    
  },[])
  return (
    <ScrollView style={styles.ViewContainer}>
      <View style={styles.header}>
         <Text style={styles.headerText}>Mentor Details</Text>
      </View>
      {
        isLoding  ? <AcitvityHandler /> :
      
         <View style={styles.container}>
         
      { parentMentor && MentorDetails && 
        MentorDetails.map((item,index)=>(
          <Mentor key={item.mentor_id
          } name={item.mentor_name} 
            mentor_id={item.mentor_id}
             getMentorsDetails={getMentorsDetails}
              item={item}
              setStatus={setStatus}
              status={status}
            check={item.check}
          qualification={"MSc in Physics"}
           exp={"Academics"}
           details={"28 years experience in education system along with great command in Physics .he was district resource person to train Govt lecture from Ajij Premji Foundation ,Wipro" }
           />
        ))
      }
       
       
    </View>
}
    </ScrollView>
     
    
   
  )
}
const styles=StyleSheet.create(
  {
    ViewContainer:{
          height:700,
          width:"100%",
          padding:5,
          backgroundColor:"#E9F3FD"
         
    },
    container:{

      minHeight:700,
      width:"100%",
       display:"flex",
     
       alignItems:"center",
       padding:10,
       rowGap:20,
    
     
    
    },
    heading:{
      display:"flex",
      width:"100%",
      padding:10,
      justifyContent:'flex-start'
    },
    text:{
      fontSize:25,
      color:"black",
      lineHeight:40,
      fontWeight:600
   
     
    },
    header:{
        width:"100%",
        height:40,
       
        flex:1,
        paddingLeft:10,
        justifyContent:"center"
       
    },
    headerText:{
         fontSize:20,
         fontWeight:500,
         color:"black"
    }
  }
)

export default Screen4