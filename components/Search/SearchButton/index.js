import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'


export default class SearchButton extends React.Component {
  render () {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchContainerTextContainer}>
          <Text style={styles.searchContainerText}>{this.props.optionsSelected} {this.props.optionsSelected === 1 ? 'option' : 'options'} selected</Text>
          <TouchableHighlight onPress={this.props.onResetPress}>
            <View style={styles.searchResetContainer}>
              <Ionicons style={styles.searchResetButton} name="md-refresh" size={23} color={Colors.secondary} />
              <Text style={styles.searchResetText}>Reset</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={[styles.searchButtonContainer]}>
          <TouchableHighlight underlayColor={Colors.background} onPress={this.props.onRecentlyAddedPress} style={styles.searchNewButton}>
            { this.props.isLoadingNew
              ? <View style={styles.loadingIconContainer}><ActivityIndicator size="small" color="#fff" /></View>
              : <Text style={styles.searchButtonText}>Recently Added</Text>
            }
          </TouchableHighlight>
          <TouchableHighlight underlayColor={Colors.background} onPress={this.props.onSearchPress} style={styles.searchButton}>
            { this.props.isLoading 
              ? <View style={styles.loadingIconContainerSmall}><ActivityIndicator size="small" color="#fff" /></View>
              : <Text style={styles.searchButtonText}>Search</Text>
            }
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}