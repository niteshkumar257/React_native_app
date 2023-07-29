import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Student from './Student';
import Headers from './header';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { AuthContext } from '../Context/Context';
import jwtDecode from 'jwt-decode';
import AcitvityHandler from '../bottom/AcitvityHandler';
import { StudentContext } from '../Context/StudentConext';
import { useQuery } from '@tanstack/react-query';
import { GW_URL } from '../config';
import {FONTS} from "../Utils/Colors/fonts";
import {COLORS} from "../Utils/Colors/Colors";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { StudentDetailsContext } from '../Context/StudentDetailsContext';
import { parentConfig } from '../config';


const Children = ({ navigation }) => {
  const [childrenDetails, setChildrenDetails] = useState({});
  const { userToken } = useContext(AuthContext);
  const [showActivity, setShowActivity] = useState(true);
  const [children, setChildren] = useState([]);
  const {setChildIdHandler} = useContext(StudentContext);
  let userInfo = jwtDecode(userToken);
  let parentId = userInfo.result.parent_id;
const  { studentDetails,studentData,setStudentDetails}=useContext(StudentDetailsContext);

const PARENT="PARENT";
 const parentConfig = {
  headers: { 'Authorization': 'Bearer ' +userToken , 'User': PARENT }
};

console.log("header",parentConfig);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['childrenlist', parentId],
    queryFn: () => {
      return axios.get(`${GW_URL}/parents/${parentId}/getChildren`,parentConfig);
    },
    onSuccess: (data) => {
      // Update the context with the fetched data
       studentData(data?.data?.allChildren);
    },
  });

  if (!isLoading) {
   
  
    console.log('data loads successfully');
  }
  if (isError) {
    navigation.navigate('notfound');
    console.log(error.message);
  }

  const showToast = (type, header, msg = '') => {
    Toast.show({
      type: type,
      text1: header,
      text2: msg,
    });
  };

  const toggleDetails = (childId) => {
    setChildrenDetails((prevDetails) => ({
      ...prevDetails,
      [childId]: !prevDetails[childId],
    }));
  };

  const clickHandler = (child_id,name,photo_url )=> {
  
    setChildIdHandler(child_id);
    navigation.navigate('home', {
      child_id: child_id,
      child_name: name,
      photo_url:photo_url,
     
     
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Headers navigation={navigation} />
      {isLoading ? (
        <AcitvityHandler show={isLoading} />
      ) : (
        <View style={styles.childrenListContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Children Details</Text>
          </View>
          {data?.data?.allChildren?.map((item) => (
           
              <View  key={item.student_id} onStartShouldSetResponder={() => clickHandler(item.student_id,item.student_name,item.photo_url,item.school_id)} style={styles.childContainer}>
                <View style={styles.topContainer}>
                <Image style={styles.imageContainer} source={{uri:item.photo_url}}/>
                <Text style={styles.childName}>{item.student_name}</Text>
            
                </View>
             
                
              </View>
           
          ))}
        </View>
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.backgGroundColor,
  },
  childrenListContainer: {
    flex: 1,
    paddingTop: 30,
     display:"flex",
     alignItems:'center'
  },
  titleContainer: {
    width: '100%',
    height: 40,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  childContainer: {
    height: 'auto',
    width: width-20,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 50,
    justifyContent: 'space-between',
    paddingLeft:20,
    alignItems: 'space-between',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 9,
    marginBottom:10,
    marginTop:10
  },
  childName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  detailText: {
    fontSize:FONTS.TextSubTitle ,
    fontWeight:FONTS.TextSubTitleWeight,
    color: 'black',
    marginBottom: 5,
  },
  imageContainer:{
    width:50,height:50,resizeMode:"contain"
  },
  topContainer:{
   
  display:"flex",
  justifyContent:"center",
  alignItems:"center",flexDirection:'row',columnGap:60,padding:5,justifyContent:'flex-start'
  }
});

export default Children;
