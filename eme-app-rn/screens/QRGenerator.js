// UserDetailsQR.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRGenerator = () => {
  // Dummy user details
  const userDetails = {
    name: 'Vishal',
    phone: '9876543210',
    gender: 'Male',
    dob: '04/01/2001',
    blood:'A+ve',
    emergency:9894816748
  };

  // Convert user details to a query string
  const userDetailsString = `?name=${userDetails.name}&phone=${userDetails.phone}&gender=${encodeURIComponent(userDetails.gender)}&dob=${encodeURIComponent(userDetails.dob)}&blood=${encodeURIComponent(userDetails.blood)}&emergency=${encodeURIComponent(userDetails.emergency)}}`;

  // Dummy URL containing user details
  const userDetailsUrl = `https://shrreyasr.github.io/KITHack/EHR%20-%20Html/user-details.html`+userDetailsString;
  console.log(userDetailsUrl);


  return (
    <View style={styles.container}>
      <QRCode
        value={userDetailsUrl}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRGenerator;
