import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows ,TableWrapper,Col} from 'react-native-table-component';
const tableData = {
  tableHead: ['1', '23-12-10'],
  tableTitle: ['Physics', 'Chemistry', 'Math', 'Biology'],
  tableData: [
    [90, 100],
    [90, 100],
    [90, 100],
    [90, 100],
   
    
  ]
};
const TableTwo = () => {
    const [data, setData] = useState(tableData);
    return (
      <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data={data.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Col data={data.tableTitle} style={styles.title} heightArr={[]} textStyle={styles.text}/>
          <Rows data={data.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
    )
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' ,width:100},
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
export default TableTwo