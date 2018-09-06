import {
  Platform,
  StyleSheet
} from 'react-native';

import Colors from '../../../constants/Colors'

export default StyleSheet.create({
  showTypeContainer: {
    flexDirection: 'row',
  },
  showTypeButton: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center'
  },
  showTypeButtonFirst: {
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  showTypeButtonLast: {
    borderLeftWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  showTypeButtonActive: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: Colors.secondary    
  },
  showTypeButtonText: {
    color: Colors.secondary,
    fontWeight: '600'
  },
  showTypeButtonTextActive: {
    color: '#fff'
  }
})