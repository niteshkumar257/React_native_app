import { useState,react ,useEffect ,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../Context/Context";
import { GW_URL } from "../config";




const useFetchHolidayList=()=>
{
const {userToken} = useContext(AuthContext);
const PARENT = 'PARENT';
const parentConfig = {
  headers: {Authorization: 'Bearer' + userToken, User:PARENT},
};

    const [holidayList,setHolidayList]=useState();
    const [isLoading,setIsLoading]=useState(true);

    axios.get( axios.get(`${GW_URL}/getHolidays?year=2023`,parentConfig))
    .then((res)=>{
       
        setHolidayList(res.data.holidayList);
        const holidays=[];
        res.data.ma(holiday => {
            const startDate = new Date(holiday.start_date);
            const endDate = new Date(holiday.end_date);
            let currentDate = new Date(startDate);
      
            while (currentDate <= endDate && currentDate <= today) {
              if (currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear) {
                holidays.push(formatDate(currentDate));
              }
              currentDate.setDate(currentDate.getDate() + 1);
            }
          });

          console.l
        setIsLoading(false);
    }).catch((err)=>
    {
        console.log(err);
        setIsLoading(false);
    })

    return {holidayList,isLoading}
}

export default useFetchHolidayList;