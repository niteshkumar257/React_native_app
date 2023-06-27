import React from "react";
import { useState,useContext ,useEffect} from "react";
import { View,Text ,StyleSheet,Image,TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import { AuthContext } from "../Context/Context";
import Toast from "react-native-toast-message";
import { COLORS } from '../Utils/Colors/Colors'
import CustomToast from "./Toast";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const Login=({navigation})=>
{

  useEffect(()=>
  {
     
      isLogin(navigation)
   
   
  },[])
  const gwbanner=require("../../assets/img3.png");
  const gwlogo=require("../../assets/gwlogo.png");
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const {loginHandler,isLogin,isLoding}=useContext(AuthContext);
 

  

  const showToast = (type,header,msg="") => {
   
    Toast.show({
      type: type,
      text1: header,
      text2: msg,
      color:"red",
      style: {
        backgroundColor: 'red', // Set the desired background color here
      },
      customComponent: (
        <CustomToast
          logo={gwlogo}
          message={msg}
        />
      ),
    
    });
  }
  

  const changePassword=()=>
  {
      navigation.navigate("changePassword");
  }
 
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
     placeholderTextColor="black"
     color="black"
     style={style.text_input}
     value={username}
     caretHidden={false}
     onChangeText={(text)=>setUserName(text)}
     />
     <TextInput
     placeholder="Password"
     style={style.text_input}
     color="black"
     value={password}
     caretHidden={false}
     secureTextEntry={true}
     placeholderTextColor="black"
     onChangeText={(text)=>setPassword(text)}
     />
    </View>
    <View style={style.btn}>
      <TouchableOpacity style={style.button} onPress={()=>loginHandler(username,password,navigation,setPassword,setUserName,showToast,setShow)}>
        <Text style={style.text}>LOG IN</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={changePassword}>
        <Text style={{
          color:"black",
          fontSize:17,
          textDecorationLine:"underline"
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
      backgroundColor:COLORS.backgGroundColor,
      rowGap:15,
      paddingTop:80
   },
 Logo_container:{
  height:100,
  width:width-60,
  borderRadius:9,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  flexDirection:"column",
  rowGap:30,
  
 },
 Info_container:{
  marginTop:20,
  height:160,
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
  height:60,
  width:width-60,
  padding:20,
 
},
 btn:{
     height:50,
     width:width-60,
     borderRadius:9,
     fontSize:20,
     padding:5,
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
    
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
fontSize:18,
color:"white",
fontWeight:500


},
logo:{
   height:100,
   width:100,
   backgroundColor:"red"
  
   
   
},
customToastContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'black',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
},
leftBorder: {
  backgroundColor: 'YOUR_CUSTOM_LEFT_BORDER_COLOR',
  width: 4,
  height: '100%',
  marginRight: 16,
  borderRadius: 2,
},
toastContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
logo: {
  width: 60,
  height: 60,
  marginRight: 8,
},


})