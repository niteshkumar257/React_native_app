import { View, Text,StyleSheet } from 'react-native'
import {LineChart} from 'react-native-charts-wrapper';
import React from 'react'

const CharttWrapper = () => {
  return (
   
    <View style={{flex: 1}}>
        <View style={styles.container}>
          <LineChart style={styles.chart}
            data={{dataSets:[{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
          />
        </View>
      </View>
 
  )
}

export default CharttWrapper;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      height:200,
      width:360,

      backgroundColor: '#F5FCFF'
    },
    chart: {
      flex: 1
    }
  });