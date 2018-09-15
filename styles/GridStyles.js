import {
  Platform,
  StyleSheet
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingRight: 1,
    height: Layout.window.height - 60
  },
  tile: {
    padding: 1, 
    margin: 1, 
    marginBottom: 1, 
    shadowOpacity: 0, 
    shadowRadius: 0
  }
})

export default styles