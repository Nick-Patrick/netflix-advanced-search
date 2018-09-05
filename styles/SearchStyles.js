import {
  Platform,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,    
  },
  contentContainer: {
    padding: 10,
    paddingVertical: 16,
  },
  divider: {
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    marginVertical: 20
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
    color: '#343838'
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
  }
})

export default styles