import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis,Tooltip } from 'react-native-responsive-linechart'
import Icon from "react-native-vector-icons/Ionicons";
import {COLORS} from "../Utils/Colors/Colors";

const ScrolableChart = ({color1,color2,name,d}) => {
  console.log(name);
  let months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  const [month,setMonth]=useState(0);
  const [score,setScore]=useState(0);
  const [total,setTotal]=useState(0);
  const [show,setShow]=useState(false);
  const data = [
    { x: 1, y: 90 },
    { x: 2, y: 70 },
    { x: 8, y: 73 },
    { x: 9, y: 95 },
    { x: 10, y: 80 }
  ]
  const xValues = data.map(item => item.x);
  const horizontal=[];
 
  const toolTip=(object)=>
  {
   
   
  }
 
  const showHandler=()=>
  {
    setShow(false);
    setMonth(0);
    setScore(0);
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
    <Chart
  style={{ height: 200, width: 350 }}
  data={data}
  padding={{ left: 20, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 22 }}
  yDomain={{ min: 0, max: 100 }}
  viewport={{ size: { width: 8 } }}
>
  <VerticalAxis
    tickValues={[ 1, 25,50,75,100]}
    theme={{
      axis: {visible:true, stroke: { color: 'black', width: 2 } },
      ticks: { visible:false, stroke: { color: '#aaa', width: 2 } },
      grid: {
        visible: false,
        stroke: {
          color: '#ccc',
          width: 1.5,
          opacity: 1,
          dashArray: [2]
        },
        labels: {
          visible:true,
          label: {
            color: 'black',
            fontSize: 20,
            fontWeight:600,
            textAnchor: 'middle',
            opacity: 1,
            dx: 0,
            dy: -12,
            rotation: 0,
            fontFamily: 'your font here'
          },
         
        },
        
      },
      
    }}
  />
  <HorizontalAxis
    tickValues={xValues}
    theme={{
      axis: { visible:true, stroke: { color: 'black', width: 2 } },
      ticks: {visible:false, stroke: { color: 'black', width: 2,fontWeight:600 } },
      grid: {
        visible: false,
        stroke: {
          color: 'black',
          width: 1.5,
          opacity: 1,
          dashArray: [2]
        },
      },
      labels: {
        visible: true,
        label: {
          color: 'black',
          fontSize: 10,
          fontWeight:600,
          textAnchor: 'middle',
          opacity: 1,
          dx: 0,
          dy: -12,
          rotation: 0,
          fontFamily: 'your font here'
        },
       
      },
      labels: { label: { rotation: 0 }, formatter: (v) => v.toFixed(0) },
    }}
  />
  <Line
   onTooltipSelect={(Month,Mark)=>
    {
      toolTip(Month,Mark);
    }}
    tooltipComponent={<Tooltip 
     
    />}
    hideTooltipAfter={1000}
    hideTooltipOnDragEnd={false}
   theme={{
    stroke: { color: 'white', width: 0.5 },
    scatter: {
      default: {
        width: 10,
        height: 10,
        rx: 20,
        color:"#8c92ac",
        fill: 'red',
        stroke: 'red',
        strokeWidth: 10,
      },
      selected: {
        color: 'white',
      },
    },
  }}
    smoothing="cubic-spline"
  />
  <Area theme={{ gradient: { from: { color:COLORS.mainColor3, opacity: 1 }, to: { color: COLORS.backgGroundColor, opacity: 0.4 } } }} smoothing="cubic-spline" />
</Chart>
</View>
    </View>
  )
}

export default ScrolableChart
const styles=StyleSheet.create(
  {
    chartContainer:{

      height:"auto",
      width: '97%',
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      borderRadius:9,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:5
    },
    scoreContainer:{
        display:"flex",
        flexDirection:'row',
        columnGap:10,
       height:50,
       width:"100%",
       justifyContent:"flex-end",
       alignItems:"center",
      
     

    },
    keyText:{
      fontSize:15,
      color:"black",
      fontWeight:600

    }
    ,valueText:{
      fontSize:20,
      color:"black",
      fontWeight:600
    },
    valueContainer:{
      display:"flex",
      alignItems:"center",
      flexDirection:"row",
      columnGap:20,
      backgroundColor:"#1377c0",
      justifyContent:"center",
      height: 50,
      width:250,
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      borderRadius:9
    }
  }
)