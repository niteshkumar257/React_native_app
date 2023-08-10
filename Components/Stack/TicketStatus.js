import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {GW_URL} from '../config';
import {COLORS} from '../Utils/Colors/Colors';
import {AuthContext} from '../Context/Context';
import jwtDecode from 'jwt-decode';
import IssueDetailsComponent from './IssueComponent';
import AcitvityHandler from '../bottom/AcitvityHandler';
import Loader from '../Loader';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import NoData from '../NoData';

const TicketStatus = () => {
  const {logoutHandler, userToken} = useContext(AuthContext);
  const userInfo = jwtDecode(userToken);
  const parent_id = userInfo.result.parent_id;
  const [issueInfo, setIssueInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
const PARENT="PARENT";
 const parentConfig = {
  headers: { 'Authorization': 'Bearer ' +userToken , 'User': PARENT }
};
  const getTicketStatuDetails = () => {
    axios
      .get(`${GW_URL}/parents/${parent_id}/getStatus`,parentConfig)
      .then(res => {
        console.log('status', res.data);
        setIssueInfo(res.data.tickerInfo);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getTicketStatuDetails();
  }, []);
  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <Loader show={isLoading} x={60} />
      ) : (
        <ScrollView>
          {issueInfo.length != 0 ? (
            issueInfo.map((item, index) => (
              <IssueDetailsComponent key={index} issue={item} />
            ))
          ) : (
            <NoData message={'No active ticket'} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default TicketStatus;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.backgGroundColor,
    height: height - 50,
    width: width,
    marginLeft:0,marginRight:10,
    paddingTop:10,
    display:'flex',
    justifyContent:'center',alignItems:'center'
  },
});
