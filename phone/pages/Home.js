import React from 'react';
import { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';
import { PreferencesContext } from '../context/PreferencesContext';
import { View } from 'react-native';
import Header from '../componenet/Header'

function Home() {
  
  return (
    <View>
    <Header title="Home"/>
    </View>
  )
}
export default Home