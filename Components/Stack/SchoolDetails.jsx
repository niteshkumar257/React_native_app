import React,{useContext,useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GW_URL } from '../config';
import axios from 'axios';
import { AuthContext } from '../Context/Context';
import { StudentDetailsContext } from '../Context/StudentDetailsContext';
import Loader from '../Loader';
import { useQuery } from '@tanstack/react-query';

const SchoolDetailsUI = () => {
    const {studentDeails, school_id} = useContext(StudentDetailsContext);
  const {userToken} = useContext(AuthContext);
  const [schoolImage,setSchoolImage]=useState("");
  const [imageLoading,setImageLoading] = useState(false);
  const [schoolData,setSchoolData]=useState("");
  const [featureArray,setFeatureArray]=useState([]);
  const PARENT = 'PARENT';
  const parentConfig = {
    headers: {Authorization: 'Bearer ' + userToken, User: PARENT},
  };
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
 
  useEffect(()=>
  {
    if(!Loading)
    {
    
     setSchoolImage(school.data.schoolDetail.photo_url);
     setSchoolData(school.data.schoolDetail);
    

    }
    
  },[])
 

  return (
    <View style={styles.container}>
        {
            imageLoading ? <Loader show={imageLoading} x={60}/> :
        
        <View>
        <View style={styles.header}>
        <Image source={{ uri: schoolImage }} style={styles.schoolLogo} resizeMode="contain" />
        <Text style={styles.schoolName}>{schoolData.school_name}</Text>
      </View>
      <View style={styles.details}>
       <View style={styles.subContainer}>
        <Text>Admin Name</Text>
        <Text>{schoolData.admin_name}</Text>
       </View>
       <View style={styles.subContainer}>
        <Text>Email</Text>
        <Text>{schoolData.email}</Text>
       </View>
       <View style={styles.subContainer}>
        <Text>City</Text>
        <Text>{schoolData.city_name}</Text>
       </View>
       
      </View>
        </View>
}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  schoolLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  subContainer:{
    display:'flex',flexDirection:"row",columnGap:20,
  }
});

export default SchoolDetailsUI;
