import React from 'react'
import { View, StyleSheet } from 'react-native'

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.flagpoe} />
      <View style={styles.flag} />
      <View style={styles.base1} />
      <View style={styles.base2} />
      <View style={styles.linehorizontal} />
      <View style={styles.linevertical} />
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    marginTop: 2,
  },
  flagpoe: {
    position: 'absolute',
    height: 14,
    width: 2,
    backgroundColor: '#DCDCDC',
    marginLeft: 9,
  },
  flag: {
    position: 'absolute',
    height: 5,
    width: 6,
    backgroundColor: '#4049b7',
    marginLeft: 3,
  },
  base1: {
    position: 'absolute',
    height: 2,
    width: 6,
    backgroundColor: '#DCDCDC',
    marginLeft: 7,
    marginTop: 10,
  },
  base2: {
    position: 'absolute',
    height: 2,
    width: 10,
    backgroundColor: '#DCDCDC',
    marginLeft: 5,
    marginTop: 12,
  },
  linehorizontal: {
    position: 'absolute',
    height: 2,
    width: 22,
    backgroundColor: '#DCDCDC',
    transform: [{rotate: '45deg'}],
    marginTop: 7,
    marginRight: 7,
  },
  linevertical: {
    position: 'absolute',
    height: 2,
    width: 22,
    backgroundColor: '#DCDCDC',
    transform: [{rotate: '135deg'}],
    marginTop: 7,
    marginRight: 7,
  }
})