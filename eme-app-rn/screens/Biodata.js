import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { HStack, View, ScrollView } from "native-base";
import { NativeBaseProvider, Box, Center, VStack, Heading, Button, Text, Input, Select,CheckIcon  } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import SmallBluBtn from '../Components/SmallBluBtn';
// import Btn from './Components/Btn';
import axios from 'axios';



const Biodata = ({navigation}) => {
  const [fullName, setFullName] = React.useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [minor, setMinor] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [patientEmploymentStatus, setPatientEmploymentStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  async function handleSubmit() {
    
    console.log(`
      Full Name: ${fullName}
      Date of Birth: ${dob}
      Gender: ${gender}
      Marital Status: ${maritalStatus}
      Minor: ${minor}
      Guardian Name: ${guardianName}
      Patient Employment Status: ${patientEmploymentStatus}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Address: ${address}
      City: ${city}
      State: ${state}
      Postal Code: ${postalCode}
    `);
    try {
      await axios.post('http://192.168.222.100:3000/form', {
        fullName,
        dob,
        gender,
        maritalStatus,
        minor,
        guardianName,
        patientEmploymentStatus,
        phoneNumber,
        email,
        address,
        city,
        state,
        postalCode
      }
      ).then((data) => {
        console.log(data.data);
        navigation.navigate('EmergencyContact');
      });

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <View ml={5} mt={5} ><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>

          <Heading ml={3} mt={5}>Personal Details</Heading>
          <ScrollView>
          <View>

          
        <VStack>
          
          <VStack>
            <Text ml={5} mt={4}>
              Full Name
            </Text>
            <Input value={fullName} onChangeText={setFullName} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl"  placeholder="Enter your Full Name" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Date of Birth
            </Text>
            <Input value={dob} onChangeText={setDob} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="DD-MM-YY" borderColor={'#407CE2'} >
            </Input>

          </VStack>

          <Text ml={5} mt={4}>
            Gender
          </Text>
            <Box maxW="375" ml={2} mt={2}>
              <Select selectedValue = {gender} onValueChange={itemValue => setGender(itemValue)}  minWidth="200" mx="3" size="2xl" fontSize={17} borderColor={'#407CE2'} accessibilityLabel="Choose Gender" placeholder="Choose Gender">
                <Select.Item label="None" value="none" />
                <Select.Item label="Male" value="male" />
                <Select.Item label="Female" value="female" />
                <Select.Item label="Other" value="other" />
              </Select>
            </Box>

          <Text ml={5} mt={4}>
            Marital Status
          </Text>
           <Box maxW="375" ml={2} mt={2}>
              <Select selectedValue = {maritalStatus} onValueChange={itemValue => setMaritalStatus(itemValue)}  minWidth="200" mx="3" size="2xl" fontSize={17} borderColor={'#407CE2'} accessibilityLabel="Choose Marital Status" placeholder="Choose Marital Status">
                <Select.Item label="Single" value="single" />
                <Select.Item label="Married" value="married" />
                <Select.Item label="Widowed" value="widowed" />
                <Select.Item label="Divorced" value="divorced" />
                <Select.Item label="Separated" value="separated" />
              </Select>
            </Box>

          <Text ml={5} mt={4}>
            Is the Patient Under 18 Years?
          </Text>
            <Box maxW="375" ml={2} mt={2}>
              <Select selectedValue={minor} onValueChange={itemValue => setMinor(itemValue)}minWidth="200" mx="3" size="2xl" borderColor={'#407CE2'} fontSize={17} accessibilityLabel="Choose" placeholder="Choose">
                <Select.Item label="Yes" value="yes" />
                <Select.Item label="No" value="married" />
              </Select>
            </Box>

          <Text ml={5} mt={4}>
            Parent/Guardian Name
          </Text>
          <Input value={guardianName} onChangeText={setGuardianName} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter your Parent/Guardian's Name" borderColor={'#407CE2'} >
          </Input>

          <Text ml={5} mt={4}>
          Employment Status of patient (or parent if patient is under 18)
          </Text>
            <Box maxW="375" ml={2} mt={2}>
              <Select selectedValue={patientEmploymentStatus} onValueChange={itemValue => setPatientEmploymentStatus(itemValue)}  minWidth="200" mx="3" size="2xl" borderColor={'#407CE2'} fontSize={17} accessibilityLabel="Choose Employment Status" placeholder="Choose Employment Status">
                <Select.Item label="Employee" value="employee" />
                <Select.Item label="Self-employed" value="self-employed" />
                <Select.Item label="Business" value="business" />
                <Select.Item label="Student" value="student" />
                <Select.Item label="Public Services" value="public services" />
              </Select>
            </Box>

          <Text ml={5} mt={4}>
            Phone Number
          </Text>
          <Input value={phoneNumber} onChangeText={setPhoneNumber} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter your Phone Number" borderColor={'#407CE2'} >
          </Input>
          <Text ml={5} mt={4}>
            Email
          </Text>
          <Input value={email} onChangeText={setEmail} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter your Email" borderColor={'#407CE2'} >
          </Input>
          <Text ml={5} mt={4}>
            Address
          </Text>
          <Input value={address} onChangeText={setAddress} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Street Address" borderColor={'#407CE2'} >
          </Input>
          <HStack>

          <Input value={city} onChangeText={setCity}  ml={5} mt={2} width={150} mx="3" size="2xl" style={{fontSize:17}}  placeholder="City" borderColor={'#407CE2'} >
          </Input>
          <Input value={state} onChangeText={setState} ml={2} mt={2}  width={150} mx="3" size="2xl" style={{fontSize:17}}  placeholder="State" borderColor={'#407CE2'} >
          </Input>

          </HStack>

          <Input value={postalCode} onChangeText={setPostalCode} ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Postal/ Zip Code" borderColor={'#407CE2'} >
          </Input>
          
          <Center><Pressable >
            <TouchableOpacity  style={styles.scanButtonBlue} >
              <Text onPress={() => handleSubmit()} style={styles.scanButtonTextBlue} >Next</Text>
            </TouchableOpacity>
          </Pressable></Center>

          {/* <Center><Pressable >
            <TouchableOpacity  style={styles.scanButtonBlue} >
              <Text onPress={() => navigation.navigate('EmergencyContact')} style={styles.scanButtonTextBlue} >Next</Text>
            </TouchableOpacity>
          </Pressable></Center> */}

          

        </VStack>
        <View style={{marginBottom:150}}></View>
          </View>
          </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    body:{
      backgroundColor:"#fff"
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
    buttonWrap:{
      alignItems:'center',
      marginTop:85
    },
    options:{
      marginTop:40,
      marginLeft:15
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

export default Biodata