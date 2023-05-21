import { BarChart } from "react-native-gifted-charts";
import {View,Text} from "react-native"
        
const Bar = ({d,name}) => {
   

  const data = [
    {value: 25,  label:'Jan',totalMark:100},
    {value: 35, label:'Feb',totalMark:100},
    {value: 25,  label:'Mar',totalMark:100},
    {value: 35, label:'Apr',totalMark:100},
    {value: 90,label:'May',totalMark:100},
    {value:78, label:'Jun',totalMark:100},
    {value: 25, label:'July',totalMark:100},
    {value: 35,   label:'Aug',totalMark:100},
    {value: 90,label:'Sep',totalMark:100},
    {value:78, label:'Oct',totalMark:100},
    {value: 25, label:'Nov',totalMark:100},
    {value: 35,   label:'Dec',totalMark:100},
    
  ];
 

  return(
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
        {name}
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <BarChart
          data={d}
          barWidth={30}
          initialSpacing={25}
          spacing={25}
          hideRules={true}
          barBorderRadius={4}
          showGradient
          width={300}
          frontColor={'#006DFF'}
          gradientColor={"#009FFF"}
          yAxisThickness={1}
         xAxisThickness={1}
          xAxisColor={'grey'}
          yAxisColor={'grey'}
          yAxisTextStyle={{color: 'black'}}
          stepValue={10}
          maxValue={100}
          noOfSections={6}
          rulesType={"dashed"}
          scrollToEnd={true}
          scrollAnimation={true}
          barMarginBottom={5}
          showScrollIndicator={true}
      
          yAxisLabelTexts={['0', '20', '40', '60', '80', '90', '100']}
          labelWidth={40}
          xAxisLabelTextStyle={{color: 'black', textAlign: 'center'}}
          renderTooltip={(item, index) => {
            return (
              <View
                style={{
                  marginBottom: 10,
                  marginLeft: -20,
                  backgroundColor:'#006DFF',
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                  color:"white"
                }}>
                <Text style={{
                    color:"white",
                    fontSize:15,
                    fontWeight:500
                }}>{item.value+"/"+item.totalMark}</Text>
              </View>
            );
          }}
         
        />
      </View>
    </View>
  );
  }
  export default Bar;