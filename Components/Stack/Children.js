import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Student from './Student';
import Headers from './header';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {AuthContext} from '../Context/Context';
import jwtDecode from 'jwt-decode';
import AcitvityHandler from '../bottom/AcitvityHandler';
import {COLORS} from '../Utils/Colors/Colors';
import {useQuery} from '@tanstack/react-query';
import {GW_URL} from '../config';

const Children = ({navigation}) => {
  const [children, setChildren] = useState([]);
  const {userToken} = useContext(AuthContext);
  const [showActivity, setShowActitvity] = useState(true);
  let userInfo = jwtDecode(userToken);
  let parentId = userInfo.result.parent_id;

  const {isLoading, isError, error, data} = useQuery({
    queryKey: ['childrenlist', parentId],
    queryFn: () => {
      return axios.get(`${GW_URL}/parents/${parentId}/getChildren`);
    },
  });

  if (!isLoading) {
    console.log(data.data);
    console.log('data loads succesffuly');
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

  return (
    <View style={styles.mainContainer}>
      <Headers navigation={navigation} />
      {isLoading ? (
        <AcitvityHandler shos={isLoading} />
      ) : (
        <View style={styles.ChildrenListContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Children Details</Text>
          </View>
          {data?.data?.allChildren?.map((item, index) => (
            <Student
              key={item.child_id}
              name={item.child_name}
              child_id={item.child_id}
              navigation={navigation}
            />
          ))}
        </View>
      )}
      <Toast />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: COLORS.backgGroundColor,
  },
  ChildrenListContainer: {
    height: '80%',
    width: '100%',
    display: 'flex',
    paddingTop: 30,
    padding: 5,
    rowGap: 30,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    height: 40,
    paddingLeft: 15,
  },
  title: {
    color: 'black',

    fontSize: 20,
    fontWeight: 500,
    color: 'black',
  },
  container: {
    height: 140,
    width: 140,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoContainer: {
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    columnGap: 10,

    paddingLeft: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: 500,
    color: 'black',
    textAlign: 'center',
  },
});

export default Children;
