import { View, Text } from 'react-native'
import { VictoryChart, VictoryArea, VictoryAxis, VictoryTooltip } from 'victory-native';
import React from 'react'
import { Dimensions } from 'react-native';
import {COLORS} from "../../Utils/Colors/Colors";
const { width, height } = Dimensions.get('window');

const Victory = () => {
  return (
    
    <View
    style={{
      margin: 10,
      padding: 5,
      paddingRight:5,
       width:370,
      backgroundColor: 'white',
      display:"flex",
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      borderRadius:9,
   
      justifyContent:"flex-start",
      alignItems:"center"
    }}>
    <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
      {"Physics"}
    </Text>
    <View style={{padding: 20, alignItems: 'center'}}>
     <VictoryChart>
  <VictoryArea
    data={[
      { "Month": "Jan", "Mark": 20,  },
      { "Month": "Feb", "Mark": 30,  },
      { "Month": "Mar", "Mark": 50,  },
      { "Month": "Jun", "Mark": 40, },
      { "Month": "Ju", "Mark": 60, },
      { "Month": "Aug", "Mark": 20,  },
      { "Month": "Sep", "Mark": 30,  },
      { "Month": "Oct", "Mark": 50,  },
      { "Month": "Nov", "Mark": 40,  },
      { "Month": "Dec", "Mark": 60,  }
    ]}
    x="Month"
    y="Mark"
    width={width}
    height={400}
    animate={{
        duration: 2000,
        onLoad: { duration: 1000 }
      }}
      interpolation="natural"
      domain={{ y: [0, 100]}}
      style={{
        data: {
          fill:COLORS.mainColor3, fillOpacity: 0.7, stroke: "black", strokeWidth: 3
        },
        labels: {
          fontSize: 15,
          fill: ({ datum }) => datum.x === 3 ? "#000000" : "black"
        }
       
      }}
      labels={({ datum }) => datum.Mark}
      
  />
</VictoryChart>
    </View>
    </View>
  )
}

export default Victory