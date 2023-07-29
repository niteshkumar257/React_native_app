import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { COLORS } from '../../Utils/Colors/Colors';


const customDataPoint = () => {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#07BAD1',
      }}
    />
  );
};

const customLabel = (val) => {
  return (
    <View style={{ width: 70, marginLeft: 7 }}>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>{val}</Text>
    </View>
  );
};

const customDataPointLabel = (value,totalMark) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 4,
        paddingVertical: 3,
        borderRadius: 23,
        elevation:20
      }}
    >
      <Text style={{ color: 'black' ,fontWeight:"bold"}}>{value+"/"+totalMark}</Text>
    </View>
  );
};



const Area = ({name,data}) => {
  const transformData = data.map(item => ({
    value: item.totalMark,
    totalmark: item.totalMark,
    labelComponent: () => customLabel(item.label),
    customDataPoint: customDataPoint,
    dataPointLabelComponent: () => customDataPointLabel(item.value,item.totalMark)
  }));
  if (transformData.length === 1) {
    transformData.unshift({
      value: 0,
      totalmark: 0,
      labelComponent: () => null,
      customDataPoint: () => null,
      dataPointLabelComponent: () => null,
    });
  }
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
        thickness={2}
        color="#07BAD1"
        maxValue={100}
        noOfSections={5}
        areaChart
        width={300}
        yAxisTextStyle={{ color: 'black' ,fontWeight:"bold"}}
        xAxisTextStyle={{ color: 'black' }}
        xAxisLabelTextStyle={{color:"black"}}
        xAxisLabelTexts={{color:"black"}}
        data={transformData}
        curved
       xAxisColor="black"
        startFillColor={COLORS.mainColor3}
        endFillColor={COLORS.mainColor2}
        startOpacity={0.8}
        endOpacity={0.5}
        spacing={50}
        hideRules={true}
     
        rulesColor="gray"
        rulesType="solid"
        initialSpacing={40}
        yAxisColor="black"
      
      yAxisLabelTexts={{color:"black"}}
        dataPointsHeight={20}
        dataPointsWidth={20}
      />
    </View>
    </View>
  );
};

export default Area;
