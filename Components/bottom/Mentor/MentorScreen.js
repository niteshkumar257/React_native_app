import { View, Text ,StyleSheet,SafeAreaView,ScrollView} from 'react-native'
import React ,{useEffect,useState,useContext} from 'react'
import Mentor from './Mentor';
import axios from "axios";
import AcitvityHandler from '../AcitvityHandler';
import { AuthContext } from '../../Context/Context';
import jwtDecode from 'jwt-decode';
import { COLORS } from '../../Utils/Colors/Colors'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { GW_URL } from '../../config';
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
     axios.get(`${GW_URL}/mentors`)
     .then((res)=>{
    
      let mentor=res.data.mentors; 
      let isSchecule = false;
      mentor.forEach(element => {
           element.check=false;  
           element.check2 = false;
      });
      axios.get(`${GW_URL}/parents/${parentId}/getSchedule`).then((res)=>
    { 
      let schduledMentorId = res.data.schedules[0]?.mentor_id[res.data.schedules[0]?.mentor_id.length - 1]; 
       mentor.forEach(element => {         
            if(schduledMentorId == element.mentor_id)
            {
              element.check=true; 
              isSchecule = true;
            } 
           
          
          
            mentor.sort((a, b) => {
              if (a.check && !b.check) {
                return -1; // Move a before b
              } else if (!a.check && b.check) {
                return 1; // Move b before a
              } else {
                return 0; // Maintain the original order
              }
            });
             console.log(58,mentor);
        setMentorDetails(mentor);
          setParentMentor(true);
        setIsLoding(false);
      });   

      mentor.forEach(element => {         
        if(isSchecule == true){
          element.check2 = true;
        } 
      });  
     
      console.log("mentor array")
      console.log(mentor);
   
    
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
         
      { (parentMentor && MentorDetails) ?
        MentorDetails?.map((item)=>{

       return    <Mentor key={item.mentor_id
          } name={item.mentor_name} 
            mentor_id={item.mentor_id}
             getMentorsDetails={getMentorsDetails}
              item={item}
              setStatus={setStatus}
              status={status}
            check={item.check}
          qualification={"MSc in Physics"}
           exp={item.details}
           mobile={item.mobile}
           email={item.gmail}
           />
}) :
        <View style={{
          display:"flex",
          justifyContent:"center",
          alignItems
        }}>
              <Text>No Mentor listed</Text>
        </View>

       
      }
       
       
    </View>
}
    </ScrollView>
     
    
   
  )
}
const styles=StyleSheet.create(
  {
    ViewContainer:{
          height:height,
          width:"100%",
          padding:5,
          backgroundColor:COLORS.backgGroundColor
         
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