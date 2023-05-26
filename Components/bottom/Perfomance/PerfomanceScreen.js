import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useState, useEffect,useContext } from "react";
import axios from 'axios';
import AcitvityHandler from '../AcitvityHandler';
import { COLORS } from '../../Utils/Colors/Colors'
import DataContext from '../../Context/DataContext';
import TableComponent from './TableComponent';
import BarGraphCompnent from './BarGraphCompnent';
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const PerfomanceScreen = () => {
    const [testDetails, setTestDetails] = useState([]);
    const [dataFecthStatus,setdataFetchStatus]=useState(true);
    const [graphShow,setGraphShow]=useState(false);
    const { id: child_id } = useContext(DataContext);

  console.log("hey",child_id);
    const getTestDetails = () => {
       
        axios.get(`https://school-management-api.azurewebsites.net/students/${child_id}/performance`)
            .then((res) => {
                setTestDetails(res.data.allmarksDetail);
                setdataFetchStatus(false);
                console.log(res.data.allmarksDetail);
            })
            .catch((err) => {
                console.log(err);

            })
    }
    useEffect(() => {

        getTestDetails();
    }, [])
   const showGraphicalAnalysis=()=>
   {
    console.log("wen")
      setGraphShow(true);
   }
    return (
        
        <SafeAreaView>
             <ScrollView overScrollMode="never" removeClippedSubviews={true}>
        <View>
              
                <View style={styles.perfomanceScreenContainer} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Performance</Text>
                    <Icon
              name='analytics-outline'
              size={30}
              color="black"
              
              onPress={()=>showGraphicalAnalysis()}
            />
                </View>
                {
                    dataFecthStatus ?<AcitvityHandler show={dataFecthStatus} /> :
                    
               ( <View style={styles.perforomanceContainer}>
                {
                  testDetails.length==0 && 
                  <Text style={{
                    textAlign:"center",
                    fontSize:20,
                    color:"black",
                    fontWeight:700,
                    marginTop:250
                  }}>No test Given</Text>
                }
                    <View style={styles.topContainer}>
                       <TableComponent data={testDetails}/>
                    </View>
                    {
                        graphShow && 
                        <View style={styles.bottomContainer}>
                        <BarGraphCompnent data={testDetails}></BarGraphCompnent>
                    
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
      
      perfomanceScreenContainer:{
          width:"100%",
          height:"100%",
          display:"flex",
         
           minHeight:height,
          // justifyContent:"center",
          alignItems:"center",
          height:'auto',
          backgroundColor:COLORS.backgGroundColor
      },
      perforomanceContainer:{
            width:width,
           
          
          
      },
      topContainer:{
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        width:width,

      
        
      },bottomContainer:{
        display:"flex",
          justifyContent:"center",
          alignItems:"center",
         
          width:width,

      }
 ,titleContainer:{
        width:"100%",
       display:"flex",
       flexDirection:"row",
      justifyContent:"space-between",
      paddingRight:20,
      height:60,
      paddingLeft:13,
      paddinright:13,
    paddingTop:5,
      alignItems:"center",
        
        
      },
      title:{
      
         fontSize:20,
         fontWeight:500,
         color:"black"
      }
    }
  )