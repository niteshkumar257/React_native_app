import { View, Text,StyleSheet ,TextInput} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import Parent from "../../assets/Parent.svg";
import Icon from "react-native-vector-icons/Ionicons";
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../Context/Context';
import {COLORS} from "../Utils/Colors/Colors";
import axios from 'axios';
import { Badge } from '@rneui/themed';
import { GW_URL } from '../config';
import { useDispatch,useSelector } from 'react-redux';
import { fetchContent } from '../Redux/NotificationSlice';


const header = ({navigation}) => {
  const {userToken}=useContext(AuthContext)
  let userInfo=jwtDecode(userToken);
  let parentId=(userInfo.result.parent_id);
  const dispatch=useDispatch();
  
  const count=useSelector((state)=>state.Notification.count);
   
  const [fatherName,setFatherName]=useState("");
  const getParentInfo=()=>
  {
       axios.get(`${GW_URL}/parents/${parentId}`).then((res)=>
       {
         setFatherName(res.data.parentDetails.father_name);
       
       }).catch(err=>
        {
          console.log(err);
        })
      
  }
  // const getNotification=()=>
  // {
  //  axios.get(`https://school-management-api.azurewebsites.net/parents/${parentId}/getNotification`)
  //  .then((res)=>
  //  {
    
     
  //    setNotificatinList((res.data.messages));
  //    console.log("adbfj,",res.data.message?.length)
     
     
  //    console.log(res.data.messages);

     
  //  }).catch((err)=>
  //  {
     
   
  //    console.log(err)
  //  })
  // }
  
  useEffect(()=>
  {
    getParentInfo();
    dispatch(fetchContent(parentId));
    
  },[dispatch])
  // const countUnseenNotification=notificationList?.filter((item)=> item.is_seen==true).reduce((acc,cur)=> {
  //   return acc+cur;
  // },0);
  // setNotificatinList(countUnseenNotification);
  let containerStyle = { position: 'absolute', top: -2, right: -5 };

if (count===0) {
  containerStyle = { ...containerStyle, top:2,right:4};
} else {
  containerStyle = { ...containerStyle};
}
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
       {
        count!=0 &&   <Badge
        status="error"
        value={count}
         
        // value={notificationList?.filter(item=> {
        //   return item.is_seen===false;
        // }).length }
        containerStyle={{ position: 'absolute', top: -2, right:-5 }}
      />
       }
      
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
      backgroundColor:COLORS.mainColor3
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
