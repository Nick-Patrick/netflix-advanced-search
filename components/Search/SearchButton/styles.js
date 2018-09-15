import {
  StyleSheet
} from 'react-native';

import Colors from '../../../constants/Colors'

export default StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 20,
    paddingTop: 10,
  },
  searchContainerTextContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  searchResetContainer: {
    flexDirection: 'row'
  },
  loadingIconContainer: {
    paddingHorizontal: 50,
    paddingTop: 3,
  },
  loadingIconContainerSmall: {
    paddingHorizontal: 17,
    paddingTop: 3,
  },
  searchContainerText: {
    lineHeight: 18,
    fontSize: 14,
    color: 'rgba(96,100,109, 0.7)',
    textAlign: 'center',
    paddingBottom: 10,
    paddingRight: 26,
  },
  searchResetButton: {
    marginTop: -4
  },
  searchResetText: {
    lineHeight: 20,
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: '700',
    paddingLeft: 4,
  },
  searchButtonContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  searchButton: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: Colors.primary,
    marginHorizontal: 5
  },
  searchNewButton: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: Colors.primaryDark,
    marginHorizontal: 5
  },
  searchButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700'
  }
})