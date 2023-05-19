import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Student from './Student';

import Headers from './header';
import Toast from 'react-native-toast-message';
import axios from "axios";
import { AuthContext } from '../Context/Context';
import jwtDecode from 'jwt-decode';
import AcitvityHandler from '../bottom/AcitvityHandler';




const Children = ({ navigation }) => {

  const [children, setChildren] = useState([]);
  const { userToken } = useContext(AuthContext);
  const [showActivity, setShowActitvity] = useState(true);
  let userInfo = jwtDecode(userToken);
  let parentId = (userInfo.result.parent_id);


  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/parents/${parentId}/getChildren`)
      .then((res) => {

        setChildren(res.data.allChildren);
      
        setShowActitvity(false);
        
      }).catch((err) => {
        console.log(err);
        setShowActitvity(false);
     
        navigation.navigate("notfound")
      })
  }, [])

 const showToast = (type, header, msg = "") => {

    Toast.show({
      type: type,
      text1: header,
      text2: msg
    });
  }

 return (
    <View style={styles.mainContainer}>
      <Headers navigation={navigation} />
      {showActivity ? <AcitvityHandler /> :
        <View style={styles.ChildrenListContainer}>
          
           <View style={styles.titleContainer}>
            <Text style={styles.title}>Children's Details</Text>
           </View>
          {
            children.map((item, index) =>
            (
              <Student key={item.child_id} name={item.child_name} child_id={item.child_id}
                navigation={navigation}
              />
            ))
          }
       </View>
      }
      <Toast />
    </View>

  );
}
const styles = StyleSheet.create(

  {
    mainContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      backgroundColor: "#E9F3FD"
 },
    ChildrenListContainer: {
      height: "80%",
      width: "100%",
      display: "flex",
      paddingTop:30,
      padding:5,
      rowGap: 30,
      alignItems: "center",

    },
    titleContainer:{
      width:"100%",
      height:40,
      paddingLeft:15,

     
     
    },
    title:{
        color:"black",
       
        fontSize:20,
        fontWeight:500,
        color:"black"
    },
    container: {
      height: 140,
      width: 140,
      display: "flex",
      flexDirection: "row",
      columnGap: 20,
      justifyContent: "center",
      alignItems: "center",

    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"

    },
    infoContainer: {
      width: 200,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      columnGap: 10,

      paddingLeft: 10


    },
    text: {
      fontSize: 13,
      fontWeight: 500,
      color: "black",
      textAlign: "center",

    }

  }
)

export default Children;
