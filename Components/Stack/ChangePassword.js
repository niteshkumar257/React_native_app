import React from "react";
import { useState } from "react";
import Toast from 'react-native-toast-message';
import { View,Text ,StyleSheet,Image,TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import axios from "axios";
import { COLORS } from '../Utils/Colors/Colors'

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
          console.log(data.data);
        
          if(data.data.success==0)
          {
            showToast("error",data.data.error);
            setOldPassword("");
            setUserName("");
          }
          else 
          {
            showToast("success","SuccesFull","Password changed successfully")
            setTimeout(() =>   navigation.navigate("login"),2000);
            setNewPassword("");
            setOldPassword("");
            setUserName("");
            setConfirmPassword("");
          }
          
         
          setShow(false);
        
          

      }).catch((err) => {
        if (err.response) {
          // The request was made, but the server responded with a non-2xx status code
          if (err.response.status === 401) {
            setIsLoding(false);
            showToast('error', 'Unauthorized user');
          } else {
            setIsLoding(false);
            showToast('error', 'An error occurred');

          }
        } else if (err.request) {
          setIsLoding(false);
          // The request was made, but no response was received
          showToast('error', 'No response received from server');
          navigation.navigate('notfound');
        } else {
          setIsLoding(false);
          // Something happened in setting up the request that triggered an Error
          showToast('error', 'Network failure or server is unreachable');
         navigation.navigate('notfound');

        }
        setShow(false);
    
        
      })
    }

    }
    else 
    {
      setShow(false);
      showToast('error',"All fields are Required ?","AllFields Required")
    }
   

  }
  
  
  const logo=require("../../assets/img3.png");
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
     color="black"
     caretHidden={false}
     placeholderTextColor="black"
     onChangeText={(text)=>setUserName(text)}
     />
     <TextInput
     placeholder="Old Password"
     style={style.text_input}
     value={oldPassword}
     caretHidden={false}
     color="black"
     secureTextEntry={true}
     placeholderTextColor="black"
     onChangeText={(text)=>setOldPassword(text)}
     />
     <TextInput
     placeholder="New Password"
     style={style.text_input}
     value={newPassword}
     caretHidden={false}
     color="black"
     placeholderTextColor="black"
     onChangeText={(text)=>setNewPassword(text)}
     />
     <TextInput
     placeholder="Confirm Password"
     style={style.text_input}
     value={confirmPassword}
     caretHidden={false}
     color="black"
     secureTextEntry={true}
     placeholderTextColor="black"
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
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:COLORS.backgGroundColor,
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