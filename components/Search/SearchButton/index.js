import React from 'react';
import {
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'

export default class SearchButton extends React.Component {
  render () {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchContainerTextContainer}>
          <Text style={styles.searchContainerText}>7 options selected</Text>
          <TouchableHighlight onPress={this.props.onResetPress}>
            <View style={styles.searchResetContainer}>
              <Ionicons style={styles.searchResetButton} name="md-refresh" size={23} color='#005F6B' />
              <Text style={styles.searchResetText}>Reset</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={[styles.searchButtonContainer]}>
          <TouchableHighlight underlayColor='#005F6B' onPress={this.props.onSearchPress} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Netflix</Text>
          </TouchableHighlight>   
        </View>
      </View>
    )
  }
}