import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { ScrollView, View } from "native-base";
import { NativeBaseProvider, Box, Center, VStack, Heading, Button, Text, HStack } from "native-base";
import { SafeAreaView } from "react-native";
import MedicalHistoryCard from "../Components/MedicalHistoryCard";
import axios from "axios";

const HealthRecordHistory = ({ navigation }) => {
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    // Fetch medical history data when the component mounts
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const response = await axios.get('http://192.168.222.100:3000/getMedicalReports');
      console.log(response.data);
      setMedicalHistory(response.data);
      
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <HStack alignItems='center' justifyContent='space-between'>
          <View ml={5}><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>
          <Pressable onPress={() => navigation.navigate('MedRepUpl')}>
            <View mr={5}><Image source={require('../assets/add.png')} style={{width:50, height:50}} /></View>
          </Pressable>
        </HStack>

        <Center><VStack alignItems="center" justifyContent="center" marginTop={5}>
          <Heading mb={5}>Medical History</Heading>

          <ScrollView>
            <VStack space={5} mb={150}>
              {medicalHistory.map((historyItem, index) => (
                <Pressable key={index} onPress={() => navigation.navigate('HealthRec', {historyItem})}>
                  <MedicalHistoryCard id={index} hos={historyItem.hospitalName} refby={historyItem.referedBy} />
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
          
        </VStack></Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff"
  },
});

export default HealthRecordHistory;
