import { View, Text,StyleSheet,Dimensions ,TouchableOpacity} from 'react-native'
import React ,{useState} from 'react'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis ,Tooltip} from 'react-native-responsive-linechart'
import Icon from "react-native-vector-icons/Ionicons";
import { Svg, Circle } from 'react-native-svg';




const {width}=Dimensions.get('screen');
const ChartC = ({type,color1,color2,subject,data}) => {
 
  const [month,setMonth]=useState(0);
  const [score,setScore]=useState(0);
  const [total,setTotal]=useState(0);
  const [show,setShow]=useState(false);
  let months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  const toolTip=(object)=>
  {
   
     setMonth(object.x);
     setScore(object.y);
     setTotal(object.meta);
     setShow(true);
   
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
  style={{ height: 200, width:360 }}
  data={data.markInfo}
  padding={{ left: 20, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 12 }}
  yDomain={{ min: 0, max: 100 }}
>
  <VerticalAxis tickCount={6} theme={{ 
       axis: {
        visible: true,
        stroke: {
          color: 'black',
          width: 0,
          opacity: 1,
          dashArray: [2]
        },
        dy: 0,
      },
      grid: {
        visible: false,
        stroke: {
          color: '#ccc',
          width: 1.5,
          opacity: 1,
          dashArray: [2]
        },
      },
      ticks: {
        visible: false,
        stroke: {
          color: '#000',
          width: 1.5,
          opacity: 1,
        },
        dy: 2,
        length: 8,
        includeOriginTick: false,
      },
      labels: {
        visible: true,
        label: {
          color: 'red',
          fontSize: 10,
          fontWeight:600,
          textAnchor: 'middle',
          opacity: 1,
          dx: 0,
          dy: -20,
          rotation: 0,
          fontFamily: 'your font here'
        },
       
      },
    labels: { formatter: (v) => v.toFixed(0) } }} />
  <HorizontalAxis tickCount={13} 
  theme={
    {
      axis: {
        visible: false,
        stroke: {
          color: '#bbb',
          width: 0,
          opacity: 1,
          dashArray: []
        },
        dy: 0,
      },
      grid: {
        visible: false,
        stroke: {
          color: '#ccc',
          width: 1,
          opacity: 1,
          dashArray: []
        },
      },
      ticks: {
        visible: false,
        stroke: {
          color: '#000',
          width: 1,
          opacity: 1,
        },
        dy: 0,
        length: 6,
        includeOriginTick: false,
      },
      labels: {
        visible: true,
        label: {
          color: '#000',
          fontSize: 10,
          fontWeight: 500,
          textAnchor: 'middle',
          opacity: 1,
          dx: 0,
          dy: -20,
          rotation: 0,
          fontFamily: 'your font here'
        },
       
      },
    }
  }
  />
  <Area
  smoothing={type}
   theme={{ gradient: { from: { color:color1,opacity:1}, to: { color:"white",opacity:1} , stops: [0.8, 1],}}} />
    <Line   smoothing={type}  
    onTooltipSelect={(x,y,meta)=>{toolTip(x,y,meta);}}
    tooltipComponent={<Tooltip/>}
    hideTooltipAfter={1000}
    hideTooltipOnDragEnd={false}
    theme={{ 
         stroke: { color: 'black',width: 1,opacity: 1,dashArray: [5]},
         scatter: { default: {width: 10,height: 10,dx: 0,dy: 0,rx: 10,color: 'lightgrey',},
         selected: {width: 0,height: 0, dx: 0,dy: 0,rx: 0,color: 'white'},},
           }} />
   

</Chart>
<View
  
/>
    </View>
  )
}

export default ChartC;
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