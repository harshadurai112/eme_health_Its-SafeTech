import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { ScrollView, View } from "native-base";
import { NativeBaseProvider, Box, Center, VStack, Heading, Button, Text, HStack } from "native-base";
import { SafeAreaView } from "react-native";


const HealthRecord = ({navigation: { goBack }, route, navigation}) => {
  console.log(route.params.historyItem);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <HStack alignItems='center' justifyContent='space-between'>
          <View ml={5}><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>
        </HStack>

        <Center><VStack alignItems="center" justifyContent="center" marginTop={5}>
          <Heading mb={5}>Medical Record</Heading>

        <ScrollView>
            <View style={styles.medicalCardDiv}>
                <View>
                    <HStack alignItems='center' justifyContent='space-between' height={60} background={"#407ce2"} borderTopRadius={9}>
                        <Text ml={3} style={{fontSize:20, fontWeight:600}} color={"#fff"} >MedicalHistoryCard</Text>
                        {/* <Text mr={3}>17-Feb-2024</Text> */}
                    </HStack>
                </View>
                {/* <View style={{flex: 1, height: 1, width:1, backgroundColor: '#000'}} /> */}
                <View>
                    <Text ml={3} fontWeight={600} fontSize={17} color={"#407CE2"} mt={2} >Test ID: {route.params.historyItem._id}</Text>
                    <HStack ml={3} alignItems='center'><Text fontWeight={500} fontSize={17} mt={2}>Hosp/Lab:</Text><Text mt={2} fontSize={16}>{route.params.historyItem.hospitalName}</Text></HStack>
                    <HStack ml={3} alignItems='center'><Text fontWeight={500} fontSize={17} mt={2}>Ref. By:</Text><Text mt={2} fontSize={16}>{route.params.historyItem.referedBy}</Text></HStack>
                    <HStack ml={3}><Text fontWeight={500} fontSize={17} mt={2}>Test Purpose:</Text><Text mt={2} fontSize={16} width={220}>{route.params.historyItem.diagnosisPurpose}</Text></HStack>
                    <HStack ml={3} alignItems='center'><Text fontWeight={500} fontSize={17} mt={2}>Verified By:</Text><Text mt={2} fontSize={16}>{route.params.historyItem.verifiedBy}</Text></HStack>
                </View>
            </View>

            <View>
              <Heading mt={5}>Record Documents</Heading>
              <VStack>
              <Center><Image 
              
                style={{width:350, height:500, backgroundColor:"#c4c4c4", marginTop:20, borderRadius:10, marginBottom:150 }}
                alt="Patient image"
                source={{uri: route.params.historyItem.hash}} />  
              </Center></VStack>
            </View>
        </ScrollView>

        </VStack></Center>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:"#fff"
  },
  medicalCardDiv:{
      width:360,
      height:300,
      borderWidth:1,
      borderColor:"#407ce2",
      borderRadius:10
  }
});

export default HealthRecord