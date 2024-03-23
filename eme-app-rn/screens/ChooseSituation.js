import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { View } from "native-base";
import { NativeBaseProvider, Box, Center, VStack, Heading, Button, Text } from "native-base";
import { SafeAreaView } from "react-native";
import RedBtn from '../Components/RedBtn';
import Btn from '../Components/Btn';

const ChooseSituation = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.body}>
        <View ml={5} mt={5}><Image source={require('../assets/logo.png')} style={{width:60, height:60}} /></View>

        <Center><VStack alignItems="center" justifyContent="center" marginTop={20}>
          <Heading>Choose the Situation</Heading>

          <Pressable onPress={() => navigation.navigate('Face')}>
            <View style={styles.button1}>
              <RedBtn content={"Emergency"} />
            </View>
          </Pressable>

          <View style={{flexDirection: 'row', alignItems: 'center'}} mt={12}>
            <View style={{flex: 1, height: 1, backgroundColor: '#C2C2C2'}} />
            <View>
              <Text style={{width: 50, textAlign: 'center'}} color={"#C2C2C2"}>OR</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#C2C2C2'}} />
          </View>

          <Pressable onPress={() => navigation.navigate('HealthRecHis')}>
            <View style={styles.button2}>
              <Btn content={"Health Records"} />
            </View>
          </Pressable>

          <Pressable  onPress={() => navigation.navigate('FoodRecommendation')}>
            <View style={styles.button2}>
              <Btn content={"Food Recommendations"} />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Biodata')}>
            <View style={styles.button2}>
              <Btn content={"Add User Details"} />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('ChooseSituation')}>
            <View style={styles.button2}>
              <Btn content={"Medications"} />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('ChooseSituation')}>
            <View style={styles.button2}>
              <Btn content={"Accident Detection"} />
            </View>
          </Pressable>
        </VStack></Center>
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
    }
  });

export default ChooseSituation