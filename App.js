import CoinsStack from "src/components/coins/CoinsStack";
import FavoritesStack from "src/components/favorites/FavoritesStack";
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
          style: {
            backgroundColor: colors.blackPearl
          }
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
        <Tabs.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('src/assets/star.png')}
              />
            )
          }}
        />
      </Tabs.Navigator>

      <StatusBar />
    </NavigationContainer>
  );
}
