import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import {COLORS} from "../Utils/Colors/Colors";


const NotificationCard = ({icon,msg,NotificationId,NotificationStatus,getNotification,date}) => {


    const feeIcon=require("../../assets/notificationFee.png")
    const updateNotificationStatus=async (notificationId)=>{
      try {
        const response = await axios.put(`https://school-management-api.azurewebsites.net/parents/${notificationId}/markNotificationSeen`);
        console.log('Notification updated successfully:', response.data);
        getNotification();
      } catch (error) {
        console.error('Error updating notification:', error);
      } 
    }
  return (
    <View  
    onStartShouldSetResponder ={()=>updateNotificationStatus(NotificationId)}style={[styles.mainContainer,NotificationStatus && styles.disableViewContainer]}
    pointerEvents={NotificationStatus?'none':'auto'
  }
   
   
    >
      <View style={styles.icons}>
      <Icon  name="wallet-sharp" size={40} color={"#1377c0"}/>
      </View>
      <View style={styles.Info}>
      <Text style={{
        fontSize:13,
        fontWeight:500,
        lineHeight:17,
        color:"black",
        letterSpacing:1
        
      }}> 
      {msg}
      </Text>
      <Text style={{
        fontSize:13,
        fontWeight:700,
        lineHeight:17,
        color:"black",
        letterSpacing:1,
        
        
        
      }}> {new Date(date).toLocaleDateString()}</Text>
      </View>
    </View>
  )
}

export default NotificationCard;
const styles=StyleSheet.create(
    {
        mainContainer:{
            height:"auto",
            minHeight:70,
            width:"95%",
            padding:5,
            borderRadius:6,
            borderWidth:.5,
            borderColor:"lightgrey",
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            columnGap:20,
            backgroundColor:"white",
           
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            

        },
        disableViewContainer:{
          opacity:.8,
          backgroundColor:'grey'
        },
        icons:{
         
           flex:1,
           height:60,
            justifyContent:"center",
            alignItems:"center"
 
        },
      
         
        Info:{
            height:"auto",
            flex:3,
            width:"75%",
            display:'flex',
            rowGap:10,
           
            padding:5
            

        }
    }
)