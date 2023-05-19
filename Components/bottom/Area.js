import { LineChart } from "react-native-gifted-charts";
import {View,Text} from "react-native"
        
const Area = ({d,name}) => {
    const lineData = [
        {value: 90,  label:'Jan'},
        {value: 35, label:'Feb'},
        {value: 25,  label:'Mar'},
        {value: 35, label:'Apr'},
        {value: 90,label:'May'},
        {value:78, label:'Jun'},
        {value: 25, label:'July'},
        {value: 35,   label:'Aug'},
        {value: 90,label:'Sep'},
        {value:78, label:'Oct'},
        {value: 25, label:'Nov'},
        {value: 35,   label:'Dec'},
       
    ];
 
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
          {name}
        </Text>
        <View style={{padding: 20, alignItems: 'center'}}>
        <LineChart
         areaChart
         curved={true}
              initialSpacing={40}
              data={lineData}
             width={300}
             isAnimated
            textColor1="#006DFF"
            textShiftY={-8}
            textShiftX={-10}
            textFontSize={13}
            thickness={5}
             hideRules
            yAxisColor="lightgrey"
            
            verticalLinesColor="lightgrey"
            xAxisColor="lightgrey"
            color="#006DFF"
            yAxisThickness={1}
            xAxisThickness={1}
            showVerticalLines={true}
          
            onPress={(item, index) => {
                Alert.alert(item.value)
            }}
            dataPointsColor1="black"
            dataPointsColor2="red"
            startFillColor="#006DFF"
            startOpacity={1}
            xAxisLabelTextStyle={{
                color:"black",
                fontSize:15,
                fontWeight:500
            }}
            endFillColor="white"
            endOpacity={0.1}
            noOfSections={5}
            dataPointsHeight={20}
            dataPointsWidth={20}
            showScrollIndicator={true}
            animationDuration={1000}
          maxValue={100} 
          minValue={0}
         
          scrollAnimation={true}
          verticalLinesThickness={.5}
          
       
        
           yAxisTextStyle={{color: 'black'}}
            xAxisTextStyle={{color:'black'}}
           
              renderTooltip={(item, index) => {
                return (
                  <View
                    style={{
                      marginBottom: 10,
                      marginLeft: 0,
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
                    }}>{item.value}</Text>
                  </View>
                );
              }}
             
          />
        </View>
      </View>
    );
}
export default Area;