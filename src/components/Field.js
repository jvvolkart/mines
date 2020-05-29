import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'
import FlagNotMined from './FlagNotMined';

export default props => {
  const { mined, opened, nearMines, exploded, flagged, flaggednotmined } = props

  const styleField = [styles.field]
  if (opened) styleField.push(styles.opened) 
  if (exploded) styleField.push(styles.exploded)
  if (flagged) styleField.push(styles.flagged)
  if (!opened && !exploded) styleField.push(styles.regular)

  let color = null
  if (nearMines > 0) {
    if (nearMines == 1) color = '#303fa9'
    if (nearMines == 2) color = '#50a74b'
    if (nearMines > 2 && nearMines < 6) color = '#d6314f'
    if (nearMines >= 6) color = '#F221A9'
  }

  return (
    <TouchableWithoutFeedback onPress={props.onOpen}
    onLongPress={props.onSelect}>
      <View style={styleField}>
        {!mined && opened && nearMines > 0 ?
          <Text style={[styles.label, {color: color }]}>
            {nearMines}</Text> : false}
        {mined && opened ? <Mine /> : false}
        {flagged && !opened && !flaggednotmined ? <Flag /> : false}
        {flagged && !mined && flaggednotmined ? <FlagNotMined /> : false}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#222',
    borderLeftColor: '#333',
    borderTopColor: '#333',
    borderRightColor: '#111',
    borderBottomColor: '#111',
  },
  opened: {
    backgroundColor: '#343434',
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: '#CF6679',
    borderColor: '#CF6679',
  },
})