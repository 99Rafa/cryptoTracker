import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from 'src/res/colors'

export default CoinMarketItems = ({ item }) => {
  return  (
    <View style={style.container}>
      <Text style={style.nameText}>{item.name}</Text>
      <Text style={style.priceText}>{item.price_usd}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container : {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
    borderRadius: 10
  },
  nameText: {
    color: "#fff",
    fontWeight: "bold",
  },
  priceText: {
    color: "#fff"
  }
})