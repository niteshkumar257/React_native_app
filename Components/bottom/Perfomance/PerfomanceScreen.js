import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AcitvityHandler from '../AcitvityHandler';
import { COLORS } from '../../Utils/Colors/Colors'
import DataContext from '../../Context/DataContext';
import TableComponent from './TableComponent';
import BarGraphCompnent from './BarGraphCompnent';
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { GW_URL } from '../../config';
const { width, height } = Dimensions.get('window');
import { AuthContext } from '../../Context/Context';


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const PerfomanceScreen = () => {
  const [testDetails, setTestDetails] = useState([]);
  const [dataFecthStatus, setdataFetchStatus] = useState(true);
  const [graphShow, setGraphShow] = useState(false);
  const { id: child_id } = useContext(DataContext);

  const { userToken } = useContext(AuthContext);
  const PARENT="PARENT";
   const parentConfig = {
    headers: { 'Authorization': 'Bearer ' +userToken , 'User': PARENT }
  };

  const {data:res,isLoading,isError,error} = useQuery({
    queryKey: ['perfomance', child_id],
    queryFn: () => {
      return axios.get(`${GW_URL}/students/${child_id}/performance`,parentConfig);
    }
  })

  // if (isLoading) {
  //   return <ActivityIndicator show={isLoading} />;
  // }

  if (isError) {
    return <View>
      <Text>Error: {error.message}</Text>
    </View>;
  }
  if(!isLoading)
  {
    console.log(49,res.data.allmarksDetail);
  }


  const removeFrom=()=>{

    const data= [{"mark_obtained": [23, 32, 37, -1, 40, 43, 32, 23], "percentage": "57.25", "subject_name": ["Math", "Biology", "Hindi", "Physics", "Chemistry", "English", "SST", "Sanskrit"], "test_date": "2023-08-25", "test_id": 62, "test_name": "Unit Test - 25-08-2023", "total_marks": [50, 50, 50, 50, 50, 50, 50, 50]}, {"mark_obtained": [23, 30, 40, 50], "percentage": "75.26", "subject_name": ["Math", "Biology", "Hindi", "Sanskrit"], "test_date": "2023-08-31", "test_id": 64, "test_name": "MonthlyTest1", "total_marks": [50, 30, 40, 70]}]
    function removeNegativeValuesAndSubjects(obj) {
      const markObtained = obj.mark_obtained.filter((value, index) => value >= 0);
      const subjectName = obj.subject_name.filter((value, index) => obj.mark_obtained[index] >= 0);
      obj.mark_obtained = markObtained;
      obj.subject_name = subjectName;
    }
    
    // Remove negative values and corresponding subjects from each object
    data.forEach(record => {
      removeNegativeValuesAndSubjects(record);
    });
    
    // Remove negative values from the "mark_obtained" array in each object
   
  console.log(62,data);
    return data;
  }
  removeFrom();

 

  const showGraphicalAnalysis = () => {
  
    setGraphShow(true);
  }
 

 
  return (

    <SafeAreaView>
      <ScrollView overScrollMode="never" removeClippedSubviews={true}>
        <View>

          <View style={styles.perfomanceScreenContainer} >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Performance</Text>
              {
                  res?.data?.allmarksDetail.length!=0 && 
              <TouchableOpacity onPress={showGraphicalAnalysis}>
                <Icon
                  name='analytics-outline'
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              }
            </View>
            {
              (isLoading &&  !res?.data?.allmarksDetail) ?<AcitvityHandler show={isLoading}/> :
              (<View style={styles.perforomanceContainer}>
                {
                   res?.data?.allmarksDetail.length===0 &&
                  <Text style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "black",
                    fontWeight: 700,
                    marginTop: 250
                  }}>No test Given</Text>
                }
                <View style={styles.topContainer}>
                  <TableComponent data={res?.data?.allmarksDetail} />
                </View>
                {
                  graphShow &&
                  <View style={styles.bottomContainer}>
                    <BarGraphCompnent data={removeFrom(res?.data?.allmarksDetail)}></BarGraphCompnent>

                  </View>

                }
              </View>)
            }
          </View>
        </View>




      </ScrollView>
    </SafeAreaView>

  )
}

export default PerfomanceScreen;
const styles = StyleSheet.create(
  {

    perfomanceScreenContainer: {
      width: "100%",
      height: "100%",
      display: "flex",

      minHeight: height,
      // justifyContent:"center",
      alignItems: "center",
      height: 'auto',
      backgroundColor: COLORS.backgGroundColor
    },
    perforomanceContainer: {
      width: width,



    },
    topContainer: {
      display: "flex",
      justifyContent: 'center',
      alignItems: "center",
      width: width,



    }, bottomContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      width: width,

    }
    , titleContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 20,
      height: 60,
      paddingLeft: 13,
      paddinright: 13,
      paddingTop: 5,
      alignItems: "center",


    },
    title: {

      fontSize: 20,
      fontWeight: 500,
      color: "black"
    }
  }
)