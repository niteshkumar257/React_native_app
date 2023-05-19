import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis,Tooltip } from 'react-native-responsive-linechart'
import Icon from "react-native-vector-icons/Ionicons";

const ScrolableChart = ({color1,color2,subject}) => {
  let months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  const [month,setMonth]=useState(0);
  const [score,setScore]=useState(0);
  const [total,setTotal]=useState(0);
  const [show,setShow]=useState(false);
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
    <View style={styles.chartContainer}>
       { show &&  score!=0 && month!=0 &&
     <View style={styles.scoreContainer}>
      <View style={styles.valueContainer}>
      <Text style={styles.keyText}>Month : {months[month-1]}</Text>
        <Text style={styles.keyText}>Mark : {score}/{total}</Text>
        
      </View>
      <View>
        <TouchableOpacity onPress={showHandler}>
          <Icon name="close-sharp" size={20} color={"black"}/>
        </TouchableOpacity>
      </View>
       
      </View>}
      <Text style={styles.valueText}>{subject}</Text>
    <Chart
  style={{ height: 200, width: 360 }}
  data={[
    { x: 0, y: 89 ,meta:100 },
    { x: 1, y: 89 ,meta:100 },
    { x: 2, y: 56,meta:100 },
    { x: 3, y: 89,meta:100 },
    { x: 4, y: 73,meta:100 },
    { x: 5, y: 60,meta:100 },
    { x: 6, y: 85 ,meta:100},
    { x: 7, y: 90 ,meta:100},
    { x: 8, y: 86,meta:100 },
    { x: 9, y: 52,meta:100 },
    { x:10, y: 54,meta:100 },
    { x:11, y: 92,meta:100 },
    { x: 12, y: 89 ,meta:100 },
    { x: 13, y: 56,meta:100 },
    { x: 14, y: 89,meta:100 },
    { x: 15, y: 73,meta:100 },
    { x: 16, y: 60,meta:100 },
    { x: 17, y: 85 ,meta:100},
    { x: 18, y: 90 ,meta:100},
    { x: 19, y: 86,meta:100 },
    { x: 20, y: 52,meta:100 },
    { x:21, y: 54,meta:100 },
    { x:22, y: 92,meta:100 },
   
   
  ]}
  padding={{ left: 20, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 22 }}
  yDomain={{ min: 0, max: 100 }}
  viewport={{ size: { width: 8 } }}
>
  <VerticalAxis
    tickValues={[ 1, 25,50,75,100]}
    theme={{
      axis: {visible:false, stroke: { color: '#aaa', width: 2 } },
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
          visible:false,
          label: {
            color: '#000',
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
        
      },
      
    }}
  />
  <HorizontalAxis
    tickValues={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}
    theme={{
      axis: { visible:false, stroke: { color: '#aaa', width: 2 } },
      ticks: {visible:false, stroke: { color: 'black', width: 2,fontWeight:600 } },
      grid: {
        visible: false,
        stroke: {
          color: '#ccc',
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
   onTooltipSelect={(x,y,meta)=>
    {
      toolTip(x,y,meta);
    }}
    tooltipComponent={<Tooltip 
     
    />}
    hideTooltipAfter={1000}
    hideTooltipOnDragEnd={false}
   theme={{
    stroke: { color: 'black', width: 0.5 },
    scatter: {
      default: {
        width: 5,
        height: 5,
        rx: 20,
        fill: 'none',
        stroke: 'black',
        strokeWidth: 10,
      },
      selected: {
        color: 'white',
      },
    },
  }}
    smoothing="cubic-spline"
  />
  <Area theme={{ gradient: { from: { color: color1, opacity: 0.4 }, to: { color: color2, opacity: 0.4 } } }} smoothing="cubic-spline" />
</Chart>
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