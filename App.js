import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/auth';
import LoginAuto from './src/auth/auto';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff6600',
          },
          headerTitleAlign: 'center',
        }}
        >
        <Stack.Screen
          name="LoginAuto"
          options={{headerShown: false}}
          component={LoginAuto}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}