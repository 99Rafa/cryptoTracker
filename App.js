import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import CoinsStack from "src/components/coins/CoinsStack";

export default function App() {
  return (
    <NavigationContainer>
      <CoinsStack />
    </NavigationContainer>
  );
}
