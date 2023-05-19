import { View, Text,StyleSheet ,TextInput} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import Parent from "../../assets/Parent.svg";
import Icon from "react-native-vector-icons/Ionicons";
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../Context/Context';
import axios from 'axios';


const header = ({navigation}) => {
  const {userToken}=useContext(AuthContext)
  let userInfo=jwtDecode(userToken);
  let parentId=(userInfo.result.parent_id);
  const [fatherName,setFatherName]=useState("");
  const getParentInfo=()=>
  {
       axios.get(`https://school-management-api.azurewebsites.net/parents/${parentId}`).then((res)=>
       {
         setFatherName(res.data.parentDetails.father_name);
         console.log(res.data.parentDetails.father_name);
       }).catch(err=>
        {
          console.log(err);
        })
      
  }
  useEffect(()=>
  {
    getParentInfo();
  },[])
  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
      <View style={styles.profile}  onStartShouldSetResponder={()=>
      {
        navigation.navigate("parentProfile");
      }}>
        <Icon  name="person-circle-outline" size={35} color="white" />
      </View>
      <View style={styles.messager}>
        <Text style={styles.text}> 
      {fatherName}
        </Text>
       
      </View>
      </View>
      <View 
      onStartShouldSetResponder={()=>
        {
          navigation.navigate("notification");
        }}
       style={styles.rightContainer}>
       <Icon name="notifications-sharp" size={30} color={"white"}/>
      </View>
      
    </View>
   
  )
}

export default header;
const styles=StyleSheet.create(
  {
     container:{
      height:60,
      width:"100%",
      borderWidth:1,
      borderRightWidth:0,
      borderLeftWidth:0,
      borderTopWidth:0,
      borderColor:"lightgrey",
    
      display:"flex",
      flexDirection:"row",
     
      alignItems:"center",
      padding:10,
      backgroundColor:'#318CE7'
     },
     leftContainer:{
      flex:1,
    
     columnGap:30,
      display:"flex",
      flexDirection:"row",
    
      alignItems:"center"
      

     },
     rightContainer:{
      flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-end"
        
      

     },
     text:{
      fontSize:15,
      fontWeight:500,
      color:"white"
     }

  }
)
