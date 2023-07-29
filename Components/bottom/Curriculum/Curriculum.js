import React, { useContext,useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Pinchable from 'react-native-pinchable';
import DataContext from '../../Context/DataContext';
import axios from 'axios';
import { COLORS } from "../../Utils/Colors/Colors";
import AcitvityHandler from '../AcitvityHandler';
import { GW_URL } from '../../config';
import NoData from '../../NoData';
import { AuthContext } from '../../Context/Context';

const { width, height } = Dimensions.get('window');

const Screen1 = () => {
  const { id } = useContext(DataContext);
  const [childId, setChildId] = useState(id);
  const [show, setShow] = useState(true);
  const { userToken } = useContext(AuthContext);
  console.log(userToken)
const PARENT="PARENT";
 const parentConfig = {
  headers: { 'Authorization': 'Bearer ' +userToken , 'User': PARENT }
};


  const { data: ClassIdAndSchoolId, isLoading: IdsLoading, isError: IdsError, error: Idserror } = useQuery({
    queryKey: ["fetch-class_id-school_id", childId],
    queryFn: () => {
      return axios.get(`${GW_URL}/students/${childId}`,{
        headers: parentConfig.headers, // Pass the headers from parentConfig
      })
    }
  });

  const class_id = ClassIdAndSchoolId?.data?.studentDetails[0].class_id;
  const school_id = ClassIdAndSchoolId?.data?.studentDetails[0].school_id;

  console.log(class_id,school_id);

  console.log(parentConfig);
  const { data: res, isLoading: curriculumLoading, isError: curriculumErrorStatus, error: ErrorMsg } = useQuery({
    queryKey: ['curriculum', class_id, school_id],
    queryFn: () => {
      return axios.get(`${GW_URL}/viewCurriculum?school_id=${school_id}&class_id=${class_id}`,{
        headers: parentConfig.headers, // Pass the headers from parentConfig
      } );
    },
    enabled: !!class_id && !!school_id
  });
  const handleLoad = () => {
    // When the image finishes loading
    setShow(false);
  };

  if(!curriculumLoading)
  {
    console.log(57,res?.data);
  }

  return (
    <ScrollView style={styles.ViewContainer}>
      <View style={styles.container}>
        {curriculumLoading && show && <AcitvityHandler show={curriculumLoading} />}
        {res?.data?.url != null ? (
          <View style={styles.imageContainer}>
            <Pinchable>
              <Image style={styles.image}
                onLoad={handleLoad}
               source={{ uri: res?.data?.url }} />
            </Pinchable>
          </View>
        ) : (
         <NoData message={"Curriculum is not assigned"} x={110}/>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    backgroundColor: COLORS.backgGroundColor,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginVertical: 20,
   
   
    overflow: "hidden",
  },
  image: {
    width: width - 20,
    height: height -140,
  
    resizeMode: "contain",
  },
  noCurriculumText: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    marginTop: 20,
  },
});

export default Screen1;
