import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Student from './Student';
import Headers from './header';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {AuthContext} from '../Context/Context';
import jwtDecode from 'jwt-decode';
import AcitvityHandler from '../bottom/AcitvityHandler';
import {StudentContext} from '../Context/StudentConext';
import {useQuery} from '@tanstack/react-query';
import {GW_URL} from '../config';
import {FONTS} from '../Utils/Colors/fonts';
import {COLORS} from '../Utils/Colors/Colors';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {StudentDetailsContext} from '../Context/StudentDetailsContext';
import {parentConfig} from '../config';
import YouTube from './Youtube';

const Children = ({navigation}) => {
  const [childrenDetails, setChildrenDetails] = useState({});
  const {userToken} = useContext(AuthContext);
  const [showActivity, setShowActivity] = useState(true);
  const [children, setChildren] = useState([]);
  const {setChildIdHandler} = useContext(StudentContext);
  const [promotionaVideos, setPromotionalVideo] = useState();
  const [videoLoading, setVideoLoading] = useState(true);

  const videoList = [
    {videoId: 'fABGMpZ5njs'},
    {
      videoId: 'FDM2OQQfJ4Y',
    },
    {videoId: 'g1SkXLWMTNI'},
    {
      videoId: 'HlyUcNeW2uU',
    },
  ];
  let userInfo = jwtDecode(userToken);
  let parentId = userInfo.result.parent_id;
  const {studentDetails, studentData, setStudentDetails} = useContext(
    StudentDetailsContext,
  );

  const PARENT = 'PARENT';
  const parentConfig = {
    headers: {Authorization: 'Bearer ' + userToken, User: PARENT},
  };

  const {isLoading, isError, error, data} = useQuery({
    queryKey: ['childrenlist', parentId],
    queryFn: () => {
      return axios.get(
        `${GW_URL}/parents/${parentId}/getChildren`,
        parentConfig,
      );
    },
    onSuccess: data => {
      studentData(data?.data?.allChildren);
    },
  });

  const getVideos = () => {
    axios
      .get(`${GW_URL}/videos/getAllPromotionalVideo`,parentConfig)
      .then(res => {
        console.log(56, res);
      })
      .catch(err => {
        console.log(58, err);
      });
  };

  const showToast = (type, header, msg = '') => {
    Toast.show({
      type: type,
      text1: header,
      text2: msg,
    });
  };

  const toggleDetails = childId => {
    setChildrenDetails(prevDetails => ({
      ...prevDetails,
      [childId]: !prevDetails[childId],
    }));
  };

  const videoReady = () => {
    setVideoLoading(false);
  };

  const clickHandler = (child_id, name, photo_url) => {
    setChildIdHandler(child_id);
    navigation.navigate('home', {
      child_id: child_id,
      child_name: name,
      photo_url: photo_url,
    });
  };
  useEffect(() => {
    getVideos();
  }, []);
  const renderVideo = ({item}) => (
    <View style={{padding: 2}}>
      <YouTube videoId={item.videoId} videoReady={videoReady} />
    </View>
  );
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
          {data?.data?.allChildren?.map(
            item =>
              item && (
                <View
                  key={item?.student_id}
                  onStartShouldSetResponder={() =>
                    clickHandler(
                      item?.student_id,
                      item?.student_name,
                      item?.photo_url,
                      item?.school_id,
                    )
                  }
                  style={styles.childContainer}>
                  <View style={styles.topContainer}>
                    <Image
                      style={styles.imageContainer}
                      source={{uri: item?.photo_url}}
                    />
                    <Text style={styles.childName}>{item?.student_name}</Text>
                  </View>
                </View>
              ),
          )}
        </View>
      )}
      {!isLoading && (
        <View style={styles.videoConainer}>
          <Text style={styles.title}>Promotional Videos</Text>
          {/* {
          promotionaVideos?.map((video)=>{
             return  <YouTube/>
          })
        } */}

          <FlatList
            data={videoList}
            renderItem={renderVideo}
            keyExtractor={item => item.videoId}
          />
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
    height: 'auto',
  },
  childrenListContainer: {
    height: 'auto',
    paddingTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    height: 25,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  childContainer: {
    height: 'auto',
    width: width - 20,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 50,
    justifyContent: 'space-between',
    paddingLeft: 20,
    alignItems: 'space-between',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 9,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: COLORS.mainColor3,
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
    fontSize: FONTS.TextSubTitle,
    fontWeight: FONTS.TextSubTitleWeight,
    color: 'black',
    marginBottom: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 60,
    padding: 5,
    justifyContent: 'flex-start',
  },
  videoConainer: {
    display: 'flex',
    padding: 7,
    height: 440,
    marginTop: 10,
    rowGap: 10,
  },
});

export default Children;
