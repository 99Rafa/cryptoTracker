import { FlatList, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

import CoinsItem from '../coins/CoinsItem'
import FavoritesEmptyState from './FavoritesEmptyState'
import Storage from 'src/libs/storage'
import colors from 'src/res/colors'

export default class FavoritesScreen extends Component {

  state = {
    favorites: []
  }

  getFavorites = async () => {
    try {
      const allKeys = await Storage.getAllKeys()

      const keys = allKeys.filter(key => key.includes('favorite-'))

      const favs = await Storage.multiGet(keys)

      const favorites = favs.map(fav => JSON.parse(fav[1]))

      this.setState({ favorites })
    } catch (error) {
      console.log('get favorites error', error)
    }
  }

  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', { coin })
  }

  componentDidMount() {
    this.getFavorites()

    this.props.navigation.addListener('focus', this.getFavorites)
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites)
  }

  render() {

    const { favorites } = this.state

    return (
      <View style={styles.container}>
        {
          !favorites
            ? <FavoritesEmptyState />
            : null
        }
        {
          favorites
            ? <FlatList
              data={favorites}
              renderItem={({ item }) => <CoinsItem item={item} onPress={() => this.handlePress(item)} />}
            />
            : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,

  }
})