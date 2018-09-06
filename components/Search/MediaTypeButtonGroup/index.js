import React from 'react';
import {
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import styles from './styles'

export default class MediaTypeButtonGroup extends React.Component {
  render () {
    return (
      <View style={styles.showTypeContainer}>
        <TouchableHighlight onPress={this.props.onPress.bind(this, 'Any')} style={[
          styles.showTypeButton, 
          styles.showTypeButtonFirst, 
          this.props.showTypeAllActive && styles.showTypeButtonActive
        ]}>
          <Text style={[
            styles.showTypeButtonText, 
            this.props.showTypeAllActive && styles.showTypeButtonTextActive
          ]}>All</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onPress.bind(this, 'Movie')} style={[
          styles.showTypeButton,
          this.props.showTypeMoviesActive && styles.showTypeButtonActive
          ]}>
          <Text style={[
            styles.showTypeButtonText,
            this.props.showTypeMoviesActive && styles.showTypeButtonTextActive
          ]}>Movies</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onPress.bind(this, 'Series')} style={[
          styles.showTypeButton, 
          styles.showTypeButtonLast,
          this.props.showTypeTVActive && styles.showTypeButtonActive
        ]}>
          <Text style={[
            styles.showTypeButtonText,
            this.props.showTypeTVActive && styles.showTypeButtonTextActive
          ]}>TV Shows</Text>
        </TouchableHighlight>
      </View>
    )
  }
}