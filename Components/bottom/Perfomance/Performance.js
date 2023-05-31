import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import DataContext from '../../Context/DataContext';
import AcitvityHandler from '../AcitvityHandler';
import { COLORS } from '../../Utils/Colors/Colors'
import TableComponent from './TableComponent';
import BarGraphCompnent from './BarGraphCompnent';



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const Screen3 = () => {
  const { id } = useContext(DataContext);
  const [childId, setChildId] = useState(id);
  const [testDetails, setTestDetails] = useState([]);
  const [dataFetchStatus,setDataFetchStatus]=useState(true);

  const getTestDetails = () => {

    axios.get(`https://school-management-api.azurewebsites.net/students/${childId}/performance`)
      .then((res) => {

        setTestDetails(res.data.allmarksDetail);
        setDataFetchStatus(false);

      })
      .catch((err) => {
        console.log(err);

      })
  }
  useEffect(() => {

    getTestDetails();
  }, [])


  return (

    <ScrollView overScrollMode="never" removeClippedSubviews={true}>
      <SafeAreaView>
      
        <View style={styles.performanceContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Performance</Text>
            <Icon
              name='analytics-outline'
              size={30}
              color="black"
            />
          </View>
          <View style={styles.container}>
            <View style={styles.TableContainer}>
            <TableComponent data={testDetails} />

            </View>
            <BarGraphCompnent data={testDetails} />
          </View>
        </View>
      </SafeAreaView>
    { dataFetchStatus &&  <AcitvityHandler show={dataFetchStatus}/>}
    </ScrollView>

  )
}
const styles = StyleSheet.create(
  {

    container: {
      height: "auto",
      width: "100%",
      minHeight: 900,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: COLORS.backgGroundColor,
      paddingBottom: 30,
      paddingtop: 5,

    },
    TableContainer:{
       padding:10,
       width:"99%",
    },






    titleContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 20,
      height: 40,
      paddingLeft: 13,
      paddinright: 13,
      paddingTop: 5,
      alignItems: "center",

      backgroundColor: "#E9F3FD",
    },
    title: {

      fontSize: 20,
      fontWeight: 500,
      color: "black"
    }
  }
)

export default Screen3