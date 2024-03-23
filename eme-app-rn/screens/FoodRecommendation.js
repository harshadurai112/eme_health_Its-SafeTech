import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet } from 'react-native';
import OpenAI from 'openai';
// import * as Font from 'expo-font';

const openai = new OpenAI({
  apiKey: 'API Key Here',
});



const FoodRecommendation = ({navigation}) => {

  // React.useEffect(() => {
  //   async function loadFont() {
  //     await Font.loadAsync({
  //       'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
  //       'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  //       'Outfit-Regular': require('./assets/fonts/Outfit-Thin.ttf') // Adjust the path accordingly
  //     });
  //   }
  //   loadFont();
  // }, []);


  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: 'Suggest breakfast, lunch, and dinner for a South Indian style'+ userInput +'patient. Include nutrients and calories in the food order. In the format of json consisting of breakfast followed by array of dishes seperately and their calaories, carbs,proteins and fats' }],
        model: "gpt-3.5-turbo",
      });
      const jsonResponse = JSON.parse(completion.choices[0].message.content);
      console.log(jsonResponse);
      const breakfastDishes = jsonResponse.breakfast; 
      console.log(breakfastDishes);
      setResponse(jsonResponse);
    } catch (error) {
      console.error('Error fetching completion:', error);
      setResponse('Error fetching completion.');
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Food Recommender</Text>
      <TextInput style={styles.inputField}
        placeholder="Enter your health condition"
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
      />
      <Button style={styles.button} title="Send" onPress={handleSend} />
      <Text style={styles.welcomeNote}>Hello Vishal, Here are the food that are recommended for you based on your latest health records. You can follow this food habit to keep yur stay healthy</Text>
      {response.length > 0 ? (
    <View>
      <Text style={styles.headingSub}>Breakfast</Text>
      {response.map((dish, index) => (
        <Text key={index}>{dish.name} - Calories: {dish.calories}, Carbs: {dish.carbs}, Proteins: {dish.proteins}, Fats: {dish.fats}</Text>
      ))}
    </View>
  ) : (
    <Text>No breakfast dishes found.</Text>
  )}
    </View>
  )};
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding:30,
    flex:1
  },
  heading:{

    fontSize:30,
    textAlign:'center',
    padding:10
  },
  inputField:{
    borderWidth: 1,
    borderColor: '#407CE2',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 20,
  },
  welcomeNote:{

    fontSize:16,
    textAlign:'center',
    padding:20
  },
  headingSub:{
    fontSize:24,
    padding:10
  },
  button:{
    width: 40,
  }

  
});

export default FoodRecommendation;


