import { View, Text, StyleSheet ,ScrollView,SafeAreaView} from 'react-native'
import React, {useEffect,useState,useContext} from 'react'
import AcitivityhandlerStack from '../bottom/AcitivityhandlerStack'
import NotificationCard from './NotificationCard'
const feeIcon=require("../../assets/notificationFee.png")
import axios from "axios";
import { AuthContext } from '../Context/Context'
import jwtDecode from 'jwt-decode'
import { COLORS } from '../Utils/Colors/Colors'
import { Dimensions } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import { GW_URL } from '../config'
import { fetchContent } from '../Redux/NotificationSlice'
import { fetchPTMContent } from '../Redux/PtmNotificationSlice'

const { width, height } = Dimensions.get('window');

const Notification = () => {
  const [notificationList,setNotificatinList]=useState([]);
 
  const [error,setError]=useState(false);
  const {userToken}=useContext(AuthContext);
  const dispatch=useDispatch();
  const notificationListRedux=useSelector((state)=>state.Notification.notificationList.messages);
const ptmNotificationListRedux=useSelector((state)=>state.PTMNotification.PTMnotificationList.notifications);

 const ptmListLoading=useSelector((state)=>state.PTMNotification.isLoading);
  const isLoading = useSelector((state) => state.Notification.isLoading)
  const Error = useSelector((state) => state.Notification.error)
  const count=useSelector((state)=>state.Notification.count);
  let userInfo=jwtDecode(userToken);
  let parentId=(userInfo.result.parent_id);
   
  //  const getNotification=()=>
  //  {
  //   axios.get(`https://school-management-api.azurewebsites.net/parents/${parentId}/getNotification`)
  //   .then((res)=>
  //   {
     
  //     setIsLodiging(false);"PTMnotificationList
  //     // setNotificatinList(
  //     //   (res.data.messages).sort((a, b) => {
  //     //     const dateA = new Date(a.created_on);
  //     //     const dateB = new Date(b.created_on);
        
  //     //     if (dateA < dateB) return 1;
  //     //     if (dateA > dateB) return -1;
        
  //     //     // Dates are the same
  //     //     if (!a.is_seen && b.is_seen) return -1;
  //     //     if (a.is_seen && !b.is_seen) return 1;
        
  //     //     return 0;
  //     //   }))
     
  //       dispatch(renderNotificationList(res.data.messages));
      
  //   }).catch((err)=>
  //   {
  //     setIsLodiging(false);
  //     setError(true);
  //     console.log(err)
  //   })
  //  }
  
   useEffect(()=>
   {
    
   dispatch(fetchContent(parentId));
   dispatch(fetchPTMContent(parentId));
   },[dispatch]);
  //  if (isLoading) {
  //   return <Text>Loding</Text>
  // }

  // if (Error) {
  //   return error
  // }

 
  return (

    <SafeAreaView>
    <ScrollView overScrollMode="never" removeClippedSubviews={true}>
      {
        isLoading && ptmListLoading  ? <AcitivityhandlerStack show={isLoading}/> :
         <View style={styles.mainContainer} >
      {

      notificationListRedux?.length===0 && ptmNotificationListRedux.length===0 ? <Text style={{
           fontSize:20,
           fontWeight:500,
           color:"black"
        }} >No notifcations !</Text> :
        notificationListRedux?.map((item,index)=>(
          <NotificationCard  key={index}
           NotificationId={item.notification_id}
           meetingId={null}
           NotificationStatus={item.is_seen}
          icon={feeIcon} msg={item.messages}
          date={item.created_on}
          parentId={parentId}
          />
          

        ))
      }
       {

ptmNotificationListRedux?.length===0 && notificationListRedux.length===0 ? <Text style={{
     fontSize:20,
     fontWeight:500,
     color:"black"
  }} >No notifcations !</Text> :
  ptmNotificationListRedux?.map((item,index)=>(
    <NotificationCard  key={index}
     NotificationId={null}
     meetingId={item.meeting_id}
    
     NotificationStatus={item.is_seen}
    icon={feeIcon} msg={item.messages}
    date={item.created_on}
    parentId={parentId}
    />
    

  ))
}
      
    
    
    
    </View>
}

    </ScrollView>
    </SafeAreaView>
   
  )
}

export default Notification;
const styles=StyleSheet.create(
    {
        mainContainer:{
          paddingTop:20,
            display:"flex",
            alignItems:"center",
           minHeight:height,
           height:"auto",
            width:"100%",
          
            alignContent:"center",
            rowGap:20,
            backgroundColor:COLORS.backgGroundColor
          
          
        
        }
    }
)
