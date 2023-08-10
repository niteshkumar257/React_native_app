import React ,{useState,useEffect,useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './Main';
import CustomDrawer from './CustomDrawer';
import Children from '../Stack/Children';
import CustomHeader from "./customheader";
import { AuthContext } from '../Context/Context';
import { StudentDetailsContext } from '../Context/StudentDetailsContext';
import axios from 'axios';
import { GW_URL } from '../config';
import { useQuery } from '@tanstack/react-query';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ child_name, child_id, photo_url }) => {
  console.log('drawer' + child_name, child_id);
  const {studentDeails, school_id} = useContext(StudentDetailsContext);
  const {userToken} = useContext(AuthContext);
  const [schoolImage,setSchoolImage]=useState("");
  const [imageLoading,setImageLoading] = useState(false);
  const [schoolData,setSchoolData]=useState("");
  const PARENT = 'PARENT';
  const parentConfig = {
    headers: {Authorization: 'Bearer ' + userToken, User: PARENT},
  };
console.log(22,school_id)
  const {
    data:school,
    isLoading: Loading,
    isError: error,
    error: errormessage,
  } = useQuery({
    queryKey: ['school-image-school_id', school_id],
    queryFn: () => {
      return axios.get(`${GW_URL}/schools/${school_id}`,parentConfig);
    },
    
  });
  const getSchoolDetails=()=>
  {
    setImageLoading(true);
     axios.get(`${GW_URL}/schools/${school_id}`,parentConfig).then((res)=>
     {
      console.log(res.data);
      setSchoolImage(res.data.schoolDetail.photo_url);
      setSchoolData(res.data);
      setImageLoading(false);
     }).catch((err)=>{
      console.log(err);
      setImageLoading(false);
     })
  }
 
  useEffect(()=>
  {

     getSchoolDetails();
  },[])

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawer
          {...props}
          child_name={child_name}
          child_id={child_id}
          photo_url={photo_url}
        />
      )}
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name={child_name}
        component={Main}
        initialParams={{ child_id }}
        options={({ navigation, route }) => ({
          header: () => (
            <CustomHeader navigation={navigation} title={child_name} photo_url={schoolImage} data={schoolData} />
          ),
          headerStyle: {
            backgroundColor: 'white',
            elevation: 4,
          },
          headerTintColor: 'black',
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
