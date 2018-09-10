import React from 'react';
import {
  ScrollView,
  TouchableHighlight,
  View,
  Image,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';
import styles from '../styles/GridStyles'
import Layout from '../constants/Layout'
import qs from 'qs'
import _ from 'lodash'

export default class GridScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    page: 2,
    isLoading: false,
    extraTitles: []
  }

  keyExtractor = (item, index) => { 
    // if (item) return item.id
    return index
  }

  renderItem ({item, index}) {
    const mainImage = 'https://image.tmdb.org/t/p/' + 'w154' + item.poster_path
    const tileWidth = Layout.window.width / 4
    const tileHeight = tileWidth * 1.6 
    
    return (
      <TouchableHighlight
        onPress={() => {
          const { navigate } = this.props.navigation;
          navigate('Title', { title: item })
        }}
        activeOpacity={0.6}>
        <View>
          <Image
            source={{ uri: mainImage }}
            style={[styles.tile, { width: tileWidth, height: tileHeight }]}
          />
        </View>
      </TouchableHighlight>
    )
  }

  onMoreSearch () {
    this.setState({ isLoading: true })
    
    const qsParams = this.props.navigation.getParam('qsParams', {})
    qsParams.page = this.state.page

    const apiEndpoint = `https://us-central1-whatsonnetflix-991e9.cloudfunctions.net/netflixAdvancedSearch?${qs.stringify(qsParams)}`
    
    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.results && json.results.length) {
        this.setState({
          isLoading: false,
          extraTitles: this.state.extraTitles.concat(json.results),
          page: this.state.page + 1
        })
      }
    })
  }

  render () {
    const titles = this.props.navigation.getParam('titles', [])
    const validTitles = titles.filter(title => title && title.poster_path)
    const extraValidTitles = this.state.extraTitles.filter(title => title && title.poster_path)

    return ( 
      <View style={styles.container}>
        <FlatList
          initialNumToRender={24}
          keyExtractor={this.keyExtractor}
          data={validTitles.concat(extraValidTitles)}
          extraData={this.state}
          renderItem={this.renderItem.bind(this)}
          numColumns={4}
          onEndReached={_.throttle(this.onMoreSearch.bind(this), 10000)}
          onEndReachedThreshold={1}
        />
      </View>
    )
  }
}