import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Deck from './src/Deck';

console.disableYellowBox = true;

console.log('START');

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 2, text: 'Card #2', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 3, text: 'Card #3', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 4, text: 'Card #4', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 5, text: 'Card #5', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 6, text: 'Card #6', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 7, text: 'Card #7', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 8, text: 'Card #8', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' },
  { id: 9, text: 'Card #9', uri: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547' }
];

export default class App extends Component {

  renderCard(item) {
    console.log('TEXT', item.text);
    return (
        <Text key={item.text} >
          {item.text}
        </Text>
    );
  };

  render() {
    return (
        <View style={styles.container}>
          <Deck
            data={DATA}
            renderCard={this.renderCard}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
