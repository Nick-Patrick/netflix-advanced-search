import {
  Platform,
  StyleSheet
} from 'react-native';

import Colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    paddingVertical: 16,
    paddingBottom: 140,    
  },
  divider: {
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    marginVertical: 20,
    marginTop: 24
  },
  formInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 2,
  },
  formInputLabel: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 20,
    color: Colors.secondary
  },
  keywordsLabel: {
    lineHeight: 20,
    height: 30,
  },
  dropdown: {
    height: 20,
    width: 100
  },
  yearFromDropdown: {
    paddingBottom: 16
  },
  dropdownButton: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.primary,
    marginHorizontal: 30    
  },
  dropdownText: {
    fontSize: 17,
    padding: 4
  },
  dropdownModal: {
    marginBottom: 20
  },
  dropdownModalText: {
    fontSize: 20,
    paddingLeft: 20,
    color: Colors.tabBar,
    paddingVertical: 18,
    fontWeight: '600'
  }
})

export default styles