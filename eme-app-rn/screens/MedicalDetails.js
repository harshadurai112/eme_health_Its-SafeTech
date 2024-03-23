import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Pressable, Alert, Linking } from 'react-native';
// import * as Font from 'expo-font';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, View, VStack, Text, Heading } from 'native-base';

import { Image } from 'native-base';
const MedicalDetails = ({navigation: { goBack }, route, navigation})=> {
  // console.log("Hi");

  // React.useEffect(() => {
  //   async function loadFont() {
  //     await Font.loadAsync({
  //       'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
  //       'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  //       'Outfit-Regular': require('./assets/fonts/Outfrit-Thin.ttf') // Adjust the path accordingly
  //     });
  //   }
  //   loadFont();
  // }, []);
  const onPressEmergencyCall = (phoneNumber) => { 
    Linking.openURL(`tel:${phoneNumber}`);
  };

  
  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.body}>

      <View ml={5} mt={5} ><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>
      <ScrollView>

      <VStack alignItems="center" justifyContent="center" marginTop={2}>
          <Heading textAlign='center' width={300} fontSize={30}>{route.params.data.message.name}</Heading>
          <Image 
              
              style={{width:110, height:110, backgroundColor:"#c4c4c4", marginTop:20, borderRadius:10}}
              alt="Patient image"
              source={{uri: route.params.data.imgUrl}} />  
         
          <View style={styles.detailsView}>
            <Text style={styles.detialHead}>{'Phone'}</Text>
            <Text style={styles.detial}>{route.params.data.message.phone}</Text>
            <View style={styles.horizontalRule}></View>
            <Text style={styles.detialHead}>{'Gender'}</Text>
            <Text style={styles.detial}>{route.params.data.message.gender}</Text>
            <View style={styles.horizontalRule}></View>
            <Text style={styles.detialHead}>{'Date of Birth'}</Text>
            <Text style={styles.detial}>{route.params.data.message.date_of_birth}</Text>
            <View style={styles.horizontalRule}></View>
            <Text style={styles.detialHead}>{'Blood Group'}</Text>
            <Text style={styles.detial}>{route.params.data.message.blood_group}</Text>
            <View style={styles.horizontalRule}></View>
          </View>

          <Pressable onPress={() => onPressEmergencyCall(route.params.data.message.phone)}>
            <View style={styles.emergencyButton}>
              <Text style={{color:'white',fontSize:19,fontWeight:'700'}}>Emergency Call</Text>
            </View>
          </Pressable>

          <Text style={{color:"#c4c4c4", width:350, textAlign:'center', marginTop:20}}>*This will trigger an emergency call to the persons emergency contacts. Any false triggers will lead to legal actions.</Text>
      </VStack>

      </ScrollView>
    </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:"#fff"
  },
  heading:{
    // fontFamily: 'Outfit-SemiBold',
    fontSize:30,
    textAlign:'center',
  },
  icon:{
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    padding:20
  },
  detailsView:{
    width:'100%',
    marginTop:30,
  },
  detialHead:{
    color:'#8C8C8C',
    fontSize:17,
    marginLeft:25

  },
  detial:{
    fontSize:19,
    // fontFamily:'Outfit-SemiBold',
    marginTop:10,
    marginLeft:25,
    fontWeight:600

  },
  horizontalRule: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    marginVertical: 15, // Adjust the margin as needed
  },
  discription:{
    fontSize:12,
    color: '#8C8C8C',
    textAlign:'center',
    margin:25
  },
  emergencyButton:{
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    width:300,
    height:50,
    backgroundColor:'#F02A2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 40,
    marginRight: 40,
  },
  emergencyButtonText:{
    fontSize:20,
    // fontFamily:'Outfit-SemiBold',
    textAlign:'center',
    color:'white'
  }
});
export default MedicalDetails;