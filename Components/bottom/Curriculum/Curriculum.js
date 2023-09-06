import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import Pinchable from 'react-native-pinchable';
import DataContext from '../../Context/DataContext';
import axios from 'axios';
import {COLORS} from '../../Utils/Colors/Colors';
import AcitvityHandler from '../AcitvityHandler';
import {GW_URL} from '../../config';
import NoData from '../../NoData';
import {AuthContext} from '../../Context/Context';
import {StudentDetailsContext} from '../../Context/StudentDetailsContext';
import Header from '../Header';

const {width, height} = Dimensions.get('window');

const Screen1 = () => {
  const {id} = useContext(DataContext);
  const [childId, setChildId] = useState(id);
  const [show, setShow] = useState(true);
  const {userToken} = useContext(AuthContext);
  const {studentDetails} = useContext(StudentDetailsContext);


  const PARENT = 'PARENT';
  const parentConfig = {
    headers: {Authorization: 'Bearer ' + userToken, User: PARENT},
  };

   
  const school_id=studentDetails[0]?.school_id;
  const class_id=studentDetails[0]?.class_id;
  const medium=studentDetails[0]?.medium;

  let medium_id;

  if (medium == 'English') medium_id = 1;
  else medium_id = 2;




  const {
    data: res,
    isLoading: curriculumLoading,
    isError: curriculumErrorStatus,
    error: ErrorMsg,
  } = useQuery({
    queryKey: ['curriculum', class_id, school_id],
    queryFn: () => {
      return axios.get(
        `${GW_URL}/viewCurriculum?school_id=${school_id}&class_id=${class_id}&medium_id=${medium_id}&month=${
          10
        }`,
        {
          headers: parentConfig.headers, // Pass the headers from parentConfig
        },
      );
    },
    enabled: !!class_id && !!school_id,
  });
  const handleLoad = () => {
    // When the image finishes loading
    setShow(false);
  };

  return (
    <ScrollView style={styles.ViewContainer}>
      <View style={styles.container}>
        {curriculumLoading && show && (
          <AcitvityHandler show={curriculumLoading} />
        )}
        {res?.data?.url != null ? (
          <View style={styles.imageContainer}>
            <Pinchable>
              <Image
                style={styles.image}
                onLoad={handleLoad}
                source={{uri: res?.data?.url}}
              />
            </Pinchable>
          </View>
        ) : (
          <NoData message={'Curriculum is not assigned'} x={110} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,

    overflow: 'hidden',
  },
  image: {
    width: width - 20,
    height: height - 140,

    resizeMode: 'contain',
  },
  noCurriculumText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 20,
  },
});

export default Screen1;
