import { StyleSheet, Text, View,Image } from 'react-native'
import { AuthContext } from '../Context/Context'
import React,{useContext,useEffect} from 'react'
import BackgroundImage from "../../assets/box.gif";

const Logo = ({navigation}) => {
  const {isLogin}=useContext(AuthContext);
  useEffect(()=>
  {
    console.log("logo screen");
    isLogin(navigation)
  },[])
  return (
    <View style={{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Image 
        source={require('../../assets/gwlogo.png')}  
        style={{width: 200, height: 200 }}
    />
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({})