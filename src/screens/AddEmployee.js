import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddEmployee({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  // Function to handle adding a new employee
  const handleAddEmployee = async () => {
    if (!name.trim() || !age.trim() || !address.trim() || !city.trim()) {
      setError("Please fill all the fields");
      return;
    }

    if (isNaN(parseInt(age))) {
      setError("Please enter a valid age");
      return;
    }

    try {
      const employee = { name, age, address, city };
      await saveEmployee(employee);
      // Navigate back to Home screen after adding employee
      navigation.navigate("Home", { employee });
    } catch (error) {
      console.log("Error in saving data ", error);
    }
  };

  // Function to save the employee data to AsyncStorage
  const saveEmployee = async (employee) => {
    try {
      let employees = await AsyncStorage.getItem("employees");
      if (employees === null) {
        employees = [];
      } else {
        employees = JSON.parse(employees);
      }
      employees.push(employee);
      await AsyncStorage.setItem("employees", JSON.stringify(employees));
    } catch (error) {
      console.log("Error in save function ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Employee</Text>
      <Text style={styles.error}>{error}</Text>

      {/* Input fields for employee details */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      {/* Button to add employee */}
      <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
