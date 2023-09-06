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
  
 
 
  const {studentDeails, school_id} = useContext(StudentDetailsContext);
  const {userToken} = useContext(AuthContext);
  const [schoolImage,setSchoolImage]=useState("");
  const [imageLoading,setImageLoading] = useState(false);
  const [schoolData,setSchoolData]=useState("");
  const PARENT = 'PARENT';
  const parentConfig = {
    headers: {Authorization: 'Bearer ' + userToken, User: PARENT},
  };


  const fetchSchoolDetails = async (school_id) => {
    const res = await axios.get(`${GW_URL}/schools/${school_id}`, parentConfig);
     
    return res.data;
  };

  const { data:schoolDetails, isLoading, isError, error } = useQuery(['school_id', school_id], () =>
    fetchSchoolDetails(school_id)
  );

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
            <CustomHeader navigation={navigation} title={child_name} photo_url={schoolImage} data={schoolDetails} isLoading={isLoading} />
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
