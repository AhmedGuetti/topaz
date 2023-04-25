import { Text, View } from 'react-native';
import Header from '../componenet/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';
import { Headline } from 'react-native-paper';


function Result({navigation, route}) {
  const [res, setRes]  = useState({});
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('resulta');
      console.log(value);
      if (value !== null) {
        setRes(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
      navigation.navigte('Majors');
    }
  };
  _retrieveData();
  return (
    <>
    <Header title="Result"/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Headline>Result</Headline>
        <Text>You have a chance of  {res.smi} to enter smi</Text>
        <Text>You have a chance of  {res.sma} to enter sma</Text>
        <Text>You have a chance of  {res.smpc} to enter smpc</Text>
    </View>
    </>

  )
}

export default Result;