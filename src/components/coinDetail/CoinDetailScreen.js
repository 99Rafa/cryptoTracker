import { ActivityIndicator, FlatList, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import CoinMarketItem from './CoinMarketItem'
import Http from 'src/libs/http'
import Storage from 'src/libs/storage'
import colors from 'src/res/colors'

export default class CoinDetailScreen extends Component {

  state = {
    loadingMarkets: false,
    coin: {},
    markets: [],
    isFavorite: false,
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

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite()
    } else {
      this.addFavorite()
    }
  }

  addFavorite = () => {
    const coin = JSON.stringify(this.state.coin)
    const key = `favorite-${this.state.coin.id}`

    const stored = Storage.store(key, coin)

    if (stored) {
      this.setState({ isFavorite: true })
    }
  }

  removeFavorite = () => {

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

    const { coin, markets, loadingMarkets, isFavorite } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image style={styles.coinIcon} source={{ uri: this.getSymbolIcon(coin.name) }} />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <TouchableOpacity
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add to favorites'}
            </Text>
          </TouchableOpacity>

        </View>


        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderSectionHeader={({ section }) =>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          }
          renderItem={({ item }) =>
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          }
        />
        <Text style={styles.marketTitle}>Markets</Text>
        {
          loadingMarkets
            ? <ActivityIndicator
              style={styles.loader}
              color={colors.white}
              size='large' />
            : null
        }
        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade
  },
  subHeader: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
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
    color: colors.white,
    fontSize: 14
  },
  sectionText: {
    color: colors.white,
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
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    paddingLeft: 16
  },
  loader: {
    marginTop: 60,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteText: {
    color: colors.white
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine
  }
})
