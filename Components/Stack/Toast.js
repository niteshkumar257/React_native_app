import {View, Text, Image, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

const CustomToast = ({logo, message}) => {
  const gwlogo = require('../../assets/gwlogo.png');
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};
export default CustomToast;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  logoContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  logo: {
    width: 24,
    height: 24,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});
