import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import {StyleSheet,Image} from 'react-native'
import Recherche from '../Components/search.js'
import FilmDetail from '../Components/FilmDetail.js'
import fav from '../Components/fav.js'

const RechercheNav = createStackNavigator({
   Recherche:{
      screen:Recherche,
      navOptions:{
         title:'Recherche en cours'
      }
   },
   FilmDetail:{
      screen:FilmDetail
   }
})

const FavNav=createStackNavigator({
   fav:{
      screen:fav,
      navigationOptions:{
         title:'Favoris'
      }
   },
   FilmDetail:{
      screen:FilmDetail
   }
})

const FilmNav=createBottomTabNavigator({
   Recherche:{
      screen:RechercheNav,
      navigationOptions:{
         tabBarIcon:()=>{
            return <Image
               source={require('../search.png')}
               style={styles.icon}/>

         }
      }
   },
   Favoris:{
      screen:fav,
      navigationOptions:{
         tabBarIcon:()=>{
            return <Image
               source={require('../fav.png')}
               style={styles.icon}/>

         }
      }
   }
},{
   tabBarOptions:{
      showLabel:false,
      showIcon:true,
      activeBackgroundColor:'#DDDDDD',
      inactiveBackgroundColor:'#FFFFFF'
   }
})

const styles = StyleSheet.create({
   icon:{
      width:30,
      height:30
   }
})

export default createAppContainer(FilmNav)
