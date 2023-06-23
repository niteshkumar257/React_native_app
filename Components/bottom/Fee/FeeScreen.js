import { View, Text,StyleSheet ,Button,ScrollView} from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import Fee from "./Fee";
import axios from 'axios';
import AcitvityHandler from '../AcitvityHandler';
import DataContext from '../../Context/DataContext';
import NotFoundText from '../NotFoundText';
import { useQuery } from '@tanstack/react-query';
import { GW_URL } from '../../config';
import { COLORS } from '../../Utils/Colors/Colors'






const Screen2 = ({navigation}) => {

  const {id}=useContext(DataContext);
  const [childId,setChildId]=useState(id);
  const [first,setFirst]=useState(0);
  const [second,setSecond]=useState(0);
  const [thrid,setThird]=useState(0);
  const [firstSatus,setFirstStatus]=useState(false);
  const [secondSatus,setSecondStatus]=useState(false);
  const [thridSatus,setThridStatus]=useState(false);
  const [date1,setDate1]=useState("");
  const [date2,setDate2]=useState("");
  const [date3,setDate3]=useState("");
  const [showActivity,setShowsActivity]=useState(true);
  const [feeArray,setFeeArray]=useState([]);
  // useEffect(()=>
  // {
    
  //    axios.get(`https://school-management-api.azurewebsites.net/students/${childId}/fees`).then((res)=>
  //    {
    
        
  //     console.log(res.data?.studentFees);
  //     setFeeArray(res.data?.studentFees);
  //      setFirst(res?.data?.studentFees[0].first_installment);
  //      setSecond(res?.data?.studentFees[0].second_installment);
  //      setThird(res?.data?.studentFees[0].third_installment);
  //      setFirstStatus(res?.data?.studentFees[0].first_installment_status);
  //      setSecondStatus(res?.data?.studentFees[0].second_installment_status);
  //      setThridStatus(res?.data?.studentFees[0].third_installment_status);
  //      setDate1(res?.data?.studentFees[0].first_installment_eta.slice(0, 10));
  //      setDate2(res?.data?.studentFees[0].second_installment_eta.slice(0,10));
  //      setDate3(res?.data?.studentFees[0].third_installment_eta.slice(0,10));
  //      setShowsActivity(false);

  //    }).catch((err)=>
  //    {
  //     setShowsActivity(false);
    
  //     console.log(err);
  //    })
  // },[])
  const {data:res,isLoading,isError,error}=useQuery({
    queryKey:['fee-details',childId],
    queryFn:()=>
    {
      return  axios.get(`${GW_URL}/students/${childId}/fees`)
    }
  })
  useEffect(()=>
  {
     if(!isLoading)
     {
      console.log(70,res);
      console.log("load succesfully")
      setFeeArray(res?.data?.studentFees);
      setFirst(res?.data?.studentFees[0]?.first_installment);
      setSecond(res?.data?.studentFees[0]?.second_installment);
      setThird(res?.data?.studentFees[0]?.third_installment);
      setFirstStatus(res?.data?.studentFees[0]?.first_installment_status);
      setSecondStatus(res?.data?.studentFees[0]?.second_installment_status);
      setThridStatus(res?.data?.studentFees[0]?.third_installment_status);
      setDate1(res?.data?.studentFees[0]?.first_installment_eta.slice(0, 10));
      setDate2(res?.data?.studentFees[0]?.second_installment_eta.slice(0,10));
      setDate3(res?.data?.studentFees[0]?.third_installment_eta.slice(0,10));
      setShowsActivity(false);
     }
     if(isError)
     {
      console.log(error.message);
     }
  },[res]);
  return(
  <ScrollView style={styles.ViewContainer}>
    <View style={styles.header}>
       <Text style={styles.headerText}>Fees Details</Text>
    </View>
    {
       
      showActivity ? <AcitvityHandler show={showActivity}/> : feeArray.length!=0 ?
    
    <View style={styles.container}>
      
      <Fee nthInstallMent={"1st"} status={firstSatus} amount={first} date={date1}/>
      <Fee nthInstallMent={"2nd"} status={secondSatus} amount={second} date={date2}/>
      <Fee nthInstallMent={"3rd"} status={thridSatus} amount={thrid} date={date3}/>
     </View>
     :<NotFoundText title={"No fee details"}/>

}
  </ScrollView>
  )
}
const styles=StyleSheet.create(
  {
    ViewContainer:{
      height:"100%",
      width:"100%",
      minHeight:700,
      padding:5,
      backgroundColor:COLORS.backgGroundColor
     
     
     
},
    container:{
      height:"auto",
      width:"100%",
       display:"flex",
       flexDirection:"column",
       rowGap:30,
      padding:10,
      paddingTop:20,
      color:"white",
    
    
     
      
      
    },
    header:{
      fontSize:20,
      fontWeight:500,
      color:"black",
      marginBottom:10
    },
    header:{
      width:"100%",
      height:40,
      
      flex:1,
      paddingLeft:10,
      justifyContent:"center",
     
  },
  headerText:{
       fontSize:20,
       fontWeight:500,
       color:"black"
  }
  }
)
export default Screen2