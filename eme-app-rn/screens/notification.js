import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { NativeBaseProvider, Box, Select } from 'native-base';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const diseaseNotificationLists = {
  Diabetes: [
    { title: "Disease 1 Title 1", body: "Disease 1 Notification 1" },
    { title: "Disease 1 Title 2", body: "Disease 1 Notification 2" },
    { title: "Disease 1 Title 3", body: "Disease 1 Notification 3" },
    { title: "Disease 1 Title 2", body: "Disease 1 Notification 2" },
    { title: "Disease 1 Title 3", body: "Disease 1 Notification 3" },
  ],
  Alzheimer: [
    { title: "Disease 2 Title 1", body: "Disease 2 Notification 1" },
    { title: "Disease 2 Title 2", body: "Disease 2 Notification 2" },
    { title: "Disease 2 Title 3", body: "Disease 2 Notification 3" },
  ],
  HeartStroke: [
    { title: "Disease 2 Title 1", body: "Disease 2 Notification 1" },
    { title: "Disease 2 Title 2", body: "Disease 2 Notification 2" },
    { title: "Disease 2 Title 3", body: "Disease 2 Notification 3" },
  ],
  Depression: [
    { title: "Disease 2 Title 1", body: "Disease 2 Notification 1" },
    { title: "Disease 2 Title 2", body: "Disease 2 Notification 2" },
    { title: "Disease 2 Title 3", body: "Disease 2 Notification 3" },
  ],
  StomachFlu: [
    { title: "Disease 2 Title 1", body: "Disease 2 Notification 1" },
    { title: "Disease 2 Title 2", body: "Disease 2 Notification 2" },
    { title: "Disease 2 Title 3", body: "Disease 2 Notification 3" },
  ],
  Obesity: [
    { title: "Disease 2 Title 1", body: "Disease 2 Notification 1" },
    { title: "Disease 2 Title 2", body: "Disease 2 Notification 2" },
    { title: "Disease 2 Title 3", body: "Disease 2 Notification 3" },
  ],
};

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [disease, setDisease] = useState('disease1'); // Default to disease1

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      sendScheduledNotification(disease); // Pass disease variable
    }, 10000); // Send notification every 10 seconds

    return () => clearInterval(interval);
  }, [notificationIndex, disease]);

  const sendScheduledNotification = async (disease) => { // Accept disease variable
    const notificationContentList = diseaseNotificationLists[disease]; // Select list based on disease
    if (notificationIndex < notificationContentList.length) {
      await schedulePushNotification(notificationContentList[notificationIndex]);
      setNotificationIndex(prevIndex => prevIndex + 1);
    } else {
      setNotificationIndex(0); // Reset index to repeat the list
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View fontSize={1}>
            <Text fontweight={1000} fontSize={25}>
              Hold Up!
            </Text>
          </View>
          <Box maxW="375" ml={2} mt={2}>
            <Select
              minWidth="200"
              mx="3"
              size="2xl"
              fontSize={17}
              borderColor={'#407CE2'}
              accessibilityLabel="Choose Disease"
              placeholder="Choose Disease"
              selectedValue={disease}
              onValueChange={(itemValue) => {
                setDisease(itemValue);
                setNotificationIndex(0); // Reset index when changing disease
              }}>
              <Select.Item label="Diabetes" value="Diabetes" />
              <Select.Item label="Alzheimer" value="Alzheimer" />
              <Select.Item label="HeartStroke" value="HeartStroke" />
              <Select.Item label="Depression" value="Depression" />
              <Select.Item label="StomachFlu" value="StomachFlu" />
              <Select.Item label="Obesity" value="Obesity" />
            </Select>
          </Box>
          <Button
            title="Set Up Notifications"
            onPress={async () => {
              await sendScheduledNotification(disease); // Pass disease variable
            }}
          />
          <Button
            title="Skip"
            mr={5}
          />
        </View>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

async function schedulePushNotification(notificationContent) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationContent.title,
      body: notificationContent.body,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    if (Platform.OS === 'ios') {

      token = (await Notifications.getExpoPushTokenAsync({ ios: { bundleIdentifier: 'your-ios-bundle-identifier' } })).data;
    } else {
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    }
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }


  return token;
}