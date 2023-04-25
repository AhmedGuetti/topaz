import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Header from '../componenet/Header'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Major from './Majors';
import Note from './Note';
import Result from './Result';

const Stack = createNativeStackNavigator();

function Calculate() {
  const [math, setMath] = React.useState("");
  const [physic, setPhysic] = React.useState("");
  return (  

    <>
    <Header title="Calulate"/>
     
    </>
  );
}

export default Calculate;