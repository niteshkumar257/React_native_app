import { View, Text } from 'react-native'
import React ,{useState,createContext} from 'react'
import { GW_URL } from '../config'
import axios from 'axios'


export const StudentDetailsContext=createContext();

export const StudentDetailsProvider = ({children}) => {
    const [studentDetails,setStudentDetails]=useState([]);
      const [school_id,setSchool_id]=useState();
    const studentData=(data)=>
    {
       setStudentDetails(data);
    
       setSchool_id(data[0].school_id);
    } 
  return (
   <StudentDetailsContext.Provider value={{studentDetails,studentData,setStudentDetails,school_id}}>
    {children}
   </StudentDetailsContext.Provider>
  )
}

