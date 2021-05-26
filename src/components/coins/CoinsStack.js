import CoinDetailScreen from "src/components/coinDetail/CoinDetailScreen"
import CoinsScreen from "src/components/coins/CoinsScreen";
import React from "react";
import colors from "src/res/colors";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl
        },
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="Coins"
        component={CoinsScreen}
      />

      <Stack.Screen
        name="CoinDetail"
        component={CoinDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default CoinsStack