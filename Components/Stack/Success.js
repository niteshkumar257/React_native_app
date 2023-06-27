import { View, Text ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { COLORS } from '../Utils/Colors/Colors';
const { width, height } = Dimensions.get('window');

const Success = ({navigation}) => {
    const success=require("../../assets/success.png");
    const NavigateLogin=()=>
    {
       navigation.navigate("login");
    }
  return (
    <View style={styles.container}>
      
       <Image source={success} style={styles.image}/>
       <Text style={styles.textSuccess}>Password Reset SuccesFully</Text>
       <View style={styles.loginContainer}>
       <View style={styles.btn}>
       <TouchableOpacity style={styles.button} onPress={()=>NavigateLogin()}>
        <Text style={styles.text}>LOG IN</Text>
      </TouchableOpacity>
      </View>
       </View>
    </View>
  )
}

export default Success;
const styles=StyleSheet.create({
container:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        minHeight:height,
        width:width,
        rowGap:40,
        backgroundColor:COLORS.backgGroundColor,
    },
    textSuccess:{
        fontSize:20,
        fontWeight:500,
        color:"green"
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
        
      },text:{
        fontSize:15,
        color:"white",
        fontWeight:500
        
        
        },
   

})
