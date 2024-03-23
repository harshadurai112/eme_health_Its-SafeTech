import React from "react";
import { Image, Pressable, StyleSheet, Alert } from "react-native";
import { View } from "native-base";
import { NativeBaseProvider, VStack, Heading, Button, Text } from "native-base";
import { SafeAreaView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Btn from '../Components/Btn';
import * as FileSystem from 'expo-file-system';

export default function FaceScan({ navigation }) {

  const pickFromCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      let photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 0.5,
        allowsEditing: false,
        base64: true,
        exif: false
      });

     if(!photo.canceled)
     {
      const formData = new FormData();
            formData.append('photo', {
                uri: photo.assets[0].uri,
                type: 'image/jpeg', // Adjust accordingly based on the image type
                name: 'photo.jpg' // Adjust the name as needed
          });
          
         try {
          const response = await fetch('http://192.168.222.100:3000/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData, responseData.data);
            if(responseData.data.status === 0){
              Alert.alert("No match", "No person is found in the image");
            }else{
              navigation.navigate('MedDet', {data: responseData.data})
            }
            
            // Alert.alert("Success", "Photo uploaded successfully.");
          } else {
            Alert.alert("Error", "Failed to upload photo.");
          }
        } catch (error) {
          console.error('Error uploading photo:', error);
          Alert.alert("Error", `Failed to upload photo. ${error}`);
        }
      
         
     }

    } else {
      Alert.alert("Permission Denied", "You need to give permission to access the camera.");
    }
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <View ml={5} mt={10} ><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>

        <VStack alignItems="center" justifyContent="center" marginTop={20}>
          <Heading textAlign='center' width={300} fontSize={30}>Scan the Patient to inform his family</Heading>
          
          <View style={styles.camera}>
            <Button onPress={pickFromCamera} title={"Cam"} style={{backgroundColor:"#407CE2", width:200, height:50}}><Text fontSize={20} color='#fff' fontWeight={600}>Capture Face</Text></Button>
          </View>

          <View style={styles.buttonWrap}>
            <Pressable onPress={() => navigation.navigate('HealthRecHis')}>
              <View style={styles.button2}>
                <Btn content={"Access Health Records"} />
              </View>
            </Pressable>
          </View>

          <View style={styles.fingerprint}>
            <Text style={{}}>Not Working?<Text style={{fontWeight:'700'}}> Use Fingerprint</Text></Text>
          </View>

          <Text style={{color:"#c4c4c4", width:350, textAlign:'center', marginTop:80}}>*Scan the persons face only during emergency situations. Any false scans will lead to legal actions as the scan history will be logged.</Text>
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:"#fff"
  },
  camera: {
    width: 50,
    alignItems: 'center',
    marginTop: 60,
    marginBottom:40
  },
  button2: {
    width: 350,
    height: 50,
    marginTop: 20
  },
  buttonWrap: {
    alignItems: 'center',
    marginTop: 15
  },
  fingerprint: {
    marginTop: 30,
    alignItems: 'center'
  }
});
