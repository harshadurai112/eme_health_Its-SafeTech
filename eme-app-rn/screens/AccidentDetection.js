import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { ScrollView } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';

export default function AccidentDetection() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [accident, setAccident] = useState("Not accident");
  const [gg, setGg] = useState("Null");
  const [subscription, setSubscription] = useState(null);
  const sound = useRef(new Audio.Sound());

  const round = (n) => {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  };

  const playSound = async () => {
    try {
      console.log("Loading Sound");
      await sound.current.loadAsync(require("../assets/buzz.mp3"));
      console.log("Playing sound");
      await sound.current.playAsync();
    } catch (error) {
      console.error("Error in playing sound:", error);
    }
  };

  const isAccident = (x, y, z) => {
    let f = x * x + y * y + z * z;
    let force = Math.sqrt(f);
    let g = force / 9.81;
    setGg(g);
    if (g > 1) {
      setAccident("Light accident");
      // playSound();
    }
    if (g > 2) {
      setAccident("Accident");
    }
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    isAccident(data.x, data.y, data.z);
    console.log(accident);
  }, [data.x, data.y, data.z]);

  const { x, y, z } = data;

  return (
    
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image style={styles.accidentImage} source={require('../assets/accident.jpg')} />
        </View>

        <Text style={styles.accidentText}>{accident}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', backgroundColor: 'red' }}>
              {subscription ? 'Cancel' : 'On'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 130 }}>
          <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
          <Text style={styles.text}>
            x: {round(x)} y: {round(y)} z: {round(z)}
          </Text>
          <Text style={styles.text}>{gg}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    width: 200,
    padding: 11,
    marginTop: 50,
    marginBottom: 50
  },
  accidentImage: {
    width: 380,
    height: 270,
    marginTop: 130
  },
  accidentText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20
  }
});
