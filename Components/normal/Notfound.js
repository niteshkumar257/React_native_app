import { View, Text,StyleSheet ,Image} from 'react-native'
import React from 'react'
const notfound=require("../../assets/404.gif")

const Notfound = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:30,color:"black",fontWeight:"500"}}>Not found</Text>
    <Image style={styles.image} source={notfound} />
    </View>
  )
}

export default Notfound;
const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:'center'
        },
        image:{
          height:300,
          width:300
        }
    }
)