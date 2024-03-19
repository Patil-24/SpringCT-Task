import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing screens
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import AddEmployee from "./src/screens/AddEmployee";

// Creating a stack navigator
const Stack = createNativeStackNavigator();

// Main App component
export default function App() {
  return (
    // Navigation container to hold the stack navigator
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash screen */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }} // Hide header for Splash screen
        />
        {/* Login screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Hide header for Login screen
        />
        {/* Home screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // Hide header for Home screen
        />
        {/* AddEmployee screen */}
        <Stack.Screen
          name="AddEmployee"
          component={AddEmployee}
          options={{ headerShown: false }} // Hide header for AddEmployee screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
