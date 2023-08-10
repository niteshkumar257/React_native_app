import { View, Text } from 'react-native'
import React ,{useState,createContext} from 'react'
import { GW_URL } from '../config'
import axios from 'axios'


export const SchoolDataContext=createContext();

export const SchoolProvider = ({children}) => {
   const [schoolData,setSchoolData]=useState();
    const studentData=(data)=>
    {
       
     setSchoolData(data);
    } 
  return (
   <SchoolDataContext.Provider value={{schoolData,setSchoolData}}>
    {children}
   </SchoolDataContext.Provider>
  )
}

