import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import  Mark from "./Mark";


const TableComponent = ({data}) => {
    const tableDataConverter = (markList) => {
        const tableList = markList?.map((mark,index) => ({
          test_id: mark.test_id,
          serialNo:index+1,
          test_date: new Date(mark.test_date).toISOString().substr(0, 10),
          subjectMarkList: mark.subject_name.map((subject, i) => ({
            subjectName: subject,
            obtained_mark: mark.mark_obtained[i],
            total_marks: mark.total_marks[i],
          })),
        }));
        return tableList;
      }
      const RenderData=tableDataConverter(data);
  return (
    <View style={styles.container}>
      {
              RenderData.map((item,index)=>(
                <Mark key={item.test_id} data={item.subjectMarkList} testId={item.test_id}
                testDate={item.test_date} serialNo={item.serialNo}/>
              ))
      }
    </View>
  )
}

export default TableComponent;
const styles=StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"column",
        rowGap:10,
        width:"100%",
        paddingLeft:10
        
    }
})