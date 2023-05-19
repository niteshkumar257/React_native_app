import  { View, Text } from 'react-native'
import React from 'react'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

const LineChart = ({type}) => {
  return (
    <View>
       <Chart
  style={{ height: 200, width: 400 }}
  data={[
   
    { x: 0, y: 10 },
    { x: 1, y: 60 },
    { x: 2, y: 90 },
    { x: 3, y: 30 },
    { x: 4, y: 89 },
    { x: 5, y: 80 },
    { x: 6, y: 92 },
    { x: 7, y: 64 },
    { x: 8, y: 32 },
    { x: 9, y:90 },
    { x: 10, y: 88 },
    { x: 11, y: 65 },
    { x: 12, y: 70 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 12 }}
  yDomain={{ min: 0, max: 100 }}
>
  <VerticalAxis 
 tickValues={[0,10,20,30,40,50,60,70,80,90,100]} theme={
    
    { 
      axis: {
        visible: true,
        stroke: {
          color: 'black',
          width: 1,
          opacity: 1,
          dashArray: []
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
          color: '#000',
          fontSize: 10,
          fontWeight: 400,
          textAnchor: 'middle',
          opacity: 1,
          dx: 0,
          dy: -12,
          rotation: 0,
          fontFamily: 'your font here'
        },
       
      },
      labels: { formatter: (v) => v.toFixed(0) } }} />
  <HorizontalAxis  tickCount={10} theme={
    
    { 
      axis: {
        visible: true,
        stroke: {
          color: 'black',
          width: 1,
          opacity: 1,
          dashArray: []
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
          color: '#000',
          fontSize: 10,
          fontWeight: 400,
          textAnchor: 'middle',
          opacity: 1,
          dx: 0,
          dy: -12,
          rotation: 0,
          fontFamily: 'your font here'
        },
       
      },
      labels: { formatter: (v) => v.toFixed(0) } }}
   />
  {/* <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} /> */}
  <Line   smoothing={type} theme={{ stroke: { color: '#44bd32', width: 2 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }} />
</Chart>
    </View>
  )
}

export default LineChart