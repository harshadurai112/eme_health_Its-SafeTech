import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet,Image, ScrollView } from 'react-native';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'Your API Key', // Replace with your API key
});

const ChatGPTComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state


  const handleSend = async () => {
    setIsLoading(true); 
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: 'Suggest breakfast, lunch, and dinner for a South Indian style ' + userInput + ' patient. Include nutrients and calories in the food order. In the format of json consisting of breakfast followed by array of dishes seperately and their calaories, carbs,proteins and fats' }],
        model: "gpt-3.5-turbo",
      });
      const jsonResponse = JSON.parse(completion.choices[0].message.content);
      console.log(jsonResponse);
      setResponse(jsonResponse);
    } catch (error) {
      console.error('Error fetching completion:', error);
      setResponse('Error fetching completion.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderBreakfastDishes = () => {
    if (!response.breakfast) {
      return <Text>No breakfast data available.</Text>; 
    }

    const breakfastDishesFields = response.breakfast.map((dish) => (

      <View style={styles.card} key={dish.key}>
        <View style={styles.imgView}>
        <Image source={require('../eme-app-rn/assets/raw.png')} style={styles.image} />
        </View>
       
        <View style={styles.dishName}>
          <Text style={styles.title}>{dish.dish}</Text>
        </View>
        <View style={styles.dishProperty}>
          <View style={styles.dishProps}>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.calories}</Text>
              <Text style={styles.propText}>kcal</Text>
            </View>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.carbs} g</Text>
              <Text style={styles.propText}>Carb</Text>
            </View>
          </View>
          <View style={styles.dishProps}>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.proteins} g</Text>
              <Text style={styles.propText}>Prot</Text>
            </View>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.fats} g</Text>
              <Text style={styles.propText}>Fat</Text>
            </View>
          </View>
        </View>

      </View>

    ));

    return breakfastDishesFields;
  };

  const renderLunchDishes = () => {
    if (!response.lunch) {
      return <Text>No lunch data available.</Text>; // Handle missing data
    }

    const lunchDishesFields = response.lunch.map((dish) => (

      <View style={styles.card} key={dish.key}>
        <View style={styles.imgView}>
        <Image source={require('../eme-app-rn/assets/raw.png')} style={styles.image} />
        </View>
       
        <View style={styles.dishName}>
          <Text style={styles.title}>{dish.dish}</Text>
        </View>
        <View style={styles.dishProperty}>
          <View style={styles.dishProps}>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.calories}</Text>
              <Text style={styles.propText}>kcal</Text>
            </View>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.carbs} g</Text>
              <Text style={styles.propText}>Carb</Text>
            </View>
          </View>
          <View style={styles.dishProps}>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.proteins} g</Text>
              <Text style={styles.propText}>Prot</Text>
            </View>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.fats} g</Text>
              <Text style={styles.propText}>Fat</Text>
            </View>
          </View>
        </View>

      </View>

    ));

    return lunchDishesFields;
  };

  const renderDinnerDishes = () => {
    if (!response.dinner) {
      return <Text>No dinner data available.</Text>; // Handle missing data
    }

    const dinnerDishesFields = response.dinner.map((dish) => (

      <View style={styles.card} key={dish.key}>
        <View style={styles.imgView}>
        <Image source={require('../eme-app-rn/assets/raw.png')} style={styles.image} />
        </View>
       
        <View style={styles.dishName}>
          <Text style={styles.title}>{dish.dish}</Text>
        </View>
        <View style={styles.dishProperty}>
          <View style={styles.dishProps}>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.calories}</Text>
              <Text style={styles.propText}>kcal</Text>
            </View>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.carbs} g</Text>
              <Text style={styles.propText}>Carb</Text>
            </View>
          </View>
          <View style={styles.dishProps}>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.proteins} g</Text>
              <Text style={styles.propText}>Prot</Text>
            </View>
            <View style={styles.dishProp}>
              <Text style={styles.propText}>{dish.fats} g</Text>
              <Text style={styles.propText}>Fat</Text>
            </View>
          </View>
        </View>

      </View>

    ));

    return dinnerDishesFields;
  };

  // Similar logic can be implemented for lunch and dinner sections

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Food Recommender</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter your health condition"
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
      />
      <Button style={styles.button} title="Send" onPress={handleSend} />
      <Text style={styles.welcomeNote}>
        Hello Vishal, Here are the food that are recommended for you based on your latest health records. You can follow this food habit to keep yur stay healthy
      </Text>
      <Text style={styles.headingSub}>Breakfast</Text>
      {renderBreakfastDishes()}
      <Text style={styles.headingSub}>Lunch</Text>
      {renderLunchDishes()}
      <Text style={styles.headingSub}>Dinner</Text>
      {renderDinnerDishes()}



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    flex: 1,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  inputField: {
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
    paddingVertical:10
  },
  button:{
    width: 40,
  },
  card:{
    marginVertical:20,
    backgroundColor:'rgba(64, 124, 226, 0.05)',
    flexDirection: 'row',
    borderRadius:10,
  },
  dishName:{
    width:100,
    textAlign:'left'
  },
  dishProperty:{
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dishProps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishProp: {
    width: 30,
    height: 30,
    margin:5,
    backgroundColor: '#407CE2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
  },
  dishName:{
    padding:10,
    justifyContent:'center',
    textAlign:'left'
  },
  imgView:{
    flex:1
  },
  image:{
    justifyContent:'center',
    marginVertical:5
  },
  propText:{
    color:'#ffffff',
  }

  
});

export default ChatGPTComponent;


