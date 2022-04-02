//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
//import Recherche from './Components/search.js'
//import 'react-native-gesture-handler'
import React from 'react'
import  RechercheNav from './Navigation/Navigation.js'
import {Provider} from 'react-redux'
import Store from './Store/config.js'

export default function App() {
  return(
     <Provider store={Store}>
         <RechercheNav/>
     </Provider>
  );
}
