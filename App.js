// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MeetupProvider } from './Screens/MeetupContext';
import AllMeetupsScreen from './Screens/AllMeetupsScreen';
import MeetupDetailsScreen from './Screens/MeetupDetailsScreen';
import NewMeetupScreen from './Screens/NewMeetupScreen';
import AboutScreen from './Screens/AboutScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MeetupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllMeetups" component={AllMeetupsScreen} />
      <Stack.Screen name="MeetupDetails" component={MeetupDetailsScreen} />
      <Stack.Screen name="NewMeetup" component={NewMeetupScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Meetups" component={MeetupStack} options={{ headerShown: false }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MeetupProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MeetupProvider>
    </GestureHandlerRootView>
  );
}

export default App;