import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import FavoritesEmptyState from './FavoritesEmptyState'
import colors from 'src/res/colors'

export default class FavoritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
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