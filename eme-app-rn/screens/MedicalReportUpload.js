// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, Image, SafeAreaView, ScrollView } from 'react-native';
// import { NativeBaseProvider, HStack, VStack, Center, Heading, View, Input, Box } from 'native-base';
// import React, { useEffect } from 'react';


// const MedicalReportUpload = ()=> {
//   console.log("Hi");

//   // React.useEffect(() => {
//   //   async function loadFont() {
//   //     await Font.loadAsync({
//   //       'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
//   //       'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
//   //       'Outfit-Regular': require('./assets/fonts/Outfit-Thin.ttf') // Adjust the path accordingly
//   //     });
//   //   }
//   //   loadFont();
//   // }, []);
  
//   return (
//     <NativeBaseProvider>
//       <SafeAreaView>
//         <HStack alignItems='center' justifyContent='space-between'>
//           <View ml={5} mt={5}><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>
//         </HStack>

//         <Center><VStack alignItems="center" justifyContent="center" marginTop={5}>
//           <Heading mb={5}>Upload Medical Report</Heading>

//         <ScrollView style={{width:320}}>
//           <VStack>
//             <Box alignItems="center" mt={5}>
//               <Input mx="3" size="2xl" placeholder="Report Name" w="100%" p={3} />
//             </Box>

//             <Box alignItems="center" mt={6}>
//               <Input mx="3" size="2xl" placeholder="Hospital Name" w="100%" p={3} />
//             </Box>

//             <Box alignItems="center" mt={6}>
//               <Input mx="3" size="2xl" placeholder="Refered By" w="100%" p={3} />
//             </Box>

//             <Box alignItems="center" mt={6}>
//               <Input mx="3" size="2xl" placeholder="Diagnosis Purpose" w="100%" p={3} />
//             </Box>

//             <Box alignItems="center" mt={6}>
//               <Input mx="3" size="2xl" placeholder="Verified By" w="100%" p={3} />
//             </Box>
//           </VStack>
//         </ScrollView>

//         </VStack></Center>
//       </SafeAreaView>
//     </NativeBaseProvider>
    
//     // <SafeAreaView style={styles.container}>
//     //   <Image style={styles.logo} source={require('../assets/logo.png')}/>
//     //   <Text>{'\n\n\n'}</Text>
//     //   <Text style={styles.heading}>{'Raj Kumar B'}</Text>
//     //   <View style={styles.icon}>
//     //     <Image source={require('../assets/add.png')}/>
//     //   </View>
//     //   <View style = {styles.scanDetails}>
//     //     <TextInput
//     //         style={styles.scanInput}
//     //         //onChangeText={handleChangeText}
//     //         //value={text}
//     //         placeholder="Report Type"
//     //     />
//     //     <TextInput
//     //         style={styles.scanInput}
//     //         //onChangeText={handleChangeText}
//     //         //value={text}
//     //         placeholder="Hospital Name"
//     //     />
//     //     <TextInput
//     //         style={styles.scanInput}
//     //         //onChangeText={handleChangeText}
//     //         //value={text}
//     //         placeholder="Hospital ID"
//     //     />


//     //   </View>


//     //   <TouchableOpacity style={styles.scanButton} >
//     //     <Text style={styles.scanButtonText}>{'Scan the Medical Report'}</Text>
//     //   </TouchableOpacity>
      
//     // </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   logo : {
//     width: 50,
//     height: 50,
//     position:'relative',
//     top: 50,
//     left: 25,
//   },
//   heading:{
//     fontFamily: 'Outfit-SemiBold',
//     fontSize:30,
//     textAlign:'center',
//   },
//   icon:{
//     justifyContent: 'center',
//     alignItems: 'center',
//     width:'100%',
//     padding:20
//   },
//   discription:{
//     fontSize:12,
//     color: '#8C8C8C',
//     textAlign:'center',
//     margin:25
//   },
//   scanInput:{
//     height: 50,
//     borderColor: '#407CE2',
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 10,
//     marginHorizontal:40,
//     borderRadius:10

//   },
//   scanButton:{
//     backgroundColor:'#407CE2',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginLeft: 40,
//     marginRight: 40,
//     marginVertical:20
//   },
//   scanButtonText:{
//     fontSize:20,
//     fontFamily:'Outfit-SemiBold',
//     textAlign:'center',
//     color:'white'
//   }
// });
// export default MedicalReportUpload;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeBaseProvider, HStack, VStack, Center, Heading, View, Input, Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const MedicalReportUpload = ()=> {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [reportData, setReportData] = useState({
    reportName: '',
    hospitalName: '',
    referedBy: '',
    diagnosisPurpose: '',
    verifiedBy: '',
    imageUrl : ''
  });


  const submitReport = async () => {
    try {
      const response = await axios.post('http://192.168.29.154:3000/submitMedicalReport', reportData);
      console.log(response.data);
      Alert.alert('Success', "Data uploaded successfully")
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', "Error submitting report")
    }
  };

  const handleDocumentPick = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync();
      
        setSelectedDocument(document);
        console.log();
        const formData = new FormData();
        formData.append('photo', {
            uri: document.assets[0].uri,
            type: 'image/jpeg', // Adjust accordingly based on the image type
            name: 'photo.jpg' // Adjust the name as needed
        });

        try {
          const response = await fetch('http://192.168.222.100:3000/medicalUpload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            setReportData({ ...reportData, imageUrl: responseData.imgUrl })
            Alert.alert("Success", "Photo uploaded successfully.");
          } else {
            Alert.alert("Error", "Failed to upload photo.");
          }
        } catch (error) {
          console.error('Error uploading photo:', error);
          Alert.alert("Error", `Failed to upload photo. ${error}`);
        }
      
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <HStack alignItems='center' justifyContent='space-between'>
          <View ml={5} mt={5}><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>
        </HStack>

        <Center><VStack alignItems="center" justifyContent="center" marginTop={5}>
          <Heading mt={5} mb={5}>Upload Medical Report</Heading>

        <ScrollView style={{width:320}}>
          <VStack>
            <Box alignItems="center" mt={5}>
              <Input 
                style={{fontSize:18}} 
                mx="3" 
                size="2xl" 
                placeholder="Report Name" 
                w="100%" 
                p={3} 
                onChangeText={(text) => setReportData({ ...reportData, reportName: text })}
              />
            </Box>

            <Box alignItems="center" mt={6}>
            <Input 
              style={{fontSize:18}} 
              mx="3" 
              size="2xl" 
              placeholder="Hospital Name" 
              w="100%" 
              p={3} 
              onChangeText={(text) => setReportData({ ...reportData, hospitalName: text })}
            />
          </Box>

          <Box alignItems="center" mt={6}>
            <Input 
              style={{fontSize:18}} 
              mx="3" 
              size="2xl" 
              placeholder="Refered By" 
              w="100%" 
              p={3} 
              onChangeText={(text) => setReportData({ ...reportData, referedBy: text })}
            />
          </Box>

          <Box alignItems="center" mt={6}>
            <Input 
              style={{fontSize:18}} 
              mx="3" 
              size="2xl" 
              placeholder="Diagnosis Purpose" 
              w="100%" 
              p={3} 
              onChangeText={(text) => setReportData({ ...reportData, diagnosisPurpose: text })}
            />
          </Box>

          <Box alignItems="center" mt={6}>
            <Input 
              style={{fontSize:18}} 
              mx="3" 
              size="2xl" 
              placeholder="Verified By" 
              w="100%" 
              p={3} 
              onChangeText={(text) => setReportData({ ...reportData, verifiedBy: text })}
            />
          </Box>


            {/* Button to trigger document upload */}
            <TouchableOpacity onPress={handleDocumentPick} style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Upload Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={submitReport} style={styles.scanButtonBlue}>
              <Text style={styles.scanButtonTextBlue}>Submit</Text>
            </TouchableOpacity>

            {/* Display selected document */}
            {selectedDocument && (
              <Text style={{marginTop: 10}}>
                Selected Document: {selectedDocument.name}
              </Text>
            )}
          </VStack>
        </ScrollView>

        </VStack></Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:"#fff"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo : {
    width: 50,
    height: 50,
    position:'relative',
    top: 50,
    left: 25,
  },
  heading:{
    fontSize:30,
    textAlign:'center',
  },
  icon:{
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    padding:20
  },
  discription:{
    fontSize:12,
    color: '#8C8C8C',
    textAlign:'center',
    margin:25
  },
  scanInput:{
    height: 50,
    borderColor: '#407CE2',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    marginHorizontal:40,
    borderRadius:10

  },
  scanButton:{
    backgroundColor:'#a4a4a4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 40,
    marginRight: 40,
    marginVertical:20
  },
  scanButtonText:{
    fontSize:20,
    textAlign:'center',
    color:'white',
    fontWeight:'600'
  },
  scanButtonBlue:{
    backgroundColor:'#407CE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:15
    // marginLeft: 40,
    // marginRight: 40,
  },
  scanButtonTextBlue:{
    fontSize:20,
    textAlign:'center',
    color:'white',
    fontWeight:'600'
  }
});

export default MedicalReportUpload;
