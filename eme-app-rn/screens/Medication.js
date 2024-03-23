import React from 'react';
import { Image, StyleSheet, Pressable, Alert, AsyncStorage } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeBaseProvider, VStack, View, Heading, Button, Text, Input } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Btn from '../Components/Btn';

const Medication = () => {
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

    const Test = () => {
        Alert.alert('Success', 'Data submitted successfully!');
    };

  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.body}>
        <View ml={5} mt={5}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>

        <VStack alignItems={"center"}>
            <Heading textAlign='center' width={400} fontSize={26} marginTop={10}>Keep Track of Medications</Heading>

            <View style={styles.camera}>
                <View style={styles.button1}>
                    <Button onPress={pickFromCamera} title={"Cam"} style={{ backgroundColor: "#407CE2" }}>
                        <Text fontSize={20} color='#fff' fontWeight={600}>Upload Prescription</Text>
                    </Button>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }} mt={12}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }} color={"#C2C2C2"}>OR</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
            </View>

            <VStack alignItems={'center'} mt={4}>
                <View>
                    <Text ml={5} mt={4}>
                        Medication Name
                    </Text>
                    <Input
                        ml={5} mr={5} mt={2} p={3} style={{ fontSize: 17 }} mx="3" size="2xl" width={'90%'} placeholder="Enter Medication Name" borderColor={'#407CE2'} />
                </View>

                <View>
                    <Text ml={5} mt={4}>
                        Routine
                    </Text>
                    <Input
                        ml={5} mr={5} mt={2} p={3} style={{ fontSize: 17 }} mx="3" size="2xl" width={'90%'} placeholder="Enter Routine Details" borderColor={'#407CE2'} />
                </View>

                <Pressable >
                    <View style={styles.button1}>
                        <Button onPress={Test} style={{ backgroundColor: "#407CE2" }}>
                            <Text fontSize={20} color='#fff' fontWeight={600}>Save and Schedule</Text>
                        </Button>
                    </View>
                </Pressable>

            </VStack>
        </VStack>
    </SafeAreaView>
</NativeBaseProvider>
);
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
  },
  button1:{
    width:350,
    height:50,
    marginTop:40
  },
  button2:{
    width:350,
    height:50,
    marginTop:40
  },
  camera: {
    width: 50,
    alignItems: 'center',
    // marginTop: 60,
    // marginBottom:40
  },
});

export default Medication;

// import React, { useState } from 'react';
// import { Image, StyleSheet, Pressable, Alert, AsyncStorage } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeBaseProvider, VStack, View, Heading, Button, Text, Input } from 'native-base';

// const Medication = () => {
//     const [medicationName, setMedicationName] = useState('');
//     const [routine, setRoutine] = useState('');
//     const [savedData, setSavedData] = useState(null);

//     const saveAndSchedule = async () => {
//         if (!medicationName || !routine) {
//             Alert.alert('Missing Information', 'Please enter both medication name and routine details.');
//             return;
//         }

//         try {
//             // Save medication details locally
//             await AsyncStorage.setItem('medicationName', medicationName);
//             await AsyncStorage.setItem('routine', routine);

//             // Display the saved medication details
//             const savedMedicationName = await AsyncStorage.getItem('medicationName');
//             const savedRoutine = await AsyncStorage.getItem('routine');
//             setSavedData({ medicationName: savedMedicationName, routine: savedRoutine });

//             // Show popup reminder
//             Alert.alert('Reminder', 'Medication schedule saved successfully!');
//         } catch (error) {
//             Alert.alert('Error', 'Failed to save medication details.');
//         }
//     };

//     return (
//         <NativeBaseProvider>
//             <SafeAreaView style={styles.body}>
//                 <View ml={5} mt={5}>
//                     <Image source={require('../assets/logo.png')} style={styles.logo} />
//                 </View>

//                 <VStack alignItems={"center"}>
//                     <Heading textAlign='center' width={400} fontSize={26} marginTop={10}>Keep Track of Medications</Heading>

//                     <View style={styles.camera}>
//                         <View style={styles.button1}>
//                             <Button  title={"Cam"} style={{ backgroundColor: "#407CE2" }}><Text fontSize={20} color='#fff' fontWeight={600}>Upload Prescription</Text></Button>
//                         </View>
//                     </View>

//                     <VStack alignItems={'center'} mt={4}>
//                         <View>
//                             <Text ml={5} mt={4}>
//                                 Medication Name
//                             </Text>
//                             <Input
//                                 ml={5} mr={5} mt={2} p={3} style={{ fontSize: 17 }} mx="3" size="2xl" width={'90%'} placeholder="Enter Medication Name" borderColor={'#407CE2'}
//                                 onChangeText={(text) => setMedicationName(text)}
//                                 value={medicationName}
//                             />
//                         </View>

//                         <View>
//                             <Text ml={5} mt={4}>
//                                 Routine
//                             </Text>
//                             <Input
//                                 ml={5} mr={5} mt={2} p={3} style={{ fontSize: 17 }} mx="3" size="2xl" width={'90%'} placeholder="Enter Routine Details" borderColor={'#407CE2'}
//                                 onChangeText={(text) => setRoutine(text)}
//                                 value={routine}
//                             />
//                         </View>

//                         <Pressable onPress={() => saveAndSchedule()}>
//                             <View style={styles.button1}>
//                                 <Button style={{ backgroundColor: "#407CE2" }}><Text fontSize={20} color='#fff' fontWeight={600}>Save and Schedule</Text></Button>
//                             </View>
//                         </Pressable>

//                         {/* Display saved medication details */}
//                         {savedData && (
//                             <View mt={4}>
//                                 <Text fontSize={18} fontWeight="bold">Saved Medication Details:</Text>
//                                 <Text fontSize={16}>Medication Name: {savedData.medicationName}</Text>
//                                 <Text fontSize={16}>Routine: {savedData.routine}</Text>
//                             </View>
//                         )}
//                     </VStack>
//                 </VStack>
//             </SafeAreaView>
//         </NativeBaseProvider>
//     );
// };

// const styles = StyleSheet.create({
//     body: {
//         backgroundColor: "#fff",
//         flex: 1,
//     },
//     logo: {
//         width: 60,
//         height: 60,
//     },
//     button1: {
//         width: 350,
//         height: 50,
//         marginTop: 40
//     },
//     camera: {
//         width: 50,
//         alignItems: 'center',
//     },
// });

// export default Medication;
