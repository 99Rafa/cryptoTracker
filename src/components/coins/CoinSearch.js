import React, { Component } from 'react'
import { TextInput, Platform, View, StyleSheet } from 'react-native'
import colors from 'src/res/colors'

export default class CoinSearch extends Component {

  state = {
    query: ""
  }

  handleText = query => {
    this.setState({ query })

    if (this.props.onChange) {
      this.props.onChange(query)
    }
  }

  render() {

    const { query } = this.state

    return (
      <View>
        <TextInput
          style={[
            style.textInput,
            Platform.OS === 'ios'
              ? style.textInputIOS
              : style.textInputAndroid
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search coin"
          placeholderTextColor="#fff"
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: colors.white
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
})
