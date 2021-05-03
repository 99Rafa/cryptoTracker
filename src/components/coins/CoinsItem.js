import React from 'react'
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'
import colors from '../../res/colors'

const CoinsItem = ({ item, onPress }) => {

  const colorPercent = item => {
    return item.percent_change_1h > 0 ? style.positivePercent : style.negativePercent
  }

  return (
    <Pressable 
      onPress={onPress}
      style={style.container}
    >
      <View style={style.row}>
        <Text style={style.symbolText}>{item.symbol}</Text>
        <Text style={style.nameText}>{item.name}</Text>
        <Text style={style.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={style.row}>
        <Text style={[style.nameText, colorPercent(item)]}>
          {item.percent_change_1h}
        </Text>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === "ios" ? 0 : 16,
    marginLeft: Platform.OS === "ios" ? 16 : 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  symbolText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 16
  },
  priceText: {
    color: "#fff",
    fontSize: 12
  },
  percentText: {
    color: "#fff",
    fontSize: 12
  },
  positivePercent: {
    color: "green"
  },
  negativePercent: {
    color: "red"
  }
})

export default CoinsItem