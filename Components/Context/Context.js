import React ,{createContext,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const  AuthContext =createContext();

import axios from 'axios';

import Toast from 'react-native-toast-message';

export const AuthProvider=({children})=>
{
    const [test,setTest]=useState("Hello");
    const [isLoding,setIsLoding]=useState(false);
    const [userToken,setUserToken]=useState(null);
    const [isLogoShow,setLogoShow]=useState(false);
    const [userInfo,setUserInfo]=useState("");
  

    const showToast = (type,header,msg="") => {
   
      Toast.show({
        type: type,
        text1: header,
        text2: msg
      });
    }
    const loginHandler= async(username,password,navigation,setPassword,setUserName,showToast,setShow)=>
    {
     
         console.log(navigation);
          if(username && password)
          {
            setShow(true);
              setIsLoding(true);
               axios.post('https://school-management-api.azurewebsites.net/parent/login',{
                username:username,
                password:password
               }).then((res)=>
               {
                console.log(res.data);
            setUserToken(res.data.token);
            
            AsyncStorage.setItem('userToken',res.data.token);
            setUserName("");
            setPassword("");
            setIsLoding(false);
            setShow(false);
            navigation.navigate('children');
            
                
               }).catch((err)=>
               {
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
                showToast("error",err.response.data.error);
             
                setUserName("");
                setPassword("");
                setShow(false);
                // navigation.navigate('notfound');
               


               })
          }
          else showToast("error","All Fields are Required")
  }
  
  
    const logoutHandler=async (navigation)=>
    {

     
      
        
        try {
          console.log(navigation.navigate);
      
          setUserToken(null);
          AsyncStorage.removeItem('userToken');
          setIsLoding(false);
      
          navigation.navigate("login");
        } catch (error) {
          console.error(error);
          
        }
       
     
      

        
    }
    const isLogin= async(navigation)=>
    {
        try {
            const value = await AsyncStorage.getItem('userToken');
            if(value) {
                
                console.log(value);
               setUserToken(value);
              navigation.navigate("children");
              
            
            } else {
              navigation.navigate("login");
              console.log('No data found');
            }
          } catch(e) {
            
            console.log(e);
          }

    }

   return (
    <AuthContext.Provider value={{loginHandler,logoutHandler,userToken,isLogin,isLoding}}>
        {children}
      
    </AuthContext.Provider>
   )
}