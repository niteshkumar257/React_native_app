import React from "react";
import { useState } from "react";

import Toast from 'react-native-toast-message';

import { View,Text ,StyleSheet,Image,TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import axios from "axios";

const Login=({navigation})=>
{
  const [username,setUserName]=useState("");
  const [oldPassword,setOldPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
    const [show,setShow]=useState(false);

      const showToast = (type,header,msg="") => {
   
    Toast.show({
      type: type,
      text1: header,
      text2: msg
    });
  }
  const loginHandler=()=>
  {

    
    if (newPassword && confirmPassword && username && oldPassword ) {
      

      if(newPassword!=confirmPassword) showToast("error","Mismatch","New password and Confirmpassword are not same ")
      else {
        setShow(true);
      // api call
      axios.post("https://school-management-api.azurewebsites.net/parents/changePassword", {
        username:username,
        old_password:oldPassword,
        new_password:newPassword
      }).then((data) => {
          console.log(data)
          setNewPassword("");
          setOldPassword("");
          setUserName("");
          setConfirmPassword("");
          showToast("success","SuccesFull","Password changed successfully")
          setTimeout(() =>   navigation.navigate("login"),500);
         
          setShow(false);
        
          

      }).catch((err) => {
        setShow(false);
    
         showToast("error",err.message,"Not found")
      })
    }

    }
    else 
    {
      setShow(false);
      showToast("error","All fields are Required ?","AllFields Required")
    }
   



  }
  
  
  
   
  
  
   
  
  const logo=require("../img3.png");
  return (
    <View style={style.main_container}>
     <ActivityIndicator size={50} color={"#1377c0"} animating={show}/>
    <View style={style.Logo_container}>
     <Image source={logo} style={style.image}/>
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
     placeholder="Old Password"
     style={style.text_input}
     value={oldPassword}
     caretHidden={false}
     secureTextEntry={true}
     onChangeText={(text)=>setOldPassword(text)}
     />
     <TextInput
     placeholder="New Password"
     style={style.text_input}
     value={newPassword}
     caretHidden={false}
     onChangeText={(text)=>setNewPassword(text)}
     />
     <TextInput
     placeholder="Confirm Password"
     style={style.text_input}
     value={confirmPassword}
     caretHidden={false}
     secureTextEntry={true}
     onChangeText={(text)=>setConfirmPassword(text)}
     />
    </View>
    <View style={style.btn}>
      <TouchableOpacity style={style.button} onPress={loginHandler}>
        <Text style={style.text}>Change Password</Text>
      </TouchableOpacity>
    </View>
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
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"white",
      rowGap:20


  },
 Logo_container:{
  height:100,
  width:"80%",
  borderRadius:9,

  display:"flex",
  alignItems:"center",
  justifyContent:"center"
  

  
 },
 Info_container:{
  height:300,
  width:"80%",
  borderRadius:9,
borderBottomColor:"black",
display:"flex",
 rowGap:20,
 display:"flex",
 justifyContent:"center",
 alignIgtem:"center",

 

 },
 image:{
  height:55,
  width:"95%",
  padding:20,


 },
 btn:{
     height:100,
     width:"80%",
     borderRadius:9,
     fontSize:20,
     padding:10,
    
 },
 text_input:{
  height:50,
  width:"100%",
  borderRadius:9,
  fontSize:15,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 9,
  padding: 10,
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
  

 },
button:{
  height:50,
  width:"100%",
  backgroundColor:"#1377c0",
  borderRadius:9,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  
  
 
},
text:{
fontSize:25,
color:"white",
fontWeight:500


}


})