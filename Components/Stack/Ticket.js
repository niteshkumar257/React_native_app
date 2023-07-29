import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../Context/Context';
import jwtDecode from 'jwt-decode';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {COLORS} from '../Utils/Colors/Colors';
import {FONTS} from '../Utils/Colors/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage, hideMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {StudentContext} from '../Context/StudentConext';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GW_URL} from '../config';
import Snackbar from 'react-native-snackbar';

const Ticket = () => {
  const {logoutHandler, userToken} = useContext(AuthContext);
  const {child_id} = useContext(StudentContext);
  const userInfo = jwtDecode(userToken);
  const parent_id = userInfo.result.parent_id;
  console.log(child_id, parent_id);
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [hei, setHeight] = useState(100);

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
    queryKey: ['fetch-class_id-school_id', child_id],
    queryFn: () => {
      return axios.get(`${GW_URL}/students/${child_id}`,parentConfig);
    },
  });

  const submitForm = () => {
    if (msg != '' && subject != '') {
      axios
        .post(`${GW_URL}/parents/${parent_id}/raiseTicket`,{
          title: subject,
          description: msg,
          school_id: ClassIdAndSchoolId?.data?.studentDetails[0].school_id,
        },parentConfig)
        .then(res => {
          console.log(res.data);
          // showMessage({
          //   message: 'Issue Raised succesfully',
          //   type: 'success',
          //   autoHide: 2000,
          //   floating: false,
          //   width: width,
          // });
          Snackbar.show({
            text: 'Issued Raised SuccessFully',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:"green"
          });
          setMsg('');
          setSubject('');
          setHeight(100);
        })
        .catch(err => {
          console.log(err);
          setMsg('');
          setSubject('');
          setHeight(100);
          // showMessage({
          //   message: 'Something went wrong',
          //   type: 'error',
          //   autoHide: 2000,
          //   floating: false,
          // });
          Snackbar.show({
            text: 'Something went wrong',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:"red"
          });
        });
    } else {
      showMessage({
        message: 'Meesage field is Required',
        type: 'error',
        autoHide: 2000,
        floating: false,
        width: width,
      });
    }
  };

  // usestates

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headContainer}>
        <View style={styles.headerContainer}>
          <Icon name="ticket-account" size={30} color="black" />
          <Text style={styles.text}>Raise an Issue</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.text_input, {height: hei}]}
          placeholder="Subject"
          placeholderTextColor="grey"
          multiline
          inputMode="text"
          color="black"
          height={40}
          maxLength={width - 40}
          numberOfLines={2}
          allowFontScaling
          value={subject}
          autoCapitalize={'sentences'}
          rows={10}
          caretHidden={false}
          autoCorrect
          onChangeText={text => setSubject(text)}
        />

        <TextInput
          style={[styles.text_input, {height: hei}]}
          placeholder="Description of complaint"
          placeholderTextColor="grey"
          multiline
          inputMode="text"
          color="black"
          onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
          maxLength={width - 40}
          numberOfLines={2}
          allowFontScaling
          value={msg}
          autoCapitalize={'sentences'}
          rows={10}
          caretHidden={false}
          autoCorrect
          onChangeText={text => setMsg(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.mainColor3,
            color: 'white',
            borderRadius: 9,
            width: 100,
            height: 40,
            textDecorationLine: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={submitForm}>
          <Text
            style={{
              color: 'white',

              fontSize: 19,
              fontWeight: 500,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height - 50,
    width: width,
    backgroundColor: COLORS.backgGroundColor,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    rowGap: 30,
  },
  text: {
    fontSize: FONTS.TextTitle,
    color: FONTS.TextColor,
  },
  headContainer: {
    height: 50,
    padding: 2,
    width: width - 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 9,
    display: 'flex',

    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 10,
  },
  headerContainer: {
    display: 'flex',
    width: width - 20,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
  },
  formContainer: {
    minHeight: 40,
    width: width - 20,
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  text_input: {
    minHeight: 50,
    width: width - 20,
    borderRadius: 9,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 9,
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: width - 20,
    height: 50,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Ticket;
