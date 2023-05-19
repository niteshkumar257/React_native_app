import { View, Text,StyleSheet } from 'react-native'
import React ,{useState}from 'react'
import { Table, Row, Rows } from 'react-native-table-component';

const DataTable = () => {
  const [tableHead,setTableHead]=useState([
    'No', 'Date', 'Phy', 'Chem','Math','Per(%)'
  ]);
  const [tableData,setTableData]=useState([
    [1, '2/12/22', 90, 90,67,87],
    [2, '3/12/23', 89, 23,90,78],
    [3, '1/1/23', 30, 45,82,29],
    [4, '10/1/23', 12, 23,64,35]
  ]);
  return (
    
     <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData}  style={styles.row}textStyle={styles.text1}/>
        </Table>
      </View>
    
  )
}

export default DataTable;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "white" },
  head: { height:40, backgroundColor: '#1377c0' },
  text: { margin: 6 ,
    color:"white"
  },
  text1:{color:"black",textAlign: 'center',},
  row:{
height:40,
width:"auto"



  }
});