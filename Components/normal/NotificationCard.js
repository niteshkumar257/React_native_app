import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";

const NotificationCard = ({icon,msg}) => {

    const feeIcon=require("../../assets/notificationFee.png")
  return (
    <View style={styles.mainContainer}>
      <View style={styles.icons}>
      <Icon name="wallet-sharp" size={40} color={"#1377c0"}/>
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
           
            padding:5
            

        }
    }
)