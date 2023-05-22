import { View, Text } from 'react-native'
import React from 'react'
import Bar from './Bar'
import Area from '../Area'
import Area1 from '../Area1'
import BarGraph from '../BarGraph'
import ChartKit from '../ChartKit'
import ChartC from '../Chart'
import Graph from '../Graph'
import LineChart from '../LineChart'
import ScrolableChart from '../ScrolableChart'
import CharttWrapper from '../CharttWrapper'
import AreaChart from './AreaChart'
const months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
const BarGraphCompnent = ({data}) => {
    let dataList = [];
    const graphDataConvert = (markList) => {
      dataList = markList?.reduce((acc, test) => {
        test.subject_name.forEach((subject, index) => {
          const markInfo = {
            value: test.mark_obtained[index],
            label: new Date(test.test_date).getMonth(),
            totalMark:test.total_marks[index]
           
          
          };
          const subjectIndex = acc.findIndex(item => item.subjectName === subject);
          if (subjectIndex === -1) {
            acc.push({ subjectName: subject, markInfo: [markInfo] });
          } else {
            acc[subjectIndex].markInfo.push(markInfo);
          }
        });
        return acc;
      }, []);
  
      dataList?.map((it) => {
        it.markInfo.sort((a, b) => a.label - b.label);
      })
      dataList.map((it)=>
      {
        it.markInfo.map((item,index)=>
        {
            item.label=months[item.label]
        })
      })  
    }
    graphDataConvert(data);
    console.log(dataList);
  return (
    <View>
     {
          dataList.map((item,index)=>(
            <Bar
            key={item.id}
            d={item.markInfo}
           name={item.subjectName}/>
          ))
     }
     {
          dataList.map((item,index)=>(
            <Area
            key={item.id}
            d={item.markInfo}
           name={item.subjectName}/>
          ))
     }
    {
          dataList.map((item,index)=>(
            <Area1
            key={item.id}
            d={item.markInfo}
           name={item.subjectName}/>
          ))
     }
     {
          dataList.map((item,index)=>(
            <LineChart
            key={item.id}
            d={item.markInfo}
           name={item.subjectName}/>
          ))
     }
      {
          dataList.map((item,index)=>(
            <ScrolableChart
            key={item.id}
            d={item.markInfo}
           name={item.subjectName}/>
          ))
     }
     {
      dataList.map((item,index)=>(
        <BarGraph
        key={item.id}
        d={item.markInfo}
       name={item.subjectName}/>
      ))
     }
    </View>
  )
}

export default BarGraphCompnent;