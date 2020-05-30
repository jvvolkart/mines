import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Game from './src/screens/Game'
import Menu from './src/screens/Menu'
import Records from './src/screens/Records'

export default () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Records" component={Records} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
