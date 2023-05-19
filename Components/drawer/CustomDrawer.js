import { View, Text,StyleSheet,SafeAreaView,Image } from 'react-native';
import React,{useContext} from 'react';
import CommonCard from '../common/CommonCard';
import User from "../../assets/user.svg";

import User1 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Student from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AuthContext } from "../Context/Context";
import { COLORS } from '../Utils/Colors/Colors'

const student=require("../../assets/Student.png");








const CustomDrawer = ({ navigation,child_name }) => {

  // const logOutHandler = () => {
  //   navigation.navigate("login");
  // }
  console.log(child_name);
  const childrenHandler = () => {
    navigation.navigate("children");
  }
  const {logoutHandler}=useContext(AuthContext);
  console.log(logoutHandler);
  return (
    <SafeAreaView >
      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.ImageContainer}>
          <Image source={student}  style={{
          height:70,
          width:70
        }}/>
          </View>
       
           <View>
          
             
            <Text style={styles.text}>{child_name}</Text>
          
           </View>
         
        </View>
        <View style={styles.listContainer}>

        <View onStartShouldSetResponder={childrenHandler} style={styles.ListItemContainer}>
           <Icon name="person-circle-sharp" size={25} color={COLORS.mainColor1}/>
          <Text style={styles.text1}>Childrens</Text>
        </View>
        </View>
        <View style={styles.logOutMainContainer}>
        <View style={styles.logoutContainer}>
          <View style={styles.boxContainer}>
            <Icon name="settings-sharp" size={25} color={COLORS.mainColor1} />
            <Text style={styles.text1}>Settings</Text>
          </View>
          <View onStartShouldSetResponder={()=>logoutHandler(navigation)} style={styles.boxContainer}>

            <Icon name="log-out-sharp" size={25} color={COLORS.mainColor1}  />


            <Text style={styles.text1} >Logout</Text>
          </View>

        </View>
        </View>
        
      </View>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create(
  {
    mainContainer: {
      height: "100%",
      width: "100%",
      display: "flex",

      justifyContent: "space-between",
      alignItems: "center",

    },

    profileContainer: {
      width: "100%",
      display: "flex",
      height: 150,
     flex:1.75,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderWidth: .5,
      borderColor: "lightgrey",
      borderLeftWidth: 0,
      borderRightWidth: 0,
      backgroundColor:"#006DFF"



    },
    subProfileContainer:{
      display:"flex",
      flexDirection:"row",
     
      alignItems:"center",
      columnGap:5
      

    },
    listContainer:{
      flex:3,
      width:"80%",
      marginTop:20
     

    },
    ListItemContainer:{
      
      display: "flex",

      flexDirection: "row",
      padding: 2,
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: 20,
      
      

    },
    logOutMainContainer:{
       width:"100%",
       display:"flex",
       alignItems:"center",
       justifyContent:"center",
      
       flex:2,
       borderWidth:1,
      borderColor:"lightgrey",
      borderBottomWidth:0,
      borderRightWidth:0,
      borderLeftWidth:0,
    },
    logoutContainer: {

      width: "80%",
      height: 150,
      display: "flex",
      justifyContent: "center",
   
      rowGap: 10,
      


    },
    boxContainer: {
      display: "flex",

      flexDirection: "row",
      padding: 2,
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: 20,




    },

    text: {
      fontSize: 20,
      color: "white"
    },
    subtext:{

    },
    text1:{
      fontSize:18,
      color:"black"
    
    },
    ImageContainer:{
      backgroundColor:"white",
      height:100,
      width:100,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
     
      borderRadius:50
    }

  }
)
export default CustomDrawer;
