import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import GridScreen from '../screens/GridScreen'
import TitleScreen from '../screens/TitleScreen'
import Colors from '../constants/Colors'

const tabBarOptions = {
  activeTintColor: '#fff',
  inactiveTintColor: '#C3D297',
  style: {
    backgroundColor: Colors.tabBar,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500'
  },
  upperCaseLabel: false,
  indicatorStyle: {
    backgroundColor: '#CDB380'
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Starred',
  tabBarOptions  
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Grid: GridScreen,
  Title: TitleScreen
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Flix',
  tabBarOptions
};

export default createMaterialTopTabNavigator({
  SearchStack,
  // HomeStack,
});
