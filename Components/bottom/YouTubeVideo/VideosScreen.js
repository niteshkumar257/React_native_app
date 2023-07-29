import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { GW_URL } from '../../config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { COLORS } from '../../Utils/Colors/Colors';
import DataContext from '../../Context/DataContext';
import Loader from '../../Loader';
import NoData from '../../NoData';
import { AuthContext } from '../../Context/Context';





const renderSubjectImage = subjectName => {
  switch (subjectName) {
    case 'Physics':
      return <Image source={require('../../../assets/Physics.png')} />;
    case 'Chemistry':
      return <Image source={require('../../../assets/chemistry.png')} />;
    case 'Math':
      return <Image source={require('../../../assets/Math.png')} />;
    case 'Biology':
      return <Image source={require('../../../assets/Biology.png')} />;
    default:
      return null;
  }
};

const Video = ({ navigation }) => {
  const { id } = useContext(DataContext);
  const [childId, setChildId] = useState(id);
  const { userToken } = useContext(AuthContext);
const PARENT="PARENT";
 const parentConfig = {
  headers: { 'Authorization': 'Bearer ' +userToken , 'User': PARENT }
};


  const {
    data: ClassIdAndSchoolId,
    isLoading: IdsLoading,
    isError: IdsError,
    error: Idserror,
  } = useQuery({
    queryKey: ['fetch-class_id-school_id', childId],
    queryFn: () => axios.get(`${GW_URL}/students/${childId}`,{parentConfig}),
  });

  const class_id = ClassIdAndSchoolId?.data?.studentDetails[0]?.class_id;
  const school_id = ClassIdAndSchoolId?.data?.studentDetails[0]?.school_id;

  const {
    data: StudentSubjectList,
    isLoading: StudentSubjectLoading,
    isError: StudentSubjectError,
  } = useQuery({
    queryKey: ['fetch-student-sujectlist', class_id, school_id],
    queryFn: () =>
      axios.get(`${GW_URL}/schools/${school_id}/${class_id}/getClassSubjects`,parentConfig),
    enabled: !!class_id && !!school_id,
  });

  const renderSubjectItem = ({ item }) => {
    return (
      <View
        key={item.subject_id}
        style={styles.imageContainer}
        onStartShouldSetResponder={() =>
          renderVideoList(item.subject_id, item.subject_name)
        }>
        {renderSubjectImage(item.subject_name)}
        <Text style={styles.subjectText}>{item.subject_name}</Text>
      </View>
    );
  };

  const renderVideoList = (subject_id, subject_name) => {
    axios
      .get(`${GW_URL}/videos/${class_id}/${subject_id}/getVideos`,parentConfig)
      .then(res => {
        if (res.data.data[0] !== undefined) {
          navigation.navigate('subject', {
            subject_name: subject_name,
            video_url: res.data.data[0].video_url,
          });
        } else {
          navigation.navigate('noVideos');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.videoContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Subject Videos</Text>
      </View>
      <View style={styles.subjectContainer}>
        {StudentSubjectLoading ? (
          <Loader show={StudentSubjectLoading} x={110} />
        ) : StudentSubjectList?.data?.subjects?.length > 0 ? (
          <FlatList
            data={StudentSubjectList?.data?.subjects}
            keyExtractor={item => item.subject_id.toString()}
            renderItem={renderSubjectItem}
          />
        ) : (
          <NoData message={'No Subjects'} />
        )}
      </View>
    </View>
  );
};

export default Video;


const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: 'column',
    backgroundColor: 'red',
    alignItems: 'center',
    rowGap: 10,
    borderRadius: 9,
    paddingTop: 20,

    display: 'flex',

    backgroundColor: COLORS.backgGroundColor,
  },
  VideoPlayerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    backgroundColor: 'black',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    width: width - 20,
    paddingLeft: 20,
    paddingRight: 20,
    //  backgroundColor:"#e1ffff",
    rowGap: 5,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',

    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 9,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 500,
    color: 'black',
  },
  subjectContainer: {
    height: '100%',
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    columnGap: 40,
    flexWrap: 'wrap',
    rowGap: 20,
    height: 'auto',

    padding: 10,
  },
  headingContainer: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  subejctText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 600,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    width: width - 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    elevation: 5, // Set the elevation to 5
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 9,
    marginBottom: 20, // Set the row gap to 20 pixels
  }
});
