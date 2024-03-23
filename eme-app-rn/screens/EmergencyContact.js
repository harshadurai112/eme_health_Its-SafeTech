import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { HStack, View, ScrollView } from "native-base";
import { NativeBaseProvider, Box, Center, VStack, Heading, Button, Text, Input, Select,CheckIcon  } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import SmallBluBtn from '../Components/SmallBluBtn';
// import Btn from './Components/Btn';



const EmergencyContact = () => {
  
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <View ml={5} mt={5} ><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>

          <Heading ml={3} mt={5}>Emergency Contact Details</Heading>
          <ScrollView>
          <View>

          <Heading ml={3} mt={5} color="blue.600">Person 1</Heading>

        <VStack>
          
          <VStack>
            <Text ml={5} mt={4}>
              Full Name
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl"  placeholder="Enter your Full Name" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Relationship to Patient
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter Relationship" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Phone Number
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter Phone Number" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Email
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter Email" borderColor={'#407CE2'} >
            </Input>

          </VStack>

          <Text ml={5} mt={4}>
            Address
          </Text>
          <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Street Address" borderColor={'#407CE2'} >
          </Input>
          <HStack>

          <Input ml={5} mt={2} width={150} mx="3" size="2xl" style={{fontSize:17}}  placeholder="City" borderColor={'#407CE2'} >
          </Input>
          <Input ml={2} mt={2}  width={150} mx="3" size="2xl" style={{fontSize:17}}  placeholder="State" borderColor={'#407CE2'} >
          </Input>

          </HStack>

          <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Postal/ Zip Code" borderColor={'#407CE2'} >
          </Input>

        </VStack>
        <Heading ml={3} mt={5} color="blue.600">Person 2</Heading>

        <VStack>
          
          <VStack>
            <Text ml={5} mt={4}>
              Full Name
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl"  placeholder="Enter your Full Name" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Relationship to Patient
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter Relationship" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Phone Number
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter Phone Number" borderColor={'#407CE2'} >
            </Input>

            <Text ml={5} mt={4}>
              Email
            </Text>
            <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Enter Email" borderColor={'#407CE2'} >
            </Input>

          </VStack>

          <Text ml={5} mt={4}>
            Address
          </Text>
          <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Street Address" borderColor={'#407CE2'} >
          </Input>
          <HStack>

          <Input ml={5} mt={2} width={150} mx="3" size="2xl" style={{fontSize:17}}  placeholder="City" borderColor={'#407CE2'} >
          </Input>
          <Input ml={2} mt={2}  width={150} mx="3" size="2xl" style={{fontSize:17}}  placeholder="State" borderColor={'#407CE2'} >
          </Input>

          </HStack>

          <Input ml={5} mr={5} mt={2} style={{fontSize:17}} mx="3" size="2xl" placeholder="Postal/ Zip Code" borderColor={'#407CE2'} >
          </Input>

          
          
          <Center><Pressable>
            <TouchableOpacity style={styles.scanButtonBlue}>
              <Text style={styles.scanButtonTextBlue}>Submit</Text>
            </TouchableOpacity>
          </Pressable></Center>

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

export default EmergencyContact