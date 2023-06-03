import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');

const NotFoundText = ({title}) => {
  return (
    <View style={styles.notfoundContainer} >
      <Text style={{
        fontSize:15,
        fontWeight:600,
        color:"black"
      }}>{title}</Text>
    </View>
  )
}

export default NotFoundText;
const styles=StyleSheet.create(
    {
      notfoundContainer:{
          height:height-200,
          display:"flex",
          justifyContent:"center",
          alignItems:'center'
      }
    }
  )