import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const Card = ({subject,obtaindMark,totalMark}) => {
  return (
    <View>
      <View style={styles.CardContainer}>
        <View style={styles.MarkContainer}>
        <Text style={styles.text}>{subject}</Text>
        </View>
       <View style={styles.MarkContainer}>
       <Text style={styles.text}>{obtaindMark}/{totalMark}</Text>
       </View>
      
        
      </View>
    </View>
  )
}

export default Card;
const styles=StyleSheet.create(
    {
          CardContainer:{
            width:155,
            padding:10,
            display:"flex",
            height:40,
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
          columnGap:30,
            backgroundColor:"white",
            borderRadius:9
          },
          MarkContainer:{
            
          },
          text:{
            fontSize:12,
            color:"black",
            fontWeight:600
            
          }
    }
)