import React, { useEffect, useState } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const sendSOS = async () => {
    try {
      const res = await axios.post('http://<YOUR_LOCAL_IP>:5000/api/alert', {
        latitude: location.latitude,
        longitude: location.longitude,
        userId: 'demo-user-123', // later replace with login
      });
      Alert.alert('SOS Sent!', JSON.stringify(res.data));
    } catch (error) {
      Alert.alert('Error sending SOS', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Emergency SOS App</Text>
      <Button title="🚨 Send SOS" onPress={sendSOS} />
    </View>
  );
}
