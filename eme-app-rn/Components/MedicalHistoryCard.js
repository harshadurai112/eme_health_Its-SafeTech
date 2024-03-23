import { View } from 'react-native'
import React from 'react'
import { Button, Center, HStack, NativeBaseProvider, Text } from 'native-base'
import { SafeAreaView, StyleSheet, Pressable } from 'react-native'
import Btn from '../Components/Btn'

const MedicalHistoryCard = ({id, hos, refby}) => {
  return (
    <NativeBaseProvider>
        <SafeAreaView>
            <View style={styles.medicalCardDiv}>
                <View>
                    <HStack alignItems='center' justifyContent='space-between' height={60} background={"#407ce2"} borderTopRadius={9}>
                        <Text ml={3} style={{fontSize:20, fontWeight:600}} color={"#fff"} >MedicalHistoryCard</Text>
                        <Text mr={3}>17-Feb-2024</Text>
                    </HStack>
                </View>
                {/* <View style={{flex: 1, height: 1, width:1, backgroundColor: '#000'}} /> */}
                <View>
                    <Text ml={3} fontWeight={600} fontSize={17} color={"#407CE2"} mt={2} >Test ID: {id}</Text>
                    <HStack ml={3} alignItems='center'><Text fontWeight={500} fontSize={17} mt={2}>Hosp/Lab:</Text><Text mt={2} fontSize={16}>{hos}</Text></HStack>
                    <HStack ml={3} alignItems='center'><Text fontWeight={500} fontSize={17} mt={2}>Ref. By:</Text><Text mt={2} fontSize={16}>{refby}</Text></HStack>

                        <Center><Button mt={5} mb={5} width={200} backgroundColor={"#407ce2"}><Text color={"#fff"} fontSize={18} fontWeight={600}>Get Details</Text></Button></Center>
                
                </View>
            </View>
        </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    medicalCardDiv:{
        width:360,
        height:250,
        borderWidth:1,
        borderColor:"#407ce2",
        borderRadius:10
    }
});

export default MedicalHistoryCard