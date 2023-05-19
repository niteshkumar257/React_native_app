import { View, Text, StyleSheet ,ScrollView} from 'react-native'
import React, {useEffect,useState,useContext} from 'react'
import AcitvityHandler from '../bottom/AcitvityHandler'

import NotificationCard from './NotificationCard'
const feeIcon=require("../../assets/notificationFee.png")
const Peformance=require("../../assets/PeformanceReport.png");
const mentor=require("../../assets/presentation.png")
import axios from "axios";
import { AuthContext } from '../Context/Context'
import jwtDecode from 'jwt-decode'

const Notification = () => {
  const [notificationList,setNotificatinList]=useState([]);
  const [isLoding,setIsLodiging]=useState(true);
  const [error,setError]=useState(false);
  const {userToken}=useContext(AuthContext);
  let userInfo=jwtDecode(userToken);
let parentId=(userInfo.result.parent_id);
   const getNotification=()=>
   {
    axios.get(`https://school-management-api.azurewebsites.net/parents/${parentId}/getNotification`)
    .then((res)=>
    {
     
      setIsLodiging(false);
      setNotificatinList(res.data.messages);
    }).catch((err)=>
    {
      setIsLodiging(false);
      setError(true);
      console.log(err)
    })
   }
   useEffect(()=>
   {
     getNotification();
   },[])
   
  return (

    <ScrollView>
      {
        isLoding  ? <AcitvityHandler show={isLoding}/> :
         <View style={styles.mainContainer} >
      {

        notificationList.length===0 ? <Text style={{
           fontSize:20,
           fontWeight:500,
           color:"black"
        }} >No notifcations !</Text> :
        notificationList.map((item,index)=>(
          <NotificationCard  key={index} icon={feeIcon} msg={item.messages}/>
          

        ))
      }
    
    
    
    </View>
}

    </ScrollView>
   
  )
}

export default Notification;
const styles=StyleSheet.create(
    {
        mainContainer:{
            display:"flex",
            alignItems:"center",
            height:900,
            width:"100%",
            marginTop:10,
            rowGap:20,
            backgroundColor:"#E9F3FD"
          
          
        
        }
    }
)
