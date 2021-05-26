import FavoritesScreen from 'src/components/favorites/FavoritesScreen';
import React from 'react'
import colors from 'src/res/colors';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

export default function FavoritesStack() {
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
      <Stack.Screen name='Favorites' component={FavoritesScreen} />
    </Stack.Navigator>
  )
}
