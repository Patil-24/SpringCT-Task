import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [employees, setEmployees] = useState([]);

  // useEffect hook to load employees data when Home screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadEmployee = async () => {
        try {
          const employeesData = await AsyncStorage.getItem("employees");
          if (employeesData !== null) {
            setEmployees(JSON.parse(employeesData));
          }
        } catch (error) {
          console.log("Error in fetching home Data ", error);
        }
      };
      loadEmployee();
    }, [])
  );

  // Function to navigate to AddEmployee screen
  const handleAddEmployee = () => {
    navigation.navigate("AddEmployee");
  };

  // Function to clear all employee data
  const handleClearList = async () => {
    Alert.alert(
      "Clear Employee List",
      "Are you sure you want to clear all employee data?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("employees");
              setEmployees([]);
            } catch (error) {
              console.log("Error clearing employees list: ", error);
            }
          },
        },
        {
          text: "No",
          style: "No",
        },
      ]
    );
  };

  // Render function for each item in employee list
  const renderEmployeeList = ({ item }) => (
    <TouchableOpacity style={styles.employeeItem}>
      <Text>Name : {item.name}</Text>
      <Text>Age : {item.age}</Text>
      <Text>Address : {item.address}</Text>
      <Text>City : {item.city}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You Logged In Successfully. Welcome to Home Screen
      </Text>
      {/* Buttons to add employee and clear list */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { marginRight: 10 }]}
          onPress={handleAddEmployee}
        >
          <Text style={styles.buttonText}>Add Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClearList}>
          <Text style={styles.buttonText}>Clear List</Text>
        </TouchableOpacity>
      </View>
      {/* Header for employee list */}
      <View style={styles.subTextView}>
        <Text style={styles.subText}>Employee List</Text>
      </View>
      {/* FlatList to display employees */}
      <FlatList
        data={employees}
        renderItem={renderEmployeeList}
        keyExtractor={(item, index) => index.toString()}
        style={styles.employeeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    width: "40%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  subTextView: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeList: {
    flex: 1,
  },
  employeeItem: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
