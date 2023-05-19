import { View, Text, StyleSheet, ScrollView,TouchableOpacity ,ActivityIndicator,FlatList,SafeAreaView} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Icon from "react-native-vector-icons/Ionicons";  
import Chart from './Chart'

import axios from 'axios';
import BarGraph from "./BarGraph";
import Bar from './Bar';
import { AuthContext } from '../Context/Context';

import Mark from './Mark';
import DataContext from '../Context/DataContext';
import Area from './Area';
import AcitvityHandler from './AcitvityHandler';
import Area1 from './Area1';



const months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
const Screen3 = () => {
  const { id } = useContext(DataContext);
  const [childId, setChildId] = useState(id);
  const [testFetchStatus,setTestFetchStatus]=useState(false);
  const [testDetails, setTestDetails] = useState([]);
  const [tableTestDetails, setTableTestDetails] = useState([]);
  const [toggleGraphShow,setToggleGraphShow]=useState(false);
  const [fetchDataStatus,setFetchDataStatus]=useState(false);
  const [graphToggle,setGraphToggle]=useState(true);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const graphShowToggleHandler=()=>
  {
      setToggleGraphShow(true);
  }
  const { test } = useContext(AuthContext);
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

    dataList?.map((data) => {
      data.markInfo.sort((a, b) => a.label - b.label);
    })
    dataList.map((data)=>
    {
      data.markInfo.map((item,index)=>
      {
          item.label=months[item.label]
      })
    })
   
  
    return dataList;


  }

  const tableDataConverter = (markList) => {
    const tableList = markList?.map((mark) => ({
      test_id: mark.test_id,
      test_date: new Date(mark.test_date).toISOString().substr(0, 10),
      subjectMarkList: mark.subject_name.map((subject, i) => ({
        subjectName: subject,
        obtained_mark: mark.mark_obtained[i],
        total_marks: mark.total_marks[i],
      })),
    }));
    return tableList;
  }
  const getTestDetails = () => {
    setTestFetchStatus(true);
    axios.get(`https://school-management-api.azurewebsites.net/students/${childId}/performance`)
      .then((res) => {
        
        setTestDetails(graphDataConvert(res.data.allmarksDetail));
        setTableTestDetails(tableDataConverter(res.data.allmarksDetail)); 
        setTestFetchStatus(false);
        setFetchDataStatus(true);
          
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
         <View style={styles.titleContainer}> 
          <Text style={styles.title}>Performance</Text>
         {  !toggleGraphShow && fetchDataStatus && <Icon 
           name='analytics-outline' 
           size={30} 
           color="black"
           onPress={graphShowToggleHandler}
           />}
         </View>
     
     <View style={styles.container}>
       {  testFetchStatus ?  <AcitvityHandler show={testFetchStatus}/>:
        <View style={styles.tableContainer}>

          {tableTestDetails?.map((item, index) =>
            (
              <Mark key={item.test_id} data={item.subjectMarkList} testId={item.test_id}
                testDate={item.test_date}/>
            )
            )
          }
        </View>
}
{/* {
     !toggleGraphShow && fetchDataStatus &&  <TouchableOpacity style={styles.showGraphButton} onPress={graphShowToggleHandler}>
          <Text style={styles.graphButtonText}>Show graphical analysis</Text>
        </TouchableOpacity>} */}
  {/* {
    <TouchableOpacity onPress={()=>
    {
        setGraphToggle(!graphToggle)
    }}>
      <Text style={{
        fontSize:20,
        color:"black"
      }}>{(graphToggle ) ?"Bar":"Area"}</Text>
    </TouchableOpacity>
   
  } */}
{/* {
     toggleGraphShow &&  !testFetchStatus &&  <View style={styles.chartContainer}>
          {
            testDetails?.map((item, index) =>
            
{
     
        return      <Bar d={item.markInfo} name={item.subjectName} />
         }
              // <Chart key={index} data={item} type={"bezier"} color1={"#2BC0E4"} color2={"#affae9"} subject={item.subjectName} />
            )
          }
          
        </View>} */}


{
  toggleGraphShow && !testFetchStatus  && 


   <FlatList
        data={testDetails}
        renderItem={({item}) =>
       <Bar
           d={item.markInfo}
          name={item.subjectName}/>
        
}
       
      />
}


      </View> 
</SafeAreaView>
     
    </ScrollView>

  )
}
const styles = StyleSheet.create(
  {
    container: {
      height:"auto",
      width: "100%",
      minHeight:900,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#E9F3FD",
     
     
      paddingBottom:30,
      paddingtop:5,

    },
    tableContainer: {
      width: "100%",
      padding: 10,
      display: "flex",
      flexDirection: "column",
      rowGap: 10,
      backgroundColor: "#E9F3FD",
    


    },
    chartContainer: {
      width: "100%",
      padding: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      rowGap: 35,




    },
    subjectTitle: {
      fontSize: 15,
      fontWeight: 500,
      color: "black"

    },
    text: {
      fontSize: 20,
      color: "black"
    },
    showGraphButton:{
        width:'95%',
        backgroundColor:"green",
        height:40,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:9
    },
    graphButtonText:{
      fontSize:15,
      fontWeight:500,
      color:"white"

    },
    titleContainer:{
      width:"100%",
     display:"flex",
     flexDirection:"row",
    justifyContent:"space-between",
    paddingRight:20,
    height:40,
    paddingLeft:13,
    paddinright:13,
  paddingTop:5,
    alignItems:"center",
      
      backgroundColor: "#E9F3FD",
    },
    title:{
    
       fontSize:20,
       fontWeight:500,
       color:"black"
    }
  }
)

export default Screen3