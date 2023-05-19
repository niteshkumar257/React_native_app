import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import StudentImage from "../../assets/male.svg";
import StudentImage2 from "../../assets/female.svg";
import Icon from "react-native-vector-icons/Ionicons";

const Student = ({navigation,name,child_id}) => {



   const clickHandler =(id)=>
   {
   
   
     navigation.navigate("home",
      {
         child_id:id,
         child_name:name
      });
   }
  return (
    <View  onStartShouldSetResponder={()=>clickHandler(child_id)} style={styles.container}>
 
 <Icon name="person-sharp" color={"#318CE7"} size={50}/>
  
  
    <View  style={styles.subContainer}>
     
    <View style={styles.infoContainer}>
       
         <Text  style={styles.NameText}>{name}</Text>
      </View>
     
  
    </View>
   
</View>


  )
}

export default Student
const styles=StyleSheet.create(

   {
     mainContainer:{
       width:"100%",
       height:"100%",
        display:"flex",
      
        
       
       
       
        
        
        

     },
       ChildrenListContainer:{
           height:"80%",
           width:"100%",
           display:"flex",
          justifyContent:"center",
          rowGap:10,
          alignItems:"center",
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.1,
          shadowRadius: 5,
        
        
        
        
       



       },
       container:{
         height:"auto",
         width:"95%",
         display:"flex",
         flexDirection:"row",
         columnGap:40,
         justifyContent:"center",
         alignItems:"center",
        backgroundColor:"white",
         paddingTop:20,
         paddingBottom:20,
         elevation: 5,
         shadowColor: '#000',
         shadowOffset: {width: 0, height: 0},
         shadowOpacity: 0.1,
         shadowRadius: 5,
         borderRadius:9
       
       
        
        
       
       },
       subContainer:{
         display:"flex",
         flexDirection:"column",
         alignItems:"center",
        

       },
       infoContainer:{
         width:200,
         display:"flex",
         flexDirection:"row",
         justifyContent:"flex-start",
         alignContent:"center",
         columnGap:20,
      
         paddingLeft:10,
      
       

       },
       NameText:{
        fontSize:20,
        fontWeight:600,
        color:"black",
        textAlign:"center",
        lineHeight:25,
        letterSpacing:1.3
       
       }
       
   }
)