import {
  Platform,
  StyleSheet
} from 'react-native';

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 40
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    padding: 14
  },
  coverArtContainer: {
    flex: 1, 
    justifyContent: 'space-around', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  coverArt: {
    width: Layout.window.width,
    height: Layout.window.width * 0.562
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  header: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff'    
  },
  year: {
    paddingLeft: 10,
    color: '#fff' 
  },
  description: {
    fontSize: 14,
    color: '#fff'
  },
  generalInfo: {
    paddingTop: 6,
    paddingBottom: 4,
    marginBottom: 6
  },
  mainText: {
    color: '#fff'
  },
  horizontalInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  miniHeader: {
    color: Colors.tint,
    fontWeight: '900',
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 2,
  },
  infoText: {
    fontSize: 14
  },
  stars: {
    alignItems: 'center',
    paddingTop: 18
  },
  watchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  watchButtonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 21
  }
})

export default styles