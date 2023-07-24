import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Modal from 'react-native-modal';

const ForceUpdate = ({ isVisible, onConfirm ,newVersion}) => {
    const gwlogo = require("../assets/gwlogo.png");
    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.leftContainer}>
                    <Image source={gwlogo} style={styles.logo} />

                  
                </View>

               <View style={styles.rightContainer}>
               <Text style={styles.updateInfo}>
                        A new version of the app is available  {newVersion}
                    </Text>
               <TouchableOpacity onPress={() => Linking.openURL(`https://play.google.com/store/apps/details?id=com.Gw1.teacher`)} style={styles.updateButton}>
                    <Text style={styles.updateButtonText}>Update Now</Text>
                </TouchableOpacity>
               </View>
                {/* <TouchableOpacity onPress={onConfirm} >
          <Text style={styles.updateButtonText}>Update Now</Text>
        </TouchableOpacity> */}

               
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        height:200,
       padingTop:30,
       padingBottom:30,
       pading:10,
    },
    leftContainer:{
      flex:1
    },
    rightContainer:{
        flex:1
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    updateInfo: {
        fontSize: 18,
        marginBottom: 20,
        color:'black',
        textAlign: 'center',
    },
    updateButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    playstoreLink: {
        marginBottom: 10,
    },
    playstoreLinkText: {
        color: '#007BFF',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ForceUpdate;
