import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "mobx-react";

import stores from "./store/Stores";
import HomeScreen from './pages/Home'
import DetailScreen from "./pages/Detail";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider {...stores}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="campaign" component={DetailScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
