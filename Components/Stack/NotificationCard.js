import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {COLORS} from '../Utils/Colors/Colors';
import {fetchContent} from '../Redux/NotificationSlice';
import {useDispatch} from 'react-redux';
import {GW_URL} from '../config';
import {fetchPTMContent} from '../Redux/PtmNotificationSlice';

const NotificationCard = ({
  icon,
  msg,
  NotificationId,
  NotificationStatus,
  getNotification,
  date,
  parentId,
  meetingId,
}) => {
  

  const dispatch = useDispatch();
  const feeIcon = require('../../assets/notificationFee.png');
  const updateNotificationStatus = async notificationId => {
    if (meetingId == null) {
      try {
        const response = await axios.put(
          `${GW_URL}/parents/${notificationId}/markNotificationSeen`,
        );

        dispatch(fetchContent(parentId));
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    } else {
      try {
        const response = await axios.put(
          `${GW_URL}/parents/${meetingId}/markPTMNotificationSeen`,
        );

        dispatch(fetchPTMContent(parentId));
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    }
  };
  return (
    <View
      onStartShouldSetResponder={() => updateNotificationStatus(NotificationId)}
      style={[
        styles.mainContainer,
        NotificationStatus && styles.disableViewContainer,
      ]}
      pointerEvents={NotificationStatus ? 'none' : 'auto'}>
      <View style={styles.icons}>
        <Icon name="wallet-sharp" size={40} color={'#1377c0'} />
      </View>
      <View style={styles.Info}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 17,
            color: 'black',
            letterSpacing: 1,
          }}>
          {msg?.split(' 00:00:00')[0]}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 17,
            color: 'black',
            letterSpacing: 1,
          }}>
          {' '}
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;
const styles = StyleSheet.create({
  mainContainer: {
    height: 'auto',
    minHeight: 70,
    width: '95%',
    padding: 5,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: COLORS.grayColorShade2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    backgroundColor: 'white',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  disableViewContainer: {
    opacity: 0.8,
    backgroundColor:COLORS.grayColorShade1,
  },
  icons: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Info: {
    height: 'auto',
    flex: 3,
    width: '75%',
    display: 'flex',
    rowGap: 10,

    padding: 5,
  },
});
