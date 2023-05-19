import { LineChart } from "react-native-gifted-charts"
import {View,Text} from "react-native"
const Area1 = ({d,name}) => {
  const lineData = [
    {value: 60, label: 'Jan',totalMark:100},
    {value: 80, label: 'Feb',totalMark:100},
    {value: 90, label: 'Mar',totalMark:100},
    {value: 80, label: 'Apr',totalMark:100},
    {value: 40, label: 'May',totalMark:100},
    {value: 45, label: 'Jun',totalMark:100},
    {value: 60, label: 'July',totalMark:100},
    {value: 20, label: 'Aug',totalMark:100},
    {value: 60, label: 'Sep',totalMark:100},
    {value: 80, label: 'Oct',totalMark:100},
    {value: 90, label: 'Nov',totalMark:100},
    {value: 80, label: 'Dec',totalMark:100},
   
    
   
   
  
   
  ];
  
  
  return(
    <View
    style={{
      margin: 10,
      padding: 5,
      paddingBottom:20,
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
      {name}
    </Text>
    <View style={{padding: 20, alignItems: 'center'}}>
            <LineChart
            areaChart
            curved
            data={d}
             width={300}
            height={200}
            isAnimated
            spacing={45}
            initialSpacing={20}
            color1="#5AB8A8"
            color2="orange"
            textColor1="green"
          dataPointsColor="#438A7E"
            hideRules={true}
            showVerticalLines={false}
            noOfSections={5}
            xAxisThickness={0}
           xAxisLabelTextStyle={{
            color:"black",
            fontSize:15,
            marginLeft:10,
           }}
           yAxisTextStyle={{color: 'black'}}
            yAxisThickness={0}
            dataPointsColor1="blue"
            dataPointsColor2="red"
            startFillColor1="#70E6D2"
            endFillColor="#98EDDF"
            startFillColor2="orange"
            startOpacity={1}
            endOpacity={0.3}
            hideDataPoints
            dataPointsHeight={20}
            dataPointsWidth={20}
           
            />
        </View>
        </View>
      
  );
}
export default Area1;
