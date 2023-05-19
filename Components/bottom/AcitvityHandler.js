import { View, Text ,ActivityIndicator} from 'react-native'
import React from 'react'

const AcitvityHandler = ({show}) => {

  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:650,
        width:"100%",
       
    
    }}>
      <ActivityIndicator size={50} color={"#1377c0"} animating={show}/>
    </View>
  )
}

export default AcitvityHandler