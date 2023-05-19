import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'
const Mark = ({data,testId,testDate}) => {

   
    const dateStr = testDate;
    const parts = dateStr.split("-");
    const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  return (
    <View style={styles.markContainer}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Test No: {testId}</Text>
            <Text style={styles.headerText}>Date: {formattedDate}</Text>
        </View>
       
        <View style={styles.rowData}>
            {
                data.map(  (item,index)=>(
                    <Card key={index} subject={item.subjectName} obtaindMark={item.obtained_mark} totalMark={item.total_marks}/>
                ))
            }
           
          
        </View>
    </View>
  )
}
 
export default Mark

const styles = StyleSheet.create({
    markContainer:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        height:"auto",
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        width:"100%",
        padding:10,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderRadius:9,
        rowGap:10,
       

    },
    header:{
          height:"auto",
          display:"flex",
          flexDirection:"row",
         width:"100%",
         justifyContent:"space-around",
         borderWidth:4,
          borderBottomColor:"white",
          borderRightWidth:0,
          borderLeftWidth:0,
          borderTopWidth:0,
          borderRadius:9,
          paddingBottom:5,
          paddingtop:5,
          backgroundColor:"#A8CFF6",
          alignItems:"center",
       

    },
    headerText:{
       fontSize:15,
       fontWeight:500,
       height:40,
       color:"black",
      
       lineHeight:40,
       textAlign:"center",
     

      
    },
    rowData:{
        display:"flex",
        width:"100%",
        flexDirection:"row",
        columnGap:20,
        rowGap:10,
        // width:150,
        justifyContent:"flex-start",
        alignItems:"center",
        flexWrap:"wrap",
        padding:10,
        backgroundColor:"#A8CFF6",
        borderRadius:9

    }
})