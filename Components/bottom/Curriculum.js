import { View, Text ,StyleSheet,ScrollView,FlatList,Image} from 'react-native'
import React ,{useEffect,useState,useContext} from 'react'
import DataContext from '../Context/DataContext'



const Screen1 = () => {
   
  const {id}=useContext(DataContext);
  const [childId,setChildId]=useState(id);
 const logo=require("../../assets/data1.png")
  return (
    <ScrollView style={styles.ViewContainer}>
      <View style={styles.container}> 
  
  <Image style={styles.Image} source={logo}/>
</View>
    </ScrollView>
    
  )
}
const styles=StyleSheet.create(
  {
    ViewContainer:{
      height:900,
      width:"100%",
      padding:5,
      backgroundColor:"#E9F3FD"
    
},
    container:{
      height:700,
      width:"100%",
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
     
       padding:20,
       gap:30,
    },
    text:{
      fontSize:20,
      color:"black",
      fontWeight:600,
     
    },
    contentBox:{
      height:200,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
       
      borderWidth:1,
      borderColor:"black",
    
    



    },
    title:{
      height:40,
      width:"100%",
      padding:20,
      margin:10,
      backgroundColor:"grey"
      

    },
    body:{
      minHeight:100,
      width:"100%",
      padding:20,
      margin:10,
      backgroundColor:"lightgrey"

    },
    Image:

    {
      height:300,
      width:"100%",
      padding:10
    }

  }
)
export default Screen1