import { View, Text } from 'react-native'
import React from 'react'
import Bar from './Bar'
import Area from '../Area'
import Area1 from '../Area1'
import LineChart from '../LineChart'
import ScrolableChart from '../ScrolableChart'

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
    dataList.map((item,index)=> console.log(item));
  return (
    <View>
      <View>
      {
          dataList.map((item,index)=>(
            <Bar
            key={index}
            d={item.markInfo}
           name={item.subjectName}></Bar>
          ))
     }
      </View>
      <View>
      {
          dataList.map((item,index)=>(
            <Area
            key={index}
            d={item.markInfo}
           name={item.subjectName}></Area>
          ))
     }
      </View>
    
     <View>
     {
          dataList.map((item,index)=>(
            <Area1
            key={index}
            d={item.markInfo}
           name={item.subjectName}></Area1>
          ))
     }
     </View>
     <View>
    {
          dataList.map((item,index)=>(
            <LineChart
            key={index}
            d={item.markInfo}
           name={item.subjectName}></LineChart>
          ))
     }
    </View>
  <View>
    {
          dataList.map((item,index)=>(
            <ScrolableChart
            key={index}
            d={item.markInfo}
           name={item.subjectName}></ScrolableChart>
          ))
     }
    </View>
    {/* <View>
    {
          dataList.map((item,index)=>(
            <BarGraph
            key={index}
            d={item.markInfo}
           name={item.subjectName}></BarGraph>
          ))
     }
    </View> */}
       
    
    </View>
  )
}

export default BarGraphCompnent;