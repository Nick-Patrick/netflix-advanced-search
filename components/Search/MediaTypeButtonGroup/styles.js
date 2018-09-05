import {
  Platform,
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  showTypeContainer: {
    flexDirection: 'row',
  },
  showTypeButton: {
    borderColor: '#343838',
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
    backgroundColor: '#343838'    
  },
  showTypeButtonText: {
    color: '#343838',
    fontWeight: '600'
  },
  showTypeButtonTextActive: {
    color: '#fff'
  }
})