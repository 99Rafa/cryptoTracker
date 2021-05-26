import CoinsStack from "src/components/coins/CoinsStack";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native"
import React from "react";
import { StatusBar } from "expo-status-bar";
import colors from "src/res/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          activeTintColor: colors.zircon,
          activeBackgroundColor: colors.blackPearl
        }}
      >
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('src/assets/bank.png')}
              />
            )
          }}
        />
      </Tabs.Navigator>

      <StatusBar />
    </NavigationContainer>
  );
}
