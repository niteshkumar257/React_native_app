import React from "react";
import { useState,useContext ,useEffect} from "react";
import axios from "axios";

import { View,Text ,StyleSheet,Image,TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import { AuthContext } from "../Context/Context";
import Toast from "react-native-toast-message";
const Login=({navigation})=>
{
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const {loginHandler,isLogin,isLoding}=useContext(AuthContext);
  // console.log(loginHandler,isLoding,isLogin);


  const showToast = (type,header,msg="") => {
   
    Toast.show({
      type: type,
      text1: header,
      text2: msg
    });
  }
  
// useEffect(()=>
// {
//   console.log("useEffect");
//     isLogin(navigation)
// },[])
const login= async ()=>
{
  // navigation.navigate("children");
  // console.warn(username, password);
  // setShow(true);
  // axios.post(`https://school-management-api.azurewebsites.net/parent/login`,{
  //   username,password
  // }).then((res)=>
  // {
  //   console.log(res);
  //   setShow(false);
  //   // navigation.navigate("children");
  // }).catch(err=>
  //   {
  //     console.log(err);
  //     setShow(false);
  //     // navigation.navigate("notfound");
  //   })

  // axios.post('https://school-management-api.azurewebsites.net/parent/login',{
  //   username:username,
  //   password:password
  // }).then((res)=>
  // {
  //   console.log(res);
  // }).catch((err)=>
  // {
  //   console.log(err);
  // })
  // axios.get('https://school-management-api.azurewebsites.net/parents/15/getChildren').then((res)=>
  // {
  //   console.log(res.data);
  // }).catch(err=>
  //   {
  //     console.log(err);
  //   })

  // try {
  //   const response = await axios.post('https://school-management-api.azurewebsites.net/admin/login', {
  //     // data to be sent in the request body
  //     username: username,
  //     password: password,
  //   });
  //   console.log(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  // axios.post('https://school-management-api.azurewebsites.net/parent/login',
  // {
  //   username:username,
  //   password:password
  // }).then((res)=>
  // {
  //   console.log(res.data);
  // }).catch((err)=>
  // {
  //   console.log(err);
  // })
}
  const changePassword=()=>
  {
      navigation.navigate("changePassword");
  }
  const gwbanner=require("../img3.png");
  const gwlogo=require("../../assets/gwlogo.png");
  return (
    <View style={style.main_container}>
      <ActivityIndicator size={50} color={"#1377c0"} animating={show}/>
    <View style={style.Logo_container}>
    <Image source={gwlogo}  style={style.logo}/>
     <Image source={gwbanner} style={style.banner}/>
    </View>
    <View style={style.Info_container}>
     <TextInput
     placeholder="Username"
     style={style.text_input}
     value={username}
     caretHidden={false}
     onChangeText={(text)=>setUserName(text)}
     />
     <TextInput
     placeholder="Password"
     style={style.text_input}
     value={password}
     caretHidden={false}
     secureTextEntry={true}
     onChangeText={(text)=>setPassword(text)}
     />
    </View>
    <View style={style.btn}>
      <TouchableOpacity style={style.button} onPress={()=>loginHandler(username,password,navigation,setPassword,setUserName,showToast,setShow)}>
        <Text style={style.text}>Log In</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={changePassword}>
        <Text style={{
          color:"black",
          fontSize:17
        }}>Change password</Text>
      </TouchableOpacity>
   <Toast/>
</View>
  );
}
export default Login;
const style=StyleSheet.create({
  main_container:{
      height:"100%",
      width:"100%",
      // backgroundColor:"lightgreen",
      display:"flex",
      // justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#E9F3FD",
      rowGap:15,
      paddingTop:80
   


  },
 Logo_container:{
  height:100,
  width:"80%",
  borderRadius:9,

  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  flexDirection:"column",
  rowGap:30
 
  

  
 },
 Info_container:{
  height:200,
  width:"80%",
  borderRadius:9,
borderBottomColor:"black",
display:"flex",
 rowGap:20,
 display:"flex",
 justifyContent:"center",
 alignIgtem:"center",

 

 },
 banner:{
  height:55,
  width:"95%",
  padding:20,


 },
 btn:{
     height:70,
     width:"85%",
     borderRadius:9,
     fontSize:20,
     padding:5,
  
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     



    
 },
 text_input:{
  height:70,
  width:"100%",
  borderRadius:9,
  fontSize:15,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 9,
  padding: 10,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  
  

 },
button:{
  height:50,
  width:100,
  backgroundColor:"#1377c0",
  borderRadius:9,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  elevation: 10,
  shadowColor: '#000',
  width:"100%",
  padding:10,
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.1,
  shadowRadius: 5,
  
  
 
},
text:{
fontSize:25,
color:"white",
fontWeight:500


},
logo:{
   height:50,
   width:50,
   borderRadius:50,
   
   
}


})