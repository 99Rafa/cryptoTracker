import { ActivityIndicator, FlatList, Image, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import CoinMarketItem from './CoinMarketItem'
import Http from 'src/libs/http'
import colors from 'src/res/colors'

export default class CoinDetailScreen extends Component {

  state = {
    loadingMarkets: false,
    coin: {},
    markets: [],
  }

  getSymbolIcon = name => {
    if (name) {
      const img = name.toLowerCase().replace(" ", "-")
      return `https://c1.coinlore.com/img/25x25/${img}.png`
    }
  }

  getSections = (coin) => {
    const sections = [
      {
        title: "Price USD",
        data: [`$${coin.price_usd}`]
      },
      {
        title: "Market cap",
        data: [coin.market_cap_usd]
      },
      {
        title: "Volume 24h",
        data: [coin.volume24]
      },
      {
        title: "Change 24h",
        data: [coin.percent_change_24h]
      }
    ]

    return sections
  }

  getMarkets = async id => {
    this.setState({ loadingMarkets: true })
    const url = `https://api.coinlore.net/api/coin/markets/?id=${id}`
    const markets = await Http.instance.get(url)
    this.setState({ markets, loadingMarkets: false })
  }

  componentDidMount() {
    const { coin } = this.props.route.params
    this.props.navigation.setOptions({ title: coin.symbol })
    this.getMarkets(coin.id)
    this.setState({ coin })
  }

  render() {

    const { coin, markets, loadingMarkets } = this.state

    return (
      <View style={style.container}>
        <View style={style.subHeader}>
          <Image style={style.coinIcon} source={{ uri: this.getSymbolIcon(coin.name) }} />
          <Text style={style.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          style={style.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderSectionHeader={({ section }) =>
            <View style={style.sectionHeader}>
              <Text style={style.sectionText}>{section.title}</Text>
            </View>
          }
          renderItem={({ item }) =>
            <View style={style.sectionItem}>
              <Text style={style.itemText}>{item}</Text>
            </View>
          }
        />
        <Text style={style.marketTitle}>Markets</Text>
        {
          loadingMarkets
            ? <ActivityIndicator
              style={style.loader}
              color="#fff"
              size='large' />
            : null
        }
        <FlatList
          style={style.list}
          horizontal={true}
          data={markets}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade
  },
  subHeader: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8
  },
  coinIcon: {
    width: 25,
    height: 25
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0, 0.2)",
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: "#fff",
    fontSize: 14
  },
  sectionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  section: {
    maxHeight: 300
  },
  list: {
    maxHeight: 100,
    paddingLeft: 10,
  },
  marketTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
    paddingLeft: 16
  },
  loader: {
    marginTop: 60,
  }
})
