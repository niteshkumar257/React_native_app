import { BarChart } from "react-native-gifted-charts";
import {View,Text }from "react-native"
        
const BarGraph = ({name}) => {

    const barData = [
        {value: 89, label: 1},
        {value: 94, label: 2},
        {value: 29, label: 2},
        {value: 79, label: 4},
        {value: 9, label: 5},
        {value: 59, label: 6},
        {value: 82, label: 7},
        {value: 81, label: 8,topLabelComponent: () => (
          <Text style={{color: 'black', fontSize:10, marginBottom:1}}>81</Text>
        ),},
        {value: 67, label: 9},
        {value: 52, label: 10},
        {value: 89, label: 11},
        {value: 94, label: 12},
        {value: 29, label: 13},
        {value: 79, label: 14},
        {value: 9, label: 15},
        {value: 59, label: 16},
        {value: 82, label: 17},
       
    ];
  
    
    return (
        <View>
          <Text>{name}</Text>
            <BarChart
                barWidth={20}
                isThreeD
                isAnimated
                noOfSections={0}
                barBorderRadius={4}
                frontColor="#318CE7"
                data={barData}
                topLabelComponent
              
                  height={300}
                  initialSpacing={20}
                yAxisThickness={0}
                hideRules={false}
                hideAxesAndRules
              
                sideColor={"grey"}
                topColor={"white"}
                showScrollIndicator={true}
             
                lableTextStyle={{
                  color:"black",
               
                }}
                xAxisLabelTexts={"black"}
                
                xAxisThickness={0}
             
                renderTooltip={(item, index) => {
                  return (
                    <View
                      style={{
                        marginBottom: 20,
                        marginLeft: -6,
                        backgroundColor: 'white',
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        borderRadius: 4,
                      }}>
                      <Text>{item.value}</Text>
                    </View>
                  );
                }}
            />
        </View>
    );
};
export default BarGraph