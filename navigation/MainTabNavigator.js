import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import Colors from '../constants/Colors'

const tabBarOptions = {
  activeTintColor: '#fff',
  inactiveTintColor: '#008C9E',
  style: {
    backgroundColor: '#005F6B',
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500'
  },
  upperCaseLabel: false,
  indicatorStyle: {
    backgroundColor: '#00DFFC'
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
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Advanced Search',
  tabBarOptions
};

export default createMaterialTopTabNavigator({
  SearchStack,
  HomeStack,
});
