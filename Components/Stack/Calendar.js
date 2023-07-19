import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Picker,ScrollView} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import axios from 'axios';
import { GW_URL } from '../config';
import AcitvityHandler from '../bottom/AcitvityHandler';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import { StudentContext } from '../Context/StudentConext';
import { Dropdown } from 'react-native-element-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FONTS} from "../Utils/Colors/fonts";
import { COLORS } from '../Utils/Colors/Colors';



const Calendar = ({route}) => {
    
   const [date,setDate]=useState(new Date());
   
   

  const [month,setMonth]=useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceList, setAttendance] = useState();
  const [isLoading, setIsLoading] = useState(true);
   const [isFocusMonth, setIsFocusMonth] = useState(false);
   const [isFocusYear, setIsFocusYear] = useState(false);
 
   const {child_id}=useContext(StudentContext);
  console.log(31,child_id);

   const renderLabelMonth = () => {
    if (month || isFocusMonth) {
      return (
        <Text style={[styles.label, isFocusMonth && { color: 'blue' }]}>
          Month
        </Text>
      );
    }
    return null;
  };
  const renderLabelYear = () => {
    if (year || isFocusYear) {
      return (
        <Text style={[styles.label, isFocusYear && { color: 'blue' }]}>
          Year
        </Text>
      );
    }
    return null;
  };
  const months=[
    { label: 'Jan', value: '0' },
    { label: 'Feb', value: '1' },
    { label: 'Mar', value: '2' },
    { label: 'Apr', value: '3' },
    { label: 'May', value: '4' },
    { label: 'Jun', value: '5' },
    { label: 'Jul', value: '6' },
    { label: 'Aug', value: '7' },
    { label: 'Sep', value: '8' },
    { label: 'Oct', value: '9' },
    { label: 'Nov', value: '10' },
    { label: 'Dec', value: '11' }
  ]
  const yearArray=[
    {label:2023,value:2023},{
      label:2024,value:2024
    },{label:2022,value:2022}
  ]
  const MonthLabel=[
    "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"
  ]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 const holidays= [
    {
        "holiday_date": "2023-06-17T00:00:00.000Z"
    },
    {
        "holiday_date": "2023-07-15T00:00:00.000Z"
    },
    {
        "holiday_date": "2023-05-03T00:00:00.000Z"
    },
    {
        "holiday_date": "2023-08-01T00:00:00.000Z"
    },
    {
        "holiday_date": "2023-07-31T00:00:00.000Z"
    },
    {
        "holiday_date": "2023-07-31T00:00:00.000Z"
    }
]
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getAttendance = () => {
  
    axios
      .get(`${GW_URL}/student/${child_id}/getMonthWiseAttendance?month=${Number(month) + 1}&year=${year}`)
      .then((res) => {
      
        setAttendance(res.data.monthWiseAttendance);
      
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        showMessage({
          message:"Something went wrong",
          type:"error"
        })
      });
  };

  useEffect(() => {
    
    getAttendance();
  }, [month, year]);

  // Helper function to increase the date by one day
  const increaseDateByOne = (date) => {
    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + 1);
    const increasedDate = parsedDate.toISOString().split('T')[0];
    return increasedDate;
  };

  const renderCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let row = [];

    const holidayDates = holidays?.map((holiday) => new Date(holiday.holiday_date).toISOString().split('T')[0]);

    for (let i = 0; i < firstDay; i++) {
      row.push(<View key={`prev-${i}`} style={{
        height:50,
        width:50,
        display:'flex',
        justifyContent:"center",
        alignItems:"center"
      }}></View>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay();
      const currentDate = new Date(year, month, i).toISOString().split('T')[0];
      const newIncreaseDate = increaseDateByOne(currentDate);

      const attendance = attendanceList?.find((item) => item.attendance_date.split('T')[0] === newIncreaseDate);
      const isHoliday = holidayDates.includes(newIncreaseDate);
      

      const cellClass =
        new Date(year, month, i) > new Date()
          ? isHoliday || dayOfWeek === 0
            ? [styles.cell, styles.cellFuture, styles.cellHoliday]
            : [styles.cell, styles.cellFuture]
          : isHoliday
          ? [styles.cell, styles.cellHoliday]
          : dayOfWeek === 0
          ? [styles.cell, styles.cellHoliday]
          : attendance?.is_present
          ? [styles.cell, styles.cellGreen]
          : [styles.cell, styles.cellRed];

     

      row.push(
        <View key={`current-${i}`} style={cellClass}>
          <Text style={[styles.date]}>{i}</Text>
          <Text style={styles.day}>{days[dayOfWeek]}</Text>
        </View>
      );

      if (dayOfWeek === 6 || i === daysInMonth) {
        calendar.push(<View key={`row-${calendar.length}`} style={styles.row}>{row}</View>);
        row = [];
      }
    }

    return calendar;
  };

  

  return (
    <ScrollView style={{
      display:'flex',
      height:height,
      width:width,
    
    }}>
        {
            isLoading ? <AcitvityHandler show={isLoading}/>
        :
       <View style={styles.calendar}>

      <View style={styles.monthYear}>
       <View style={styles.dropdownContainer}>
        <View style={styles.heading}>
          <Text style={{
            fontSize:FONTS.TextTitle,
            fontWeight:FONTS.TextSubTitleWeight,
            color:"black"
          }}>Month: {MonthLabel[month]}        Year: {year}</Text>
        </View>
        <View style={{
          width:width,
          display:'flex',
          flexDirection:'row',
          justifyContent:"space-between",
          paddingLeft:20,
          paddingRight:20

        }}>

        
       <View style={styles.container}>
        {renderLabelMonth()}
        <Dropdown
          style={[styles.dropdown, isFocusMonth && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={months}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusMonth ? 'Select Month' : '...'}
          searchPlaceholder="Search..."
          value={MonthLabel[month]}
          onFocus={() => setIsFocusMonth(true)}
          onBlur={() => setIsFocusMonth(false)}
          onChange={item => {
            setMonth(parseInt(item.value));
            setIsFocusMonth(false);
          }}
         
        />
      </View>
      {/* <View style={styles.container}>
        {renderLabelYear()}
        <Dropdown
          style={[styles.dropdown, isFocusYear && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={yearArray}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusYear ? 'Select item' :"..."}
          searchPlaceholder="Search..."
          value={year}
          onFocus={() => setIsFocusYear(true)}
          onBlur={() => setIsFocusYear(false)}
          onChange={item => {
            const yearValue = item.value.toString();
            setYear(yearValue);
            setIsFocus(false);
          }}
         
        />
      </View> */}
      </View>
       </View>
      
     
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={handlePrevMonth}>
          <Icon name="left" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleNextMonth}>
           <Icon name="right" size={30} color="black"/>
          </TouchableOpacity>
        </View>
      </View>
{
  isLoading ? <ActivityIndicatorComponent isLoading={isLoading}/>  :    <View style={styles.squareBoxOfDay}>{renderCalendar()}</View>}
    </View>
    }
    <View style={styles.symbolContainer}>
      <View style={styles.ChildSymbolContainer}>
      <View style={styles.present}></View>
      <Text style={{
      fontSize:FONTS.TextTitle,
      fontWeight:FONTS.TextTitleWeight,
      color:'black'
     }}>Present</Text>
      </View>
      <View style={styles.ChildSymbolContainer}>
      <View style={styles.holiday}></View>
      <Text style={{
      fontSize:FONTS.TextTitle,
      fontWeight:FONTS.TextTitleWeight,
      color:'black'
     }}>Holiday</Text>
      </View>
      
     <View style={styles.ChildSymbolContainer}>
     <View style={styles.absent}></View>
     <Text style={{
      fontSize:FONTS.TextTitle,
      fontWeight:FONTS.TextTitleWeight,
      color:'black'
     }}>Absent</Text>
     </View>
      
    </View>
    </ScrollView>
   
  );
};
export default Calendar;
const styles = StyleSheet.create({
  calendar: {
     width:wp("99%"),
     height:hp("75%"),
   
     display:"flex",
     
      paddingLeft:25,
      paddingRight:15,
    
    paddingTop:15,
     backgroundColor:COLORS.backgGroundColor,
     alignItems:"center"

  },
  monthYear: {
   
  },
  input: {
    // Add your input styles
  },
  buttonContainer: {
    // Add your button container styles
    display:"flex",
    flexDirection:'row',
  paddingLeft:20,
  paddingRight:20,
    justifyContent:'space-between',
    alignItems:'center',
    height:100
  },
  btn: {
    // Add your button styles
  },
 row:{
  display:'flex',
  flexDirection:"row",
  columnGap:5,
  width:width
 },
 cellClass:{
  height:wp('10%'),
  width:hp('10%'),
},squareBoxOfDay:{
  height:hp('47%'),
  width:wp('99%'),

  display:'flex',
  flexDirection:"row",
  justifyContent:'center',
  alignItems:'center',
  flexWrap:"wrap",
  paddingLeft:10,
  rowGap:5,
 },
 date:{
  color:'black',
  fontSize:15,
 },day:{
  color:"black",
  fontSize:10
 },
 cellFuture:{
  backgroundColor:"white",
  color:'white'
 },
 cellHoliday:{
  backgroundColor:'lightgrey',
 color:"white",
 fontSize:2,
 },
 cellGreen:{
   backgroundColor:'lightgreen',
   color:"white"
 },
 cellRed:{
  backgroundColor:'#f6949c',
  color:'white'
 },
 cell:{
  height:50,
  width:50,backgroundColor:'red',
  display:'flex',
  justifyContent:"center",
  alignItems:"center",
  borderRadius:9
 },container:{
  height:40,
  width:130
 },dropdownContainer:{
  display:"flex",
  flexDirection:'column',
  rowGap:30,
  height:100,
 },heading:{
  display:"flex",
  justifyContent:"flex-start",
  paddingLeft:20,
 },
 selectedTextStyle:{
  color:"black",
  fontWeight:FONTS.TextSubTitleWeight,
  fontSize:15
 },
 label:{
  color:'black',
  fontWeight:FONTS.TextSubTitleWeight,
  fontSize:15
 },
 symbolContainer:{
   height:150,
 
   paddingLeft:20,
   display:"flex",
   flexDirection:"column",
   rowGap:10,
   backgroundColor:COLORS.backgGroundColor,
  
   justifyContent:"center",
 
 },
 ChildSymbolContainer:{
 display:'flex',
 flexDirection:'row',
 alignItems:'center',
 columnGap:20
 },
 present:{
  height:30,width:30,borderRadius:9,backgroundColor:'lightgreen'
 },absent:{
  height:30,width:30,borderRadius:9,backgroundColor:'#f6949c'
 },
 holiday:{
  height:30,width:30,borderRadius:9,backgroundColor:"lightgrey"
 }
 
})