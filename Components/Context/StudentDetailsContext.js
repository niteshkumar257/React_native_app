import { View, Text } from 'react-native'
import React ,{useState,createContext} from 'react'
import { GW_URL } from '../config'
import axios from 'axios'


export const StudentDetailsContext=createContext();

export const StudentDetailsProvider = ({children}) => {
    const [studentDetails,setStudentDetails]=useState([]);
    const studentData=(data)=>
    {
       setStudentDetails(data);
    } 
  return (
   <StudentDetailsContext.Provider value={{studentDetails,studentData,setStudentDetails}}>
    {children}
   </StudentDetailsContext.Provider>
  )
}

