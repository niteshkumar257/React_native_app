import { View, Text ,Dimensions} from 'react-native'
import React from 'react'
import { VictoryBar, VictoryChart, VictoryTheme,victoryLine } from "victory-native";

const {width,height}=Dimensions.get('screen');


const Graph = () => {
  const data = [
  
    { quarter: "Jan", earnings: 89 },
    { quarter: "Feb", earnings: 56 },
    { quarter: "Mar", earnings: 45 },
    { quarter: "Apr", earnings: 19 },
    { quarter: "May", earnings: 13 },
    { quarter: "Jun", earnings: 65 },
    { quarter: "Jul", earnings: 42 },
    { quarter: "Aug", earnings: 19 }, { quarter: "Oct", earnings: 30 },
    { quarter: "Sep", earnings: 85 },
    { quarter: "Nov", earnings: 42 },
    { quarter: "Dec", earnings: 90 },
    { quarter: "Jan1", earnings: 89 },
    { quarter: "Feb1", earnings: 56 },
    { quarter: "Mar1", earnings: 45 },
    { quarter: "Apr1", earnings: 19 },
    { quarter: "May1", earnings: 13 },
    { quarter: "Jun1", earnings: 65 },
    { quarter: "Jul1", earnings: 42 },
    { quarter: "Aug1", earnings: 19 },
    { quarter: "Sep1", earnings: 85 },
     { quarter: "Oct", earnings: 30 },
   
    { quarter: "Nov1", earnings: 42 },
    { quarter: "Dec1", earnings: 90 },
   
  ];
  
  return (
    <View>
         <VictoryChart width={1000} theme={VictoryTheme.material}  domainPadding={10}>
          <VictoryBar 
          barWidth={10}
        
          width={width}
           height={height+10}
          
          style={{
            data: { fill: "#268cfc" }
          }}
          animate={{
            duration:3000
          }}
         
        
          
           data={data} x="quarter" y="earnings" />
        </VictoryChart>
    </View>
  )
}

export default Graph;