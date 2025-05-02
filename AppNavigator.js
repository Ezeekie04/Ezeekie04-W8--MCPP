import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from './App';
import Forms from './screens/Forms';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={App} />
      <Stack.Screen name="Forms" component={Forms} />
    </Stack.Navigator>
  );
}
